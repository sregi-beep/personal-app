// -------------------------------------------------------
// FORYOU.JS — Personalized live feed via RSS2JSON
// No API key needed for basic use (10,000 req/day free)
// Sources are hand-picked RSS feeds per topic
// -------------------------------------------------------

const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

// Each topic has 2-3 RSS feeds. We fetch the first that succeeds.
const TOPICS = {
  world: [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'https://www.aljazeera.com/xml/rss/all.xml',
    'https://feeds.reuters.com/reuters/worldNews',
  ],
  war: [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'https://www.aljazeera.com/xml/rss/all.xml',
    'https://rss.cnn.com/rss/edition_world.rss',
  ],
  markets: [
    'https://feeds.bloomberg.com/markets/news.rss',
    'https://feeds.reuters.com/reuters/businessNews',
    'https://www.cnbc.com/id/10000664/device/rss/rss.html',
  ],
  tech: [
    'https://techcrunch.com/feed/',
    'https://feeds.arstechnica.com/arstechnica/technology-lab',
    'https://www.theverge.com/rss/index.xml',
  ],
  uspolitics: [
    'https://feeds.npr.org/1014/rss.xml',
    'https://rss.politico.com/politics-news.xml',
    'https://feeds.washingtonpost.com/rss/politics',
  ],
  india: [
    'https://feeds.feedburner.com/ndtvnews-india-news',
    'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
    'https://www.thehindu.com/news/national/feeder/default.rss',
  ],
  usnews: [
    'https://feeds.npr.org/1003/rss.xml',
    'https://rss.cnn.com/rss/edition_us.rss',
    'https://feeds.washingtonpost.com/rss/national',
  ],
  economics: [
    'https://feeds.reuters.com/reuters/businessNews',
    'https://www.economist.com/finance-and-economics/rss.xml',
    'https://feeds.ft.com/rss/home/us',
  ],
  sports: [
    'https://feeds.bbci.co.uk/sport/rss.xml',
    'https://www.espn.com/espn/rss/news',
    'https://rss.cnn.com/rss/edition_sport.rss',
  ],
};

// War/conflict keywords to filter world feed for the war tab
const WAR_KEYWORDS = ['war','conflict','military','troops','battle','attack','strike','missile','ceasefire','invasion','soldier','rebel','airstrike','hostage','siege'];

let activeTopic = 'world';

async function fetchFeed(topic) {
  const urls = TOPICS[topic];
  for (const url of urls) {
    try {
      const res = await fetch(`${RSS2JSON}${encodeURIComponent(url)}&count=20`);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.status === 'ok' && data.items?.length) {
        let items = data.items;
        // For war tab, filter by keywords
        if (topic === 'war') {
          const filtered = items.filter(item => {
            const text = (item.title + ' ' + (item.description || '')).toLowerCase();
            return WAR_KEYWORDS.some(kw => text.includes(kw));
          });
          items = filtered.length >= 4 ? filtered : items; // fallback if too few matches
        }
        return { items, feed: data.feed };
      }
    } catch { continue; }
  }
  return null;
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

function escH(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function stripHtml(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').trim();
}

async function loadFeed(topic) {
  const grid = document.getElementById('foryou-grid');
  grid.innerHTML = `<div class="foryou-placeholder"><i class="fas fa-circle-notch fa-spin"></i><p>Loading...</p></div>`;

  const result = await fetchFeed(topic);

  if (!result) {
    grid.innerHTML = `<div class="foryou-placeholder"><i class="fas fa-satellite-dish"></i><p>Could not load feed. Try again later.</p></div>`;
    return;
  }

  grid.innerHTML = '';
  result.items.slice(0, 12).forEach(item => {
    const card = document.createElement('a');
    card.className = 'fy-card';
    card.href = item.link || '#';
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const desc = stripHtml(item.description || '').slice(0, 140);
    const ago  = timeAgo(item.pubDate);
    const src  = result.feed?.title || 'RSS';

    card.innerHTML = `
      <div class="fy-source">${escH(src)}</div>
      <div class="fy-title">${escH(item.title || '')}</div>
      ${desc ? `<div class="fy-desc">${escH(desc)}…</div>` : ''}
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
