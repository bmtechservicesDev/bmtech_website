export function initCatalogue() {
  if (typeof document === 'undefined') return;

  const controls = document.querySelector('[data-catalogue-controls]');
  const search = document.getElementById('portfolio-search');
  const grid = document.getElementById('portfolio-family-grid');
  const status = document.getElementById('portfolio-status');
  const empty = document.getElementById('portfolio-empty');
  const clear = empty?.querySelector('[data-clear-filters]');
  if (!controls || !search || !grid || !status || !empty || !clear || controls.dataset.catalogueReady) return;

  const buttons = [...controls.querySelectorAll('[data-family-filter]')];
  const families = [...grid.querySelectorAll('[data-product-family]')].map(card => ({
    card,
    id: card.dataset.productFamily,
    brandNote: (card.querySelector('.product-brand-note')?.textContent || '').toLowerCase(),
    entries: [...card.querySelectorAll('li[data-product-entry]')].map(element => ({
      element,
      searchText: (element.dataset.search || '').toLowerCase()
    }))
  }));
  let selectedFamily = 'all';

  function update() {
    const query = search.value.trim().toLowerCase();
    let offeringCount = 0;
    let familyCount = 0;

    for (const family of families) {
      const familyMatches = selectedFamily === 'all' || selectedFamily === family.id;
      let visibleCount = 0;
      for (const entry of family.entries) {
        const queryMatches = !query || entry.searchText.includes(query) || family.brandNote.includes(query);
        const visible = familyMatches && queryMatches;
        entry.element.hidden = !visible;
        if (visible) visibleCount += 1;
      }
      family.card.hidden = visibleCount === 0;
      offeringCount += visibleCount;
      if (visibleCount) familyCount += 1;
    }

    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.familyFilter === selectedFamily));
    }
    status.textContent = offeringCount
      ? `${offeringCount} ${offeringCount === 1 ? 'offering' : 'offerings'} across ${familyCount} product ${familyCount === 1 ? 'family' : 'families'}`
      : 'No offerings match these filters (0 product families).';
    empty.hidden = offeringCount !== 0;
  }

  function reset() {
    search.value = '';
    selectedFamily = 'all';
    update();
  }

  function revealHashTarget() {
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (!id) return;

    const target = document.getElementById(id);
    if (!target || !grid.contains(target)) return;
    const entry = target.closest('li[data-product-entry]');
    const family = target.closest('[data-product-family]');
    if (!entry?.hidden && !family?.hidden) return;

    reset();
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: entry ? 'center' : 'start'
    });
  }

  search.addEventListener('input', update);
  for (const button of buttons) {
    button.addEventListener('click', () => {
      selectedFamily = button.dataset.familyFilter;
      update();
    });
  }
  clear.addEventListener('click', () => {
    reset();
    search.focus();
  });
  window.addEventListener('hashchange', revealHashTarget);

  reset();
  controls.dataset.catalogueReady = 'true';
  controls.hidden = false;
}
