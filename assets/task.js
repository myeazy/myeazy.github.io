(() => {
  'use strict';
  const { $, icon, escapeHtml, storage } = window.EAZY;
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'));
  const dataOk = typeof window.getTask === 'function' && typeof window.getTasks === 'function' && Array.isArray(window.CATALOG) && window.CATALOG.some(e => e.active && e.subjects.some(s => s.active));
  const firstActiveSubject = dataOk ? ((window.CATALOG.find(e => e.active) || window.CATALOG[0]).subjects.find(s => s.active) || {}).id : null;
  const subjectId = params.get('subject') || firstActiveSubject;
  const taskMeta = dataOk && subjectId ? window.getTask(id, subjectId) : null;
  const subjectData = dataOk ? (window.CATALOG.flatMap(e => e.subjects).find(s => s.id === subjectId) || {}) : {};
  const subjectName = subjectData.name || subjectId;
  const subjectCase = subjectData.caseForm || String(subjectName).toLowerCase();
  const root = $('#lesson-content');
  let task = null;

  const shareLink = window.EAZY.shareLink;

  function figBlock(fig) {
    if (!fig || !fig.svg) return '';
    return `<figure class="figure-card">${fig.svg}${fig.caption ? `<figcaption>${escapeHtml(fig.caption)}</figcaption>` : ''}</figure>`;
  }

  function normalize(value) {
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ').replace(/,\s*(?=\d)/g, '.').replace(/[ё]/g, 'е');
  }
  function highlightCode(source) {
    let s = escapeHtml(source);
    const stash = [];
    s = s.replace(/(#[^\n]*|('[^'\n]*'|"[^"\n]*"))/g, m => { stash.push(m); return `\x00${stash.length - 1}\x00`; });
    s = s.replace(/\b(from|import|for|in|if|all|range|break|print|def|return|while|len|int|not|and|or|with|as|strict)\b/g, '<span class="code-keyword">$1</span>');
    s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="code-number">$1</span>');
    s = s.replace(/(\x00\d+\x00)/g, token => {
      const m = stash[Number(token.replace(/\x00/g, ''))];
      const cls = m.startsWith('#') ? 'code-comment' : 'code-string';
      return `<span class="${cls}">${m}</span>`;
    });
    return s.replace(/\b(ip_network|product|max|min|abs|count)\b/g, '<span class="code-function">$1</span>');
  }
  function mathTex(src) {
    const GREEK = { alpha:'α', beta:'β', gamma:'γ', delta:'δ', theta:'θ', lambda:'λ', mu:'μ', pi:'π', sigma:'σ', phi:'φ', varphi:'φ', omega:'ω' };
    const OPS = { cdot:'·', times:'×', pm:'±', geq:'≥', leq:'≤', neq:'≠', to:'→', Rightarrow:'⇒', infty:'∞', deg:'°', approx:'≈', in:'∈' };
    const FN = ['log', 'ln', 'sin', 'cos', 'tg', 'ctg', 'lim', 'min', 'max'];
    let s = escapeHtml(src);
    s = s.replace(/\\begin\{[a-zA-Z*]+\}/g, '').replace(/\\end\{[a-zA-Z*]+\}/g, '');
    s = s.replace(/\\text\{([^{}]*)\}/g, '<span class="m-fn">$1</span>');
    s = s.replace(/\\overline\{([^{}]*)\}/g, '<span class="m-overline">$1</span>');
    s = s.replace(/\\left/g, '').replace(/\\right/g, '');
    s = s.replace(/\\\\/g, '<br>');
    let prev;
    do {
      prev = s;
      s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/, '<span class="m-frac"><span class="m-num">$1</span><span class="m-den">$2</span></span>');
    } while (s !== prev);
    s = s.replace(/\\sqrt\[([^\]]*)\]\{([^{}]*)\}/g, '<span class="m-sqrt"><span class="m-root">$1</span>√<span class="m-sqrt-body">$2</span></span>');
    s = s.replace(/\\sqrt\{([^{}]*)\}/g, '<span class="m-sqrt">√<span class="m-sqrt-body">$1</span></span>');
    s = s.replace(/\\vec\{([^{}]*)\}/g, '<span class="m-vec">$1</span>');
    s = s.replace(/\\([a-zA-Z]+)/g, (m, name) => GREEK[name] || OPS[name] || (FN.includes(name) ? '<span class="m-fn">' + name + '</span>' : name));
    s = s.replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>').replace(/\^(\S)/g, '<sup>$1</sup>');
    s = s.replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>').replace(/_(\S)/g, '<sub>$1</sub>');
    return '<span class="m">' + s + '</span>';
  }
  function mathInline(html) {
    return String(html).replace(/\$([^$]+)\$/g, (m, tex) => mathTex(tex));
  }
  function videoEmbed(url) {
    const u = typeof url === 'string' ? url : '';
    const ytId = (u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/) || [])[1];
    const rtId = (u.match(/rutube\.ru\/video\/([\da-f]+)/) || [])[1];
    if (ytId) return `https://www.youtube-nocookie.com/embed/${ytId}`;
    if (rtId) return `https://rutube.ru/play/embed/${rtId}/`;
    return null;
  }

  function renderBroken() {
    document.title = 'Что-то сломалось — EAZY';
    $('#breadcrumb-task').textContent = 'Ошибка';
    root.innerHTML = `<div class="empty-state" style="margin-top:10px"><h2 style="font-size:22px">Кажется, с сайтом беда 🛠</h2><p>Данные не загрузились так, как надо. Напиши нам — починим быстро.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px"><a class="button button-primary" href="https://t.me/eazy_official" target="_blank" rel="noopener noreferrer">Написать в Telegram</a><a class="button button-secondary" href="https://github.com/myeazy/myeazy.github.io/issues" target="_blank" rel="noopener noreferrer">Issue на GitHub</a></div></div>`;
  }

  function render() {
    const content = (window.EAZY_CONTENT || {})[id] || null;
    task = taskMeta ? { ...taskMeta, ...(content || {}) } : null;
    $('#breadcrumb-task').textContent = task ? `${task.id}` : 'Не найдено';
    const bcSubject = $('#breadcrumb-subject');
    if (bcSubject) {
      bcSubject.textContent = subjectName;
      bcSubject.addEventListener('click', () => storage.set('subject', subjectId));
    }
    if (!task) {
      root.innerHTML = `<div class="empty-state"><h3>Такого задания нет</h3><p>Проверь ссылку или выбери номер из каталога.</p><a class="button button-primary" href="/app/">К каталогу</a></div>`;
      document.title = 'Задание не найдено — EAZY';
      return;
    }
    document.title = `Задание ${task.id}: ${task.title} — EAZY`;
    if (taskMeta.ready && !content) {
      root.innerHTML = `<div class="empty-state" style="margin-top:10px"><h2 style="font-size:22px">Разбор не загрузился</h2><p>Похоже, сбоит соединение или кеш браузера. Чаще всего помогает обычное обновление страницы.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px"><button class="button button-primary" id="lesson-retry" type="button">Обновить страницу</button><a class="button button-secondary" href="/app/">В каталог</a></div></div>`;
      $('#lesson-retry')?.addEventListener('click', () => location.reload());
      return;
    }
    if (!taskMeta.ready) {
      const firstReady = window.getTasks(subjectId).find(x => x.ready);
      const altHref = firstReady ? `/task/?subject=${subjectId}&id=${firstReady.id}` : '/app/';
      const altLabel = firstReady ? `Открыть задание ${firstReady.id}` : 'В каталог';
      root.innerHTML = `<div class="empty-state" style="margin-top:10px"><h2 style="font-size:22px">Задание ${task.id}. ${escapeHtml(task.title)}</h2><p>${escapeHtml(task.short)}.<br>Полный разбор уже в работе — загляни позже, а пока посмотри готовые номера.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px"><a class="button button-primary" href="${altHref}">${altLabel}</a><a class="button button-secondary" href="/app/">Все задания</a></div></div>`;
      return;
    }
    const subjectTasks = window.getTasks(subjectId);
    const ready = subjectTasks.filter(t => t.ready);
    const readyIdx = ready.findIndex(t => t.id === task.id);
    const prev = readyIdx > 0 ? ready[readyIdx - 1] : null;
    const next = readyIdx >= 0 && readyIdx < ready.length - 1 ? ready[readyIdx + 1] : null;
    const embed = task.video ? videoEmbed(task.video) : null;
    const answers = storage.get(`answers-${subjectId}-${task.id}`, {});

    const hasVideo = !!task.video;
    const hasCode = !!task.code;
    const hasDerivation = Array.isArray(task.derivation) && task.derivation.length > 0;
    const errors = task.errors || [];
    const hasErrorsOnly = !hasCode && errors.length > 0;
    const practices = task.practices || [];

    const formulasBlock = `<div class="formula-grid">${(task.formulas || []).map(f => `<div class="formula-card"><h4>${escapeHtml(f[0])}</h4><p>${mathInline(f[1])}</p></div>`).join('')}</div>`;
    const stepsBlock = `<p class="sec-label">Алгоритм решения</p><ol class="algorithm-list">${(task.steps || []).map(s => `<li>${mathInline(s)}</li>`).join('')}</ol>`;
    const exampleBlock = `<div class="worked-example"><div class="example-problem"><p>${mathInline(task.example.text)}</p></div><div class="example-solution"><p>${mathInline(task.example.solution)}</p><div class="example-answer">${icon('check')} Ответ: <strong>${mathInline(escapeHtml(task.example.answer))}</strong></div></div></div>`;
    const errorsBox = `<div class="errors-box">${errors.map(e => `<div class="error-item"><button type="button" aria-expanded="false">${icon('plus')}<span>${mathInline(escapeHtml(e))}</span></button><p class="error-detail" hidden>Обрати на это внимание при проверке решения: именно здесь чаще всего теряют балл в этом номере.</p></div>`).join('')}</div>`;
    const codePanel = `<div class="code-panel"><div class="code-toolbar"><span class="file-tab">решение.py</span><span>python 3.12</span><button class="copy-code" data-copy>${icon('copy')} Копировать</button></div><pre><code>${highlightCode(task.code)}</code></pre><div class="code-note">${icon('info')} Код можно вставить в IDLE или редактор на экзамене — библиотеки из стандартной поставки разрешены.</div></div>`;

    // Шпаргалка — короткая выжимка без теории и без повторов.
    const cheatView = `
      <section class="lesson-section"><p class="sec-label">Формулы</p>${formulasBlock}</section>
      <section class="lesson-section">${stepsBlock}</section>
      <section class="lesson-section"><p class="sec-label">Пример</p>${exampleBlock}</section>
      ${errors.length ? `<section class="lesson-section"><p class="sec-label">Типичные ошибки</p>${errorsBox}</section>` : ''}
      ${hasCode ? `<section class="lesson-section"><p class="sec-label">Проверка кодом</p>${codePanel}</section>` : ''}`;

    // Полный разбор — всё остальное: теория, чертежи, выводы, тренировка.
    let fullNo = 0;
    const fnum = () => String(++fullNo).padStart(2, '0');
    const fullView = `
      <section class="lesson-section" id="theory"><h2><span class="section-index">${fnum()}</span>Теория без воды</h2>
        <p class="lead">${mathInline(task.theory)}</p>
        ${figBlock(task.figure)}
      </section>
      ${hasDerivation ? `<section class="lesson-section" id="derivation"><h2><span class="section-index">${fnum()}</span>Почему формулы работают</h2>
        <div class="proof-list">${task.derivation.map(d => `<div class="proof-card"><h3>${escapeHtml(d.title)}</h3><div class="proof-text">${mathInline(d.text)}</div></div>`).join('')}</div>
      </section>` : ''}
      <section class="lesson-section" id="example"><h2><span class="section-index">${fnum()}</span>Разбираем на примере</h2>
        ${exampleBlock}
      </section>
      ${hasVideo ? `<section class="lesson-section" id="video"><h2><span class="section-index">${fnum()}</span>Видеоразбор</h2>
        <div class="video-card"><div class="video-placeholder"><button class="video-play-button" aria-label="Загрузить видео">${icon('play')}</button><div class="video-info"><h3>${escapeHtml(task.videoTitle)}</h3><p>${escapeHtml(task.videoAuthor)} · загрузится после нажатия</p><a class="text-link" href="${task.video}" target="_blank" rel="noopener noreferrer">Открыть на сайте источника ↗</a></div></div></div>
      </section>` : ''}
      ${hasCode ? `<section class="lesson-section" id="code"><h2><span class="section-index">${fnum()}</span>Проверяем кодом</h2>
        <div class="material-tabs" role="tablist"><button class="material-tab active" data-tab="code" role="tab">Python-код</button><button class="material-tab" data-tab="mistakes" role="tab">Типичные ошибки</button></div>
        <div id="panel-code" role="tabpanel">${codePanel}</div>
        <div id="panel-mistakes" role="tabpanel" hidden>${errorsBox}</div>
      </section>` : (hasErrorsOnly ? `<section class="lesson-section" id="errors"><h2><span class="section-index">${fnum()}</span>Типичные ошибки</h2>${errorsBox}</section>` : '')}
      ${practices.length ? `<section class="lesson-section" id="practice"><div class="practice-header"><h2><span class="section-index">${fnum()}</span>Тренировка</h2></div>
        <div class="practice-area">${practices.map((p, i) => {
          const saved = answers[i];
          const savedFeedback = saved ? (saved.correct
            ? `<strong>Верно.</strong><div class="answer-explanation">${mathInline(p.explanation)}</div>`
            : `<strong>Не сходится.</strong> Правильный ответ: <strong>${mathInline(escapeHtml(p.answer))}</strong>.<div class="answer-explanation">${mathInline(p.explanation)}</div>`) : '';
          return `<article class="practice-card ${saved ? (saved.correct ? 'correct' : 'incorrect') : ''}" data-index="${i}">
            <div class="practice-card-header"><span class="practice-label">Задача ${i + 1}</span><h3>${mathInline(p.text)}</h3>${figBlock(p.figure)}</div>
            <div class="practice-controls"><input class="answer-input" type="text" inputmode="text" placeholder="Твой ответ" value="${saved ? escapeHtml(saved.value) : ''}" autocomplete="off"><div class="practice-btns"><button class="hint-button" data-hint="${i}">Подсказка</button><button class="button button-primary" data-check="${i}">${icon('check')} Проверить</button></div></div>
            <div class="practice-feedback">${savedFeedback}</div>
          </article>`;
        }).join('')}</div>
      </section>` : ''}`;

    const views = { cheat: cheatView, full: fullView };
    const mode = storage.get('view-mode', 'cheat') === 'full' ? 'full' : 'cheat';

    const shellHtml = m => `
      <div class="lesson-header">
        <div class="lesson-head-main">
          <h1>${escapeHtml(task.title)}</h1>
          <p class="lesson-description">${mathInline(escapeHtml(task.intro))}</p>
        </div>
        <button class="lesson-share" id="lesson-share" type="button" aria-label="Поделиться разбором" title="Поделиться разбором">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>
        </button>
      </div>
      <div class="lesson-toggle" role="tablist" aria-label="Режим страницы">
        <button class="lt-btn${m === 'cheat' ? ' active' : ''}" data-mode="cheat" role="tab" aria-selected="${m === 'cheat'}">⚡ Шпаргалка</button>
        <button class="lt-btn${m === 'full' ? ' active' : ''}" data-mode="full" role="tab" aria-selected="${m === 'full'}">Полный разбор</button>
      </div>
      <div class="lesson-layout" data-mode="${m}">
        <div class="lesson-content">
          <div id="lesson-view">${views[m]}</div>
          <nav class="lesson-nav">${prev ? `<a href="/task/?subject=${subjectId}&id=${prev.id}"><small>← Предыдущий разбор</small>Задание ${prev.id}: ${escapeHtml(prev.short)}</a>` : '<span></span>'}${next ? `<a class="next" href="/task/?subject=${subjectId}&id=${next.id}"><small>Следующий разбор →</small>Задание ${next.id}: ${escapeHtml(next.short)}</a>` : '<span></span>'}</nav>
        </div>
        <aside class="lesson-aside"><div class="toc"><p class="toc-title">Содержание</p><nav>
          <a href="#theory" class="active">Теория</a>${hasDerivation ? '<a href="#derivation">Почему формулы</a>' : ''}<a href="#example">Пример</a>${hasVideo ? '<a href="#video">Видеоразбор</a>' : ''}${hasCode ? '<a href="#code">Код и ошибки</a>' : (hasErrorsOnly ? '<a href="#errors">Типичные ошибки</a>' : '')}${practices.length ? '<a href="#practice">Тренировка</a>' : ''}
        </nav></div></aside>
      </div>`;

    root.innerHTML = shellHtml(mode);

    const bindView = () => {
      const view = root.querySelector('#lesson-view');
      if (!view) return;

      view.querySelector('.video-play-button')?.addEventListener('click', () => {
        if (!embed) {
          window.showToast('Видео откроется на сайте источника');
          window.open(task.video, '_blank', 'noopener');
          return;
        }
        const card = view.querySelector('.video-card');
        card.innerHTML = `<div class="video-embed"><iframe src="${embed}" title="${escapeHtml(task.videoTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
      });

      view.querySelectorAll('.material-tab').forEach(tab => tab.addEventListener('click', () => {
        view.querySelectorAll('.material-tab').forEach(t => t.classList.toggle('active', t === tab));
        const pc = view.querySelector('#panel-code');
        const pm = view.querySelector('#panel-mistakes');
        if (pc) pc.hidden = tab.dataset.tab !== 'code';
        if (pm) pm.hidden = tab.dataset.tab !== 'mistakes';
      }));

      view.querySelectorAll('.error-item button').forEach(btn => btn.addEventListener('click', () => {
        const item = btn.closest('.error-item'); const open = item.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', open); item.querySelector('.error-detail').hidden = !open;
      }));

      view.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(task.code); window.showToast('Код скопирован в буфер обмена'); }
        catch { window.showToast('Не получилось скопировать — выдели код вручную'); }
      }));

      const check = (card, index) => {
        const p = practices[index];
        const inputEl = card.querySelector('.answer-input');
        const feedback = card.querySelector('.practice-feedback');
        const value = inputEl.value;
        if (!value.trim()) { window.showToast('Сначала введи ответ'); inputEl.focus(); return; }
        const correct = p.accepted.some(a => normalize(a) === normalize(value));
        card.classList.remove('correct', 'incorrect'); card.classList.add(correct ? 'correct' : 'incorrect');
        inputEl.setAttribute('aria-invalid', String(!correct));
        feedback.innerHTML = correct ? `<strong>Верно.</strong><div class="answer-explanation">${mathInline(p.explanation)}</div>` : `<strong>Не сходится.</strong> Правильный ответ: <strong>${mathInline(escapeHtml(p.answer))}</strong>.<div class="answer-explanation">${mathInline(p.explanation)}</div>`;
        const cur = storage.get(`answers-${subjectId}-${task.id}`, {});
        cur[index] = { value, correct }; storage.set(`answers-${subjectId}-${task.id}`, cur);
        if (correct) window.showToast('Верно! Так держать');
      };
      view.querySelectorAll('[data-check]').forEach(btn => btn.addEventListener('click', () => check(btn.closest('.practice-card'), Number(btn.dataset.check))));
      view.querySelectorAll('.answer-input').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(inp.closest('.practice-card'), Number(inp.closest('.practice-card').dataset.index)); }));
      view.querySelectorAll('[data-hint]').forEach(btn => btn.addEventListener('click', () => {
        const card = btn.closest('.practice-card');
        if (card.querySelector('.practice-hint')) { card.querySelector('.practice-hint').remove(); return; }
        card.insertAdjacentHTML('beforeend', `<div class="practice-hint">${icon('info')} ${mathInline(practices[Number(btn.dataset.hint)].hint)}</div>`);
      }));

      const links = [...root.querySelectorAll('.toc a')];
      const sections = links.map(a => root.querySelector(a.getAttribute('href'))).filter(Boolean);
      if (sections.length) {
        const spy = new IntersectionObserver(entries => {
          entries.forEach(en => { if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`)); });
        }, { rootMargin: '-20% 0px -60% 0px' });
        sections.forEach(s => spy.observe(s));
      }
    };

    const bindToggle = () => {
      root.querySelectorAll('.lt-btn').forEach(btn => btn.addEventListener('click', () => {
        const m = btn.dataset.mode;
        const layout = root.querySelector('.lesson-layout');
        if (!layout || layout.dataset.mode === m) return;
        const values = [...root.querySelectorAll('.answer-input')].map(i => i.value);
        root.querySelectorAll('.lt-btn').forEach(x => { x.classList.toggle('active', x === btn); x.setAttribute('aria-selected', String(x === btn)); });
        layout.dataset.mode = m;
        storage.set('view-mode', m);
        const host = root.querySelector('#lesson-view');
        if (host) {
          host.innerHTML = views[m];
          host.querySelectorAll('.answer-input').forEach((el, i) => { if (values[i]) el.value = values[i]; });
        }
        bindView();
        window.scrollTo(0, 0);
      }));
    };

    bindToggle();
    bindView();

    $('#lesson-share')?.addEventListener('click', () => {
      const data = {
        title: `Задание ${task.id}: ${task.title} — EAZY`,
        text: `🔥 Смотри, я нашёл разбор задания ${task.id} ЕГЭ по ${subjectCase}. Попробуй решить сам — это проще, чем кажется!`,
        url: location.href
      };
      if (shareLink) { shareLink(data); return; }
      if (navigator.share) { navigator.share(data).catch(() => {}); return; }
      window.showToast('Не получилось поделиться — скопируй ссылку из адресной строки');
    });
  }

  window.addEventListener('scroll', () => {
    const bar = $('#reading-progress');
    if (!bar) return;
    const h = document.documentElement;
    bar.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100}%`;
  }, { passive: true });

  const loadContent = done => {
    if (!taskMeta || !taskMeta.ready) { done(); return; }
    const s = document.createElement('script');
    s.src = `/assets/tasks/${subjectId}/${String(id).padStart(2, '0')}.js`;
    s.onload = () => done();
    s.onerror = () => done();
    document.head.appendChild(s);
  };
  document.addEventListener('DOMContentLoaded', () => dataOk ? loadContent(render) : renderBroken());
})();
