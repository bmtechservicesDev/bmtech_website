import { contact, interests, enquiryTypes } from './pages/enquiry.js';

export function initEnquiry() {
  const form = document.querySelector('#enquiry-form');
  if (form) {
    // Native constraints remain authoritative; show persistent errors after JS attaches.
    form.noValidate = true;
    form.querySelector('[data-enable-enquiry]').disabled = false;
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
      const brief = `AMPIGEN — ${isDemo ? 'Demo Request' : 'Enquiry'}\n\nName: ${value('firstName')} ${value('lastName')}\nCompany: ${value('company') || 'Not provided'}\nEmail: ${value('email')}\nPhone: ${value('phone') || 'Not provided'}\nProduct or service: ${value('interest') || 'Not specified'}\nEnquiry type: ${isDemo ? 'Product demo' : enquiryType}\n\nMessage:\n${value('message') || 'Not provided'}`;
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
}
