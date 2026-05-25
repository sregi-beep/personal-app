// -------------------------------------------------------
// NEWS.JS — Powered by NewsData.io
// Get a FREE API key at: https://newsdata.io/register
// Replace the empty string below with your key.
// -------------------------------------------------------
const NEWS_API_KEY = 'pub_d685a1e503a646b69541bfa42c40acae'; // <-- paste your NewsData.io key here
const BASE_URL = 'https://newsdata.io/api/1/news';

// Category mappings for NewsData.io
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

let activeCategory = 'world';

async function fetchNews(category) {
  if (!NEWS_API_KEY) {
    showPlaceholder('Add your NewsData.io API key in news.js to load live news.');
    return;
  }

  showLoading();
  const config = CATEGORY_CONFIG[category] || { category: 'top' };

  const params = new URLSearchParams({ apikey: NEWS_API_KEY, language: 'en', ...config });
  const url = `${BASE_URL}?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'success' || !data.results?.length) {
      showPlaceholder('No articles found for this category.');
      return;
    }
    renderNews(data.results);
  } catch (err) {
    showPlaceholder(`Failed to load news: ${err.message}`);
  }
}

function renderNews(articles) {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = '';
  articles.slice(0, 24).forEach(article => {
    const card = document.createElement('a');
    card.className = 'news-card';
    card.href = article.link || '#';
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const source = article.source_id || 'Unknown Source';
    const title  = article.title || 'No title';
    const desc   = article.description ? article.description.slice(0, 160) + '…' : 'No description available.';
    const date   = article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

    card.innerHTML = `
      <div class="news-card-source">${escHtml(source)}</div>
      <div class="news-card-title">${escHtml(title)}</div>
      <div class="news-card-desc">${escHtml(desc)}</div>
      <div class="news-card-date">${date}</div>
    `;
    grid.appendChild(card);
  });
}

function showLoading() {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;margin-bottom:12px;display:block;"></i>Loading articles...</div>';
}

function showPlaceholder(msg) {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = `<div class="news-placeholder"><i class="fas fa-satellite-dish"></i><p>${msg}</p></div>`;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    fetchNews(activeCategory);
  });
});

// Initial load
fetchNews(activeCategory);
