(() => {
  'use strict';
  const { storage } = window.Yasno;
  const exam = () => window.CATALOG.find(e => e.active) || window.CATALOG[0];

  const itemsFor = key => {
    if (key === 'exam') return window.CATALOG.map(e => ({ id: e.id, label: e.label, enabled: e.active, current: e.active }));
    const cur = storage.get('subject', '');
    return exam().subjects.map(s => ({ id: s.id, label: s.caseForm, enabled: s.active, current: s.id === cur }));
  };

  let openPop = null;

  function closePop() {
    if (openPop) { openPop.pop.remove(); openPop.btn.setAttribute('aria-expanded', 'false'); openPop = null; }
  }

  function makePop(btn, key) {
    closePop();
    const pop = document.createElement('div');
    pop.className = 'select-pop';
    pop.setAttribute('role', 'listbox');
    pop.innerHTML = `
      <div class="select-pop-search"><svg><use href="#i-search"/></svg><input type="text" placeholder="Поиск…" autocomplete="off"></div>
      <div class="select-pop-list"></div>`;
    document.body.appendChild(pop);

    const rect = btn.getBoundingClientRect();
    pop.style.top = `${rect.bottom + window.scrollY + 6}px`;
    pop.style.left = `${Math.max(16, Math.min(rect.left + window.scrollX, window.innerWidth - 246))}px`;

    const list = pop.querySelector('.select-pop-list');
    const input = pop.querySelector('input');
    const items = itemsFor(key);
    const render = q => {
      const query = (q || '').trim().toLowerCase();
      const filtered = items.filter(i => i.label.toLowerCase().includes(query));
      list.innerHTML = filtered.length ? filtered.map(i => `
        <button class="select-pop-item ${i.current ? 'active-item' : ''}${i.enabled ? '' : ' disabled'}" role="option" aria-selected="${i.current}" data-id="${i.id}">
          ${i.label}${i.enabled ? '' : '<span class="soon">скоро</span>'}
        </button>`).join('') : '<div class="select-pop-empty">Ничего не найдено</div>';
      list.querySelectorAll('.select-pop-item').forEach(el => el.addEventListener('click', () => {
        const item = items.find(i => i.id === el.dataset.id);
        if (!item || !item.enabled) { window.showToast?.('Этот раздел скоро появится'); return; }
        closePop();
        if (!item.current && key === 'subject') window.dispatchEvent(new CustomEvent('eazy:subject', { detail: item.id }));
      }));
    };
    render('');
    input.addEventListener('input', () => render(input.value));
    btn.setAttribute('aria-expanded', 'true');
    openPop = { pop, btn };
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.catalog-select');
    if (btn) {
      if (openPop && openPop.btn === btn) { closePop(); return; }
      makePop(btn, btn.dataset.select);
      return;
    }
    if (openPop && !e.target.closest('.select-pop')) closePop();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePop(); });
  window.addEventListener('scroll', () => { if (openPop) closePop(); }, { passive: true });
})();
