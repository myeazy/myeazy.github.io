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
    if (reduced || !document.startViewTransition) { applyTheme(dark); return; }
    const vt = document.startViewTransition(() => applyTheme(dark));
    vt.ready.then(() => {
      const cx = x ?? innerWidth / 2, cy = y ?? innerHeight / 2;
      const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${r}px at ${cx}px ${cy}px)`] },
        { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
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
    const card = task.ready ? 'a' : 'article';
    return `<${card} class="task-card${task.ready ? '' : ' placeholder'}"${task.ready ? ` href="/ege/informatika/${task.id}/" aria-label="Открыть разбор задания ${task.id}: ${escapeHtml(task.title)}"` : ''}>
      <div class="task-card-top"><span class="task-number">Задание ${String(task.id).padStart(2, '0')}</span><span class="task-level">${task.level}</span></div>
      <h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.short)}</p>
      <span class="card-ghost" aria-hidden="true">${String(task.id).padStart(2, '0')}</span>
      <div class="task-card-bottom">${task.ready ? `<span>${icon('clock')} ${task.practices.length} задачи · ${task.time} мин</span><span class="card-arrow" aria-hidden="true">↗</span>` : `<span class="card-tags"><span class="card-tag">скоро</span><span class="card-tag">${task.category === 'code' ? 'Python' : 'теория'}</span></span><span class="task-level">В работе</span>`}</div>
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

  // ===== Меню-шторка слева: фикс. шапка/низ, свайпы, 2 аккордеона =====
  const menuBtn = $('.menu-btn');
  if (menuBtn) {
    const ov = document.createElement('div');
    ov.className = 'menu-overlay';
    ov.id = 'menu-overlay';
    ov.hidden = true;
    ov.innerHTML = `
      <div class="menu-panel" role="dialog" aria-modal="true" aria-label="Меню">
        <div class="menu-head">
          <div class="menu-brand"><span class="menu-logo">EAZY<span class="brand-dot">.</span></span><span class="menu-tagline">Every Answer Zips to You</span></div>
          <button class="icon-button menu-close" aria-label="Закрыть меню"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        </div>
        <div class="menu-scroll">
          <div class="acc open" data-acc="ege">
            <button class="acc-head open" aria-expanded="true"><span class="acc-title">ЕГЭ</span><span class="menu-dot"></span><svg class="acc-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="acc-body open">
              <div class="acc" data-acc="subject">
                <button class="acc-head sub" aria-expanded="false"><span class="acc-title">Информатика</span><span class="menu-dot"></span><svg class="acc-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
                <div class="acc-body"><div class="menu-tasks">${window.TASKS.map(t => `<a href="/ege/informatika/${t.id}/"${t.ready ? '' : ' class="off"'}>№${t.id}</a>`).join('')}</div></div>
              </div>
              <button class="acc-head sub disabled" type="button"><span class="acc-title">Математика</span><span class="menu-soon">скоро</span></button>
              <button class="acc-head sub disabled" type="button"><span class="acc-title">Русский язык</span><span class="menu-soon">скоро</span></button>
              <button class="acc-head sub disabled" type="button"><span class="acc-title">Физика</span><span class="menu-soon">скоро</span></button>
            </div>
          </div>
          <div class="acc" data-acc="oge">
            <button class="acc-head disabled" aria-expanded="false" type="button"><span class="acc-title">ОГЭ</span><span class="menu-soon">скоро</span><svg class="acc-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
          </div>
        </div>
        <div class="menu-foot">
          <a class="menu-link accent" href="/support/"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z"/></svg> Поддержать</a>
          <a class="icon-button menu-mini" href="/info/" aria-label="О проекте"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/></svg></a>
          <button class="icon-button menu-mini" id="menu-theme" aria-label="Сменить тему"><svg viewBox="0 0 24 24"><use href="#i-moon"/></svg></button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    const panel = ov.querySelector('.menu-panel');

    const openMenu = () => { ov.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; requestAnimationFrame(() => ov.classList.add('open')); };
    const closeMenu = () => { ov.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; setTimeout(() => { ov.hidden = true; }, 240); };
    menuBtn.addEventListener('click', () => ov.hidden ? openMenu() : closeMenu());
    ov.querySelector('.menu-close').addEventListener('click', closeMenu);
    ov.addEventListener('click', e => { if (e.target === ov) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !ov.hidden) closeMenu(); });

    // Аккордеон: один открытый на уровне, корневой ЕГЭ не закрывается
    ov.querySelectorAll('.acc-head:not(.disabled)').forEach(head => {
      head.addEventListener('click', () => {
        const acc = head.parentElement;
        const body = acc.querySelector(':scope > .acc-body');
        if (!body) return;
        if (acc.dataset.acc === 'ege' && body.classList.contains('open')) return;
        const willOpen = !body.classList.contains('open');
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
    ov.querySelector('#menu-theme').addEventListener('click', e => toggleTheme(e.clientX, e.clientY));

    // Свайпы: открытие от левого края, закрытие свайпом влево — с отслеживанием пальца
    const W = () => panel.offsetWidth;
    let drag = null;
    const setX = dx => { panel.style.transition = 'none'; panel.style.transform = `translateX(${drag.from === -1 ? -100 + (100 * drag.dx / W()) : 0}%)`; };
    document.addEventListener('touchstart', e => {
      const x = e.touches[0].clientX, y = e.touches[0].clientY;
      if (ov.hidden && x < 28) drag = { from: -1, startX: x, startY: y, dx: 0, active: false };
      else if (!ov.hidden && ov.contains(e.target)) drag = { from: 0, startX: x, startY: y, dx: 0, active: false };
      else drag = null;
    }, { passive: true });
    document.addEventListener('touchmove', e => {
      if (!drag) return;
      const t = e.touches[0];
      const dx = t.clientX - drag.startX, dy = t.clientY - drag.startY;
      if (!drag.active) {
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.5) drag.active = true;
        else if (Math.abs(dy) > 10) { drag = null; return; }
        if (!drag?.active) return;
        if (drag.from === -1) { ov.hidden = false; document.body.style.overflow = 'hidden'; ov.classList.add('open'); }
      }
      drag.dx = dx;
      const w = W();
      let px;
      if (drag.from === -1) px = Math.min(0, -w + dx);        // открытие: -100% → 0
      else px = Math.min(0, dx);                              // закрытие: 0 → -100%
      panel.style.transition = 'none';
      panel.style.transform = `translateX(${px}px)`;
      ov.style.background = `rgba(14,15,16,${0.5 * (1 + px / w)})`;
    }, { passive: true });
    document.addEventListener('touchend', () => {
      if (!drag || !drag.active) { drag = null; return; }
      const w = W();
      const opened = drag.from === -1 ? (drag.dx > w * 0.3) : (drag.dx > -w * 0.3);
      panel.style.transition = '';
      panel.style.transform = '';
      ov.style.background = '';
      if (opened) { if (drag.from === -1) { menuBtn.setAttribute('aria-expanded', 'true'); } }
      else closeMenu();
      drag = null;
    }, { passive: true });
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
