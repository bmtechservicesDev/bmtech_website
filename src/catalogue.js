export function initCatalogue() {
  if (typeof document === 'undefined') return;
  const controls = document.querySelector('[data-catalogue-controls]');
  const search = document.getElementById('portfolio-search');
  const industry = document.getElementById('portfolio-industry');
  const grid = document.getElementById('portfolio-product-grid');
  const status = document.getElementById('portfolio-status');
  const empty = document.getElementById('portfolio-empty');
  if (!controls || !search || !industry || !grid || !status || !empty || controls.dataset.catalogueReady) return;

  const cards = [...grid.querySelectorAll('[data-product-entry]')].map(card => ({
    card, searchText: card.dataset.search.toLowerCase(), industries: card.dataset.industries.split(' ')
  }));
  const allowedIndustries = new Set([...industry.options].map(option => option.value));
  const copyStatus = document.getElementById('search-copy-status');
  const copyFallback = document.querySelector('.copy-link-fallback');
  const copyInput = document.getElementById('product-search-link');

  const searchUrl = () => {
    const url = new URL(window.location.pathname, window.location.origin);
    const query = search.value.trim().slice(0, 100);
    if (query) url.searchParams.set('q', query);
    if (industry.value !== 'all') url.searchParams.set('industry', industry.value);
    return url;
  };

  function update(syncUrl = true) {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    for (const { card, searchText, industries } of cards) {
      const matches = (!query || searchText.includes(query)) && (industry.value === 'all' || industries.includes(industry.value));
      card.hidden = !matches;
      if (matches) count += 1;
    }
    status.textContent = `${count} ${count === 1 ? 'product' : 'products'}${industry.value === 'all' ? '' : ` for ${industry.selectedOptions[0].textContent}`}${query ? ' matching your search' : ''}`;
    empty.hidden = count !== 0;
    copyStatus.textContent = '';
    copyFallback.hidden = true;
    if (syncUrl) {
      const url = searchUrl();
      url.hash = window.location.hash;
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }

  function reset() {
    search.value = '';
    industry.value = 'all';
    update();
  }

  function readLocation() {
    const params = new URLSearchParams(window.location.search);
    search.value = (params.get('q') || '').slice(0, 100);
    industry.value = allowedIndustries.has(params.get('industry')) ? params.get('industry') : 'all';
    update(false);
  }

  function revealHashTarget() {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const target = id ? document.getElementById(id) : null;
    const card = target?.closest('[data-product-entry]');
    if (!card?.hidden) return;
    reset();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  }

  search.addEventListener('input', () => update());
  industry.addEventListener('change', () => update());
  document.querySelectorAll('[data-clear-filters]').forEach(button => button.addEventListener('click', () => { reset(); search.focus(); }));
  controls.querySelector('[data-copy-product-search]').addEventListener('click', async () => {
    const value = searchUrl().href;
    try {
      await navigator.clipboard.writeText(value);
      copyStatus.textContent = 'Search link copied.';
    } catch {
      copyFallback.hidden = false;
      copyInput.value = value;
      copyInput.focus();
      copyInput.select();
      copyStatus.textContent = 'Select and copy the search link.';
    }
  });
  window.addEventListener('hashchange', revealHashTarget);
  window.addEventListener('popstate', () => { readLocation(); revealHashTarget(); });
  readLocation();
  controls.dataset.catalogueReady = 'true';
  controls.hidden = false;
  revealHashTarget();
}

export function initProductPreparation() {
  const output = document.querySelector('[data-preparation-status]');
  const items = [...document.querySelectorAll('[data-preparation-item]')];
  if (!output || !items.length) return;
  const update = () => { output.textContent = `${items.filter(item => item.checked).length} of ${items.length} points reviewed`; };
  items.forEach(item => item.addEventListener('change', update));
  update();
  output.hidden = false;
}
