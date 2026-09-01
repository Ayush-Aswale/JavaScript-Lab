const form = document.getElementById('userForm');
const requiredFields = Array.from(document.querySelectorAll('[data-required]'));
const emailField = document.getElementById('email');
const websiteField = document.getElementById('website');

function populateDateOptions() {
  const daySelect = document.getElementById('day');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  months.forEach((month) => {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let year = 2000; year <= 2024; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

function markValidity(field, isValid) {
  if (field.type === 'checkbox') {
    field.style.outline = isValid ? 'none' : '2px solid #ca3a3a';
    return;
  }

  field.classList.toggle('invalid', !isValid);
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isWebsiteValid(website) {
  if (website.trim() === '') {
    return true;
  }

  try {
    const url = new URL(website.trim());
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function isFieldValid(field) {
  if (field.type === 'checkbox') {
    return field.checked;
  }

  if (field.tagName === 'SELECT') {
    return field.value !== '' && field.value !== 'Day' && field.value !== 'Month' && field.value !== 'Year';
  }

  if (field.id === 'email') {
    return field.value.trim() !== '' && isEmailValid(field.value);
  }

  if (field.id === 'website') {
    return isWebsiteValid(field.value);
  }

  return field.value.trim() !== '';
}

function validateForm() {
  let firstInvalid = null;

  requiredFields.forEach((field) => {
    const valid = isFieldValid(field);
    markValidity(field, valid);

    if (!valid && !firstInvalid) {
      firstInvalid = field;
    }
  });

  if (emailField && !isEmailValid(emailField.value)) {
    markValidity(emailField, false);
    if (!firstInvalid) {
      firstInvalid = emailField;
    }
  }

  if (websiteField && !isWebsiteValid(websiteField.value)) {
    markValidity(websiteField, false);
    if (!firstInvalid) {
      firstInvalid = websiteField;
    }
  }

  if (firstInvalid) {
    if (firstInvalid === emailField) {
      alert('Please enter a valid email address.');
    } else if (firstInvalid === websiteField) {
      alert('Please enter a valid website URL.');
    } else {
      alert('Please fill in all required fields before submitting.');
    }
    firstInvalid.focus();
    return false;
  }

  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.');
    confirmPassword.focus();
    markValidity(confirmPassword, false);
    return false;
  }

  return true;
}

populateDateOptions();

requiredFields.forEach((field) => {
  field.addEventListener('input', () => {
    markValidity(field, isFieldValid(field));
  });

  field.addEventListener('change', () => {
    markValidity(field, isFieldValid(field));
  });
});

if (emailField) {
  emailField.addEventListener('input', () => {
    markValidity(emailField, isEmailValid(emailField.value));
  });
}

if (websiteField) {
  websiteField.addEventListener('input', () => {
    markValidity(websiteField, isWebsiteValid(websiteField.value));
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  alert('Form submitted successfully!');
  form.reset();
  requiredFields.forEach((field) => markValidity(field, true));
  if (emailField) markValidity(emailField, true);
  if (websiteField) markValidity(websiteField, true);
});
