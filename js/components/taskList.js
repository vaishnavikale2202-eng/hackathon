/**
 * TaskBlaster Task List Component
 * Task management section with terrible alignment, confusing checkboxes, chaotic buttons, and full functionality
 */

class TaskListComponent {
  constructor(store, sound) {
    this.store = store;
    this.sound = sound;
  }

  render(container) {
    const tasks = this.store.getFilteredTasks();

    container.innerHTML = `
      <div class="task-manager-container">
        <!-- Control Header Bar with awful spacing & mismatched controls -->
        <div class="task-controls-bar">
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <input 
              type="text" 
              id="task-search-input" 
              class="search-input-chaos" 
              placeholder="Search or whisper into void..." 
              value="${this.store.searchTerm || ''}"
            />
            <button id="btn-clear-search" class="btn-chaos btn-style-micro-gray">FORGET SEARCH</button>
            
            <select id="filter-status-select" class="filter-select-chaos">
              <option value="all" ${this.store.statusFilter === 'all' ? 'selected' : ''}>Status: EVERYTHING</option>
              <option value="todo" ${this.store.statusFilter === 'todo' ? 'selected' : ''}>Status: UNFINISHED SUFFERING</option>
              <option value="done" ${this.store.statusFilter === 'done' ? 'selected' : ''}>Status: DONE-ISH</option>
              <option value="chaos" ${this.store.statusFilter === 'chaos' ? 'selected' : ''}>Status: MAXIMUM CHAOS</option>
            </select>

            <select id="filter-priority-select" class="filter-select-chaos" style="background: #bf00ff; color: #fff;">
              <option value="all" ${this.store.priorityFilter === 'all' ? 'selected' : ''}>Priority: ALL SPEEDS</option>
              <option value="spicy" ${this.store.priorityFilter === 'spicy' ? 'selected' : ''}>Priority: SPICY 🔥</option>
              <option value="ultra-mid" ${this.store.priorityFilter === 'ultra-mid' ? 'selected' : ''}>Priority: ULTRA-MID 😐</option>
              <option value="code-purple" ${this.store.priorityFilter === 'code-purple' ? 'selected' : ''}>Priority: CODE PURPLE 🟣</option>
              <option value="defcon-2" ${this.store.priorityFilter === 'defcon-2' ? 'selected' : ''}>Priority: DEFCON 2 💣</option>
            </select>
          </div>

          <div>
            <button id="btn-create-task-main" class="btn-chaos btn-style-huge-lime">
              💥 DO THING / NEW TASK 💥
            </button>
          </div>
        </div>

        <!-- Task Count & Chaos Indicator -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 10px;">
          <span style="font-family: var(--font-pixel); font-size: 11px; color: #ffff00;">
            SHOWING: ${tasks.length} / ${this.store.tasks.length} REGISTERED DISASTERS
          </span>
          <span class="jiggle-element" style="font-family: var(--font-impact); font-size: 14px; color: #ff0055;">
            ⚠️ ACCIDENTAL PRODUCTIVITY RISK LEVEL: CRITICAL ⚠️
          </span>
        </div>

        <!-- The List of Tasks with staggered, uneven alignments -->
        <div class="tasks-list">
          ${tasks.length === 0 ? `
            <div class="chaos-card" style="text-align: center; padding: 40px; background: #000; border: 4px dashed #ff0055;">
              <div style="font-size: 40px;">🕳️</div>
              <h2 style="font-family: var(--font-creepy); color: #ffff00; font-size: 28px;">VOID DETECTED</h2>
              <p style="font-family: var(--font-comic); color: #fff;">No tasks matched your erratic criteria.</p>
              <button id="btn-reset-filters" class="btn-chaos btn-style-weird-magenta" style="margin-top: 15px;">
                PROCEED? (RESET FILTERS)
              </button>
            </div>
          ` : tasks.map(task => this.renderTaskCard(task)).join('')}
        </div>
      </div>
    `;

    this.bindEvents(container);
  }

  renderTaskCard(task) {
    const isDone = task.status === 'done';
    const isOverdue = task.dueDate < '2026-10-01';

    return `
      <div class="task-item ${isDone ? 'completed' : ''}" data-task-id="${task.id}">
        <!-- Confusing Checkbox -->
        <div class="checkbox-chaos-wrapper" title="Click to invert reality">
          <div class="checkbox-chaos ${isDone ? 'checked' : ''}" data-action="toggle">
            ${isDone ? '✅' : '💀'}
          </div>
        </div>

        <!-- Task Information -->
        <div class="task-info-block">
          <div class="task-header-row">
            <span style="font-size: 20px;">${task.icon || '📌'}</span>
            <span class="task-title">${task.title}</span>
          </div>

          <div class="task-meta-row">
            <span class="badge-priority ${task.priority}">
              ${task.priority.toUpperCase()}
            </span>
            <span class="badge-status ${isDone ? 'done' : (isOverdue ? 'overdue' : 'todo')}">
              ${isDone ? 'COMPLETED' : (isOverdue ? '⚠️ CRITICAL OVERDUE' : 'PENDING FOREVER')}
            </span>
            <span style="color: #00ffff; font-size: 11px;">
              📁 ${task.category}
            </span>
            <span style="color: #ff99cc; font-size: 11px;">
              💧 ${task.tears || 0} Tears
            </span>
            <span style="color: #ffff00; font-size: 11px;">
              📅 ${task.dueDate}
            </span>
          </div>
        </div>

        <!-- Confusing Action Buttons with Mismatched Styles -->
        <div class="task-actions-group">
          <!-- Edit button with weird label -->
          <button class="btn-chaos btn-style-clash-cyan" data-action="edit" title="Tweak variables">
            Save-ish ✏️
          </button>

          <!-- Useless action: Duplicate x7 -->
          <button class="btn-chaos btn-style-micro-gray" data-action="duplicate" title="Spawn 7 copies">
            Duplicate x7
          </button>

          <!-- Useless action: Discombobulate -->
          <button class="btn-chaos btn-style-weird-magenta" data-action="discombobulate" style="font-size: 10px; padding: 4px 8px;" title="Scramble everything">
            Discombobulate 🌀
          </button>

          <!-- Delete button with alarming label -->
          <button class="btn-chaos btn-style-danger-nuke" data-action="delete" title="Dangerous!">
            DO NOT 💣
          </button>
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    // Search input
    const searchInput = container.querySelector('#task-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.store.setSearch(e.target.value);
      });
    }

    // Clear search
    const clearBtn = container.querySelector('#btn-clear-search');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.store.setSearch('');
      });
    }

    // Status filter
    const statusSelect = container.querySelector('#filter-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        this.sound.playClick();
        this.store.setStatusFilter(e.target.value);
      });
    }

    // Priority filter
    const prioritySelect = container.querySelector('#filter-priority-select');
    if (prioritySelect) {
      prioritySelect.addEventListener('change', (e) => {
        this.sound.playClick();
        this.store.setPriorityFilter(e.target.value);
      });
    }

    // Create task button
    const createBtn = container.querySelector('#btn-create-task-main');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        this.sound.playClick();
        if (window.TaskBlasterModals) {
          window.TaskBlasterModals.openAddModal();
        }
      });
    }

    // Reset filters
    const resetBtn = container.querySelector('#btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.store.setSearch('');
        this.store.setStatusFilter('all');
        this.store.setPriorityFilter('all');
      });
    }

    // Task Item actions delegation
    const tasksList = container.querySelector('.tasks-list');
    if (tasksList) {
      tasksList.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('[data-action]');
        if (!targetBtn) return;

        const taskItem = targetBtn.closest('.task-item');
        if (!taskItem) return;

        const taskId = taskItem.getAttribute('data-task-id');
        const action = targetBtn.getAttribute('data-action');

        if (action === 'toggle') {
          this.sound.playClick();
          this.store.toggleTask(taskId);
        } else if (action === 'edit') {
          this.sound.playClick();
          if (window.TaskBlasterModals) {
            window.TaskBlasterModals.openEditModal(taskId);
          }
        } else if (action === 'duplicate') {
          this.sound.playFanfare();
          this.store.duplicateTask(taskId, 7);
          if (window.TaskBlasterModals) {
            window.TaskBlasterModals.showToast('🧬 Multiplied by 7! Look at all those tasks!');
          }
        } else if (action === 'discombobulate') {
          this.sound.playError();
          this.store.discombobulateTask(taskId);
        } else if (action === 'delete') {
          // Triggers the multi-step annoying confirmation modal!
          this.sound.playError();
          if (window.TaskBlasterModals) {
            window.TaskBlasterModals.startDeleteSequence(taskId);
          }
        }
      });
    }
  }
}

window.TaskBlasterTaskList = TaskListComponent;
