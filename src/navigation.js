export function initNavigation() {
  const header = document.querySelector('.site-header');
  const navigation = header?.querySelector('.site-nav');
  const menuToggle = header?.querySelector('.menu-toggle');
  if (!navigation || !menuToggle) return;
  const items = [...navigation.querySelectorAll('.nav-item')];
  const desktop = window.matchMedia('(min-width: 1101px)');
  let openedByHover = null;

  const closePanels = () => {
    items.forEach(item => {
      item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      item.querySelector('.nav-dropdown').hidden = true;
    });
    openedByHover = null;
  };
  const setNavigation = open => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
    if (!open) closePanels();
  };
  const openPanel = (item, source) => {
    closePanels();
    item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
    item.querySelector('.nav-dropdown').hidden = false;
    openedByHover = source === 'hover' ? item : null;
  };

  items.forEach(item => {
    const button = item.querySelector('.dropdown-toggle');
    button.addEventListener('click', event => {
      const open = button.getAttribute('aria-expanded') === 'true';
      // A mouse click following hover confirms the open menu instead of hiding it.
      if (open && openedByHover === item && event.detail > 0 && desktop.matches) {
        openedByHover = null;
        return;
      }
      if (open) closePanels();
      else openPanel(item, 'click');
    });
    item.addEventListener('pointerenter', event => {
      if (desktop.matches && event.pointerType === 'mouse') openPanel(item, 'hover');
    });
    item.addEventListener('pointerleave', () => {
      if (desktop.matches && !item.contains(document.activeElement)) closePanels();
    });
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) closePanels();
    });
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openPanel(item, 'keyboard');
        item.querySelector('.nav-dropdown a')?.focus();
      }
    });
  });

  menuToggle.addEventListener('click', () => setNavigation(menuToggle.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => setNavigation(false)));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const active = items.find(item => item.querySelector('.dropdown-toggle').getAttribute('aria-expanded') === 'true');
    if (active) {
      closePanels();
      active.querySelector('.dropdown-toggle').focus();
      event.preventDefault();
    } else if (menuToggle.getAttribute('aria-expanded') === 'true') {
      setNavigation(false);
      menuToggle.focus();
      event.preventDefault();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setNavigation(false);
    else if (!event.target.closest('.nav-item')) closePanels();
  });
  header.addEventListener('focusout', event => {
    // Keep the next page control visible when keyboard focus leaves the mobile panel.
    if (!desktop.matches && event.relatedTarget && !header.contains(event.relatedTarget)) setNavigation(false);
  });
  desktop.addEventListener('change', () => setNavigation(false));
}
