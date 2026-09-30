/**
 * TaskBlaster State Store
 * Manages tasks, filters, analytics, activities, and localStorage persistence
 */

const STORAGE_KEY = 'taskblaster_v1_store';

const DEFAULT_TASKS = [
  {
    id: 'tb-1',
    title: 'Refactor the legacy legacy legacy authentication subsystem before coffee gets lukewarm but after checking memes',
    priority: 'spicy',
    status: 'todo',
    category: 'Existential',
    tears: 85,
    dueDate: '1999-12-31',
    icon: '🔥'
  },
  {
    id: 'tb-2',
    title: 'Center a <div> using 4 different conflicting flexbox hacks and 1 CSS grid sacrifice',
    priority: 'defcon-2',
    status: 'in-progress',
    category: 'CSS Hell',
    tears: 99,
    dueDate: '2026-10-01',
    icon: '💀'
  },
  {
    id: 'tb-3',
    title: 'Attend 3-hour sync meeting that could have been a 4-word telepathic impulse',
    priority: 'ultra-mid',
    status: 'todo',
    category: 'Bureaucracy',
    tears: 42,
    dueDate: '2026-10-02',
    icon: '🥱'
  },
  {
    id: 'tb-4',
    title: 'Find where the extra semicolon went that broke prod at 4:59 PM on a Friday',
    priority: 'spicy',
    status: 'todo',
    category: 'Panic',
    tears: 100,
    dueDate: '2026-09-30',
    icon: '💣'
  },
  {
    id: 'tb-5',
    title: 'Pretend to understand quantum entanglement during casual water-cooler chatter',
    priority: 'code-purple',
    status: 'done',
    category: 'Social',
    tears: 12,
    dueDate: '2026-09-28',
    icon: '🧠'
  },
  {
    id: 'tb-6',
    title: 'Download more RAM from shady website with blinking neon advertisements',
    priority: 'ultra-mid',
    status: 'done',
    category: 'Hardware',
    tears: 0,
    dueDate: '2026-09-29',
    icon: '⚡'
  }
];

class StateManager {
  constructor() {
    this.listeners = [];
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.priorityFilter = 'all';
    this.activeTab = 'dashboard';
    this.activities = [
      '🔥 Task #4 was cursed by an intern',
      '⚡ Server hamster took an espresso shot',
      '🦖 Jurassic error caught in memory stack',
      '⚠️ User hovered the big red button suspiciously'
    ];
    this.init();
  }

  init() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.tasks = JSON.parse(saved);
      } else {
        this.tasks = [...DEFAULT_TASKS];
        this.save();
      }
    } catch (e) {
      console.warn('LocalStorage error, using defaults', e);
      this.tasks = [...DEFAULT_TASKS];
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.save();
    this.listeners.forEach(fn => fn(this));
  }

  getTasks() {
    return this.tasks;
  }

  addTask(taskData) {
    const newTask = {
      id: 'tb-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      title: taskData.title || 'Untitled Disaster Task',
      priority: taskData.priority || 'spicy',
      status: taskData.status || 'todo',
      category: taskData.category || 'General Chaos',
      tears: parseInt(taskData.tears || 50, 10),
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      icon: taskData.icon || '💥'
    };
    this.tasks.unshift(newTask);
    this.addActivity(`➕ Created task: "${newTask.title.slice(0, 24)}..."`);
    this.notify();
    return newTask;
  }

  updateTask(id, updates) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.tasks[idx] = { ...this.tasks[idx], ...updates };
      this.addActivity(`✏️ Modified task: "${this.tasks[idx].title.slice(0, 20)}..."`);
      this.notify();
    }
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = task.status === 'done' ? 'todo' : 'done';
      const verb = task.status === 'done' ? '🎉 "Accomplished"' : '🔄 Re-opened';
      this.addActivity(`${verb}: "${task.title.slice(0, 20)}..."`);
      this.notify();
    }
  }

  deleteTask(id) {
    const task = this.tasks.find(t => t.id === id);
    const title = task ? task.title.slice(0, 20) : id;
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.addActivity(`💥 Nuked task: "${title}..." into the void`);
    this.notify();
  }

  duplicateTask(id, times = 7) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    for (let i = 0; i < times; i++) {
      const copy = {
        ...task,
        id: 'tb-' + Date.now().toString(36) + '-' + i,
        title: `[COPY #${i + 1}] ${task.title}`
      };
      this.tasks.unshift(copy);
    }
    this.addActivity(`🧬 Cloned task ${times} times because why not!`);
    this.notify();
  }

  discombobulateTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    const icons = ['💩', '🦖', '☣️', '👽', '🦄', '🧙‍♂️', '🚨', '🎃'];
    const priorities = ['spicy', 'ultra-mid', 'code-purple', 'defcon-2'];
    task.icon = icons[Math.floor(Math.random() * icons.length)];
    task.priority = priorities[Math.floor(Math.random() * priorities.length)];
    task.title = task.title.split(' ').sort(() => Math.random() - 0.5).join(' ');
    this.addActivity(`🌀 Discombobulated task words & vibe!`);
    this.notify();
  }

  addActivity(text) {
    this.activities.unshift(text);
    if (this.activities.length > 20) {
      this.activities.pop();
    }
  }

  setSearch(term) {
    this.searchTerm = term.toLowerCase().trim();
    this.notify();
  }

  setStatusFilter(status) {
    this.statusFilter = status;
    this.notify();
  }

  setPriorityFilter(priority) {
    this.priorityFilter = priority;
    this.notify();
  }

  setActiveTab(tab) {
    this.activeTab = tab;
    this.notify();
  }

  getFilteredTasks() {
    return this.tasks.filter(task => {
      // Search match
      const matchesSearch = !this.searchTerm || 
        task.title.toLowerCase().includes(this.searchTerm) ||
        task.category.toLowerCase().includes(this.searchTerm);

      // Status match
      let matchesStatus = true;
      if (this.statusFilter === 'done') {
        matchesStatus = task.status === 'done';
      } else if (this.statusFilter === 'todo') {
        matchesStatus = task.status !== 'done';
      } else if (this.statusFilter === 'chaos') {
        matchesStatus = task.priority === 'spicy' || task.priority === 'defcon-2';
      }

      // Priority match
      let matchesPriority = true;
      if (this.priorityFilter !== 'all') {
        matchesPriority = task.priority === this.priorityFilter;
      }

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.status === 'done').length;
    // Failed tasks: non-completed tasks with high tears or overdue
    const failed = this.tasks.filter(t => t.status !== 'done' && (t.tears > 60 || t.dueDate < '2026-10-01')).length;
    const scoreVal = total === 0 ? 0 : Math.round((completed / total) * 37.4);
    
    let scoreRating = 'CATASTROPHIC';
    if (scoreVal > 25) scoreRating = 'SLIGHTLY AWFUL';
    if (scoreVal > 50) scoreRating = 'SUSPICIOUSLY OK';

    return {
      total,
      completed,
      failed,
      productivityScore: `${scoreVal}% (${scoreRating})`,
      entropyIndex: (94.2 + (total * 1.3) % 5.8).toFixed(1) + '%',
      coffeeDeficit: Math.max(12, 100 - completed * 15) + '%',
      synergyQuotient: '3.14159%'
    };
  }
}

window.TaskBlasterStore = new StateManager();
