(() => {
  const input = document.querySelector('#addon-search');
  const row = document.querySelector('#search-row');
  if (!input || !row) return;
  row.hidden = false;
  const cards = [...document.querySelectorAll('[data-addon]')];
  const index = cards.map(card => ({ card, text: card.textContent.toLocaleLowerCase() }));
  const update = () => {
    const terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const { card, text } of index) {
      card.hidden = !terms.every(term => text.includes(term));
      if (!card.hidden) {
        visible++;
        const details = card.querySelector('details');
        if (details && terms.length && terms.some(term => details.textContent.toLocaleLowerCase().includes(term))) details.open = true;
      }
    }
    document.querySelectorAll('.category').forEach(section => { section.hidden = !section.querySelector('[data-addon]:not([hidden])'); });
    document.querySelector('#result-count').textContent = terms.length ? `找到 ${visible} 組` : `全部 ${cards.length} 組`;
    document.querySelector('#empty-result').hidden = visible !== 0;
  };
  input.addEventListener('input', update);
  document.querySelectorAll('.category-nav a').forEach(link => link.addEventListener('click', () => {
    if (input.value) { input.value = ''; update(); }
  }));
})();
