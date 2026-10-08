import { renderPage, contact, interests, enquiryTypes } from './site.js';
export { renderPage, contact };

if (typeof document !== 'undefined') {
  const requestedPath = window.location.pathname.replace(/\/index\.html$/, '/');
  const path = requestedPath.endsWith('/') ? requestedPath : requestedPath + '/';
  const page = renderPage(path);
  document.title = page.title;
  document.querySelector('meta[name="description"]').content = page.description;
  document.querySelector('meta[property="og:title"]').content = page.title;
  document.querySelector('meta[property="og:description"]').content = page.description;
  // Static output is prerendered; attach behavior without replacing the page.
  if (!document.querySelector('.site-header')) document.querySelector('#app').innerHTML = page.html;
  document.querySelector('#year').textContent = new Date().getFullYear();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
    if (!open) closeDropdowns();
  };
  const items = [...nav.querySelectorAll('.nav-item')];
  const closeDropdowns = () => items.forEach(item => {
    item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    item.querySelector('.nav-dropdown').hidden = true;
  });
  const openDropdown = item => {
    closeDropdowns();
    item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
    item.querySelector('.nav-dropdown').hidden = false;
  };
  items.forEach(item => {
    const button = item.querySelector('.dropdown-toggle');
    let openedByHover = false;
    button.addEventListener('click', event => {
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      if (wasOpen && openedByHover && event.detail > 0 && window.innerWidth > 1100) {
        openedByHover = false;
        return;
      }
      openedByHover = false;
      closeDropdowns();
      if (!wasOpen) openDropdown(item);
    });
    item.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && window.innerWidth > 1100) {
        openDropdown(item);
        openedByHover = true;
      }
    });
    item.addEventListener('pointerleave', () => {
      openedByHover = false;
      if (window.innerWidth > 1100 && !item.contains(document.activeElement)) closeDropdowns();
    });
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) closeDropdowns();
    });
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault(); openDropdown(item);
        item.querySelector('.nav-dropdown a').focus();
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const active = items.find(item => item.querySelector('.dropdown-toggle').getAttribute('aria-expanded') === 'true');
      closeDropdowns();
      if (active) { event.stopImmediatePropagation(); active.querySelector('.dropdown-toggle').focus(); }
    }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.nav-item')) closeDropdowns(); });
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(max-width: 1100px)').addEventListener('change', () => setMenu(false));
}

const form = typeof document !== 'undefined' ? document.querySelector('#enquiry-form') : null;
if (form) {
  // Native constraints remain authoritative; show persistent errors after JS attaches.
  form.noValidate = true;
  const requiredFields = [...form.querySelectorAll('[required], select[name="interest"]')];
  const summary = document.querySelector('#form-error-summary');
  const result = document.querySelector('#form-result');
  const errorFor = field => {
    if (field.type === 'checkbox') return field.checked ? '' : 'Please agree to share your details for this request.';
    if (!field.required && !field.value.trim()) return '';
    if (field.name === 'interest' && field.value && !interests.includes(field.value)) return 'Choose a product or service from the list.';
    if (field.validity.valueMissing || !field.value.trim()) return 'Please complete this field.';
    if (field.validity.typeMismatch) return 'Enter a valid email address, such as you@company.com.';
    return field.validity.valid ? '' : 'Check this field and try again.';
  };
  const validate = field => {
    const error = errorFor(field);
    const output = document.querySelector(`#${field.name}-error`);
    field.setAttribute('aria-invalid', String(Boolean(error)));
    output.textContent = error;
    output.hidden = !error;
    return !error;
  };
  const selected = new URLSearchParams(window.location.search).get('service');
  if (form.elements.interest && interests.includes(selected)) form.elements.interest.value = selected;
  const requestedType = new URLSearchParams(window.location.search).get('type');
  const enquiryType = enquiryTypes.includes(requestedType) ? requestedType : 'General enquiry';
  
  form.addEventListener('input', event => {
    result.hidden = true;
    if (event.target.getAttribute('aria-invalid') === 'true') validate(event.target);
    summary.hidden = true;
  });
  form.addEventListener('change', event => {
    result.hidden = true;
    summary.hidden = true;
    if (event.target.getAttribute('aria-invalid') === 'true') validate(event.target);
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = requiredFields.filter(field => !validate(field));
    if (invalid.length) {
      result.hidden = true;
      summary.textContent = 'Please check the highlighted fields before preparing your enquiry.';
      summary.hidden = false;
      invalid[0].focus();
      return;
    }
    summary.hidden = true;
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    const isDemo = form.dataset.demo === 'true';
    const subject = isDemo ? 'Demo request — ' + value('interest') : 'General enquiry';
    const brief = `BM Tech Services — ${isDemo ? 'Demo Request' : 'Enquiry'}\n\nName: ${value('firstName')} ${value('lastName')}\nCompany: ${value('company') || 'Not provided'}\nEmail: ${value('email')}\nPhone: ${value('phone') || 'Not provided'}\nProduct or service: ${value('interest') || 'Not specified'}\nEnquiry type: ${isDemo ? 'Product demo' : enquiryType}\n\nMessage:\n${value('message') || 'Not provided'}`;
    document.querySelector('#brief-output').value = brief;
    document.querySelector('#email-brief').href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
    document.querySelector('#whatsapp-brief').href = `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(brief)}`;
    document.querySelector('#copy-status').textContent = '';
    result.hidden = false;
    document.querySelector('#result-heading').focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    const output = document.querySelector('#brief-output');
    try {
      await navigator.clipboard.writeText(output.value);
      document.querySelector('#copy-status').textContent = 'Copied to clipboard.';
    } catch {
      output.focus(); output.select();
      document.querySelector('#copy-status').textContent = 'Select and copy the highlighted text.';
    }
  });
}
