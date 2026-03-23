/* ================================================================
   PIXEL HQ — script.js
   ================================================================ */

/* ── Character & Room Data ──────────────────────────────────── */
const CHARACTERS = {
  max: {
    name: 'MAX',
    role: 'AI ASSISTANT',
    status: 'ONLINE',
    statusType: 'online',
    emoji: '🤖',
    bio: 'Always available, never on vacation. I handle the repetitive stuff so the humans can focus on the big ideas.',
    tags: ['AUTOMATION', '24/7', 'AI'],
    actions: ['💬 MESSAGE', '📅 SCHEDULE', '👤 PROFILE'],
  },
  mark: {
    name: 'MARK',
    role: 'TEAM MEMBER',
    status: 'ONLINE',
    statusType: 'online',
    emoji: '👨‍💼',
    bio: 'Problem-solver with a knack for turning complex challenges into elegant solutions. Fueled by coffee and curiosity.',
    tags: ['STRATEGY', 'DESIGN', 'COFFEE'],
    actions: ['💬 MESSAGE', '📅 SCHEDULE', '👤 PROFILE'],
  },
  john: {
    name: 'JOHN',
    role: 'TEAM MEMBER',
    status: 'IN MEETING',
    statusType: 'busy',
    emoji: '👨‍💻',
    bio: 'Builder at heart. If it can be shipped, John will ship it. Clean code and even cleaner docs.',
    tags: ['ENGINEERING', 'DEVOPS', 'DOCS'],
    actions: ['💬 MESSAGE', '📅 SCHEDULE', '👤 PROFILE'],
  },
};

const ROOMS = {
  meeting: {
    emoji: '🚀',
    name: 'MEETING ROOM',
    role: 'CONFERENCE ROOM A',
    status: 'OCCUPIED',
    statusType: 'busy',
    bio: 'LAUNCH PAD MEETING IN PROGRESS.\nMAX AND MARK ARE INSIDE.\nJOIN TO COLLABORATE.',
    tags: ['MAX', 'MARK', 'ACTIVE'],
    actions: ['🚀 JOIN ROOM', '📋 VIEW AGENDA'],
  },
  break: {
    emoji: '☕',
    name: 'BREAK ROOM',
    role: 'REST & RECHARGE',
    status: 'OPEN',
    statusType: 'online',
    bio: 'COFFEE IS READY. STEP AWAY FROM THE SCREEN.\nYOU DESERVE A BREAK.',
    tags: ['COFFEE', 'SNACKS', 'RELAX'],
    actions: ['☕ GET COFFEE', '🍪 TAKE A BREAK'],
  },
};

/* ── DOM Refs ────────────────────────────────────────────────── */
const html          = document.documentElement;
const dayNightBtn   = document.getElementById('dayNightBtn');
const liveClockEl   = document.getElementById('liveClock');
const onlineCountEl = document.getElementById('onlineCount');
const dialogOverlay = document.getElementById('dialogOverlay');
const dialogBox     = document.getElementById('dialogBox');
const dlgPortrait   = document.getElementById('dialogPortrait');
const dlgName       = document.getElementById('dialogName');
const dlgRole       = document.getElementById('dialogRole');
const dlgStatus     = document.getElementById('dialogStatus');
const dlgText       = document.getElementById('dialogText');
const dlgTags       = document.getElementById('dialogTags');
const dlgActions    = document.getElementById('dialogActions');
const dialogClose   = document.getElementById('dialogClose');
const statusText    = document.getElementById('statusText');

/* ── Live Clock ─────────────────────────────────────────────── */
function tick() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  liveClockEl.textContent = `${h}:${m}:${s}`;
}
tick();
setInterval(tick, 1000);

/* ── Day / Night toggle ─────────────────────────────────────── */
let isDay = true;

function applyTheme(day) {
  isDay = day;
  html.setAttribute('data-theme', day ? 'day' : 'night');
  const icon  = dayNightBtn.querySelector('.btn-icon');
  const label = dayNightBtn.querySelector('.btn-label');
  if (icon)  icon.textContent  = day ? '☀' : '☾';
  if (label) label.textContent = day ? 'DAY' : 'NIGHT';
  localStorage.setItem('pixel-hq-theme', day ? 'day' : 'night');
}

dayNightBtn.addEventListener('click', () => applyTheme(!isDay));

// Restore saved preference
const saved = localStorage.getItem('pixel-hq-theme');
if (saved === 'night') applyTheme(false);

/* ── Dialog helpers ─────────────────────────────────────────── */
function openDialog({ emoji, name, role, status, statusType, bio, tags, actions }) {
  dlgPortrait.textContent = emoji;
  dlgName.textContent     = name;
  dlgRole.textContent     = role;
  dlgStatus.textContent   = '● ' + status;
  dlgStatus.className     = `dialog-status ${statusType}`;
  dlgText.textContent     = bio;

  dlgTags.innerHTML = tags
    .map(t => `<span class="dlg-tag">${t}</span>`)
    .join('');

  dlgActions.innerHTML = actions
    .map(a => `<button class="dlg-action">${a}</button>`)
    .join('');

  dlgActions.querySelectorAll('.dlg-action').forEach(btn => {
    btn.addEventListener('click', () => showToast(`${btn.textContent} — COMING SOON!`));
  });

  dialogOverlay.removeAttribute('hidden');
  dialogBox.focus();
}

function closeDialog() {
  dialogOverlay.setAttribute('hidden', '');
  setStatus('▶ CLICK A CHARACTER OR ROOM TO INTERACT');
}

dialogClose.addEventListener('click', closeDialog);
dialogOverlay.addEventListener('click', e => {
  if (e.target === dialogOverlay) closeDialog();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDialog();
});

/* ── Character desk clicks ──────────────────────────────────── */
document.querySelectorAll('.desk-slot').forEach(slot => {
  const key = slot.dataset.member;

  slot.addEventListener('click', () => {
    const d = CHARACTERS[key];
    if (!d) return;
    openDialog(d);
    setStatus(`VIEWING: ${d.name} — ${d.role}`);
  });

  slot.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      slot.click();
    }
  });

  slot.addEventListener('mouseenter', () => {
    const d = CHARACTERS[key];
    if (d) setStatus(`▶ ${d.name}  [${d.status}]  —  CLICK TO VIEW PROFILE`);
  });

  slot.addEventListener('mouseleave', () => {
    setStatus('▶ CLICK A CHARACTER OR ROOM TO INTERACT');
  });
});

/* ── Room clicks ─────────────────────────────────────────────── */
const roomMeeting = document.getElementById('roomMeeting');
const roomBreak   = document.getElementById('roomBreak');

roomMeeting.addEventListener('click', () => {
  openDialog(ROOMS.meeting);
  setStatus('ENTERING: MEETING ROOM');
});
roomMeeting.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); roomMeeting.click(); }
});
roomMeeting.addEventListener('mouseenter', () => setStatus('▶ MEETING ROOM  —  2 MEMBERS INSIDE'));
roomMeeting.addEventListener('mouseleave', () => setStatus('▶ CLICK A CHARACTER OR ROOM TO INTERACT'));

roomBreak.addEventListener('click', () => {
  openDialog(ROOMS.break);
  setStatus('ENTERING: BREAK ROOM');
});
roomBreak.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); roomBreak.click(); }
});
roomBreak.addEventListener('mouseenter', () => setStatus('▶ BREAK ROOM  —  COFFEE IS READY'));
roomBreak.addEventListener('mouseleave', () => setStatus('▶ CLICK A CHARACTER OR ROOM TO INTERACT'));

/* ── Status bar helper ──────────────────────────────────────── */
function setStatus(msg) {
  statusText.textContent = msg;
}

/* ── Toast notification ─────────────────────────────────────── */
let toastEl    = null;
let toastTimer = null;

function showToast(message) {
  if (!toastEl) {
    toastEl    = document.createElement('div');
    toastEl.id = 'pixelToast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  void toastEl.offsetWidth; // force reflow
  toastEl.style.opacity   = '1';
  toastEl.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.style.opacity   = '0';
    toastEl.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2600);
}

/* ── Mobile map scaling ─────────────────────────────────────── */
function scalemap() {
  const map   = document.getElementById('officeMap');
  const world = document.getElementById('officeWorld');
  if (!map || !world) return;

  const ww = world.clientWidth;
  const wh = world.clientHeight;

  if (ww < 960 || wh < 540) {
    const s = Math.min((ww / 960), (wh / 540)) * 0.97;
    map.style.transform       = `scale(${s})`;
    map.style.transformOrigin = 'center center';
  } else {
    map.style.transform       = '';
    map.style.transformOrigin = '';
  }
}

scalemap();
window.addEventListener('resize', scalemap);

/* ── John's status toggles periodically ─────────────────────── */
let johnBusy  = true;
const johnSlot = document.getElementById('deskJohn');

setInterval(() => {
  if (!johnSlot) return;
  johnBusy = !johnBusy;
  const dot = johnSlot.querySelector('.char-status-dot');
  if (dot) {
    dot.className = `char-status-dot status-${johnBusy ? 'busy' : 'online'}`;
  }
  CHARACTERS.john.status     = johnBusy ? 'IN MEETING' : 'ONLINE';
  CHARACTERS.john.statusType = johnBusy ? 'busy'       : 'online';
}, 30000);

/* ── Stagger character bob animations so they're not in sync ── */
document.querySelectorAll('.char-sprite-wrap').forEach((wrap, i) => {
  wrap.style.animationDelay = `${i * 0.55}s`;
});
