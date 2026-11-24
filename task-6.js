// =====================================
// TASK 6: FORM VALIDATION
// =====================================

// Select the registration form
const registrationForm = document.getElementById("registrationForm");

// Select input fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const genderInput = document.getElementById("gender");
const termsInput = document.getElementById("terms");

// Form submission event
if (registrationForm) {
  registrationForm.addEventListener("submit", function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Get input values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const gender = genderInput.value;

    // Name Validation
    if (name.length < 3) {
      showError("nameError", "Name must contain at least 3 characters.");
      nameInput.classList.add("invalid");
      isValid = false;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showError("emailError", "Please enter a valid email address.");
      emailInput.classList.add("invalid");
      isValid = false;
    }

    // Phone Validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      showError("phoneError", "Phone number must contain exactly 10 digits.");
      phoneInput.classList.add("invalid");
      isValid = false;
    }

    // Password Validation
    if (password.length < 8) {
      showError(
        "passwordError",
        "Password must contain at least 8 characters.",
      );
      passwordInput.classList.add("invalid");
      isValid = false;
    }

    // Confirm Password Validation
    if (confirmPassword !== password || !confirmPassword) {
      showError("confirmPasswordError", "Passwords do not match.");
      confirmPasswordInput.classList.add("invalid");
      isValid = false;
    }

    // Gender Validation
    if (gender === "") {
      showError("genderError", "Please select your gender.");
      genderInput.classList.add("invalid");
      isValid = false;
    }

    // Terms Validation
    if (!termsInput.checked) {
      showError("termsError", "Please accept the Terms and Conditions.");
      isValid = false;
    }

    // Successful Validation
    if (isValid) {
      document.getElementById("successMessage").textContent =
        "Registration successful! Thank you for joining Cognifyz.";

      // Reset form fields
      registrationForm.reset();
    } else {
      document.getElementById("successMessage").textContent = "";
    }
  });
}

// Display Error Messages
function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Clear Previous Errors
function clearErrors() {
  const errors = document.querySelectorAll(".error");

  errors.forEach(function (error) {
    error.textContent = "";
  });

  const invalidFields = document.querySelectorAll(".invalid");

  invalidFields.forEach(function (field) {
    field.classList.remove("invalid");
  });
}
