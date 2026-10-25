(() => {
  const directionButtons = [...document.querySelectorAll('[data-theme-choice]')];
  directionButtons.forEach((button) => button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice;
    document.body.dataset.theme = theme;
    directionButtons.forEach((choice) => {
      const active = choice === button;
      choice.classList.toggle('is-active', active);
      choice.setAttribute('aria-pressed', String(active));
    });
    const themeColor = theme === 'tech' ? '#151a1c' : theme === 'open' ? '#f1eadc' : '#e8f0e9';
    document.querySelector('meta[name="theme-color"]').content = themeColor;
  }));

  const cards = [...document.querySelectorAll('.product-card')];
  const chips = [...document.querySelectorAll('.filter-chip')];
  const search = document.querySelector('#product-search');
  const count = document.querySelector('#results-count');
  const empty = document.querySelector('#empty-state');
  let selectedFilter = 'todos';
  const updateCatalog = () => {
    const term = search.value.trim().toLocaleLowerCase('pt-BR');
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory = selectedFilter === 'todos' || card.dataset.category.split(' ').includes(selectedFilter);
      const matchesTerm = !term || `${card.dataset.search} ${card.innerText}`.toLocaleLowerCase('pt-BR').includes(term);
      const show = matchesCategory && matchesTerm;
      card.hidden = !show;
      visible += Number(show);
    });
    count.textContent = `${String(visible).padStart(2, '0')} ${visible === 1 ? 'possibilidade' : 'possibilidades'}`;
    empty.hidden = visible > 0;
  };
  chips.forEach((chip) => chip.addEventListener('click', () => {
    selectedFilter = chip.dataset.filter;
    chips.forEach((choice) => {
      const active = choice === chip;
      choice.classList.toggle('is-selected', active);
      choice.setAttribute('aria-pressed', String(active));
    });
    updateCatalog();
  }));
  search.addEventListener('input', updateCatalog);
  document.querySelector('#clear-search').addEventListener('click', () => {
    search.value = '';
    updateCatalog();
    search.focus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      search.focus();
    }
  });

  const waBase = 'https://wa.me/5522998012646?text=';
  document.querySelectorAll('[data-product]').forEach((link) => {
    const product = link.dataset.product;
    const message = `Ol%C3%A1%2C%20vim%20pelo%20conceito%20de%20cat%C3%A1logo%20digital%20Veelo%20Way.%20Queria%20conversar%20sobre%20${encodeURIComponent(product)}.`;
    link.href = `${waBase}${message}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
})();
