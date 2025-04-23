// script.js

// Select elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Auto-save with localStorage
function autoSave() {
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('formData', JSON.stringify(formData));
}

function loadSavedData() {
  const savedData = JSON.parse(localStorage.getItem('formData'));
  if (savedData) {
    nameInput.value = savedData.name || '';
    emailInput.value = savedData.email || '';
    phoneInput.value = savedData.phone || '';
    messageInput.value = savedData.message || '';
    updateCharCount();
  }
}

// Character counter
function updateCharCount() {
  const count = messageInput.value.length;
  charCount.textContent = `(${count} / 500)`;
}

messageInput.addEventListener('input', () => {
  updateCharCount();
});

// Validation functions
function validateName(name) {
  return /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone); // Simple validation for 10-digit phone numbers
}

function validateMessage(message) {
  return message.trim().length > 0 && message.length <= 500;
}

// Real-time validation
nameInput.addEventListener('input', () => {
  if (!validateName(nameInput.value)) {
    document.getElementById('nameError').textContent = 'Please enter a valid name.';
  } else {
    document.getElementById('nameError').textContent = '';
  }
});

emailInput.addEventListener('input', () => {
  if (!validateEmail(emailInput.value)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
  } else {
    document.getElementById('emailError').textContent = '';
  }
});

phoneInput.addEventListener('input', () => {
  if (!validatePhone(phoneInput.value)) {
    document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number.';
  } else {
    document.getElementById('phoneError').textContent = '';
  }
});

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous error messages
  document.querySelectorAll('.error-message').forEach((el) => (el.textContent = ''));

  let isValid = true;

  // Validate name
  if (!validateName(nameInput.value)) {
    document.getElementById('nameError').textContent = 'Please enter a valid name.';
    isValid = false;
  }

  // Validate email
  if (!validateEmail(emailInput.value)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Validate phone
  if (!validatePhone(phoneInput.value)) {
    document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number.';
    isValid = false;
  }

  // Validate message
  if (!validateMessage(messageInput.value)) {
    document.getElementById('messageError').textContent = 'Message must be between 1 and 500 characters.';
    isValid = false;
  }

  // If all fields are valid, show success message
  if (isValid) {
    form.classList.add('hidden'); // Hide the form
    successMessage.classList.remove('hidden'); // Show success message
    localStorage.removeItem('formData'); // Clear saved data
  }
});

// Load saved data on page load
window.addEventListener('load', () => {
  loadSavedData();
});

// Auto-save every 5 seconds
setInterval(autoSave, 5000);