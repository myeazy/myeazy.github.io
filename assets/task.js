(() => {
  'use strict';
  const { $, icon, escapeHtml, storage } = window.Yasno;
  let id = Number(new URLSearchParams(location.search).get('id'));
  const m = location.pathname.match(/\/ege\/([a-z-]+)\/(\d+)/);
  if (m) id = Number(m[2]);
  const taskMeta = window.TASKS.find(t => t.id === id);
  const content = (window.EAZY_CONTENT || {})[id] || null;
  const task = taskMeta ? { ...taskMeta, ...(content || {}) } : null;
  if (task) task.ready = taskMeta.ready && !!content;
  const root = $('#lesson-content');
  $('#breadcrumb-task').textContent = task ? `${task.id}` : 'Не найдено';

  function normalize(value) {
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ').replace(/,(\d)/g, '.$1').replace(/[ё]/g, 'е');
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
  function videoEmbed(url) {
    let embed = null;
    const yt = value => (value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/) || [])[1];
    const rt = value => (value.match(/rutube\.ru\/video\/([\da-f]+)/) || [])[1];
    const ytId = yt(urlSafe(task.video)); const rtId = rt(urlSafe(task.video));
    if (ytId) embed = `https://www.youtube-nocookie.com/embed/${ytId}`;
    else if (rtId) embed = `https://rutube.ru/play/embed/${rtId}/`;
    return embed;
    function urlSafe(v) { return typeof v === 'string' ? v : ''; }
  }

  function render() {
    if (!task) {
      root.innerHTML = `<div class="empty-state"><h3>Такого задания нет</h3><p>Проверь ссылку или выбери номер из каталога.</p><a class="button button-primary" href="/app/">К каталогу</a></div>`;
      document.title = 'Задание не найдено — EAZY';
      return;
    }
    document.title = `Задание ${task.id}: ${task.title} — EAZY`;
    if (!task.ready) {
      root.innerHTML = `<div class="empty-state" style="margin-top:10px"><h2 style="font-size:22px">Задание ${task.id}. ${escapeHtml(task.title)}</h2><p>${escapeHtml(task.short)}.<br>Полный разбор уже в работе — загляни позже, а пока посмотри готовые номера.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px"><a class="button button-primary" href="/ege/informatika/8/">Открыть задание 8</a><a class="button button-secondary" href="/app/">Все задания</a></div></div>`;
      return;
    }
    const next = window.TASKS.find(t => t.ready && t.id > task.id) || window.TASKS.find(t => t.ready);
    const prev = [...window.TASKS].reverse().find(t => t.ready && t.id < task.id);
    const embed = task.video ? videoEmbed(task.video) : null;
    const answers = storage.get(`answers-${task.id}`, {});

    root.innerHTML = `
      <div class="lesson-header">
        <div>
        <h1>${escapeHtml(task.title)}</h1><p class="lesson-description">${escapeHtml(task.intro)}</p>
        <div class="lesson-meta"><span>${icon('clock')} ${task.time} мин чтения</span><span>${icon('check')} Уровень: ${task.level}</span><span>${icon('code')} Python</span></div></div>
      </div>
      <div class="lesson-layout">
        <div class="lesson-content">
          <section class="lesson-section" id="theory"><h2><span class="section-index">01</span>Теория без воды</h2>
            <p class="lead">${task.theory}</p>
            <div class="formula-grid">${task.formulas.map(f => `<div class="formula-card"><h4>${escapeHtml(f[0])}</h4><p>${f[1]}</p></div>`).join('')}</div>
            <hr class="theory-divider">
            <p class="sec-label">Алгоритм решения</p>
            <ol class="algorithm-list">${task.steps.map(s => `<li>${s}</li>`).join('')}</ol>
          </section>
          <section class="lesson-section" id="example"><h2><span class="section-index">02</span>Разбираем на примере</h2>
            <div class="worked-example"><div class="example-problem"><p>${task.example.text}</p></div><div class="example-solution"><p>${task.example.solution}</p><div class="example-answer">${icon('check')} Ответ: <strong>${escapeHtml(task.example.answer)}</strong></div></div></div>
          </section>
          ${task.video ? `<section class="lesson-section" id="video"><h2><span class="section-index">03</span>Видеоразбор</h2>
            <div class="video-card"><div class="video-placeholder"><button class="video-play-button" aria-label="Загрузить видео">${icon('play')}</button><div class="video-info"><h3>${escapeHtml(task.videoTitle)}</h3><p>${escapeHtml(task.videoAuthor)} · загрузится после нажатия</p><a class="text-link" href="${task.video}" target="_blank" rel="noopener noreferrer">Открыть на сайте источника ↗</a></div></div></div>
          </section>` : ''}
          <section class="lesson-section" id="code"><h2><span class="section-index">${task.video ? '04' : '03'}</span>Проверяем кодом</h2>
            <div class="material-tabs" role="tablist"><button class="material-tab active" data-tab="code" role="tab">Python-код</button><button class="material-tab" data-tab="mistakes" role="tab">Типичные ошибки</button></div>
            <div id="panel-code" role="tabpanel"><div class="code-panel"><div class="code-toolbar"><span class="file-tab">решение.py</span><span>python 3.12</span><button class="copy-code" id="copy-code">${icon('copy')} Копировать</button></div><pre><code id="code-block">${highlightCode(task.code)}</code></pre><div class="code-note">${icon('info')} Код можно вставить в IDLE или редактор на экзамене — библиотеки из стандартной поставки разрешены.</div></div></div>
            <div id="panel-mistakes" role="tabpanel" hidden><div class="errors-box">${task.errors.map(e => `<div class="error-item"><button type="button" aria-expanded="false">${icon('plus')}<span>${escapeHtml(e)}</span></button><p class="error-detail" hidden>Обрати на это внимание при проверке решения: именно здесь чаще всего теряют балл в этом номере.</p></div>`).join('')}</div></div>
          </section>
          <section class="lesson-section" id="practice"><div class="practice-header"><h2><span class="section-index">${task.video ? '05' : '04'}</span>Тренировка</h2></div>
            <div class="practice-area">${task.practices.map((p, i) => {
              const saved = answers[i];
              return `<article class="practice-card ${saved ? (saved.correct ? 'correct' : 'incorrect') : ''}" data-index="${i}">
                <div class="practice-card-header"><span class="practice-label">Задача ${i + 1}</span><h3>${p.text}</h3></div>
                <div class="practice-controls"><input class="answer-input" type="text" inputmode="text" placeholder="Твой ответ" value="${saved ? escapeHtml(saved.value) : ''}" autocomplete="off"><div class="practice-btns"><button class="hint-button" data-hint="${i}">Подсказка</button><button class="button button-primary" data-check="${i}">${icon('check')} Проверить</button></div></div>
                <div class="practice-feedback"></div>
              </article>`;
            }).join('')}</div>
          </section>
          <nav class="lesson-nav">${prev ? `<a href="/ege/informatika/${prev.id}/"><small>← Предыдущий разбор</small>Задание ${prev.id}: ${escapeHtml(prev.short)}</a>` : '<span></span>'}${next && next.id !== task.id ? `<a class="next" href="/ege/informatika/${next.id}/"><small>Следующий разбор →</small>Задание ${next.id}: ${escapeHtml(next.short)}</a>` : '<span></span>'}</nav>
        </div>
        <aside class="lesson-aside"><div class="toc"><p class="toc-title">Содержание</p><nav>
          <a href="#theory" class="active">Теория</a><a href="#example">Пример</a>${task.video ? '<a href="#video">Видеоразбор</a>' : ''}<a href="#code">Код и ошибки</a><a href="#practice">Тренировка</a>
        </nav></div></aside>
      </div>`;

    root.querySelector('.video-play-button')?.addEventListener('click', () => {
      if (!embed) return;
      const card = root.querySelector('.video-card');
      card.innerHTML = `<div class="video-embed"><iframe src="${embed}" title="${escapeHtml(task.videoTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
    });

    root.querySelectorAll('.material-tab').forEach(tab => tab.addEventListener('click', () => {
      root.querySelectorAll('.material-tab').forEach(t => t.classList.toggle('active', t === tab));
      $('#panel-code').hidden = tab.dataset.tab !== 'code';
      $('#panel-mistakes').hidden = tab.dataset.tab !== 'mistakes';
    }));
    root.querySelectorAll('.error-item button').forEach(btn => btn.addEventListener('click', () => {
      const item = btn.closest('.error-item'); const open = item.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', open); item.querySelector('.error-detail').hidden = !open;
    }));
    $('#copy-code').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(task.code); window.showToast('Код скопирован в буфер обмена'); }
      catch { window.showToast('Не получилось скопировать — выдели код вручную'); }
    });

    const check = (card, index) => {
      const p = task.practices[index];
      const inputEl = card.querySelector('.answer-input');
      const feedback = card.querySelector('.practice-feedback');
      const value = inputEl.value;
      if (!value.trim()) { window.showToast('Сначала введи ответ'); inputEl.focus(); return; }
      const correct = p.accepted.some(a => normalize(a) === normalize(value));
      card.classList.remove('correct', 'incorrect'); card.classList.add(correct ? 'correct' : 'incorrect');
      feedback.innerHTML = correct ? `<strong>Верно.</strong><div class="answer-explanation">${p.explanation}</div>` : `<strong>Не сходится.</strong> Правильный ответ: <strong>${escapeHtml(p.answer)}</strong>.<div class="answer-explanation">${p.explanation}</div>`;
      const cur = storage.get(`answers-${task.id}`, {});
      cur[index] = { value, correct }; storage.set(`answers-${task.id}`, cur);
      if (correct) { inputEl.setAttribute('aria-invalid', 'false'); window.showToast('Верно! Так держать'); }
    };
    root.querySelectorAll('[data-check]').forEach(btn => btn.addEventListener('click', () => check(btn.closest('.practice-card'), Number(btn.dataset.check))));
    root.querySelectorAll('.answer-input').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(inp.closest('.practice-card'), Number(inp.closest('.practice-card').dataset.index)); }));
    root.querySelectorAll('[data-hint]').forEach(btn => btn.addEventListener('click', () => {
      const card = btn.closest('.practice-card');
      if (card.querySelector('.practice-hint')) { card.querySelector('.practice-hint').remove(); return; }
      card.insertAdjacentHTML('beforeend', `<div class="practice-hint">${icon('info')} ${task.practices[Number(btn.dataset.hint)].hint}</div>`);
    }));

    const links = root.querySelectorAll('.toc a');
    const sections = [...links].map(a => root.querySelector(a.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`)); });
    }, { rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(s => spy.observe(s));
  }
  window.addEventListener('scroll', () => {
    const bar = $('#reading-progress');
    if (!bar) return;
    const h = document.documentElement;
    bar.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100}%`;
  }, { passive: true });
  document.addEventListener('DOMContentLoaded', render);
})();
