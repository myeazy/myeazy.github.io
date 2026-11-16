(() => {
  'use strict';
  const { $, $$ } = window.Yasno;
  const DATA = {
    exam: {
      items: [
        { label: 'ЕГЭ', active: true },
        { label: 'ОГЭ', active: false },
      ],
    },
    subject: {
      items: [
        { label: 'информатике', active: true },
        { label: 'математике', active: false },
        { label: 'русскому языку', active: false },
        { label: 'физике', active: false },
        { label: 'химии', active: false },
        { label: 'биологии', active: false },
        { label: 'обществознанию', active: false },
        { label: 'истории', active: false },
        { label: 'английскому языку', active: false },
        { label: 'литературе', active: false },
        { label: 'географии', active: false },
      ],
    },
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
    const render = q => {
      const query = (q || '').trim().toLowerCase();
      const items = DATA[key].items.filter(i => i.label.toLowerCase().includes(query));
      list.innerHTML = items.length ? items.map(i => `
        <button class="select-pop-item ${i.active ? 'active-item' : 'disabled'}" role="option" aria-selected="${i.active}">
          ${i.label}${i.active ? '<span class="dot" title="Доступно"></span>' : '<span class="soon">скоро</span>'}
        </button>`).join('') : '<div class="select-pop-empty">Ничего не найдено</div>';
      list.querySelectorAll('.select-pop-item').forEach(el => el.addEventListener('click', () => {
        if (el.classList.contains('active-item')) closePop();
        else window.showToast?.('Этот раздел скоро появится');
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
