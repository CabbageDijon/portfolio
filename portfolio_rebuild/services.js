// Service form logic

document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('service');
  const pc = document.getElementById('pcFields');
  const pixel = document.getElementById('pixelFields');
  const web = document.getElementById('webFields');
  const form = document.getElementById('serviceForm');

  const contactInput = document.getElementById('contact');
  const countryWrap = document.getElementById('countryWrap');
  const countryCode = document.getElementById('countryCode');
  const contactRadios = document.querySelectorAll('input[name="contactType"]');

  if (!serviceSelect || !form) return;

  // Service field toggling
  serviceSelect.addEventListener('change', () => {
    pc.classList.add('hidden');
    pixel.classList.add('hidden');
    web.classList.add('hidden');

    if (serviceSelect.value === 'pc') pc.classList.remove('hidden');
    if (serviceSelect.value === 'pixel') pixel.classList.remove('hidden');
    if (serviceSelect.value === 'web') web.classList.remove('hidden');
  });

  // Contact type handling
  contactRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      contactInput.value = '';
      if (radio.value === 'whatsapp') {
        countryWrap.classList.remove('hidden');
        contactInput.placeholder = 'WhatsApp number (no country code)';
      } else {
        countryWrap.classList.add('hidden');
        contactInput.placeholder = radio.value === 'email'
          ? 'email@example.com'
          : 'DiscordName#1234';
      }
    });
  });

  // Validation on submit
  form.addEventListener('submit', (e) => {
    const type = document.querySelector('input[name="contactType"]:checked')?.value;
    const value = contactInput.value.trim();

    if (!type) {
      e.preventDefault();
      alert('Please select a contact method.');
      return;
    }

    if (type === 'email' && !value.includes('@')) {
      e.preventDefault();
      alert('Please enter a valid email address.');
    }

    if (type === 'whatsapp') {
      if (!/^[0-9 ]{6,}$/.test(value)) {
        e.preventDefault();
        alert('Please enter a valid WhatsApp number.');
        return;
      }
      // Prefix country code before submit
      contactInput.value = `${countryCode.value} ${value}`;
    }

    if (type === 'discord' && !/.+#\d{4}/.test(value)) {
      e.preventDefault();
      alert('Discord ID must be in the format Name#1234');
    }
  });
});
