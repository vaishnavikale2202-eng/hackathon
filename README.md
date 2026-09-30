# 💥 TaskBlaster 3000 — Deliberately Terrible UI/UX Challenge

> **Goal**: An intentionally anti-UX, cluttered, ugly, inconsistent, and frustrating task-management web application that remains 100% technically functional. Designed specifically for hackathon UI/UX redesign practice.

---

## 🚀 Running the Project

The server is currently running at:
**[http://localhost:3000/](http://localhost:3000/)**

To run manually at any time:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in any web browser.

---

## 🎨 Intentional Anti-Design Features Catalog

| Anti-UX Principle | Implementation in TaskBlaster |
|---|---|
| **1. Clashing Colors** | Neon magenta (`#ff0055`), lime green (`#39ff14`), cyan (`#00ffff`), purple (`#bf00ff`), yellow (`#ffff00`), orange (`#ff6600`), and conic/radial gradients. |
| **2. Typographic Chaos** | 6+ mismatched font families (Comic Sans, Papyrus, Impact, Press Start 2P, Times New Roman, Courier New) with conflicting font sizes (9px to 32px) and weights. |
| **3. Deceptive Navigation** | Cryptic labels: *"Dashboard?"*, *"DO THING"*, *"Stuff"*, *"Maybe Settings"*, *"Important 💥"*, and *"Click Me 🎲"* with misleading notification badges (`99+`, `-3`, `NEW!`, `?`). |
| **4. Overcrowded Dashboard** | 10+ misaligned cards: Total Tasks, Completed Tasks, Failed Tasks, Quantum Productivity Score, Fake SVG Analytics, Misaligned Calendar (starts on Wednesday!), Weather Widget, Demotivational Quotes, and a RAM Downloader. |
| **5. Inconsistent Buttons** | Mismatched shapes (circles, pills, sharp rectangles, asymmetric border radii), sizes (microscopic to giant), and confusing labels (*"DO IT"*, *"DO NOT"*, *"PROCEED?"*, *"Save-ish"*, *"ABORT"*). |
| **6. Chaotic Task List** | Alternating staggered cards, inverted checkboxes (skull 💀 / warning ⚠️ when pending, green check ✅ when complete), cryptic priorities (*SPICY*, *ULTRA-MID*, *CODE PURPLE*, *DEFCON 2*), and unnecessary action buttons (*Duplicate x7*, *Discombobulate*). |
| **7. Multi-Tier Annoying Modals** | 3-stage delete confirmation sequence (Step 1 Warning ➡️ Step 2 Existential Dread ➡️ Step 3 Type 'DELETE' to confirm) that still successfully deletes the task! |
| **8. Disorienting Layout** | Uneven padding (80px bottom, 15px right), tilted cards (-0.8° to +1.2°), and a giant `"[RESERVED FOR FUTURE THOUGHT]"` awkward empty void. |
| **9. Visual Overload** | Blinking text, jiggling warning badges, spinning icons, marquee header, and brutalist drop shadows. |
| **10. 100% Functional** | Full task CRUD (Add, Edit, Delete, Toggle Complete), real-time live search & filtering, persistent `localStorage`, audio synthesizer effects, and factory reset. |

---

## 🛠️ File Structure

- `index.html` — Master layout shell & top marquee strip
- `styles/main.css` — Clashing variables, chaotic animations, and global typography
- `styles/components.css` — Inconsistent buttons, cards, modals, and task items
- `js/app.js` — Application controller, view routing, and settings view
- `js/state.js` — State management, `localStorage` persistence, and task operations
- `js/components/audio.js` — 8-bit Web Audio synthesizer for retro sounds
- `js/components/navbar.js` — Confusing sidebar navigation
- `js/components/dashboard.js` — Overcrowded dashboard view
- `js/components/taskList.js` — Chaotic task manager list
- `js/components/modals.js` — 3-tier deletion modal, task editor modal, and toast alerts
