(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storage = {
    get(key, fallback) { try { const value = localStorage.getItem(`yasno-${key}`); return value ? JSON.parse(value) : fallback; } catch (_) { return fallback; } },
    set(key, value) { try { localStorage.setItem(`yasno-${key}`, JSON.stringify(value)); } catch (_) {} }
  };
  window.Yasno = { $, $$, icon, escapeHtml, storage };

  function setTheme(dark) {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $$('.theme-toggle').forEach(button => {
      button.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
      button.innerHTML = icon(dark ? 'sun' : 'moon');
    });
    $('meta[name="theme-color"]')?.setAttribute('content', dark ? '#151b1e' : '#f8f9fa');
  }
  setTheme(document.documentElement.dataset.theme === 'dark');
  $$('.theme-toggle').forEach(button => button.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    setTheme(dark);
    try { localStorage.setItem('yasno-theme', dark ? 'dark' : 'light'); } catch (_) {}
  }));

  window.showToast = message => {
    let toast = $('.toast');
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.append(toast); }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
  };

  function taskCard(task, showProgress = false) {
    const completed = storage.get(`complete-${task.id}`, false);
    const progress = storage.get(`answers-${task.id}`, {});
    const solved = Object.values(progress).filter(item => item.correct).length;
    const card = task.ready ? 'a' : 'article';
    return `<${card} class="task-card${task.ready ? '' : ' placeholder'}"${task.ready ? ` href="/ege/informatika/${task.id}/" aria-label="Открыть разбор задания ${task.id}: ${escapeHtml(task.title)}"` : ''} ${task.ready ? `data-task-id="${task.id}"` : ''}>
      <div class="task-card-top"><span class="task-number">Задание ${String(task.id).padStart(2, '0')}</span><span class="task-level">${task.level}</span>${completed ? `<span class="task-status" title="Разбор пройден">${icon('check')}</span>` : ''}</div>
      <h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.short)}</p>
      <span class="card-ghost" aria-hidden="true">${String(task.id).padStart(2, '0')}</span>
      <div class="task-card-bottom">${task.ready ? `<span>${icon('clock')} ${solved}/${task.practices.length} задач · ${task.time} мин</span><span class="card-arrow" aria-hidden="true">↗</span>` : `<span class="card-tags"><span class="card-tag">скоро</span><span class="card-tag">${task.category === 'code' ? 'Python' : 'теория'}</span></span><span class="task-level">В работе</span>`}</div>
    </${card}>`;
  }
  window.taskCard = taskCard;

  const homeGrid = $('#home-task-grid');
  if (homeGrid) {
    const ids = [8, 13, 25, 2, 15, 17];
    const renderHome = filter => {
      const list = ids.map(window.getTask).filter(task => filter === 'all' || (filter === 'high' ? task.difficulty === 'high' : task.category === filter));
      homeGrid.innerHTML = list.map(task => taskCard(task)).join('');
      $('#home-empty').hidden = list.length > 0;
    };
    renderHome('all');
    $$('#home-filters .filter-chip').forEach(button => button.addEventListener('click', () => {
      $$('#home-filters .filter-chip').forEach(item => item.classList.remove('active'));
      button.classList.add('active'); renderHome(button.dataset.filter);
    }));
    $('#reset-home-filter')?.addEventListener('click', () => $('[data-filter="all"]', $('#home-filters')).click());
  }

  const catalogGrid = $('#catalog-grid');
  if (catalogGrid) {
  const renderCatalog = () => {
    const query = ($('#catalog-search').value || '').trim().toLowerCase();
    const list = window.TASKS.filter(task => {
      const haystack = [task.id, task.title, task.short, ...(task.tags || [])].join(' ').toLowerCase();
      return haystack.includes(query);
    });
    catalogGrid.innerHTML = list.map(task => taskCard(task, true)).join('');
    $('#catalog-empty').hidden = list.length > 0;
  };
  $('#catalog-search').addEventListener('input', renderCatalog);
  $('#reset-catalog')?.addEventListener('click', () => { $('#catalog-search').value = ''; renderCatalog(); });
  renderCatalog();
  }

  const overlay = $('#search-overlay');
  const input = $('#global-search');
  const results = $('#search-results');
  let selected = 0;
  let matches = [];
  let previousFocus;
  const renderSearch = () => {
    const query = input.value.trim().toLowerCase();
    matches = window.TASKS.filter(task => [task.id, task.title, task.short, ...(task.tags || [])].join(' ').toLowerCase().includes(query)).slice(0, 8);
    selected = Math.min(selected, Math.max(0, matches.length - 1));
    results.innerHTML = matches.length ? matches.map((task, i) => `<a class="search-result ${i === selected ? 'selected' : ''}" data-result-index="${i}" href="/ege/informatika/${task.id}/"><span class="task-number">№ ${task.id}</span><span class="search-result-title">${escapeHtml(task.title)}<small>${escapeHtml(task.short)}</small></span><span class="status-label">${task.ready ? 'Разбор →' : 'скоро'}</span></a>`).join('') : '<div class="search-placeholder">Ничего не найдено. Попробуй «маска» или «13».</div>';
  };
  const openSearch = () => {
    if (!overlay) return;
    previousFocus = document.activeElement;
    overlay.hidden = false; document.body.style.overflow = 'hidden'; input.value = ''; selected = 0; renderSearch(); input.focus();
  };
  const closeSearch = () => {
    if (!overlay) return;
    overlay.hidden = true; document.body.style.overflow = ''; previousFocus?.focus();
  };
  $$('.search-open').forEach(button => button.addEventListener('click', openSearch));
  $('.modal-close')?.addEventListener('click', closeSearch);
  overlay?.addEventListener('click', event => { if (event.target === overlay) closeSearch(); });
  input?.addEventListener('input', () => { selected = 0; renderSearch(); });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); overlay.hidden ? openSearch() : closeSearch(); }
    if (!overlay || overlay.hidden) return;
    if (event.key === 'Escape') closeSearch();
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length; renderSearch(); }
    if (event.key === 'Enter' && matches[selected]) window.location.href = `/ege/informatika/${matches[selected].id}/`;
  });

  // Бургер-меню
  const menuBtn = $('.menu-btn');
  const menuOverlay = $('#menu-overlay');
  if (menuBtn && menuOverlay) {
    const closeMenu = () => { menuOverlay.hidden = true; menuBtn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };
    menuBtn.addEventListener('click', () => {
      const open = menuOverlay.hidden;
      menuOverlay.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menuOverlay.addEventListener('click', e => { if (e.target === menuOverlay) closeMenu(); });
    menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    menuOverlay.querySelector('.menu-theme')?.addEventListener('click', () => $('.theme-toggle')?.click());
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();