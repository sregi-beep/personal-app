// -------------------------------------------------------
// MARKETS.JS
// Stocks + Market News : Finnhub (free) — https://finnhub.io/register
// Forex               : ExchangeRate-API (no key needed)
// -------------------------------------------------------
const FINNHUB_KEY = ''; /d89spg9r01qhi7rtshb0d89spg9r01qhi7rtshbg/ <-- paste your Finnhub key here
const FH = 'https://finnhub.io/api/v1';

const WATCHLIST = ['AAPL','MSFT','NVDA','TSLA','GOOGL','AMZN','META','SPY'];

const FOREX_PAIRS = [
  { from: 'USD', to: 'EUR', label: 'USD / EUR' },
  { from: 'USD', to: 'GBP', label: 'USD / GBP' },
  { from: 'USD', to: 'JPY', label: 'USD / JPY' },
  { from: 'USD', to: 'CHF', label: 'USD / CHF' },
  { from: 'USD', to: 'AUD', label: 'USD / AUD' },
  { from: 'USD', to: 'CAD', label: 'USD / CAD' },
  { from: 'USD', to: 'INR', label: 'USD / INR' },
  { from: 'EUR', to: 'GBP', label: 'EUR / GBP' },
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fhFetch(endpoint, params = {}) {
  if (!FINNHUB_KEY) return null;
  const p = new URLSearchParams({ token: FINNHUB_KEY, ...params });
  const res = await fetch(`${FH}/${endpoint}?${p}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function colorClass(val) {
  if (val > 0) return 'positive';
  if (val < 0) return 'negative';
  return 'neutral';
}

// ---- SINGLE QUOTE ----
async function fetchQuote(symbol) {
  const el = document.getElementById('quote-result');
  if (!FINNHUB_KEY) { el.innerHTML = noKeyMsg(); return; }
  el.innerHTML = loadingHTML('Fetching quote...');
  try {
    const [q, p] = await Promise.all([
      fhFetch('quote', { symbol: symbol.toUpperCase() }),
      fhFetch('stock/profile2', { symbol: symbol.toUpperCase() })
    ]);
    if (!q || q.c === 0) {
      el.innerHTML = `<div class="news-placeholder"><i class="fas fa-times-circle"></i><p>Ticker not found or market closed.</p></div>`;
      return;
    }
    const chg = q.d ?? 0, pct = q.dp ?? 0, cls = colorClass(chg);
    el.innerHTML = `
      <div class="quote-card">
        <div class="quote-top">
          <div>
            <div class="quote-symbol">${escH(symbol.toUpperCase())}</div>
            <div class="quote-name">${p?.name ? escH(p.name) : ''}</div>
          </div>
          <div class="quote-price">$${q.c.toFixed(2)}</div>
        </div>
        <div class="quote-stats">
          <div class="quote-stat"><span class="stat-label">Change</span>
            <span class="stat-val ${cls}">${chg >= 0 ? '+' : ''}${chg.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)</span></div>
          <div class="quote-stat"><span class="stat-label">Open</span><span class="stat-val">$${q.o?.toFixed(2)}</span></div>
          <div class="quote-stat"><span class="stat-label">High</span><span class="stat-val positive">$${q.h?.toFixed(2)}</span></div>
          <div class="quote-stat"><span class="stat-label">Low</span><span class="stat-val negative">$${q.l?.toFixed(2)}</span></div>
          <div class="quote-stat"><span class="stat-label">Prev Close</span><span class="stat-val">$${q.pc?.toFixed(2)}</span></div>
        </div>
      </div>`;
  } catch(e) {
    el.innerHTML = `<div class="news-placeholder"><p>Error: ${e.message}</p></div>`;
  }
}

// ---- WATCHLIST (staggered to respect rate limit) ----
async function loadWatchlist() {
  const grid = document.getElementById('watchlist-grid');
  if (!FINNHUB_KEY) { grid.innerHTML = noKeyMsg(); return; }
  grid.innerHTML = loadingHTML('Loading watchlist...');
  grid.innerHTML = '';
  for (let i = 0; i < WATCHLIST.length; i++) {
    const ticker = WATCHLIST[i];
    try {
      const q = await fhFetch('quote', { symbol: ticker });
      if (!q) continue;
      const chg = q.d ?? 0, pct = q.dp ?? 0, cls = colorClass(chg);
      const card = document.createElement('div');
      card.className = 'watchlist-card';
      card.innerHTML = `
        <div class="wl-top">
          <span class="wl-ticker">${escH(ticker)}</span>
          <span class="wl-price">$${q.c?.toFixed(2)}</span>
        </div>
        <div class="wl-change ${cls}">${chg >= 0 ? '+' : ''}${chg.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)</div>`;
      grid.appendChild(card);
    } catch(e) {
      console.warn(`Failed to fetch ${ticker}:`, e.message);
    }
    await sleep(120); // stagger calls ~120ms apart to stay under rate limit
  }
  if (!grid.children.length) grid.innerHTML = noKeyMsg();
}

// ---- FOREX via ExchangeRate-API (no key needed) ----
async function loadForex() {
  const grid = document.getElementById('forex-grid');
  grid.innerHTML = loadingHTML('Loading forex rates...');
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.result !== 'success') throw new Error('API error');
    const rates = data.rates;
    grid.innerHTML = '';
    FOREX_PAIRS.forEach(({ from, to, label }) => {
      let rate;
      if (from === 'USD') {
        rate = rates[to];
      } else {
        // Cross rate: EUR/GBP = rates[GBP] / rates[EUR]
        rate = rates[to] / rates[from];
      }
      if (!rate) return;
      const card = document.createElement('div');
      card.className = 'watchlist-card';
      card.innerHTML = `
        <div class="wl-top">
          <span class="wl-ticker" style="font-size:0.82rem">${escH(label)}</span>
          <span class="wl-price">${rate.toFixed(4)}</span>
        </div>
        <div class="wl-change neutral">Updated: ${new Date(data.time_last_update_utc).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>`;
      grid.appendChild(card);
    });
  } catch(e) {
    grid.innerHTML = `<div class="news-placeholder"><p>Forex error: ${e.message}</p></div>`;
  }
}

// ---- MARKET NEWS ----
async function loadMarketNews() {
  const grid = document.getElementById('market-news-grid');
  if (!FINNHUB_KEY) { grid.innerHTML = noKeyMsg(); return; }
  grid.innerHTML = loadingHTML('Loading market news...');
  try {
    const data = await fhFetch('news', { category: 'general' });
    if (!Array.isArray(data) || !data.length) {
      grid.innerHTML = '<div class="news-placeholder"><p>No news available.</p></div>';
      return;
    }
    grid.innerHTML = '';
    data.slice(0, 24).forEach(a => {
      const card = document.createElement('a');
      card.className = 'news-card';
      card.href = a.url || '#';
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      const date = a.datetime
        ? new Date(a.datetime * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';
      card.innerHTML = `
        <div class="news-card-source">${escH(a.source || 'Finnhub')}</div>
        <div class="news-card-title">${escH(a.headline || '')}</div>
        <div class="news-card-desc">${escH((a.summary || '').slice(0, 160))}${(a.summary?.length > 160) ? '…' : ''}</div>
        <div class="news-card-date">${date}</div>`;
      grid.appendChild(card);
    });
  } catch(e) {
    grid.innerHTML = `<div class="news-placeholder"><p>Error: ${e.message}</p></div>`;
  }
}

function loadingHTML(msg) {
  return `<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin" style="font-size:1.6rem;margin-bottom:10px;display:block"></i>${msg}</div>`;
}
function noKeyMsg() {
  return '<div class="news-placeholder"><i class="fas fa-key"></i><p>Add your Finnhub API key in markets.js</p></div>';
}
function escH(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- TAB SWITCHING ----
document.querySelectorAll('#market-tabs .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#market-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ['stocks','forex','market-news'].forEach(t => {
      document.getElementById(`tab-${t}`).style.display = btn.dataset.tab === t ? '' : 'none';
    });
    if (btn.dataset.tab === 'forex') loadForex();
    if (btn.dataset.tab === 'market-news') loadMarketNews();
  });
});

// ---- TICKER SEARCH ----
const tickerBtn   = document.getElementById('ticker-btn');
const tickerInput = document.getElementById('ticker-input');
if (tickerBtn) {
  tickerBtn.addEventListener('click', () => { const v = tickerInput.value.trim(); if (v) fetchQuote(v); });
  tickerInput.addEventListener('keydown', e => { if (e.key === 'Enter') tickerBtn.click(); });
}

// Initial load
loadWatchlist();
