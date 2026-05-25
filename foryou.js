// -------------------------------------------------------
// FORYOU.JS — Live RSS feed using AllOrigins CORS proxy
// No API key, no domain restrictions, fully free
// -------------------------------------------------------

// AllOrigins proxies any URL and returns JSON with .contents (raw XML)
const PROXY = url => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&t=${Date.now()}`;

// Google News RSS — reliable fallback for every topic
const GN = q => `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

const TOPICS = {
  world:      [ GN('world news today'), 'https://feeds.bbci.co.uk/news/world/rss.xml' ],
  war:        [ GN('war conflict military 2026'), GN('war news today') ],
  markets:    [ GN('stock market finance today'), 'https://www.cnbc.com/id/10000664/device/rss/rss.html' ],
  tech:       [ GN('artificial intelligence technology 2026'), 'https://techcrunch.com/feed/' ],
  uspolitics: [ GN('US politics today'), 'https://feeds.npr.org/1014/rss.xml' ],
  india:      [ GN('India news today'), GN('India latest news') ],
  usnews:     [ GN('United States news today'), 'https://feeds.npr.org/1003/rss.xml' ],
  economics:  [ GN('economics economy inflation'), GN('global economy news') ],
  sports:     [ GN('sports news today Olympics'), 'https://feeds.bbci.co.uk/sport/rss.xml' ],
};

let activeTopic = 'world';

function parseRSS(xmlStr) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlStr, 'text/xml');
  const items = Array.from(xml.querySelectorAll('item'));
  const feedTitle = xml.querySelector('channel > title')?.textContent || '';
  return {
    feedTitle,
    items: items.map(item => ({
      title:   item.querySelector('title')?.textContent || '',
      link:    item.querySelector('link')?.textContent || item.querySelector('link')?.getAttribute('href') || '',
      pubDate: item.querySelector('pubDate')?.textContent || '',
      desc:    item.querySelector('description')?.textContent || '',
      source:  item.querySelector('source')?.textContent || '',
    }))
  };
}

async function fetchFeed(topic) {
  const urls = TOPICS[topic] || TOPICS.world;
  for (const url of urls) {
    try {
      const res = await fetch(PROXY(url));
      if (!res.ok) continue;
      const json = await res.json();
      if (!json.contents) continue;
      const parsed = parseRSS(json.contents);
      if (parsed.items.length > 0) return parsed;
    } catch { continue; }
  }
  return null;
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (isNaN(diff) || diff < 0) return '';
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function escH(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function stripHtml(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').trim();
}

async function loadFeed(topic) {
  const grid = document.getElementById('foryou-grid');
  grid.innerHTML = `<div class="foryou-placeholder"><i class="fas fa-circle-notch fa-spin"></i><p>Loading your feed...</p></div>`;

  const result = await fetchFeed(topic);

  if (!result || !result.items.length) {
    grid.innerHTML = `<div class="foryou-placeholder"><i class="fas fa-satellite-dish"></i><p>Could not load feed. Try again later.</p></div>`;
    return;
  }

  grid.innerHTML = '';
  result.items.slice(0, 12).forEach(item => {
    const card = document.createElement('a');
    card.className = 'fy-card';
    card.href   = item.link || '#';
    card.target = '_blank';
    card.rel    = 'noopener noreferrer';

    const rawDesc = stripHtml(item.desc || '');
    const desc    = rawDesc.length > 140 ? rawDesc.slice(0, 140) + '…' : rawDesc;
    const ago     = timeAgo(item.pubDate);
    const src     = item.source || result.feedTitle || 'News';

    card.innerHTML = `
      <div class="fy-source">${escH(src)}</div>
      <div class="fy-title">${escH(item.title)}</div>
      ${desc ? `<div class="fy-desc">${escH(desc)}</div>` : ''}
      <div class="fy-meta">${ago ? `<span>${ago}</span>` : ''}</div>`;
    grid.appendChild(card);
  });
}

// Tab switching
document.querySelectorAll('.fy-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fy-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTopic = btn.dataset.topic;
    loadFeed(activeTopic);
  });
});

// Initial load
loadFeed(activeTopic);
