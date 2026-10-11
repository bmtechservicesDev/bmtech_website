import { contact, interests, enquiryTypes } from './pages/enquiry.js';
import { defaultProductIndustry, enquiryFieldLimits, findEnquiryIndustry, getEnquiryPreparation, resolveEnquiryInterest } from './enquiry-context.js';

export function initEnquiry() {
  const form = document.querySelector('#enquiry-form');
  if (!form || form.dataset.enquiryReady) return;

  // Native constraints remain in the HTML; JS adds persistent, accessible feedback.
  form.noValidate = true;
  const fieldNames = ['interest', 'industry', 'firstName', 'lastName', 'email', 'company', 'phone', 'message', 'consent'];
  const fields = fieldNames.map(name => form.elements.namedItem(name)).filter(Boolean);
  const summary = form.querySelector('#form-error-summary');
  const result = form.querySelector('#form-result');
  const output = form.querySelector('#brief-output');
  const download = form.querySelector('#download-brief');
  const interest = form.elements.namedItem('interest');
  const industry = form.elements.namedItem('industry');
  let downloadUrl = '';

  function clearDraft() {
    result.hidden = true;
    output.value = '';
    form.querySelector('#email-brief').href = `mailto:${contact.email}`;
    form.querySelector('#whatsapp-brief').href = `https://wa.me/${contact.phone.replace(/\D/g, '')}`;
    form.querySelector('#copy-status').textContent = '';
    download.removeAttribute('href');
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    downloadUrl = '';
  }

  function errorFor(field) {
    if (field.type === 'checkbox') return field.checked ? '' : 'Please agree to share your details for this request.';
    const raw = field.value;
    if (!raw.trim()) return field.required ? 'Please complete this field.' : '';
    if (field.name === 'interest' && !interests.includes(raw)) return 'Choose a product or service from the list.';
    if (field.name === 'industry' && !findEnquiryIndustry(raw)) return 'Choose an industry from the list.';
    const limit = enquiryFieldLimits[field.name];
    if (limit && raw.length > limit) return `Use ${limit} characters or fewer.`;
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(raw)) return 'Remove unsupported control characters.';
    if (field.validity.typeMismatch) return 'Enter a valid email address, such as you@company.com.';
    return field.validity.valid ? '' : 'Check this field and try again.';
  }

  function validate(field) {
    const error = errorFor(field);
    const target = form.querySelector(`#${field.name}-error`);
    field.setAttribute('aria-invalid', String(Boolean(error)));
    target.textContent = error;
    target.hidden = !error;
    return !error;
  }

  function updatePreparation() {
    const preparation = getEnquiryPreparation(interest.value, industry.value);
    form.querySelector('#preparation-title').textContent = preparation.title;
    for (const [id, text] of [['preparation-industry', preparation.industry], ['preparation-industry-prompt', preparation.industryPrompt]]) {
      const node = form.querySelector(`#${id}`);
      node.textContent = text;
      node.hidden = !text;
    }
    const prompts = preparation.prompts.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    });
    form.querySelector('#preparation-prompts').replaceChildren(...prompts);
  }

  const params = new URLSearchParams(window.location.search);
  interest.value = resolveEnquiryInterest(params.get('service'));
  const requestedIndustry = findEnquiryIndustry(params.get('industry'));
  let chosenIndustry = Boolean(requestedIndustry);
  industry.value = requestedIndustry?.id || defaultProductIndustry(interest.value);
  const requestedType = params.get('type');
  const enquiryType = enquiryTypes.includes(requestedType) ? requestedType : 'General enquiry';
  updatePreparation();

  function onEdit(event) {
    clearDraft();
    summary.hidden = true;
    if (event.target.name === 'interest') {
      if (!chosenIndustry) industry.value = defaultProductIndustry(interest.value);
      updatePreparation();
    }
    if (event.target.name === 'industry') {
      chosenIndustry = Boolean(findEnquiryIndustry(industry.value));
      updatePreparation();
    }
    if (event.target.name === 'message') {
      form.querySelector('#message-count').textContent = `${event.target.value.length} / ${enquiryFieldLimits.message}`;
    }
    if (fields.includes(event.target) && event.target.getAttribute('aria-invalid') === 'true') validate(event.target);
  }
  form.addEventListener('input', onEdit);
  form.addEventListener('change', onEdit);

  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) {
      clearDraft();
      summary.textContent = 'Please check the highlighted fields before preparing your enquiry.';
      summary.hidden = false;
      invalid[0].focus();
      return;
    }
    clearDraft();
    summary.hidden = true;
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    const isDemo = form.dataset.demo === 'true';
    const subject = isDemo ? `Demo request — ${value('interest')}` : 'General enquiry';
    const industryName = findEnquiryIndustry(value('industry'))?.title || 'Not specified';
    const brief = `AMPIGEN — ${isDemo ? 'Demo Request' : 'Enquiry'}\n\nName: ${value('firstName')} ${value('lastName')}\nCompany: ${value('company') || 'Not provided'}\nEmail: ${value('email')}\nPhone: ${value('phone') || 'Not provided'}\nProduct or service: ${value('interest') || 'Not specified'}\nIndustry: ${industryName}\nEnquiry type: ${isDemo ? 'Product demo' : enquiryType}\n\nMessage:\n${value('message') || 'Not provided'}`;
    output.value = brief;
    form.querySelector('#email-brief').href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
    form.querySelector('#whatsapp-brief').href = `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(brief)}`;
    downloadUrl = URL.createObjectURL(new Blob([brief + '\n'], { type: 'text/plain;charset=utf-8' }));
    download.href = downloadUrl;
    download.download = isDemo ? 'ampigen-demo-request.txt' : 'ampigen-enquiry.txt';
    result.hidden = false;
    form.querySelector('#result-heading').focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });

  form.querySelector('#copy-brief').addEventListener('click', async () => {
    if (result.hidden || !output.value) return;
    try {
      await navigator.clipboard.writeText(output.value);
      form.querySelector('#copy-status').textContent = 'Copied to clipboard.';
    } catch {
      output.focus();
      output.select();
      form.querySelector('#copy-status').textContent = 'Select and copy the highlighted text.';
    }
  });
  form.dataset.enquiryReady = 'true';
  form.querySelector('[data-enable-enquiry]').disabled = false;
}
