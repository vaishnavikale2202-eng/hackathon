/**
 * TaskBlaster Modals & Popups Manager
 * Implements multi-stage delete confirmations, task editor, bizarre tooltips, and annoying notifications
 */

class ModalsManager {
  constructor(store, sound) {
    this.store = store;
    this.sound = sound;
    this.deleteTaskId = null;
    this.deleteStep = 1;
    this.editTaskId = null;
    this.initPeriodicToasts();
    this.initBizarreTooltip();
  }

  /* --------------------------------------------------------------------------
     1. MULTI-STAGE DELETE CONFIRMATION SEQUENCE
     -------------------------------------------------------------------------- */
  startDeleteSequence(taskId) {
    this.deleteTaskId = taskId;
    this.deleteStep = 1;
    this.renderDeleteModalStep1();
  }

  renderDeleteModalStep1() {
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    const task = this.store.tasks.find(t => t.id === this.deleteTaskId);
    const taskTitle = task ? task.title : 'Mystery Task';

    modalBackdrop.innerHTML = `
      <div class="modal-box">
        <div class="modal-header-chaos">
          <h2 class="modal-title">⚠️ DESTRUCTION INITIATED</h2>
          <button class="modal-close-weird" id="btn-modal-close-x">X</button>
        </div>
        <div class="modal-body-chaos">
          <p>You are about to delete:</p>
          <div style="background: #000; color: #ff0055; padding: 10px; border: 2px dashed #ffff00; margin: 10px 0; font-family: var(--font-courier);">
            "${taskTitle}"
          </div>
          <p>Are you sure? Think about the digital electrons that gave their lives for this task!</p>
        </div>
        <div class="modal-footer-chaos">
          <!-- Deliberately reversed button psychology -->
          <button id="btn-delete-cancel-1" class="btn-chaos btn-style-huge-lime" style="font-size: 14px; padding: 10px 16px;">
            FLEE / CANCEL
          </button>
          <button id="btn-delete-step1-proceed" class="btn-chaos btn-style-danger-nuke" style="font-size: 13px;">
            PROCEED WITH DOOM? ➡️
          </button>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('show');

    // Bindings
    modalBackdrop.querySelector('#btn-modal-close-x').onclick = () => this.closeModal();
    modalBackdrop.querySelector('#btn-delete-cancel-1').onclick = () => this.closeModal();
    modalBackdrop.querySelector('#btn-delete-step1-proceed').onclick = () => {
      this.sound.playClick();
      this.deleteStep = 2;
      this.renderDeleteModalStep2();
    };
  }

  renderDeleteModalStep2() {
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    modalBackdrop.innerHTML = `
      <div class="modal-box" style="border-color: #ff0055; box-shadow: -15px -15px 0 #39ff14;">
        <div class="modal-header-chaos">
          <h2 class="modal-title">🛑 STEP 2/3: REALLY SURE?</h2>
          <button class="modal-close-weird" id="btn-modal-close-x">X</button>
        </div>
        <div class="modal-body-chaos">
          <p class="blink-fast" style="color: #ffff00; font-weight: bold; font-size: 18px;">
            ⚠️ PROTOCOL: SECOND GUESSING YOUR LIFE CHOICES
          </p>
          <p style="margin-top: 10px;">
            Deleting tasks may cause temporary feelings of artificial accomplishment followed by immediate regret.
          </p>
          <div style="margin: 15px 0; text-align: center;">
            <span class="spin-endless" style="font-size: 40px;">⏳</span>
          </div>
        </div>
        <div class="modal-footer-chaos">
          <button id="btn-delete-step2-back" class="btn-chaos btn-style-clash-cyan">
            Maybe Not (Go Back)
          </button>
          <button id="btn-delete-step2-proceed" class="btn-chaos btn-style-weird-magenta">
            YES I SWEAR I WANT IT GONE ➡️
          </button>
        </div>
      </div>
    `;

    // Bindings
    modalBackdrop.querySelector('#btn-modal-close-x').onclick = () => this.closeModal();
    modalBackdrop.querySelector('#btn-delete-step2-back').onclick = () => this.closeModal();
    modalBackdrop.querySelector('#btn-delete-step2-proceed').onclick = () => {
      this.sound.playClick();
      this.deleteStep = 3;
      this.renderDeleteModalStep3();
    };
  }

  renderDeleteModalStep3() {
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    modalBackdrop.innerHTML = `
      <div class="modal-box" style="border-color: #39ff14; box-shadow: 20px 20px 0 #ffff00;">
        <div class="modal-header-chaos">
          <h2 class="modal-title">💣 FINAL WARNING (STEP 3/3)</h2>
          <button class="modal-close-weird" id="btn-modal-close-x">X</button>
        </div>
        <div class="modal-body-chaos">
          <p style="color: #ff0055; font-family: var(--font-pixel); font-size: 12px; line-height: 1.6;">
            ARE YOU REALLY, ABSOLUTELY, UNDOUBTEDLY 100.0% CERTAIN?
          </p>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 13px; margin-bottom: 6px;">
              Type <strong>DELETE</strong> below to finalize:
            </label>
            <input type="text" id="delete-confirm-input" class="form-input-chaos" placeholder="type DELETE here" style="width: 100%; text-transform: uppercase;">
          </div>
        </div>
        <div class="modal-footer-chaos">
          <button id="btn-delete-step3-cancel" class="btn-chaos btn-style-micro-gray">
            ABORT MISSION
          </button>
          <button id="btn-delete-step3-execute" class="btn-chaos btn-style-danger-nuke" style="font-size: 16px;">
            💥 NUKE IT FROM ORBIT
          </button>
        </div>
      </div>
    `;

    const input = modalBackdrop.querySelector('#delete-confirm-input');
    const executeBtn = modalBackdrop.querySelector('#btn-delete-step3-execute');

    modalBackdrop.querySelector('#btn-modal-close-x').onclick = () => this.closeModal();
    modalBackdrop.querySelector('#btn-delete-step3-cancel').onclick = () => this.closeModal();

    executeBtn.onclick = () => {
      const val = input.value.trim().toUpperCase();
      if (val === 'DELETE' || val === 'NUKE') {
        // Successful delete!
        this.sound.playExplosion();
        this.store.deleteTask(this.deleteTaskId);
        this.closeModal();
        this.showToast('💥 Task successfully blasted into atoms!');
      } else {
        this.sound.playError();
        this.showToast('❌ You must type DELETE to prove your commitment to destruction!');
      }
    };
  }

  /* --------------------------------------------------------------------------
     2. ADD / EDIT TASK MODAL
     -------------------------------------------------------------------------- */
  openAddModal() {
    this.editTaskId = null;
    this.renderTaskFormModal('💥 CREATE NEW DISASTER (TASK)', {
      title: '',
      priority: 'spicy',
      status: 'todo',
      category: 'General Chaos',
      tears: 50,
      dueDate: new Date().toISOString().split('T')[0],
      icon: '🔥'
    });
  }

  openEditModal(taskId) {
    this.editTaskId = taskId;
    const task = this.store.tasks.find(t => t.id === taskId);
    if (!task) return;
    this.renderTaskFormModal('✏️ EDIT DISASTER VARIABLES', task);
  }

  renderTaskFormModal(modalTitle, taskData) {
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    modalBackdrop.innerHTML = `
      <div class="modal-box" style="max-width: 600px;">
        <div class="modal-header-chaos">
          <h2 class="modal-title">${modalTitle}</h2>
          <button class="modal-close-weird" id="btn-task-form-close">X</button>
        </div>
        <form id="task-chaos-form">
          <div class="form-group-chaos">
            <label class="form-label-chaos">TASK TITLE / EXISTENTIAL BURDEN</label>
            <input type="text" id="task-title-input" class="form-input-chaos" required value="${taskData.title || ''}" placeholder="What must be procrastinated today?">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group-chaos">
              <label class="form-label-chaos">PRIORITY VELOCITY</label>
              <select id="task-priority-input" class="form-select-chaos">
                <option value="spicy" ${taskData.priority === 'spicy' ? 'selected' : ''}>SPICY 🔥 (Emergency)</option>
                <option value="ultra-mid" ${taskData.priority === 'ultra-mid' ? 'selected' : ''}>ULTRA-MID 😐 (Indifference)</option>
                <option value="code-purple" ${taskData.priority === 'code-purple' ? 'selected' : ''}>CODE PURPLE 🟣 (Philosophical)</option>
                <option value="defcon-2" ${taskData.priority === 'defcon-2' ? 'selected' : ''}>DEFCON 2 💣 (Apocalyptic)</option>
              </select>
            </div>

            <div class="form-group-chaos">
              <label class="form-label-chaos">STATUS</label>
              <select id="task-status-input" class="form-select-chaos">
                <option value="todo" ${taskData.status === 'todo' ? 'selected' : ''}>Unfinished Suffering</option>
                <option value="in-progress" ${taskData.status === 'in-progress' ? 'selected' : ''}>Pretending to Work</option>
                <option value="done" ${taskData.status === 'done' ? 'selected' : ''}>Done-ish</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group-chaos">
              <label class="form-label-chaos">CATEGORY</label>
              <input type="text" id="task-category-input" class="form-input-chaos" value="${taskData.category || 'General Chaos'}">
            </div>

            <div class="form-group-chaos">
              <label class="form-label-chaos">DEADLINE OF RECKONING</label>
              <input type="date" id="task-duedate-input" class="form-input-chaos" value="${taskData.dueDate || '2026-10-01'}">
            </div>
          </div>

          <div class="form-group-chaos">
            <label class="form-label-chaos">EMOTIONAL TOLL (<span id="tears-display">${taskData.tears || 50}</span> TEARS)</label>
            <input type="range" id="task-tears-input" min="0" max="100" value="${taskData.tears || 50}" style="width: 100%; accent-color: #ff0055;">
          </div>

          <div class="form-group-chaos">
            <label class="form-label-chaos">SPIRIT EMOJI</label>
            <div style="display: flex; gap: 10px; font-size: 22px; cursor: pointer;" id="emoji-picker-row">
              ${['🔥', '💀', '🥱', '💣', '🧠', '⚡', '🦖', '💩', '🦄'].map(e => `
                <span class="emoji-opt ${taskData.icon === e ? 'active' : ''}" data-emoji="${e}" style="padding: 4px; border: 2px solid ${taskData.icon === e ? '#39ff14' : 'transparent'}; border-radius: 4px;">${e}</span>
              `).join('')}
            </div>
          </div>

          <div class="modal-footer-chaos" style="margin-top: 20px;">
            <button type="button" id="btn-task-form-cancel" class="btn-chaos btn-style-micro-gray">
              FLEE WITHOUT SAVING
            </button>
            <button type="submit" class="btn-chaos btn-style-huge-lime" style="font-size: 16px; padding: 10px 22px;">
              Save-ish / DO IT 💾
            </button>
          </div>
        </form>
      </div>
    `;

    modalBackdrop.classList.add('show');

    // Emoji picker logic
    let selectedIcon = taskData.icon || '🔥';
    const emojis = modalBackdrop.querySelectorAll('.emoji-opt');
    emojis.forEach(emo => {
      emo.addEventListener('click', () => {
        emojis.forEach(e => e.style.borderColor = 'transparent');
        emo.style.borderColor = '#39ff14';
        selectedIcon = emo.getAttribute('data-emoji');
      });
    });

    // Tears slider display
    const tearsInput = modalBackdrop.querySelector('#task-tears-input');
    const tearsDisp = modalBackdrop.querySelector('#tears-display');
    tearsInput.addEventListener('input', (e) => {
      tearsDisp.innerText = e.target.value;
    });

    // Close buttons
    modalBackdrop.querySelector('#btn-task-form-close').onclick = () => this.closeModal();
    modalBackdrop.querySelector('#btn-task-form-cancel').onclick = () => this.closeModal();

    // Form submission
    const form = modalBackdrop.querySelector('#task-chaos-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      const updatedPayload = {
        title: modalBackdrop.querySelector('#task-title-input').value,
        priority: modalBackdrop.querySelector('#task-priority-input').value,
        status: modalBackdrop.querySelector('#task-status-input').value,
        category: modalBackdrop.querySelector('#task-category-input').value,
        dueDate: modalBackdrop.querySelector('#task-duedate-input').value,
        tears: tearsInput.value,
        icon: selectedIcon
      };

      if (this.editTaskId) {
        this.store.updateTask(this.editTaskId, updatedPayload);
        this.sound.playFanfare();
        this.showToast('✅ Task updated! Nothing broke (probably).');
      } else {
        this.store.addTask(updatedPayload);
        this.sound.playFanfare();
        this.showToast('🎉 New disaster registered successfully!');
      }

      this.closeModal();
    };
  }

  closeModal() {
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('show');
      modalBackdrop.innerHTML = '';
    }
  }

  /* --------------------------------------------------------------------------
     3. ANNOYING TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'annoying-toast';
    toast.innerHTML = `
      <span>🔔</span>
      <div style="flex: 1;">${message}</div>
      <button class="toast-close-btn">X</button>
    `;

    const closeBtn = toast.querySelector('.toast-close-btn');
    closeBtn.onclick = () => toast.remove();

    container.appendChild(toast);

    // Auto remove after 6 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 6000);
  }

  initPeriodicToasts() {
    const annoyingMessages = [
      '⚠️ Reminder: Drink water or coffee or battery acid.',
      '📢 Pro tip: If your code doesn\'t compile, delete the test cases.',
      '👀 A wild bug appeared in module 0xDEADBEEF!',
      '☕ Productivity dropped by 3.14% due to existential wandering.',
      '🚨 Alert: You have been breathing manually for 10 seconds.'
    ];

    // Periodically fire an annoying toast every 35 seconds
    setInterval(() => {
      const msg = annoyingMessages[Math.floor(Math.random() * annoyingMessages.length)];
      this.showToast(msg);
    }, 35000);
  }

  /* --------------------------------------------------------------------------
     4. BIZARRE TOOLTIP (APPEARING IN UNEXPECTED LOCATION)
     -------------------------------------------------------------------------- */
  initBizarreTooltip() {
    const tooltip = document.getElementById('bizarre-tooltip');
    if (!tooltip) return;

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-tooltip]') || e.target.closest('.chaos-card') || e.target.closest('.btn-chaos');
      if (target) {
        const text = target.getAttribute('title') || target.getAttribute('data-tooltip') || 'Mysterious UI Component detected!';
        tooltip.innerText = `[FAR-AWAY TOOLTIP]: ${text.slice(0, 45)}`;
        tooltip.style.display = 'block';
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-tooltip]') || e.target.closest('.chaos-card') || e.target.closest('.btn-chaos');
      if (target) {
        tooltip.style.display = 'none';
      }
    });
  }
}

window.TaskBlasterModalsManager = ModalsManager;
