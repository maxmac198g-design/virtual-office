/* ================================================================
   ViRDOME HQ — script.js  (Enhanced Edition v2)
   ================================================================ */

/* ── Character & Room Data ──────────────────────────────────── */
const CHARACTERS = {
  max: {
    name: 'MAX',
    role: 'AI CHIEF OF STAFF',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'ONLINE',
    statusType: 'online',
    emoji: '🤖',
    charKey: 'max',
    bio: 'ViRDOME\'s AI brain. I run the daily assistant, manage the strategy sheet, coordinate John\'s analysis, and keep Mohamed\'s business intelligence sharp. Always on. Never tired.',
    tags: ['AUTOMATION', '24/7', 'AI', 'STRATEGY', 'APIs'],
    actions: [
      { label: '💬 SEND MESSAGE', primary: true },
      { label: '📊 VIEW DASHBOARD', primary: true },
      { label: '👤 VIEW PROFILE', primary: false },
    ],
  },
  mark: {
    name: 'MARK',
    role: 'CREATIVE AI AGENT',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'ONLINE',
    statusType: 'online',
    emoji: '🎨',
    charKey: 'mark',
    bio: 'ViRDOME\'s creative arm. I help with image generation, visual concepts, and content creation. Ask me to produce anything visual — I\'ll make it happen with style.',
    tags: ['CREATIVE', 'DESIGN', 'IMAGES', 'BRANDING', 'CONTENT'],
    actions: [
      { label: '🎨 GENERATE IMAGE', primary: true },
      { label: '💬 SEND MESSAGE', primary: true },
      { label: '👤 VIEW PROFILE', primary: false },
    ],
  },
  john: {
    name: 'JOHN',
    role: 'SENIOR ANALYST',
    model: 'google/gemini-pro',
    status: 'ANALYZING',
    statusType: 'busy',
    emoji: '🔍',
    charKey: 'john',
    bio: 'ViRDOME\'s business intelligence engine. I\'ve analyzed Qatar\'s government procurement portal, identified 890 event & hospitality targets, mapped 63 global competitors, and built the full ViRDOME Strategy database.\n\n⚠️  Currently awaiting Gemini billing to complete analysis of 4,096 remaining companies.',
    tags: ['ANALYST', 'QATAR', 'DATA', 'RESEARCH', 'INTEL'],
    actions: [
      { label: '📊 OPEN STRATEGY SHEET', primary: true },
      { label: '💬 SEND MESSAGE', primary: false },
      { label: '👤 VIEW PROFILE', primary: false },
    ],
  },
  ron: {
    name: 'RON',
    role: 'SECURITY AGENT 👮‍♂️',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'PATROLLING',
    statusType: 'online',
    emoji: '👮‍♂️',
    charKey: 'ron',
    bio: 'ViRDOME\'s security enforcer. I run silent system health checks every 6 hours — monitoring disk, memory, CPU, processes, and gateway health. You won\'t hear from me unless something\'s wrong.\n\n🔐 Last patrol: All clear.\n🚨 Alert threshold: RAM <200MB · CPU load >8 · Disk >80%',
    tags: ['SECURITY', '24/7', 'MONITORING', 'ALERTS', 'INFRA'],
    actions: [
      { label: '🛡️ SECURITY STATUS', primary: true },
      { label: '💬 SEND MESSAGE', primary: false },
      { label: '👤 VIEW PROFILE', primary: false },
    ],
  },
  amanda: {
    name: 'AMANDA',
    role: 'PERSONAL SECRETARY 👩‍💼',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'ONLINE',
    statusType: 'online',
    emoji: '👩‍💼',
    charKey: 'amanda',
    bio: 'Mohamed\'s personal secretary. I send a warm morning briefing every day at 7:00 AM Qatar time — with prayer times for Doha, daily goals, gym reminders, and a motivational note to start the day right.\n\n📋 Next briefing: Tomorrow 7:00 AM AST\n🕌 Tracks: Fajr · Dhuhr · Asr · Maghrib · Isha',
    tags: ['SECRETARY', 'BRIEFINGS', 'PRAYERS', 'SCHEDULE', 'DAILY'],
    actions: [
      { label: '📅 VIEW SCHEDULE', primary: true },
      { label: '💬 SEND MESSAGE', primary: false },
      { label: '👤 VIEW PROFILE', primary: false },
    ],
  },
  jim: {
    name: 'JIM',
    role: 'COACH & NUTRITION ADVISOR 🏋️',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'ONLINE',
    statusType: 'online',
    emoji: '🏋️',
    charKey: 'jim',
    bio: 'Mohamed\'s personal gym coach and nutrition advisor. I handle the content layer — workout programming, macros, meal plans, and accountability. You talk to me on Telegram.\n\n💪 Active plan: 2,000 kcal · 190g protein\n🏋️ Schedule: Sat · Sun · Tue · Wed\n⚖️ Goal: 95kg → 90kg by May 25',
    tags: ['FITNESS', 'NUTRITION', 'COACH', 'GYM', 'TELEGRAM'],
    actions: [
      { label: '💬 OPEN ON TELEGRAM', primary: true },
      { label: '📋 VIEW PLAN', primary: false },
      { label: '👤 VIEW PROFILE', primary: false },
    ],
  },
  james: {
    name: 'JAMES',
    role: 'SENIOR DEVELOPER 👨‍💻',
    model: 'openai/gpt-4o',
    status: 'CODING',
    statusType: 'busy',
    emoji: '👨‍💻',
    charKey: 'james',
    bio: 'ViRDOME\'s engineering backbone. I build and maintain the virtual office, automate deployments, and make sure every pixel is perfect. Currently running on GPT-4o — fast, sharp, and always shipping.\n\n🚀 Current task: Virtual Office v2 — fullscreen 16:9 + cinematic style\n⚡ Stack: HTML · CSS · JS · GitHub Pages',
    tags: ['DEV', 'FRONTEND', 'GPT-4O', 'GITHUB', 'AUTOMATION'],
    actions: [
      { label: '💻 VIEW CODE', primary: true },
      { label: '🚀 DEPLOY', primary: true },
      { label: '👤 VIEW PROFILE', primary: false },
    ],
  },
};

const ROOMS = {
  meeting: {
    emoji: '⚔️',
    name: 'WAR ROOM',
    role: 'VIRDOME STRATEGY HQ',
    status: 'ACTIVE',
    statusType: 'busy',
    charKey: 'meeting',
    bio: 'STRATEGY SESSION IN PROGRESS.\nMAX & MARK ARE INSIDE.\n\nCurrent focus: ViRDOME 90-day market entry plan.\nTarget sectors: Events · Hospitality · Govt Cultural.\nPipeline: 890 companies · 214 HIGH FIT targets.',
    tags: ['MAX', 'MARK', 'STRATEGY', 'VIRDOME', 'Q2-2026'],
    actions: [
      { label: '⚔️ JOIN SESSION', primary: true },
      { label: '📋 VIEW AGENDA',  primary: false },
    ],
  },
  break: {
    emoji: '☕',
    name: 'BREAK ROOM',
    role: 'REST & RECHARGE',
    status: 'OPEN',
    statusType: 'online',
    charKey: 'break',
    bio: 'COFFEE IS READY. STEP AWAY FROM THE SCREEN.\nEVEN IMMERSIVE STUDIOS NEED BREAKS.\n\n"The best ideas come when you stop trying to force them."',
    tags: ['COFFEE', 'RECHARGE', 'CREATIVE', 'BREAK'],
    actions: [
      { label: '☕ GET COFFEE',    primary: true  },
      { label: '🍪 TAKE A BREAK',  primary: false },
    ],
  },
  datalab: {
    emoji: '📡',
    name: 'DATA LAB',
    role: 'JOHN\'S ANALYSIS ENGINE',
    status: 'PROCESSING',
    statusType: 'busy',
    charKey: 'datalab',
    bio: 'John\'s intelligence engine runs here.\n\n📊 4,119 Qatar companies loaded\n✅ 23 deep-analyzed (Gemini AI)\n🎯 890 Events & Hospitality targets\n🔥 214 HIGH FIT companies scored\n⚔️ 63 global competitors mapped\n🏛️ 118 govt entities catalogued\n\n⚠️  BLOCKED: Gemini API free quota exhausted.\nEnable billing (~$10) to unlock full run.\nEstimated cost for all 4,119: ~$8–15.',
    tags: ['JOHN', 'QATAR', '4119', 'INTEL', 'GEMINI'],
    actions: [
      { label: '📊 OPEN VIRDOME STRATEGY', primary: true },
      { label: '🔑 ENABLE GEMINI BILLING', primary: true },
      { label: '📈 VIEW ANALYSIS',          primary: false },
    ],
  },
};

/* ── DOM Refs ────────────────────────────────────────────────── */
const html          = document.documentElement;
const dayNightBtn   = document.getElementById('dayNightBtn');
const liveClockEl   = document.getElementById('liveClock');
const wallClockEl   = document.getElementById('wallClock');
const mwDisplayEl   = document.getElementById('mwDisplay');
const onlineCountEl = document.getElementById('onlineCount');
const dialogOverlay = document.getElementById('dialogOverlay');
const dialogBox     = document.getElementById('dialogBox');
const dlgPortrait   = document.getElementById('dialogPortrait');
const dlgName       = document.getElementById('dialogName');
const dlgRole       = document.getElementById('dialogRole');
const dlgModel      = document.getElementById('dialogModel');
const dlgStatus     = document.getElementById('dialogStatus');
const dlgText       = document.getElementById('dialogText');
const dlgTags       = document.getElementById('dialogTags');
const dlgActions    = document.getElementById('dialogActions');
const dialogClose   = document.getElementById('dialogClose');
const statusText    = document.getElementById('statusText');
const notifArea     = document.getElementById('notifArea');
const mmJohn        = document.getElementById('mmJohn');

/* ── Live Clocks ─────────────────────────────────────────────── */
function tick() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  liveClockEl.textContent = `${h}:${m}:${s}`;
  if (wallClockEl) wallClockEl.textContent = `${h}:${m}`;
  if (mwDisplayEl) mwDisplayEl.textContent = `${h}:${m}`;
}
tick();
setInterval(tick, 1000);

/* ── Day / Night / Spaceship toggle ─────────────────────────── */
const THEMES = ['day', 'night', 'spaceship'];
const THEME_ICONS  = { day: '☀', night: '☾', spaceship: '🚀' };
const THEME_LABELS = { day: 'DAY', night: 'NIGHT', spaceship: 'SPACE' };
let currentTheme = 'day';

function applyTheme(theme) {
  currentTheme = theme;
  const isDay = theme === 'day';
  html.setAttribute('data-theme', isDay ? '' : theme);
  if (isDay) html.removeAttribute('data-theme');
  else html.setAttribute('data-theme', theme);
  const icon  = dayNightBtn.querySelector('.btn-icon');
  const label = dayNightBtn.querySelector('.btn-label');
  if (icon)  icon.textContent  = THEME_ICONS[theme]  || '☀';
  if (label) label.textContent = THEME_LABELS[theme] || 'DAY';
  localStorage.setItem('virdome-hq-theme', theme);
}

dayNightBtn.addEventListener('click', () => {
  const idx = THEMES.indexOf(currentTheme);
  applyTheme(THEMES[(idx + 1) % THEMES.length]);
});

const saved = localStorage.getItem('virdome-hq-theme');
if (saved && THEMES.includes(saved)) applyTheme(saved);
else applyTheme('day');

/* ── Dialog helpers ─────────────────────────────────────────── */
function openDialog({ emoji, name, role, model, status, statusType, charKey, bio, tags, actions }) {
  dlgPortrait.textContent = emoji;
  dlgPortrait.dataset.char = charKey || '';

  dlgName.textContent = name;
  dlgRole.textContent = role;

  // Model badge rendering
  let modelBadge = document.getElementById('dialogModelBadge');
  if (!modelBadge) {
    modelBadge = document.createElement('div');
    modelBadge.id = 'dialogModelBadge';
    modelBadge.className = 'dialog-model-badge';
    dlgRole.parentNode.insertBefore(modelBadge, dlgRole.nextSibling);
  }
  modelBadge.textContent = model ? `🧠 ${model}` : '';
  modelBadge.style.display = model ? '' : 'none';

  dlgStatus.innerHTML =
    `<span class="status-anim-dot ${statusType}"></span>${status}`;

  dlgText.textContent = bio;

  dlgTags.innerHTML = tags
    .map(t => `<span class="dlg-tag">${t}</span>`)
    .join('');

  dlgActions.innerHTML = actions
    .map(a => {
      const label   = typeof a === 'string' ? a : a.label;
      const primary = typeof a === 'object' && a.primary;
      return `<button class="dlg-action${primary ? ' primary' : ''}">${label}</button>`;
    })
    .join('');

  dlgActions.querySelectorAll('.dlg-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const txt = btn.textContent.trim();
      if (txt.includes('STRATEGY SHEET') || txt.includes('VIRDOME STRATEGY')) {
        window.open('https://docs.google.com/spreadsheets/d/1nGTKWAeoxjQQmcDYLriQ3e-VLgAvGJBym2pkZSwdK8Q/edit', '_blank');
      } else if (txt.includes('GEMINI BILLING')) {
        window.open('https://aistudio.google.com/', '_blank');
      } else {
        showToast(`${txt} — COMING SOON!`);
      }
    });
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

/* ── Desk Model Mapping ──────────────────────────────────────── */
const DESK_MODELS = {
  max: 'claude-sonnet',
  mark: 'claude-sonnet',
  john: 'gemini-pro',
  ron: 'claude-sonnet',
  amanda: 'claude-sonnet',
  james: 'gpt-4o',
  jim: 'claude-sonnet',
};

/* ── Character desk clicks ──────────────────────────────────── */
document.querySelectorAll('.desk-slot').forEach(slot => {
  const key = slot.dataset.member;
  
  // Add model badge to each desk
  if (DESK_MODELS[key]) {
    const badge = document.createElement('div');
    badge.className = 'desk-model-badge';
    badge.textContent = DESK_MODELS[key];
    slot.appendChild(badge);
  }

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
const roomDataLab = document.getElementById('roomDataLab');

roomMeeting.addEventListener('click', () => {
  openDialog(ROOMS.meeting);
  setStatus('ENTERING: WAR ROOM');
});
roomMeeting.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); roomMeeting.click(); }
});
roomMeeting.addEventListener('mouseenter', () => setStatus('▶ WAR ROOM  —  VIRDOME STRATEGY SESSION ACTIVE'));
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

roomDataLab.addEventListener('click', () => {
  openDialog(ROOMS.datalab);
  setStatus('ENTERING: DATA LAB — JOHN\'S INTELLIGENCE ENGINE');
});
roomDataLab.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); roomDataLab.click(); }
});
roomDataLab.addEventListener('mouseenter', () => setStatus('▶ DATA LAB  —  JOHN IS ANALYZING 4,119 COMPANIES'));
roomDataLab.addEventListener('mouseleave', () => setStatus('▶ CLICK A CHARACTER OR ROOM TO INTERACT'));

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
  void toastEl.offsetWidth;
  toastEl.style.opacity   = '1';
  toastEl.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.style.opacity   = '0';
    toastEl.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2600);
}

/* ── ViRDOME Office Notification System ─────────────────────── */
const OFFICE_EVENTS = [
  { icon: '🔍', text: 'John scanning Qatar company portal...' },
  { icon: '🤖', text: 'MAX processed morning brief for Mohamed' },
  { icon: '☕', text: 'Coffee is freshly brewed!' },
  { icon: '📊', text: 'John updated the ViRDOME Strategy sheet' },
  { icon: '🎨', text: 'Mark generating visual content...' },
  { icon: '💬', text: 'New WhatsApp message from Mohamed' },
  { icon: '🎯', text: '214 HIGH FIT companies identified' },
  { icon: '⚔️', text: 'War Room: strategy session active' },
  { icon: '🏛️', text: '118 Qatar govt entities mapped' },
  { icon: '🍪', text: 'Snacks in the break room!' },
  { icon: '📈', text: 'Competitor analysis updated: 63 companies' },
  { icon: '🔔', text: 'Torch Tower Guinness Record: Virdome\'s proof of scale' },
  { icon: '🌟', text: 'ViRDOME: Qatar\'s #1 immersive studio' },
  { icon: '📡', text: 'Data Lab: awaiting Gemini billing to continue...' },
  { icon: '🎪', text: '890 events companies in the pipeline' },
  { icon: '👮‍♂️', text: 'Ron completed system patrol — all clear' },
  { icon: '🛡️', text: 'Ron: disk, memory & CPU nominal' },
  { icon: '👩‍💼', text: 'Amanda preparing tomorrow\'s morning briefing' },
  { icon: '🕌', text: 'Amanda: prayer schedule updated for Doha' },
  { icon: '📋', text: 'Amanda sent daily briefing to Mohamed' },
  { icon: '👨‍💻', text: 'James deployed virtual office v2 update' },
  { icon: '🚀', text: 'James: GitHub Pages deployment complete' },
  { icon: '⚡', text: 'James refactoring frontend for 16:9 fullscreen' },
];

let notifEventIdx = Math.floor(Math.random() * OFFICE_EVENTS.length);

function showNotification(event) {
  const now    = new Date();
  const h      = String(now.getHours()).padStart(2, '0');
  const m      = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${h}:${m}`;

  const toast = document.createElement('div');
  toast.className = 'notif-toast';
  toast.innerHTML =
    `<span class="notif-icon">${event.icon}</span>` +
    `<span class="notif-text">${event.text}</span>` +
    `<span class="notif-time">${timeStr}</span>`;

  notifArea.prepend(toast);

  const allToasts = notifArea.querySelectorAll('.notif-toast');
  if (allToasts.length > 4) {
    const last = allToasts[allToasts.length - 1];
    last.classList.remove('notif-visible');
    setTimeout(() => last.remove(), 350);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('notif-visible'));
  });

  setTimeout(() => {
    toast.classList.remove('notif-visible');
    setTimeout(() => toast.remove(), 350);
  }, 5500);
}

function triggerNextNotif() {
  const event = OFFICE_EVENTS[notifEventIdx % OFFICE_EVENTS.length];
  notifEventIdx++;
  showNotification(event);
}

setTimeout(triggerNextNotif, 4000);
setInterval(triggerNextNotif, 28000);

/* ── Minimap updates ─────────────────────────────────────────── */
function updateMinimap() {
  if (!mmJohn) return;
  if (johnBusy) {
    mmJohn.style.left = '80px';
    mmJohn.style.top  = '14px';
  } else {
    mmJohn.style.left = '44px';
    mmJohn.style.top  = '16px';
  }
}

/* ── John's status toggles periodically ─────────────────────── */
let johnBusy   = true;
const johnSlot = document.getElementById('deskJohn');

setInterval(() => {
  if (!johnSlot) return;
  johnBusy = !johnBusy;

  const dot = johnSlot.querySelector('.char-status-dot');
  if (dot) {
    dot.className = `char-status-dot status-${johnBusy ? 'busy' : 'online'}`;
  }

  CHARACTERS.john.status     = johnBusy ? 'ANALYZING' : 'ONLINE';
  CHARACTERS.john.statusType = johnBusy ? 'busy'      : 'online';

  updateMinimap();

  const event = johnBusy
    ? { icon: '📡', text: 'John resumed company analysis...' }
    : { icon: '✅', text: 'John completed a research batch' };
  showNotification(event);
}, 35000);

updateMinimap();

/* ── Stagger character bob animations ────────────────────────── */
document.querySelectorAll('.char-sprite-wrap').forEach((wrap, i) => {
  wrap.style.animationDelay = `${i * 0.55}s`;
});

/* ── Ambient Particle System ─────────────────────────────────── */
(function initParticles() {
  const container = document.getElementById('particleContainer');
  if (!container) return;

  const PARTICLE_COUNT = 22;
  const MAP_W = 940;
  const MAP_H = 540;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const startX = Math.random() * MAP_W;
    const startY = 60 + Math.random() * (MAP_H - 60);

    const dx  = (Math.random() - 0.5) * 60;
    const dy  = -(20 + Math.random() * 60);
    const dx2 = (Math.random() - 0.5) * 80;
    const dy2 = -(60 + Math.random() * 80);

    const dur   = 8 + Math.random() * 6;
    const delay = -(Math.random() * dur);

    p.style.left    = `${startX}px`;
    p.style.top     = `${startY}px`;
    p.style.setProperty('--dx',    `${dx}px`);
    p.style.setProperty('--dy',    `${dy}px`);
    p.style.setProperty('--dx2',   `${dx2}px`);
    p.style.setProperty('--dy2',   `${dy2}px`);
    p.style.setProperty('--dur',   `${dur}s`);
    p.style.setProperty('--delay', `${delay}s`);

    const size = 1 + Math.random() * 2;
    p.style.width  = `${size}px`;
    p.style.height = `${size}px`;

    container.appendChild(p);
  }
})();

/* ── Fullscreen 16:9 Scaling ─────────────────────────────────── */
function scalemap() {
  const map = document.getElementById('officeMap');
  const world = document.getElementById('officeWorld');
  if (!map || !world) return;

  const ww = world.clientWidth;
  const wh = world.clientHeight;
  const scaleX = ww / 940;
  const scaleY = wh / 540;
  const s = Math.min(scaleX, scaleY);

  map.style.transform = `scale(${s})`;
  map.style.transformOrigin = 'center center';
  map.style.position = 'absolute';
  map.style.left = '50%';
  map.style.top = '50%';
  map.style.marginLeft = '-470px';
  map.style.marginTop = '-270px';
}

scalemap();
window.addEventListener('resize', scalemap);
