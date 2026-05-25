# Steve's Personal App

A clean personal dashboard, news reader, and markets tracker.

## Pages
- **Dashboard** (`index.html`) — Time-based greeting + daily fun fact
- **News** (`news.html`) — Live news by category (World, Finance, Politics, Tech, India, USA, War & Conflict, Economics)
- **Markets** (`markets.html`) — Live stock quotes, forex rates, and market news

## API Keys Needed

| File | API | Free Key |
|------|-----|----------|
| `news.js` | NewsData.io (primary) | https://newsdata.io/register |
| `news.js` | GNews (fallback) | https://gnews.io |
| `markets.js` | Finnhub (stocks + forex) | https://finnhub.io/register |

## Setup
1. Register for free keys at the links above
2. Open each file and paste your key into the `const ... = ''` line at the top
3. Deploy via GitHub Pages

## Deploy on GitHub Pages
1. Go to repo **Settings → Pages**
2. Set source to **Deploy from a branch → main → / (root)**
3. Save — your site will be live at `https://sregi-beep.github.io/personal-app/`
