/**
 * TaskBlaster Sidebar & Navbar Component
 * Deliberately confusing navigation, weird labels, random badges, clashing styles
 */

class NavbarComponent {
  constructor(store, sound) {
    this.store = store;
    this.sound = sound;
  }

  render(container) {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard?', badge: '(99+)', badgeClass: 'badge-chaos-1' },
      { id: 'tasks', label: 'DO THING', badge: '(NEW!)', badgeClass: 'badge-chaos-2' },
      { id: 'stuff', label: 'Stuff', badge: '(-3)', badgeClass: 'badge-chaos-3' },
      { id: 'settings', label: 'Maybe Settings', badge: '(?)', badgeClass: 'badge-chaos-4' },
      { id: 'important', label: 'Important 💥', badge: 'ALERT', badgeClass: 'badge-chaos-2' },
      { id: 'clickme', label: 'Click Me 🎲', badge: 'FREE', badgeClass: 'badge-chaos-1' }
    ];

    container.innerHTML = `
      <div class="app-brand">
        <h1 class="brand-title">💥 TASKBLASTER<br><span style="font-size: 11px; color:#ff0055;">3000 ENTERPRISE</span></h1>
        <div class="brand-subtitle">v9.9.99-UNSTABLE</div>
      </div>

      <nav>
        <ul class="nav-menu">
          ${navItems.map(item => `
            <li class="nav-item">
              <a href="#" class="nav-link ${this.store.activeTab === item.id ? 'active' : ''}" data-tab="${item.id}">
                <span>${item.label}</span>
                <span class="nav-badge ${item.badgeClass}">${item.badge}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </nav>

      <div class="clash-separator"></div>

      <!-- Quick Action Chaos Button -->
      <button id="sidebar-quick-chaos-btn" class="btn-chaos btn-style-danger-nuke" style="width: 100%;">
        ☣️ DO NOT PRESS
      </button>

      <!-- Sidebar fake ad / useless card -->
      <div class="sidebar-ad-card">
        <div style="font-weight: bold; color: #ff0055;">⚠️ SYSTEM ALERT ⚠️</div>
        <div style="font-size: 10px; margin: 4px 0;">42 Cookies pending ingestion!</div>
        <button id="btn-eat-cookies" class="btn-chaos btn-style-micro-gray">ACCEPT ALL DOOM</button>
      </div>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    const links = container.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-tab');
        this.sound.playClick();

        if (tab === 'clickme') {
          // Triggers random chaotic popup and sound!
          this.sound.playFanfare();
          if (window.TaskBlasterModals) {
            window.TaskBlasterModals.showToast('🎉 CONGRATULATIONS! You clicked the useless button! +0 XP');
          }
          return;
        }

        if (tab === 'important') {
          this.store.setPriorityFilter('spicy');
          this.store.setActiveTab('tasks');
          return;
        }

        if (tab === 'stuff') {
          this.store.setStatusFilter('chaos');
          this.store.setActiveTab('tasks');
          return;
        }

        this.store.setActiveTab(tab);
      });
    });

    const doNotPress = container.querySelector('#sidebar-quick-chaos-btn');
    if (doNotPress) {
      doNotPress.addEventListener('click', () => {
        this.sound.playError();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast('🚨 WHY DID YOU PRESS IT?! Self-destruct sequence paused at 99%.');
        }
      });
    }

    const eatCookies = container.querySelector('#btn-eat-cookies');
    if (eatCookies) {
      eatCookies.addEventListener('click', () => {
        this.sound.playFanfare();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.showToast('🍪 Om nom nom. All your cookies belong to the void.');
        }
      });
    }
  }
}

window.TaskBlasterNavbar = NavbarComponent;
