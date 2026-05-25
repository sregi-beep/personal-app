// -------------------------------------------------------
// NEWS.JS — Primary: NewsData.io | Fallback: GNews
// NewsData.io key: https://newsdata.io/register
// GNews key:       https://gnews.io  (free tier)
// -------------------------------------------------------
const NEWS_API_KEY  = ''; // <-- NewsData.io key
const GNEWS_API_KEY = ''; // <-- GNews key (fallback)

const BASE_URL   = 'https://newsdata.io/api/1/news';
const GNEWS_URL  = 'https://gnews.io/api/v4/search';

const CATEGORY_CONFIG = {
  world:      { category: 'world' },
  top:        { category: 'top' },
  business:   { category: 'business' },
  politics:   { category: 'politics' },
  technology: { category: 'technology' },
  india:      { country: 'in' },
  usa:        { country: 'us' },
  war:        { q: 'war OR conflict OR military OR battle OR troops' },
  economics:  { q: 'economics OR economy OR GDP OR inflation OR interest rate' },
};

// GNews topic mapping (fallback)
const GNEWS_TOPIC_MAP = {
  world:      { topic: 'world' },
  top:        { topic: 'breaking-news' },
  business:   { topic: 'business' },
  politics:   { topic: 'politics' },
  technology: { topic: 'technology' },
  india:      { q: 'India', country: 'in' },
  usa:        { q: 'USA', country: 'us' },
  war:        { q: 'war OR conflict OR military' },
  economics:  { q: 'economy OR economics OR inflation' },
};

let activeCategory = 'world';

async function fetchNews(category) {
  if (!NEWS_API_KEY && !GNEWS_API_KEY) {
    showPlaceholder('Add your NewsData.io or GNews API key in news.js to load live news.');
    return;
  }
  showLoading();
  // Try primary
  if (NEWS_API_KEY) {
    const ok = await fetchFromNewsData(category);
    if (ok) return;
  }
  // Fallback to GNews
  if (GNEWS_API_KEY) {
    await fetchFromGNews(category);
  } else {
    showPlaceholder('Primary API failed. Add a GNews key as fallback in news.js.');
  }
}

async function fetchFromNewsData(category) {
  try {
    const config = CATEGORY_CONFIG[category] || { category: 'top' };
    const params = new URLSearchParams({ apikey: NEWS_API_KEY, language: 'en', ...config });
    const res = await fetch(`${BASE_URL}?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'success' || !data.results?.length) return false;
    renderNews(data.results.map(a => ({
      source: a.source_id,
      title:  a.title,
      desc:   a.description,
      url:    a.link,
      date:   a.pubDate,
    })));
    return true;
  } catch { return false; }
}

async function fetchFromGNews(category) {
  try {
    const config = GNEWS_TOPIC_MAP[category] || { topic: 'breaking-news' };
    const params = new URLSearchParams({ apikey: GNEWS_API_KEY, lang: 'en', max: '24', ...config });
    const res = await fetch(`${GNEWS_URL}?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.articles?.length) { showPlaceholder('No articles found.'); return; }
    renderNews(data.articles.map(a => ({
      source: a.source?.name,
      title:  a.title,
      desc:   a.description,
      url:    a.url,
      date:   a.publishedAt,
    })));
  } catch(e) {
    showPlaceholder(`Failed to load news: ${e.message}`);
  }
}

function renderNews(articles) {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = '';
  articles.slice(0, 24).forEach(a => {
    const card = document.createElement('a');
    card.className = 'news-card';
    card.href = a.url || '#';
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    const desc = a.desc ? a.desc.slice(0, 160) + '…' : 'No description available.';
    const date = a.date ? new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    card.innerHTML = `
      <div class="news-card-source">${escHtml(a.source || 'Unknown')}</div>
      <div class="news-card-title">${escHtml(a.title || '')}</div>
      <div class="news-card-desc">${escHtml(desc)}</div>
      <div class="news-card-date">${date}</div>`;
    grid.appendChild(card);
  });
}

function showLoading() {
  document.getElementById('news-grid').innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;margin-bottom:12px;display:block;"></i>Loading articles...</div>';
}
function showPlaceholder(msg) {
  document.getElementById('news-grid').innerHTML = `<div class="news-placeholder"><i class="fas fa-satellite-dish"></i><p>${msg}</p></div>`;
}
function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    fetchNews(activeCategory);
  });
});

fetchNews(activeCategory);
