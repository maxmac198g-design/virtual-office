# ViRDOME HQ — Master Reference
*Last updated: March 25, 2026*

---

## 🏢 Virtual Office

**Live URL:** https://maxmac198g-design.github.io/virtual-office/
**Local files:** `/Users/max/Desktop/virtual-office/`
**Repo:** https://github.com/maxmac198g-design/virtual-office

### Files
| File | Purpose |
|------|---------|
| `index.html` | Office layout, rooms, desks, HUD |
| `style.css` | All styling + pixel sprites (box-shadow art) |
| `script.js` | Character data, interactions, animations, notifications |

### To update the live site
```bash
cd /Users/max/Desktop/virtual-office
git add -A
git commit -m "your message"
git push origin main
```
GitHub Pages auto-deploys in ~1 min.

### v2 Features (March 25, 2026)
- ✅ Fullscreen 16:9 — scales to any screen size
- ✅ Scanline cinematic overlay
- ✅ Model badges on every character card
- ✅ James added to the office

---

## 👥 Team Members (6 total)

### 🤖 MAX — AI Chief of Staff
- Role: Main AI assistant / OpenClaw agent
- Model: `anthropic/claude-sonnet-4-6`
- Location: Main Office, Row 1 Left
- Always on, handles everything

### 🎨 MARK — Creative AI Agent
- Role: Image generation, visual content, branding
- Model: `anthropic/claude-sonnet-4-6`
- Location: Main Office, Row 1 Middle
- Freepik integration

### 🔍 JOHN — Senior Analyst
- Role: Business intelligence, Qatar company research
- Model: `google/gemini-pro`
- Location: Main Office, Row 1 Right
- Status toggles busy/online every 35 seconds
- Scripts: `/Users/max/.openclaw/workspace/john_the_analyst.py`
- Log: `/Users/max/.openclaw/workspace/john_analyst_log.txt`

### 👮‍♂️ RON — Security Agent
- Role: Silent system health monitor
- Model: `anthropic/claude-sonnet-4-6`
- Location: Main Office, Row 2 Left
- Schedule: Every 6 hours
- Checks: Disk >80%, RAM <200MB, CPU load >8, zombie processes, gateway health
- Only messages Mohamed if something is wrong (silent otherwise)
- WhatsApp target: +97433134415

### 👩‍💼 AMANDA — Personal Secretary
- Role: Daily morning briefing
- Model: `anthropic/claude-sonnet-4-6`
- Location: Main Office, Row 2 Middle
- Schedule: Every day at **7:00 AM Qatar time (Asia/Qatar)**
- Sends to: WhatsApp +97433134415
- Covers: Prayer times (Doha), daily goals, gym reminder, motivational note
- Prayer log commands: `done fajr`, `done dhuhr`, `done asr`, `done maghrib`, `done isha`
- **Planned:** Full ChatGPT history analysis → `MOHAMED_PROFILE.md` for personalized briefings

### 👨‍💻 JAMES — Senior Developer
- Role: Front-end development, virtual office maintenance
- Model: `openai-codex/gpt-4o`
- Location: Main Office, Row 2 Right
- Stack: HTML · CSS · JS · GitHub Pages
- Spawned as sub-agent for coding tasks
- Latest: Built virtual office v2 (fullscreen 16:9, cinematic style, model badges)

---

## ⚙️ OpenClaw / Max Setup

- **Workspace:** `/Users/max/.openclaw/workspace/`
- **Config:** OpenClaw running on MAX's Mac mini
- **Default model:** `anthropic/claude-sonnet-4-6`
- **WhatsApp account:** default (+97433134415)

### Model routing
| Agent | Model |
|-------|-------|
| Max (main) | `anthropic/claude-sonnet-4-6` (locked) |
| Sub-agents (James etc.) | `openai-codex/gpt-4o` (default) |

### Key workspace files
| File | Purpose |
|------|---------|
| `MEMORY.md` | Long-term memory store |
| `AGENTS.md` | Agent behavior rules |
| `USER.md` | Mohamed's preferences |
| `daily_assistant.py` | Daily tracker logic |
| `john_the_analyst.py` | John's analysis engine |
| `scrape_entities.py` | Qatar entity scraper |

---

## 🛠️ Skills Installed

| Skill | Location | Purpose |
|-------|----------|---------|
| freepik | `skills/freepik/` | AI image generation via Freepik API |
| token-optimizer | `skills/openclaw-token-optimizer/` | Token cost optimization |
| playwright-mcp | `skills/playwright-mcp/` | Browser automation |
| clawring | `skills/clawring/` | Real phone calls |

---

## 📊 John's Analysis — Qatar Research

- **Total companies loaded:** 4,119
- **Deep-analyzed (Gemini AI):** 23
- **Events & Hospitality targets:** 890
- **HIGH FIT companies:** 214
- **Global competitors mapped:** 63
- **Govt entities catalogued:** 118
- **Status:** Blocked — Gemini API free quota exhausted
- **To unlock:** Enable billing at https://aistudio.google.com (~$8–15 for full run)
- **Strategy Sheet:** https://docs.google.com/spreadsheets/d/1nGTKWAeoxjQQmcDYLriQ3e-VLgAvGJBym2pkZSwdK8Q/edit

---

## 📋 Amanda's ChatGPT Profile Plan

To make Amanda smarter and more personalized:

1. Export data from all 3 ChatGPT accounts:
   - chatgpt.com → Settings → Data Controls → Export Data
   - You'll receive a zip with `conversations.json`
   - Drop all 3 zips in `~/Desktop/ChatGPT Exports/`

2. Max builds a Python analysis script that:
   - Parses all 3 conversation files
   - Extracts: topics, preferences, goals, habits, projects, personal facts
   - Outputs `MOHAMED_PROFILE.md` to workspace

3. Amanda's cron job references `MOHAMED_PROFILE.md` for personalized briefings

---

## 🔧 Useful Commands

### Check/manage agents
- Ask Max: "list my cron jobs"
- Pause Ron: Ask Max to disable Ron's cron job
- Pause Amanda: Ask Max to disable Amanda's cron job
- Spawn James: Ask Max "spin up James to [coding task]"

### Prayer & gym tracking
- `done fajr` / `done dhuhr` / `done asr` / `done maghrib` / `done isha`
- `done gym`
- `checkin [weight]` — e.g. `checkin 94.2`

### Google Sheets auth (re-auth when expired)
```bash
gog auth add maxmac198g@gmail.com --services gmail,calendar,drive,contacts,docs,sheets
```

### System cleanup
Ask Max: "do a clean and fix" → runs brew cleanup + pycache removal

### Freepik images
- Saved to: `~/Desktop/Freepik/Images/`
- Trigger: "generate an image of..."

---

## 🏗️ ViRDOME Business Context

- **Company:** ViRDOME — Qatar's #1 immersive studio
- **Focus:** Events, Hospitality, Government Cultural sectors
- **Location:** Doha, Qatar
- **Proof of scale:** Torch Tower Guinness World Record
- **Pipeline:** 890 companies · 214 HIGH FIT targets
- **Strategy doc:** https://docs.google.com/spreadsheets/d/1nGTKWAeoxjQQmcDYLriQ3e-VLgAvGJBym2pkZSwdK8Q/edit
- **Daily tracker sheet:** https://docs.google.com/spreadsheets/d/1tSPg6mABLz9dmc3VW0zl_juiZh66VJCXu7iElQZdB6Y/edit
