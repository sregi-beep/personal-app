// ---- CLOCK ----
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  const el = document.getElementById('sidebar-clock');
  if (el) el.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ---- GREETING ----
function setGreeting() {
  const hour = new Date().getHours();
  let greeting, icon;
  if (hour >= 5 && hour < 12)       { greeting = 'Good Morning, Steve'; icon = '🌅'; }
  else if (hour >= 12 && hour < 17) { greeting = 'Good Afternoon, Steve'; icon = '☀️'; }
  else if (hour >= 17 && hour < 21) { greeting = 'Good Evening, Steve'; icon = '🌆'; }
  else                               { greeting = 'Good Night, Steve'; icon = '🌙'; }
  const gtEl = document.getElementById('greeting-text');
  const giEl = document.getElementById('greeting-icon');
  if (gtEl) gtEl.textContent = greeting;
  if (giEl) giEl.textContent = icon;
  const dateEl = document.getElementById('greeting-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
setGreeting();

// ---- FACTS ----
const facts = [
  "A group of flamingos is called a 'flamboyance'.",
  "Honey never spoils — archaeologists found 3,000-year-old honey in Egyptian tombs and it was still edible.",
  "Crows can recognize and remember human faces, and will hold grudges.",
  "The Eiffel Tower can be 15 cm taller in summer due to thermal expansion.",
  "A day on Venus is longer than a year on Venus.",
  "Bananas are technically berries, but strawberries are not.",
  "Octopuses have three hearts, blue blood, and their arms have minds of their own.",
  "There are more possible iterations of a chess game than atoms in the observable universe.",
  "The shortest war in history lasted 38–45 minutes (Anglo-Zanzibar War, 1896).",
  "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
  "A 'jiffy' is an actual unit of time — 1/100th of a second.",
  "Water can boil and freeze at the same time under specific pressure (triple point).",
  "Humans share about 60% of their DNA with bananas.",
  "The sun makes up about 99.86% of the total mass of our solar system.",
  "The total weight of all ants on Earth roughly equals the total weight of all humans.",
  "Oxford University is older than the Aztec Empire.",
  "A bolt of lightning contains enough energy to toast 100,000 slices of bread.",
  "Sharks are older than trees — they've existed for over 400 million years.",
  "The average person walks the equivalent of 3 times around the Earth in a lifetime.",
  "Typewriter is the longest word you can type using only the top row of a keyboard.",
  "Your brain generates about 20 watts of power — enough to power a dim light bulb.",
  "The fingerprints of a koala are so similar to humans that they've confused crime scene investigators.",
  "A snail can sleep for 3 years.",
  "It rains diamonds on Neptune and Uranus.",
  "The total surface area of a human lung is roughly the size of a tennis court."
];

let lastFactIndex = -1;

function getDailyFact() {
  const day = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < day.length; i++) hash = (hash * 31 + day.charCodeAt(i)) % facts.length;
  return hash;
}

function showFact(index) {
  const el = document.getElementById('fact-text');
  if (!el) return;
  el.style.opacity = 0;
  setTimeout(() => { el.textContent = facts[index]; el.style.transition='opacity 0.4s'; el.style.opacity=1; }, 200);
}

const initialIndex = getDailyFact();
lastFactIndex = initialIndex;
const factEl = document.getElementById('fact-text');
if (factEl) factEl.textContent = facts[initialIndex];

const refreshBtn = document.getElementById('fact-refresh');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    let next;
    do { next = Math.floor(Math.random() * facts.length); } while (next === lastFactIndex);
    lastFactIndex = next;
    showFact(next);
  });
}

// ---- HELPERS ----
function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- DASHBOARD TASK WIDGET ----
const STORAGE_KEY = 'steveapp_tasks';

function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderDashTasks() {
  const pendingEl   = document.getElementById('dash-task-list');
  const completedEl = document.getElementById('dash-done-list');
  if (!pendingEl) return;

  const tasks   = getTasks();
  const pending = tasks.filter(t => !t.done)
    .sort((a,b) => { const po={high:0,normal:1,low:2}; return po[a.priority]-po[b.priority]||b.createdAt-a.createdAt; });
  const done    = tasks.filter(t => t.done).slice(0,4);

  if (!pending.length) {
    pendingEl.innerHTML = `<div class="dash-task-empty"><i class="fas fa-check-circle"></i> All caught up! <a href="tasks.html">Add a task</a></div>`;
  } else {
    pendingEl.innerHTML = pending.map(t => `
      <div class="dash-task-item${t.priority==='high'?' dash-task-high':''}" data-id="${escHtml(t.id)}">
        <button class="dash-check-btn" data-id="${escHtml(t.id)}" title="Mark done"><i class="fas fa-circle"></i></button>
        <span class="dash-task-title">${escHtml(t.title)}</span>
        ${t.priority==='high'?'<span class="badge badge-high">High</span>':''}
      </div>`).join('');
  }

  if (completedEl) {
    if (!done.length) {
      completedEl.innerHTML = `<div class="dash-task-empty"><i class="fas fa-circle"></i> Nothing completed yet.</div>`;
    } else {
      completedEl.innerHTML = done.map(t => `
        <div class="dash-task-item dash-task-done">
          <i class="fas fa-check-circle" style="color:var(--green);font-size:0.7rem"></i>
          <span class="dash-task-title">${escHtml(t.title)}</span>
        </div>`).join('');
    }
  }

  // Check-off buttons
  document.querySelectorAll('.dash-check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tasks = getTasks();
      const t = tasks.find(t => t.id === btn.dataset.id);
      if (t) { t.done = true; saveTasks(tasks); renderDashTasks(); }
    });
  });
}

// Quick add from dashboard
const dashInput  = document.getElementById('dash-task-input');
const dashAddBtn = document.getElementById('dash-task-add');

function dashAddTask() {
  if (!dashInput) return;
  const title = dashInput.value.trim();
  if (!title) return;
  const tasks = getTasks();
  tasks.unshift({ id: Date.now().toString(36)+Math.random().toString(36).slice(2), title, note:'', priority:'normal', tag:'general', done:false, createdAt:Date.now() });
  saveTasks(tasks);
  dashInput.value = '';
  renderDashTasks();
}

if (dashAddBtn) dashAddBtn.addEventListener('click', dashAddTask);
if (dashInput)  dashInput.addEventListener('keydown', e => { if (e.key==='Enter') dashAddTask(); });

renderDashTasks();
