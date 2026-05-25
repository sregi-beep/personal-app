// -------------------------------------------------------
// TASKS.JS — Persistent tasks & notes via localStorage
// -------------------------------------------------------

const STORAGE_KEY  = 'steveapp_tasks';
const NOTES_KEY    = 'steveapp_quicknote';

let tasks  = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let filter = 'all';

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function escH(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function priorityBadge(p) {
  if (p === 'high') return '<span class="badge badge-high">High</span>';
  if (p === 'low')  return '<span class="badge badge-low">Low</span>';
  return '';
}

function tagLabel(t) {
  const map = { general:'📌 General', school:'🎓 School', work:'💼 Work', personal:'💪 Personal', finance:'💰 Finance', research:'🔬 Research' };
  return map[t] || t;
}

function renderTasks() {
  const list = document.getElementById('task-list');
  if (!list) return;

  let visible = tasks.filter(t => {
    if (filter === 'pending')   return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  // Sort: high priority first, then by date
  visible.sort((a, b) => {
    if (!a.done && b.done) return -1;
    if (a.done && !b.done) return 1;
    const po = { high: 0, normal: 1, low: 2 };
    if (po[a.priority] !== po[b.priority]) return po[a.priority] - po[b.priority];
    return b.createdAt - a.createdAt;
  });

  const pending   = tasks.filter(t => !t.done).length;
  const completed = tasks.filter(t => t.done).length;
  const countEl   = document.getElementById('task-count');
  if (countEl) countEl.textContent = `${pending} pending · ${completed} done`;

  if (!visible.length) {
    list.innerHTML = `<div class="task-empty"><i class="fas fa-clipboard"></i><p>${filter === 'completed' ? 'No completed tasks yet.' : 'No tasks yet. Add something above!'}</p></div>`;
    return;
  }

  list.innerHTML = '';
  visible.forEach(task => {
    const item = document.createElement('div');
    item.className = `task-item${task.done ? ' task-done' : ''}${task.priority === 'high' ? ' task-high' : ''}`;
    item.dataset.id = task.id;
    item.innerHTML = `
      <div class="task-left">
        <button class="task-check" data-id="${task.id}" title="${task.done ? 'Mark pending' : 'Mark done'}">
          <i class="fas ${task.done ? 'fa-check-circle' : 'fa-circle'}"></i>
        </button>
        <div class="task-body">
          <div class="task-title-row">
            <span class="task-title-text">${escH(task.title)}</span>
            ${priorityBadge(task.priority)}
            <span class="badge badge-tag">${escH(tagLabel(task.tag))}</span>
          </div>
          ${task.note ? `<div class="task-note-text">${escH(task.note)}</div>` : ''}
          <div class="task-meta">${formatDate(task.createdAt)}</div>
        </div>
      </div>
      <button class="task-delete" data-id="${task.id}" title="Delete"><i class="fas fa-xmark"></i></button>`;
    list.appendChild(item);
  });

  // Check buttons
  list.querySelectorAll('.task-check').forEach(btn => {
    btn.addEventListener('click', () => toggleTask(btn.dataset.id));
  });
  list.querySelectorAll('.task-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteTask(btn.dataset.id));
  });
}

function addTask() {
  const titleEl    = document.getElementById('task-title');
  const noteEl     = document.getElementById('task-note');
  const priorityEl = document.getElementById('task-priority');
  const tagEl      = document.getElementById('task-tag');
  const title = titleEl.value.trim();
  if (!title) { titleEl.focus(); return; }
  tasks.unshift({
    id:        genId(),
    title,
    note:      noteEl.value.trim(),
    priority:  priorityEl.value,
    tag:       tagEl.value,
    done:      false,
    createdAt: Date.now(),
  });
  titleEl.value  = '';
  noteEl.value   = '';
  priorityEl.value = 'normal';
  tagEl.value    = 'general';
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = !t.done; saveTasks(); renderTasks(); }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  renderTasks();
}

// ---- ADD BUTTON ----
const addBtn = document.getElementById('task-add-btn');
if (addBtn) addBtn.addEventListener('click', addTask);
const titleInput = document.getElementById('task-title');
if (titleInput) titleInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

// ---- FILTERS ----
document.querySelectorAll('.tf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderTasks();
  });
});

// ---- CLEAR COMPLETED ----
const clearBtn = document.getElementById('clear-completed-btn');
if (clearBtn) clearBtn.addEventListener('click', clearCompleted);

// ---- QUICK NOTES ----
const notePad  = document.getElementById('quick-note-pad');
const saveNote = document.getElementById('note-save-btn');
if (notePad) {
  notePad.value = localStorage.getItem(NOTES_KEY) || '';
  notePad.addEventListener('input', () => localStorage.setItem(NOTES_KEY, notePad.value));
}
if (saveNote) {
  saveNote.addEventListener('click', () => {
    localStorage.setItem(NOTES_KEY, notePad.value);
    saveNote.innerHTML = '<i class="fas fa-check"></i> Saved!';
    setTimeout(() => saveNote.innerHTML = '<i class="fas fa-floppy-disk"></i> Save', 1500);
  });
}

// ---- INITIAL RENDER ----
renderTasks();
