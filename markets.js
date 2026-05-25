// -------------------------------------------------------
// MARKETS.JS — Powered by Finnhub
// Get a FREE API key at: https://finnhub.io/register
// Replace the empty string below with your key.
// -------------------------------------------------------
const FINNHUB_KEY = ''; // <-- paste your Finnhub key here
const FH = 'https://finnhub.io/api/v1';

// Default watchlist tickers
const WATCHLIST = ['AAPL','MSFT','NVDA','TSLA','GOOGL','AMZN','META','SPY'];

// Major forex pairs (Finnhub uses OANDA format)
const FOREX_PAIRS = [
  { symbol: 'OANDA:EUR_USD', label: 'EUR / USD' },
  { symbol: 'OANDA:GBP_USD', label: 'GBP / USD' },
  { symbol: 'OANDA:USD_JPY', label: 'USD / JPY' },
  { symbol: 'OANDA:USD_CHF', label: 'USD / CHF' },
  { symbol: 'OANDA:AUD_USD', label: 'AUD / USD' },
  { symbol: 'OANDA:USD_CAD', label: 'USD / CAD' },
  { symbol: 'OANDA:USD_INR', label: 'USD / INR' },
  { symbol: 'OANDA:EUR_GBP', label: 'EUR / GBP' },
];

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

// ---- QUOTE CARD ----
async function fetchQuote(symbol) {
  const el = document.getElementById('quote-result');
  if (!FINNHUB_KEY) { el.innerHTML = noKeyMsg(); return; }
  el.innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin"></i> Fetching quote...</div>';
  try {
    const [q, p] = await Promise.all([
      fhFetch('quote', { symbol: symbol.toUpperCase() }),
      fhFetch('stock/profile2', { symbol: symbol.toUpperCase() })
    ]);
    if (!q || q.c === 0) { el.innerHTML = `<div class="news-placeholder"><i class="fas fa-times-circle"></i><p>Ticker not found or market closed.</p></div>`; return; }
    const chg = q.d ?? 0;
    const pct = q.dp ?? 0;
    const cls = colorClass(chg);
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
          <div class="quote-stat">
            <span class="stat-label">Change</span>
            <span class="stat-val ${cls}">${chg >= 0 ? '+' : ''}${chg.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)</span>
          </div>
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

// ---- WATCHLIST ----
async function loadWatchlist() {
  const grid = document.getElementById('watchlist-grid');
  if (!FINNHUB_KEY) { grid.innerHTML = noKeyMsg(); return; }
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin"></i> Loading watchlist...</div>';
  try {
    const quotes = await Promise.all(WATCHLIST.map(t => fhFetch('quote', { symbol: t }).then(q => ({ ticker: t, q }))));
    grid.innerHTML = '';
    quotes.forEach(({ ticker, q }) => {
      if (!q) return;
      const chg = q.d ?? 0;
      const pct = q.dp ?? 0;
      const cls = colorClass(chg);
      const card = document.createElement('div');
      card.className = 'watchlist-card';
      card.innerHTML = `
        <div class="wl-top">
          <span class="wl-ticker">${escH(ticker)}</span>
          <span class="wl-price">$${q.c?.toFixed(2)}</span>
        </div>
        <div class="wl-change ${cls}">${chg >= 0 ? '+' : ''}${chg.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)</div>`;
      grid.appendChild(card);
    });
  } catch(e) {
    grid.innerHTML = `<div class="news-placeholder"><p>Error: ${e.message}</p></div>`;
  }
}

// ---- FOREX ----
async function loadForex() {
  const grid = document.getElementById('forex-grid');
  if (!FINNHUB_KEY) { grid.innerHTML = noKeyMsg(); return; }
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin"></i> Loading forex...</div>';
  try {
    const rates = await Promise.all(FOREX_PAIRS.map(p => fhFetch('quote', { symbol: p.symbol }).then(q => ({ ...p, q }))));
    grid.innerHTML = '';
    rates.forEach(({ label, q }) => {
      if (!q) return;
      const chg = q.dp ?? 0;
      const cls = colorClass(chg);
      const card = document.createElement('div');
      card.className = 'watchlist-card';
      card.innerHTML = `
        <div class="wl-top">
          <span class="wl-ticker" style="font-size:0.82rem">${escH(label)}</span>
          <span class="wl-price">${q.c?.toFixed(4)}</span>
        </div>
        <div class="wl-change ${cls}">${chg >= 0 ? '+' : ''}${chg.toFixed(3)}%</div>`;
      grid.appendChild(card);
    });
  } catch(e) {
    grid.innerHTML = `<div class="news-placeholder"><p>Error: ${e.message}</p></div>`;
  }
}

// ---- MARKET NEWS ----
async function loadMarketNews() {
  const grid = document.getElementById('market-news-grid');
  if (!FINNHUB_KEY) { grid.innerHTML = noKeyMsg(); return; }
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin"></i> Loading market news...</div>';
  try {
    const data = await fhFetch('news', { category: 'general' });
    if (!data?.length) { grid.innerHTML = '<div class="news-placeholder"><p>No news available.</p></div>'; return; }
    grid.innerHTML = '';
    data.slice(0, 24).forEach(a => {
      const card = document.createElement('a');
      card.className = 'news-card';
      card.href = a.url || '#';
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      const date = a.datetime ? new Date(a.datetime * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
      card.innerHTML = `
        <div class="news-card-source">${escH(a.source || 'Finnhub')}</div>
        <div class="news-card-title">${escH(a.headline || '')}</div>
        <div class="news-card-desc">${escH((a.summary || '').slice(0, 160))}${a.summary?.length > 160 ? '…' : ''}</div>
        <div class="news-card-date">${date}</div>`;
      grid.appendChild(card);
    });
  } catch(e) {
    grid.innerHTML = `<div class="news-placeholder"><p>Error: ${e.message}</p></div>`;
  }
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
const tickerBtn = document.getElementById('ticker-btn');
const tickerInput = document.getElementById('ticker-input');
if (tickerBtn) {
  tickerBtn.addEventListener('click', () => {
    const val = tickerInput.value.trim();
    if (val) fetchQuote(val);
  });
  tickerInput.addEventListener('keydown', e => { if (e.key === 'Enter') tickerBtn.click(); });
}

// Initial load
loadWatchlist();
