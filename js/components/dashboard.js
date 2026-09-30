/**
 * TaskBlaster Dashboard Component
 * Overcrowded, visually chaotic dashboard violating all hierarchy principles
 */

class DashboardComponent {
  constructor(store, sound) {
    this.store = store;
    this.sound = sound;
    this.quotes = [
      { text: '"If at first you don\'t succeed, blame caching."', author: 'Anonymous Senior Dev' },
      { text: '"It worked on my machine, so ship my machine to prod."', author: 'Docker Philosopher' },
      { text: '"Procrastination is just storing potential energy in Jira."', author: 'Physics of Laziness' },
      { text: '"There are 2 hard things: cache invalidation, naming things, and off-by-one errors."', author: 'Math Professor' },
      { text: '"Never write in 1 line of CSS what you could over-engineer in 500 lines of Javascript."', author: 'Modern Frontend Guru' }
    ];
    this.quoteIndex = 0;
    this.ramDownloaded = 142; // Starts already over 100%!
  }

  render(container) {
    const stats = this.store.getStats();
    const currentQuote = this.quotes[this.quoteIndex];

    container.innerHTML = `
      <!-- Top Demotivational Banner -->
      <div class="chaos-card card-quote">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-family: var(--font-pixel); font-size: 11px; background: #000; color: #ffff00; padding: 2px 6px;">
            📢 DEMOTIVATIONAL DISPATCH
          </span>
          <button id="btn-next-quote" class="btn-chaos btn-style-micro-gray">GET WORSE ADVICE</button>
        </div>
        <div class="quote-text">${currentQuote.text}</div>
        <div class="quote-author">— ${currentQuote.author}</div>
      </div>

      <div class="dashboard-grid">
        <!-- Card 1: Total Tasks -->
        <div class="chaos-card card-stats-1">
          <div class="card-header-chaos">
            <span class="card-title-chaos">TOTAL TASKS</span>
            <span class="jiggle-element" style="font-size: 22px;">📋</span>
          </div>
          <div class="stat-value-huge">${stats.total}</div>
          <div class="stat-label-tiny">Total items cluttering your subconscious</div>
          <div style="margin-top: 10px;">
            <button id="btn-dash-add-task" class="btn-chaos btn-style-weird-magenta" style="font-size: 11px; padding: 4px 10px;">
              + DO THING
            </button>
          </div>
        </div>

        <!-- Card 2: Completed Tasks -->
        <div class="chaos-card card-stats-2">
          <div class="card-header-chaos">
            <span class="card-title-chaos">DONE-ISH</span>
            <span style="font-size: 22px;">🎉</span>
          </div>
          <div class="stat-value-huge" style="color: #ffff00;">${stats.completed}</div>
          <div class="stat-label-tiny">Tasks marked as "good enough for now"</div>
          <div class="clash-separator-zigzag"></div>
          <button id="btn-dash-filter-done" class="btn-chaos btn-style-micro-gray">INSPECT LOSSES</button>
        </div>

        <!-- Card 3: Failed Tasks -->
        <div class="chaos-card card-stats-3">
          <div class="card-header-chaos">
            <span class="card-title-chaos">FAILED TASKS</span>
            <span class="blink-fast" style="font-size: 22px;">💥</span>
          </div>
          <div class="stat-value-huge" style="color: #ff0055;">${stats.failed}</div>
          <div class="stat-label-tiny">Critically neglected or cursed</div>
          <button id="btn-dash-panic" class="btn-chaos btn-style-danger-nuke" style="font-size: 11px; padding: 4px 8px; margin-top: 8px;">
            PANIC!
          </button>
        </div>

        <!-- Card 4: Productivity Score -->
        <div class="chaos-card card-stats-4">
          <div class="card-header-chaos">
            <span class="card-title-chaos">PRODUCTIVITY</span>
            <span class="spin-endless" style="font-size: 20px;">🌀</span>
          </div>
          <div class="stat-value-huge" style="font-size: 19px; color: #00ffff;">${stats.productivityScore}</div>
          <div class="stat-label-tiny">Calculated using random quantum vibrations</div>
          <div style="font-family: var(--font-courier); font-size: 10px; color: #ffff00; margin-top: 4px;">
            Entropy: ${stats.entropyIndex} | Synergy: ${stats.synergyQuotient}
          </div>
        </div>

        <!-- Card 5: Fake Analytics SVG Chart -->
        <div class="chaos-card card-analytics">
          <div class="card-header-chaos">
            <span class="card-title-chaos">📊 ADVANCED PSYCHEDELIC ANALYTICS</span>
            <button id="btn-chart-recompute" class="btn-chaos btn-style-circle">RE-ROLL</button>
          </div>
          <div style="font-family: var(--font-comic); font-size: 11px; color: #ff00ff; margin-bottom: 6px;">
            Y-Axis: Existential Dread vs X-Axis: Days Until Deadline
          </div>
          <div class="chart-container">
            <svg class="chart-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
              <!-- Grid lines -->
              <line x1="0" y1="50" x2="500" y2="50" stroke="#bf00ff" stroke-dasharray="4 4" stroke-width="1"/>
              <line x1="0" y1="100" x2="500" y2="100" stroke="#00ffff" stroke-dasharray="6 2" stroke-width="1"/>
              <line x1="0" y1="150" x2="500" y2="150" stroke="#ff0055" stroke-dasharray="2 4" stroke-width="1"/>
              
              <!-- Zigzag Chaos Paths -->
              <path d="M 0 170 Q 60 20, 120 140 T 240 60 T 360 160 T 500 30" fill="none" stroke="#39ff14" stroke-width="4"/>
              <path d="M 0 90 L 80 160 L 150 40 L 230 180 L 320 20 L 410 110 L 500 10" fill="none" stroke="#ff0055" stroke-width="3" stroke-dasharray="8 4"/>
              <path d="M 0 130 C 100 200, 200 0, 300 180 S 450 10, 500 140" fill="none" stroke="#ffff00" stroke-width="2"/>

              <!-- Scatter points -->
              <circle cx="120" cy="140" r="7" fill="#00ffff" stroke="#000" stroke-width="2"/>
              <circle cx="230" cy="180" r="9" fill="#ff6600" stroke="#fff" stroke-width="2"/>
              <circle cx="320" cy="20" r="8" fill="#39ff14" stroke="#ff0055" stroke-width="2"/>
              <circle cx="410" cy="110" r="6" fill="#ffff00"/>

              <!-- Axis Text -->
              <text x="15" y="30" class="chart-axis-label">HIGH PANIC 📈</text>
              <text x="15" y="190" class="chart-axis-label">ABSOLUTE PEACE (0%)</text>
              <text x="360" y="190" class="chart-axis-label">STAGE 5: ACCEPTANCE ➡️</text>
            </svg>
          </div>
          <div class="bad-contrast-box">
            PRO-TIP: Staring at this chart for 10 seconds cures imposter syndrome (or makes it 200% worse).
          </div>
        </div>

        <!-- Card 6: Weather Widget -->
        <div class="chaos-card card-weather">
          <div class="card-header-chaos">
            <span class="card-title-chaos">🌦️ REGIONAL WEATHURR</span>
            <span style="font-size: 10px; background: #000; padding: 2px 4px;">LIVE SATELLITE</span>
          </div>
          <div class="weather-flex">
            <div style="font-size: 42px;">⛈️</div>
            <div>
              <div class="weather-temp">42.5°C</div>
              <div style="font-family: var(--font-times); font-size: 13px; color: #ffff00;">
                Feels like: 58°C in Production
              </div>
            </div>
          </div>
          <div style="font-family: var(--font-courier); font-size: 12px; margin-top: 6px; background: rgba(0,0,0,0.5); padding: 6px;">
            ⚠️ Forecast: 90% chance of sudden scope creep, accompanied by heavy bug showers.
          </div>
        </div>

        <!-- Card 7: Misaligned Chaos Calendar -->
        <div class="chaos-card card-calendar">
          <div class="card-header-chaos">
            <span class="card-title-chaos">📅 TIME MACHINE CALENDAR</span>
            <span style="font-family: var(--font-pixel); font-size: 9px; color: #ff00ff;">OCT 2026?</span>
          </div>
          <div style="font-size: 11px; font-family: var(--font-courier); color: #00ffff;">
            Notice: Week starts on Wednesday for peak disorientation
          </div>
          <div class="calendar-grid">
            <div class="cal-day-header">WED</div>
            <div class="cal-day-header">THU</div>
            <div class="cal-day-header">FRI</div>
            <div class="cal-day-header">SAT</div>
            <div class="cal-day-header">SUN</div>
            <div class="cal-day-header">MON</div>
            <div class="cal-day-header">TUE</div>

            ${this.renderCalendarDays()}
          </div>
        </div>

        <!-- Card 8: Recent Activity -->
        <div class="chaos-card card-recent-activity">
          <div class="card-header-chaos">
            <span class="card-title-chaos">⚡ REAL-TIME LOG FEED</span>
            <span class="blink-fast" style="color: #39ff14; font-size: 11px;">● BROADCASTING</span>
          </div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-family: var(--font-courier); font-size: 13px;">
            ${this.store.activities.slice(0, 5).map(act => `
              <li style="padding: 6px; background: rgba(0,0,0,0.6); border-left: 3px solid #00ffff; display: flex; align-items: center; justify-content: space-between;">
                <span>${act}</span>
                <span style="font-size: 9px; color: #ff0055;">JUST NOW</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Card 9: Download More RAM -->
        <div class="chaos-card card-unnecessary-ram">
          <div class="card-header-chaos">
            <span class="card-title-chaos" style="color: #39ff14;">💾 HARDWARE ACCELERATOR</span>
            <span style="font-size: 10px;">FREE RAM v4.2</span>
          </div>
          <div style="font-size: 12px; margin-bottom: 8px;">
            Allocated VRAM: <strong id="ram-counter">${this.ramDownloaded}%</strong> (OVERLOAD)
          </div>
          <div style="background: #222; border: 2px solid #39ff14; height: 22px; width: 100%; position: relative;">
            <div id="ram-progress-bar" style="background: repeating-linear-gradient(45deg, #39ff14, #39ff14 10px, #ffff00 10px, #ffff00 20px); height: 100%; width: 100%;"></div>
          </div>
          <div style="margin-top: 10px; display: flex; gap: 8px;">
            <button id="btn-download-ram" class="btn-chaos btn-style-clash-cyan" style="font-size: 11px; padding: 4px 10px;">
              DOWNLOAD 64GB NOW!
            </button>
            <button id="btn-purge-ram" class="btn-chaos btn-style-micro-gray">LEAK MEMORY</button>
          </div>
        </div>

        <!-- Card 10: Productivity Horoscope -->
        <div class="chaos-card card-horoscope">
          <div class="card-header-chaos">
            <span class="card-title-chaos" style="color: #ff00ff;">🔮 ASTROLOGICAL SPRINT</span>
            <span>✨</span>
          </div>
          <div style="font-family: var(--font-papyrus); font-size: 14px; line-height: 1.4; color: #ffffaa;">
            "Mercury is in retrograde within your node_modules directory. Today is an inauspicious time to run git push --force. Beware of pull requests containing fewer than 3 lines of code."
          </div>
          <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
            <button id="btn-consult-stars" class="btn-chaos btn-style-weird-magenta" style="font-size: 11px; padding: 4px 8px;">
              PROCEED?
            </button>
          </div>
        </div>
      </div>

      <!-- Enormous empty space violating spacing principles -->
      <div class="awkward-void">
        ⚠️ [RESERVED FOR FUTURE THOUGHT & MEDITATION ON TECHNICAL DEBT] ⚠️
      </div>
    `;

    this.bindEvents(container);
  }

  renderCalendarDays() {
    let daysHtml = '';
    // Generate strange 28 days with funny labels
    const funnyEvents = {
      2: '💀 Deploy',
      5: '🍕 Pizza',
      12: '🚨 Audit',
      18: '☕ Coffee',
      24: '💤 Nap',
      27: '🔥 Panic'
    };

    for (let i = 1; i <= 28; i++) {
      const isToday = i === 18;
      const event = funnyEvents[i] || '';
      daysHtml += `
        <div class="cal-day ${isToday ? 'today' : ''}" data-day="${i}">
          <span>${i}</span>
          ${event ? `<span class="cal-event-dot">${event}</span>` : ''}
        </div>
      `;
    }
    return daysHtml;
  }

  bindEvents(container) {
    // Next quote
    const nextQuoteBtn = container.querySelector('#btn-next-quote');
    if (nextQuoteBtn) {
      nextQuoteBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
        this.render(container);
      });
    }

    // Add task shortcut
    const addTaskBtn = container.querySelector('#btn-dash-add-task');
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => {
        this.sound.playClick();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.openAddModal();
        }
      });
    }

    // Filter done
    const filterDoneBtn = container.querySelector('#btn-dash-filter-done');
    if (filterDoneBtn) {
      filterDoneBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.store.setStatusFilter('done');
        this.store.setActiveTab('tasks');
      });
    }

    // Panic button
    const panicBtn = container.querySelector('#btn-dash-panic');
    if (panicBtn) {
      panicBtn.addEventListener('click', () => {
        this.sound.playError();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast('🚨 PANIC INITIATED: 10,000 invisible tickets generated!');
        }
      });
    }

    // Re-roll chart
    const recomputeBtn = container.querySelector('#btn-chart-recompute');
    if (recomputeBtn) {
      recomputeBtn.addEventListener('click', () => {
        this.sound.playFanfare();
        this.store.addActivity('🎲 Re-rolled quantum analytics matrix');
        this.render(container);
      });
    }

    // RAM download
    const ramBtn = container.querySelector('#btn-download-ram');
    if (ramBtn) {
      ramBtn.addEventListener('click', () => {
        this.sound.playFanfare();
        this.ramDownloaded += 64;
        const counter = container.querySelector('#ram-counter');
        if (counter) counter.innerText = `${this.ramDownloaded}%`;
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast(`🚀 RAM DOWNLOADED! Current allocation: ${this.ramDownloaded}%. Motherboard is sweating.`);
        }
      });
    }

    // Purge RAM
    const purgeRamBtn = container.querySelector('#btn-purge-ram');
    if (purgeRamBtn) {
      purgeRamBtn.addEventListener('click', () => {
        this.sound.playError();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast('⚠️ Cannot leak memory: JavaScript garbage collector is taking a nap.');
        }
      });
    }

    // Consult stars
    const starsBtn = container.querySelector('#btn-consult-stars');
    if (starsBtn) {
      starsBtn.addEventListener('click', () => {
        this.sound.playClick();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast('🔮 The stars whisper: "Did you remember to test on Safari?"');
        }
      });
    }

    // Calendar day clicks
    const calDays = container.querySelectorAll('.cal-day');
    calDays.forEach(day => {
      day.addEventListener('click', () => {
        this.sound.playClick();
        const num = day.getAttribute('data-day');
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast(`📅 October ${num}: Scheduled 8 consecutive hours of staring at logs.`);
        }
      });
    });
  }
}

window.TaskBlasterDashboard = DashboardComponent;
