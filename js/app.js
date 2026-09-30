/**
 * TaskBlaster Main Application Controller
 * Boots application, routes views, binds global audio, and handles settings
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.TaskBlasterStore;
  const sound = window.TaskBlasterSound;

  // Initialize Modals Manager
  window.TaskBlasterModals = new window.TaskBlasterModalsManager(store, sound);

  // Components
  const navbarComp = new window.TaskBlasterNavbar(store, sound);
  const dashboardComp = new window.TaskBlasterDashboard(store, sound);
  const taskListComp = new window.TaskBlasterTaskList(store, sound);

  // Containers
  const sidebarContainer = document.getElementById('sidebar-container');
  const mainViewContainer = document.getElementById('main-view-container');
  const audioToggleWidget = document.getElementById('audio-toggle-widget');

  // Render Sidebar
  function renderSidebar() {
    navbarComp.render(sidebarContainer);
  }

  // Render Active Tab View
  function renderView() {
    const tab = store.activeTab;

    if (tab === 'dashboard') {
      dashboardComp.render(mainViewContainer);
    } else if (tab === 'tasks') {
      taskListComp.render(mainViewContainer);
    } else if (tab === 'settings') {
      renderSettingsView(mainViewContainer);
    } else {
      dashboardComp.render(mainViewContainer);
    }

    renderSidebar();
  }

  // Settings View: Hilariously chaotic yet functional settings
  function renderSettingsView(container) {
    container.innerHTML = `
      <div class="chaos-card" style="max-width: 800px; margin: 0 auto; background: #140026; border: 5px dashed #ffff00; padding: 25px;">
        <div class="card-header-chaos">
          <h2 class="card-title-chaos" style="font-size: 26px;">⚙️ MAYBE SETTINGS (OR REGRETS)</h2>
          <span class="jiggle-element" style="font-size: 24px;">🔧</span>
        </div>

        <div style="font-family: var(--font-comic); font-size: 14px; margin-bottom: 20px;">
          Adjust critical parameters of your user experience at your own peril.
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Setting 1: Theme Nightmare -->
          <div style="background: rgba(0,0,0,0.5); padding: 15px; border: 2px solid #00ffff;">
            <div style="font-family: var(--font-impact); color: #00ffff; font-size: 16px; margin-bottom: 6px;">
              🌈 THEME INVERSION PROTOCOL
            </div>
            <p style="font-size: 12px; margin-bottom: 10px;">Toggle between "High Migraine Neon" and "Super Acid Trip".</p>
            <button id="btn-toggle-acid-mode" class="btn-chaos btn-style-weird-magenta">
              TRIGGER ACID SHIFT 🧪
            </button>
          </div>

          <!-- Setting 2: Screen Inversion -->
          <div style="background: rgba(0,0,0,0.5); padding: 15px; border: 2px solid #39ff14;">
            <div style="font-family: var(--font-impact); color: #39ff14; font-size: 16px; margin-bottom: 6px;">
              🔄 ROTATIONAL ORIENTATION (TILT VIEW)
            </div>
            <p style="font-size: 12px; margin-bottom: 10px;">Who said web applications must be parallel to the horizon?</p>
            <button id="btn-toggle-tilt-app" class="btn-chaos btn-style-clash-cyan">
              TILT SCREEN 3 DEGREES 📐
            </button>
          </div>

          <!-- Setting 3: Factory Reset -->
          <div style="background: rgba(80,0,0,0.6); padding: 15px; border: 3px ridge #ff0055;">
            <div style="font-family: var(--font-creepy); color: #ff0055; font-size: 20px; margin-bottom: 6px;">
              ☢️ NUCLEAR REINITIALIZATION (FACTORY RESET)
            </div>
            <p style="font-size: 12px; margin-bottom: 10px;">
              Wipes all tasks from localStorage and restores original default sample tasks.
            </p>
            <button id="btn-reset-store" class="btn-chaos btn-style-danger-nuke">
              RESET ALL TO DEFAULT DISASTER 💀
            </button>
          </div>
        </div>

        <div class="clash-separator-zigzag" style="margin-top: 25px;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button id="btn-settings-back" class="btn-chaos btn-style-huge-lime" style="font-size: 14px; padding: 10px 20px;">
            ⬅️ RETURN TO DASHBOARD?
          </button>
          <span style="font-family: var(--font-pixel); font-size: 10px; color: #ff0055;">
            STATUS: 100% COMPLIANT WITH ANTI-UX STANDARDS
          </span>
        </div>
      </div>
    `;

    // Acid mode toggle
    const acidBtn = container.querySelector('#btn-toggle-acid-mode');
    if (acidBtn) {
      acidBtn.addEventListener('click', () => {
        sound.playFanfare();
        document.body.classList.toggle('acid-mode-filter');
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast('🧪 Acid shift activated! Your retina will remember this.');
        }
      });
    }

    // Tilt app toggle
    const tiltBtn = container.querySelector('#btn-toggle-tilt-app');
    if (tiltBtn) {
      tiltBtn.addEventListener('click', () => {
        sound.playError();
        const main = document.querySelector('.main-wrapper');
        if (main) {
          main.style.transform = main.style.transform ? '' : 'rotate(-2deg) scale(0.98)';
          main.style.transition = 'transform 0.5s ease';
        }
      });
    }

    // Factory reset
    const resetStoreBtn = container.querySelector('#btn-reset-store');
    if (resetStoreBtn) {
      resetStoreBtn.addEventListener('click', () => {
        sound.playExplosion();
        localStorage.removeItem('taskblaster_v1_store');
        store.init();
        store.notify();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast('💥 Database obliterated and reset to default chaos!');
        }
      });
    }

    // Return to dashboard
    const backBtn = container.querySelector('#btn-settings-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        sound.playClick();
        store.setActiveTab('dashboard');
      });
    }
  }

  // Audio Toggle Button
  if (audioToggleWidget) {
    audioToggleWidget.addEventListener('click', () => {
      const isEnabled = sound.toggle();
      audioToggleWidget.innerHTML = isEnabled 
        ? `<span>🔊 NOISE: ON</span>` 
        : `<span>🔇 SILENCE: BLESSED</span>`;
      if (isEnabled) sound.playClick();
    });
  }

  // Initial Render & Subscribe to state changes
  renderView();
  store.subscribe(() => {
    renderView();
  });

  // Global Click sound on buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-chaos') || e.target.closest('.nav-link')) {
      sound.playClick();
    }
  });

  // Welcome Toast
  setTimeout(() => {
    if (window.TaskBlasterModals) {
      window.TaskBlasterModals.showToast('👋 Welcome to TaskBlaster 3000! Good luck escaping.');
    }
  }, 1000);
});
