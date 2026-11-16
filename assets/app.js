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

  // ===== Тема с анимацией от точки нажатия =====
  function applyTheme(dark) {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $$('.theme-toggle').forEach(b => b.innerHTML = icon(dark ? 'sun' : 'moon'));
    $$('.menu-theme-state').forEach(el => el.textContent = dark ? 'Светлая' : 'Тёмная');
    $('meta[name="theme-color"]')?.setAttribute('content', dark ? '#131517' : '#f4f2ec');
  }
  applyTheme(document.documentElement.dataset.theme === 'dark');
  function toggleTheme(x, y) {
    const dark = document.documentElement.dataset.theme !== 'dark';
    try { localStorage.setItem('yasno-theme', dark ? 'dark' : 'light'); } catch (_) {}
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !document.createElement('div').animate) { applyTheme(dark); return; }
    // Круговая анимация от точки клика
    const clip = document.createElement('div');
    clip.className = 'theme-reveal';
    clip.style.setProperty('--x', (x ?? innerWidth / 2) + 'px');
    clip.style.setProperty('--y', (y ?? innerHeight / 2) + 'px');
    clip.dataset.to = dark ? 'dark' : 'light';
    document.body.appendChild(clip);
    const r = Math.hypot(Math.max(x ?? 0, innerWidth - (x ?? 0)), Math.max(y ?? 0, innerHeight - (y ?? 0)));
    clip.animate(
      [{ clipPath: `circle(0px at var(--x) var(--y))` }, { clipPath: `circle(${r}px at var(--x) var(--y))` }],
      { duration: 550, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
    ).onfinish = () => { applyTheme(dark); clip.remove(); };
  }
  window.toggleTheme = toggleTheme;

  window.showToast = message => {
    let toast = $('.toast');
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.append(toast); }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
  };

  function taskCard(task) {
    const completed = storage.get(`complete-${task.id}`, false);
    const progress = storage.get(`answers-${task.id}`, {});
    const solved = Object.values(progress).filter(item => item.correct).length;
    const card = task.ready ? 'a' : 'article';
    return `<${card} class="task-card${task.ready ? '' : ' placeholder'}"${task.ready ? ` href="/ege/informatika/${task.id}/" aria-label="Открыть разбор задания ${task.id}: ${escapeHtml(task.title)}"` : ''}>
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
      catalogGrid.innerHTML = list.map(task => taskCard(task)).join('');
      $('#catalog-empty').hidden = list.length > 0;
    };
    $('#catalog-search').addEventListener('input', renderCatalog);
    $('#reset-catalog')?.addEventListener('click', () => { $('#catalog-search').value = ''; renderCatalog(); });
    renderCatalog();
  }

  // ===== Полноэкранное меню с аккордеонами =====
  const menuBtn = $('.menu-btn');
  if (menuBtn) {
    const subjects = [
      { name: 'Информатика', slug: 'informatika', active: true },
      { name: 'Математика', active: false },
      { name: 'Русский язык', active: false },
      { name: 'Физика', active: false },
    ];
    const ov = document.createElement('div');
    ov.className = 'menu-overlay';
    ov.id = 'menu-overlay';
    ov.hidden = true;
    ov.innerHTML = `
      <div class="menu-panel" role="dialog" aria-modal="true" aria-label="Меню">
        <div class="menu-head"><span class="menu-logo">EAZY<span class="brand-dot">.</span></span><button class="icon-button menu-close" aria-label="Закрыть меню"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
        <div class="menu-scroll">
          <p class="menu-section">Экзамены</p>
          <div class="acc" data-acc="ege">
            <button class="acc-head open" aria-expanded="true"><span class="acc-title">ЕГЭ</span><span class="menu-dot"></span><svg class="acc-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="acc-body open">
              ${subjects.map(s => s.active ? `
              <div class="acc" data-acc="subject">
                <button class="acc-head sub" aria-expanded="false"><span class="acc-title">${s.name}</span><span class="menu-dot"></span><svg class="acc-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
                <div class="acc-body"><div class="menu-tasks">${window.TASKS.map(t => `<a href="/ege/informatika/${t.id}/"${t.ready ? '' : ' class="off"'}>№${t.id}</a>`).join('')}</div></div>
              </div>` : `
              <button class="acc-head sub disabled" type="button"><span class="acc-title">${s.name}</span><span class="menu-soon">скоро</span></button>`).join('')}
            </div>
          </div>
          <button class="acc-head disabled" type="button"><span class="acc-title">ОГЭ</span><span class="menu-soon">скоро</span></button>
          <div class="menu-divider"></div>
          <a class="menu-link" href="/info/">О проекте</a>
          <a class="menu-link accent" href="/support/">Поддержать <svg viewBox="0 0 24 24" style="width:16px;height:16px"><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z"/></svg></a>
          <div class="menu-divider"></div>
          <button class="menu-link as-btn" id="menu-theme"><svg viewBox="0 0 24 24" style="width:16px;height:16px"><use href="#i-moon"/></svg> Тема: <span class="menu-theme-state">${document.documentElement.dataset.theme === 'dark' ? 'Светлая' : 'Тёмная'}</span></button>
        </div>
      </div>`;
    document.body.appendChild(ov);

    const openMenu = () => { ov.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; requestAnimationFrame(() => ov.classList.add('open')); };
    const closeMenu = () => { ov.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; setTimeout(() => { ov.hidden = true; }, 220); };
    menuBtn.addEventListener('click', () => ov.hidden ? openMenu() : closeMenu());
    ov.querySelector('.menu-close').addEventListener('click', closeMenu);
    ov.addEventListener('click', e => { if (e.target === ov) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !ov.hidden) closeMenu(); });

    // Аккордеон: открытие одного закрывает соседей того же уровня
    ov.querySelectorAll('.acc-head:not(.disabled)').forEach(head => {
      head.addEventListener('click', () => {
        const acc = head.parentElement;
        const body = acc.querySelector(':scope > .acc-body');
        if (!body) return;
        const parentAcc = acc.parentElement.closest('.acc');
        // запрет закрывать корневой ЕГЭ
        if (acc.dataset.acc === 'ege' && body.classList.contains('open')) return;
        const willOpen = !body.classList.contains('open');
        // закрыть соседей
        [...acc.parentElement.children].forEach(sib => {
          if (sib !== acc && sib.classList.contains('acc')) {
            sib.querySelector(':scope > .acc-body')?.classList.remove('open');
            sib.querySelector(':scope > .acc-head')?.classList.remove('open');
            sib.querySelector(':scope > .acc-head')?.setAttribute('aria-expanded', 'false');
          }
        });
        body.classList.toggle('open', willOpen);
        head.classList.toggle('open', willOpen);
        head.setAttribute('aria-expanded', String(willOpen));
      });
    });
    ov.querySelectorAll('.acc-head.disabled').forEach(b => b.addEventListener('click', () => window.showToast('Этот раздел скоро появится')));
    ov.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    ov.querySelector('#menu-theme').addEventListener('click', e => { const r = e.currentTarget.getBoundingClientRect(); toggleTheme(r.left + r.width / 2, r.top + r.height / 2); });
  }

  // Поиск (Ctrl+K)
  const overlay = $('#search-overlay');
  if (overlay) {
    const input = $('#global-search');
    const results = $('#search-results');
    let selected = 0, matches = [], previousFocus;
    const renderSearch = () => {
      const query = input.value.trim().toLowerCase();
      matches = window.TASKS.filter(task => [task.id, task.title, task.short, ...(task.tags || [])].join(' ').toLowerCase().includes(query)).slice(0, 8);
      selected = Math.min(selected, Math.max(0, matches.length - 1));
      results.innerHTML = matches.length ? matches.map((task, i) => `<a class="search-result ${i === selected ? 'selected' : ''}" href="/ege/informatika/${task.id}/"><span class="task-number">№ ${task.id}</span><span class="search-result-title">${escapeHtml(task.title)}<small>${escapeHtml(task.short)}</small></span><span class="status-label">${task.ready ? 'Разбор →' : 'скоро'}</span></a>`).join('') : '<div class="search-placeholder">Ничего не найдено. Попробуй «маска» или «13».</div>';
    };
    const openSearch = () => { previousFocus = document.activeElement; overlay.hidden = false; document.body.style.overflow = 'hidden'; input.value = ''; selected = 0; renderSearch(); input.focus(); };
    const closeSearch = () => { overlay.hidden = true; document.body.style.overflow = ''; previousFocus?.focus(); };
    $$('.search-open').forEach(b => b.addEventListener('click', openSearch));
    $('.modal-close')?.addEventListener('click', closeSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    input?.addEventListener('input', () => { selected = 0; renderSearch(); });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? openSearch() : closeSearch(); }
      if (overlay.hidden) return;
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); selected = (selected + (e.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length; renderSearch(); }
      if (e.key === 'Enter' && matches[selected]) window.location.href = `/ege/informatika/${matches[selected].id}/`;
    });
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
})();
