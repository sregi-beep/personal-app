// -------------------------------------------------------
// FORYOU.JS — Personalized live feed via RSS2JSON
// No API key needed (10,000 req/day free on rss2json)
// Uses verified RSS feeds + Google News RSS as fallback
// -------------------------------------------------------

const RSS2JSON  = 'https://api.rss2json.com/v1/api.json?rss_url=';
const GNEWS_RSS = (q) => `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

const TOPICS = {
  world: [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    GNEWS_RSS('world news'),
  ],
  war: [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    GNEWS_RSS('war conflict military'),
    'https://www.aljazeera.com/xml/rss/all.xml',
  ],
  markets: [
    'https://feeds.bloomberg.com/markets/news.rss',
    'https://www.cnbc.com/id/10000664/device/rss/rss.html',
    GNEWS_RSS('stock market finance'),
  ],
  tech: [
    'https://techcrunch.com/feed/',
    'https://feeds.arstechnica.com/arstechnica/index',
    'https://www.wired.com/feed/rss',
  ],
  uspolitics: [
    'https://feeds.npr.org/1014/rss.xml',
    'https://www.politico.com/rss/politicopicks.xml',
    GNEWS_RSS('US politics'),
  ],
  india: [
    GNEWS_RSS('India news'),
    'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    'https://www.thehindu.com/news/national/feeder/default.rss',
  ],
  usnews: [
    'https://feeds.npr.org/1003/rss.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/US.xml',
    GNEWS_RSS('United States news'),
  ],
  economics: [
    GNEWS_RSS('economics economy inflation GDP'),
    'https://www.economist.com/finance-and-economics/rss.xml',
    'https://feeds.bloomberg.com/economics/news.rss',
  ],
  sports: [
    'https://feeds.bbci.co.uk/sport/rss.xml',
    'https://www.espn.com/espn/rss/news',
    GNEWS_RSS('sports Olympics major events'),
  ],
};

const WAR_KEYWORDS = ['war','conflict','military','troops','battle','attack','strike','missile','ceasefire','invasion','soldier','rebel','airstrike','hostage','siege','bombing','casualties'];

let activeTopic = 'world';

async function fetchFeed(topic) {
  const urls = TOPICS[topic];
  for (const url of urls) {
    try {
      const apiUrl = `${RSS2JSON}${encodeURIComponent(url)}&count=20&t=${Date.now()}`;
      const res = await fetch(apiUrl);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.status === 'ok' && data.items?.length) {
        let items = data.items;
        if (topic === 'war') {
          const filtered = items.filter(item => {
            const text = (item.title + ' ' + (item.description || '')).toLowerCase();
            return WAR_KEYWORDS.some(kw => text.includes(kw));
          });
          items = filtered.length >= 4 ? filtered : items;
        }
        return { items, feedTitle: data.feed?.title || '' };
      }
    } catch { continue; }
  }
  return null;
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
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
  return str.replace(/<[^>]*>/g, '').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").trim();
}

async function loadFeed(topic) {
  const grid = document.getElementById('foryou-grid');
  grid.innerHTML = `<div class="foryou-placeholder"><i class="fas fa-circle-notch fa-spin"></i><p>Loading your feed...</p></div>`;

  const result = await fetchFeed(topic);

  if (!result) {
    grid.innerHTML = `<div class="foryou-placeholder"><i class="fas fa-satellite-dish"></i><p>Could not load feed. Check your connection and try again.</p></div>`;
    return;
  }

  grid.innerHTML = '';
  result.items.slice(0, 12).forEach(item => {
    const card  = document.createElement('a');
    card.className = 'fy-card';
    card.href   = item.link || '#';
    card.target = '_blank';
    card.rel    = 'noopener noreferrer';

    const rawDesc = stripHtml(item.description || '');
    const desc    = rawDesc.length > 140 ? rawDesc.slice(0, 140) + '…' : rawDesc;
    const ago     = timeAgo(item.pubDate);
    // Prefer item author/source, fallback to feed title
    const src     = item.author || result.feedTitle || 'News';

    card.innerHTML = `
      <div class="fy-source">${escH(src)}</div>
      <div class="fy-title">${escH(item.title || '')}</div>
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
