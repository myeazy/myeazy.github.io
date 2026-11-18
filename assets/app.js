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

  function applyTheme(dark) {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $$('#menu-theme use').forEach(u => u.setAttribute('href', dark ? '#i-sun' : '#i-moon'));
    $('meta[name="theme-color"]')?.setAttribute('content', dark ? '#131517' : '#f4f2ec');
  }
  applyTheme(document.documentElement.dataset.theme === 'dark');

  function toggleTheme(x, y) {
    const dark = document.documentElement.dataset.theme !== 'dark';
    try { localStorage.setItem('yasno-theme', dark ? 'dark' : 'light'); } catch (_) {}
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isYandex = /YaBrowser/i.test(navigator.userAgent);
    if (reduced) { applyTheme(dark); return; }
    if (!isYandex && document.startViewTransition) {
      const vt = document.startViewTransition(() => applyTheme(dark));
      vt.ready.then(() => {
        const cx = x ?? innerWidth / 2, cy = y ?? innerHeight / 2;
        const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${r}px at ${cx}px ${cy}px)`] },
          { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(() => {});
      return;
    }
    const cx = x ?? innerWidth / 2, cy = y ?? innerHeight / 2;
    const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    const clip = document.createElement('div');
    clip.className = 'theme-reveal';
    clip.dataset.to = dark ? 'dark' : 'light';
    document.body.appendChild(clip);
    const anim = clip.animate(
      [{ clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${r}px at ${cx}px ${cy}px)` }],
      { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
    );
    anim.onfinish = () => {
      applyTheme(dark);
      clip.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' }).onfinish = () => clip.remove();
    };
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

  const activeExam = () => window.CATALOG.find(e => e.active) || window.CATALOG[0];
  const firstSubject = () => activeExam().subjects.find(s => s.active)?.id || 'informatika';
  const subjectMeta = sid => activeExam().subjects.find(s => s.id === sid) || null;
  const taskUrl = (sid, id) => `/task/?subject=${sid}&id=${id}`;

  let currentSubject = storage.get('subject', firstSubject());
  if (!window.getTasks(currentSubject).length) currentSubject = firstSubject();

  function taskCard(task, sid) {
    const card = task.ready ? 'a' : 'article';
    return `<${card} class="task-card${task.ready ? '' : ' placeholder'}"${task.ready ? ` href="${taskUrl(sid, task.id)}" aria-label="Открыть разбор задания ${task.id}: ${escapeHtml(task.title)}"` : ''}>
      <div class="task-card-top"><span class="task-number">Задание ${String(task.id).padStart(2, '0')}</span><span class="task-level">${task.level}</span></div>
      <h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.short)}</p>
      <span class="card-ghost" aria-hidden="true">${String(task.id).padStart(2, '0')}</span>
      <div class="task-card-bottom">${task.ready ? `<span>${icon('clock')} ${task.time} мин чтения</span><span class="card-arrow" aria-hidden="true">↗</span>` : `<span class="card-tags"><span class="card-tag">скоро</span><span class="card-tag">${task.category === 'code' ? 'Python' : 'теория'}</span></span><span class="task-level">В работе</span>`}</div>
    </${card}>`;
  }

  const catalogGrid = $('#catalog-grid');
  if (catalogGrid) {
    const renderCatalog = () => {
      const query = ($('#catalog-search').value || '').trim().toLowerCase();
      const list = window.getTasks(currentSubject).filter(task => {
        const haystack = [task.id, task.title, task.short, ...(task.tags || [])].join(' ').toLowerCase();
        return haystack.includes(query);
      });
      catalogGrid.innerHTML = list.map(task => taskCard(task, currentSubject)).join('');
      $('#catalog-empty').hidden = list.length > 0;
    };
    $('#catalog-search').addEventListener('input', renderCatalog);
    $('#reset-catalog')?.addEventListener('click', () => { $('#catalog-search').value = ''; renderCatalog(); });
    const syncSubjectLabel = () => {
      const meta = subjectMeta(currentSubject);
      if (meta) $$('[data-select="subject"] > span').forEach(el => el.textContent = meta.caseForm);
      $$('[data-select="exam"] > span').forEach(el => el.textContent = activeExam().label);
    };
    syncSubjectLabel();
    window.addEventListener('eazy:subject', e => {
      const sid = e.detail;
      if (!window.getTasks(sid).length) return;
      currentSubject = sid;
      storage.set('subject', sid);
      syncSubjectLabel();
      renderCatalog();
    });
    renderCatalog();
  }

  const allSearchable = () => window.CATALOG.filter(e => e.active).flatMap(e =>
    e.subjects.filter(s => s.active).flatMap(s =>
      window.getTasks(s.id).map(t => ({ ...t, _sid: s.id, _sname: s.name }))));
  const taskMatches = query => {
    const q = query.trim().toLowerCase();
    return allSearchable().filter(t => [t.id, t.title, t.short, t._sname, ...(t.tags || [])].join(' ').toLowerCase().includes(q));
  };
  const resultRow = task => `<a class="search-result" href="${taskUrl(task._sid, task.id)}"><span class="task-number">№ ${task.id}</span><span class="search-result-title">${escapeHtml(task.title)}<small>${escapeHtml(task.short)} · ${escapeHtml(task._sname)}</small></span><span class="status-label">${task.ready ? 'Разбор →' : 'скоро'}</span></a>`;

  const menuBtn = $('.menu-btn');
  if (menuBtn) {
    const CHEV = '<svg class="acc-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>';
    const menuExams = window.CATALOG.map(exam => {
      if (!exam.active) {
        return `<div class="acc" data-acc="${exam.id}">
          <button class="acc-head disabled" type="button"><span class="acc-title">${exam.label}</span><span class="menu-soon">скоро</span>${CHEV}</button>
        </div>`;
      }
      const subjects = exam.subjects.filter(s => s.inMenu).map(s => {
        if (!s.active) return `<button class="acc-head sub disabled" type="button"><span class="acc-title">${s.name}</span><span class="menu-soon">скоро</span></button>`;
        return `<div class="acc" data-acc="${s.id}">
          <button class="acc-head sub" aria-expanded="false"><span class="acc-title">${s.name}</span>${CHEV}</button>
          <div class="acc-body"><div class="menu-tasks">${window.getTasks(s.id).map(t => `<a href="${taskUrl(s.id, t.id)}"${t.ready ? '' : ' class="off"'}>№${t.id}</a>`).join('')}</div></div>
        </div>`;
      }).join('');
      return `<div class="acc open" data-acc="${exam.id}">
        <button class="acc-head open" aria-expanded="true"><span class="acc-title">${exam.label}</span>${CHEV}</button>
        <div class="acc-body open">${subjects}</div>
      </div>`;
    }).join('');

    const ov = document.createElement('div');
    ov.className = 'menu-overlay';
    ov.id = 'menu-overlay';
    ov.hidden = true;
    ov.innerHTML = `
      <div class="menu-panel" role="dialog" aria-modal="true" aria-label="Меню">
        <div class="menu-head">
          <div class="menu-brand"><a class="menu-logo" href="/app/">EAZY<span class="brand-dot">.</span></a><span class="menu-tagline">Every Answer Zips to You</span></div>
          <button class="icon-button menu-close" aria-label="Закрыть меню"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        </div>
        <div class="menu-search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="menu-search-input" type="search" placeholder="Предмет или экзамен…" autocomplete="off" aria-label="Поиск по предметам"></div>
        <div class="menu-scroll">
          <div class="menu-results" id="menu-results" hidden></div>
          <div class="menu-nav" id="menu-nav">${menuExams}</div>
        </div>
        <div class="menu-foot">
          <a class="menu-link accent" href="/support/"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z"/></svg> Поддержать</a>
          <a class="icon-button menu-mini" href="/info/" aria-label="О проекте"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/></svg></a>
          <button class="icon-button menu-mini" id="menu-theme" aria-label="Сменить тему"><svg viewBox="0 0 24 24"><use href="#i-moon"/></svg></button>
        </div>
      </div>`;
    document.body.appendChild(ov);

    const openMenu = () => { ov.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; requestAnimationFrame(() => ov.classList.add('open')); };
    const closeMenu = () => { ov.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; setTimeout(() => { ov.hidden = true; }, 240); };
    menuBtn.addEventListener('click', () => ov.hidden ? openMenu() : closeMenu());
    ov.querySelector('.menu-close').addEventListener('click', closeMenu);
    ov.addEventListener('click', e => { if (e.target === ov) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !ov.hidden) closeMenu(); });

    ov.querySelectorAll('.acc-head:not(.disabled)').forEach(head => {
      head.addEventListener('click', () => {
        const acc = head.parentElement;
        const body = acc.querySelector(':scope > .acc-body');
        if (!body) return;
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
    ov.querySelector('#menu-theme').addEventListener('click', e => {
      const b = e.currentTarget.getBoundingClientRect();
      toggleTheme(b.left + b.width / 2, b.top + b.height / 2);
    });

    const menuSearch = ov.querySelector('#menu-search-input');
    const menuResults = ov.querySelector('#menu-results');
    const menuNav = ov.querySelector('#menu-nav');
    menuSearch.addEventListener('input', () => {
      if (!menuSearch.value.trim()) { menuResults.hidden = true; menuNav.hidden = false; return; }
      const q = menuSearch.value.trim().toLowerCase();
      const rows = [];
      window.CATALOG.forEach(exam => {
        if (exam.label.toLowerCase().includes(q)) rows.push({ title: exam.label, sub: exam.active ? 'Каталог заданий' : 'раздел скоро появится', href: exam.active ? '/app/' : null });
        exam.subjects.forEach(s => {
          if (s.name.toLowerCase().includes(q) || s.caseForm.includes(q)) rows.push({ title: s.name, sub: exam.label + (s.active ? ' · каталог' : ' · скоро'), href: s.active ? '/app/' : null });
        });
      });
      menuResults.innerHTML = rows.length ? rows.map(r => r.href
        ? `<a class="search-result" href="${r.href}"><span class="search-result-title">${r.title}<small>${r.sub}</small></span><span class="status-label">Открыть →</span></a>`
        : `<div class="search-result"><span class="search-result-title">${r.title}<small>${r.sub}</small></span><span class="status-label">скоро</span></div>`).join('')
        : '<div class="search-placeholder">Ничего не найдено. Попробуй «информатика».</div>';
      menuResults.hidden = false;
      menuNav.hidden = true;
      menuResults.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    });

    applyTheme(document.documentElement.dataset.theme === 'dark');
  }

  const shareBtn = $('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const data = { title: 'EAZY — разборы ЕГЭ', text: 'Понятные разборы заданий ЕГЭ: теория, примеры, код и тренировка с проверкой ответа.', url: 'https://myeazy.github.io/' };
      try {
        if (navigator.share) { await navigator.share(data); return; }
        await navigator.clipboard.writeText(data.url);
        window.showToast('Ссылка скопирована — отправь друзьям');
      } catch (e) { if (e && e.name !== 'AbortError') window.showToast('Не получилось — скопируй ссылку из адресной строки'); }
    });
  }

  const overlay = $('#search-overlay');
  if (overlay) {
    const input = $('#global-search');
    const results = $('#search-results');
    let selected = 0, matches = [], previousFocus;
    const renderSearch = () => {
      matches = taskMatches(input.value).slice(0, 8);
      selected = Math.min(selected, Math.max(0, matches.length - 1));
      results.innerHTML = matches.length ? matches.map((task, i) => resultRow(task).replace('class="search-result"', `class="search-result ${i === selected ? 'selected' : ''}'`)).join('') : '<div class="search-placeholder">Ничего не найдено. Попробуй «маска» или «13».</div>';
    };
    const openSearch = () => { previousFocus = document.activeElement; overlay.hidden = false; document.body.style.overflow = 'hidden'; input.value = ''; selected = 0; renderSearch(); input.focus(); };
    const closeSearch = () => { overlay.hidden = true; document.body.style.overflow = ''; previousFocus?.focus(); };
    $('.modal-close')?.addEventListener('click', closeSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    input?.addEventListener('input', () => { selected = 0; renderSearch(); });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? openSearch() : closeSearch(); }
      if (overlay.hidden) return;
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); selected = (selected + (e.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length; renderSearch(); }
      if (e.key === 'Enter' && matches[selected]) window.location.href = taskUrl(matches[selected]._sid, matches[selected].id);
    });
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return;
      reloaded = true;
      location.reload();
    });
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').then(reg => reg.update()).catch(() => {}));
  }
})();
