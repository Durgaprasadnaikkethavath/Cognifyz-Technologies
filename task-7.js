// =====================================
// TASK 4: INTERACTIVE BACKGROUND BUTTON
// =====================================

const colorButton = document.getElementById("colorButton");
const message = document.getElementById("message");

const colors = [
  "#dbeafe",
  "#dcfce7",
  "#fef3c7",
  "#fce7f3",
  "#ede9fe",
  "#cffafe",
];

let currentIndex = 0;

if (colorButton) {
  colorButton.addEventListener("click", function () {
    document.body.style.backgroundColor = colors[currentIndex];

    if (message) {
      message.textContent = "Background color changed successfully!";
    }

    currentIndex = (currentIndex + 1) % colors.length;
  });
}

// =====================================
// TASK 5: API INTEGRATION
// =====================================

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const postsContainer = document.getElementById("posts-container");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error");

const loadMoreBtn = document.getElementById("loadMoreBtn");

let allPosts = [];
let currentPage = 0;

const postsPerPage = 6;

// Fetch API Data

async function fetchPosts() {
  try {
    loading.style.display = "block";
    errorMessage.textContent = "";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }

    allPosts = await response.json();

    loading.style.display = "none";

    displayPosts();
  } catch (error) {
    loading.style.display = "none";

    errorMessage.textContent = "Something went wrong: " + error.message;

    console.error(error);
  }
}

// Display API Posts

function displayPosts() {
  const startIndex = currentPage * postsPerPage;

  const endIndex = startIndex + postsPerPage;

  const selectedPosts = allPosts.slice(startIndex, endIndex);

  selectedPosts.forEach(function (post) {
    // Bootstrap grid column
    const column = document.createElement("div");

    column.className = "col-md-6 col-lg-4";

    // Post Card
    const card = document.createElement("div");

    card.className = "post-card";

    // Build content safely using DOM elements
    const badge = document.createElement("span");

    badge.className = "post-id";
    badge.textContent = "Post #" + post.id;

    const title = document.createElement("h3");

    title.textContent = post.title;

    const description = document.createElement("p");

    description.textContent = post.body;

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(description);

    column.appendChild(card);

    postsContainer.appendChild(column);
  });

  currentPage++;

  if (endIndex >= allPosts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

// Load More Posts

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", function () {
    displayPosts();
  });
}

// Automatically Fetch Posts

if (postsContainer) {
  fetchPosts();
}

// =====================================
// TASK 6: FORM VALIDATION
// =====================================

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const passwordInput = document.getElementById("password");

  const confirmPasswordInput = document.getElementById("confirmPassword");

  const genderInput = document.getElementById("gender");

  const termsInput = document.getElementById("terms");

  const successMessage = document.getElementById("successMessage");

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();

    let isValid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const gender = genderInput.value;

    // Name Validation

    if (name.length < 3) {
      showError("nameError", "Name must contain at least 3 characters.");

      nameInput.classList.add("is-invalid");

      isValid = false;
    }

    // Email Validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showError("emailError", "Please enter a valid email address.");

      emailInput.classList.add("is-invalid");

      isValid = false;
    }

    // Phone Validation

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      showError("phoneError", "Phone number must contain exactly 10 digits.");

      phoneInput.classList.add("is-invalid");

      isValid = false;
    }

    // Password Validation

    if (password.length < 8) {
      showError(
        "passwordError",
        "Password must contain at least 8 characters.",
      );

      passwordInput.classList.add("is-invalid");

      isValid = false;
    }

    // Confirm Password Validation

    if (!confirmPassword || confirmPassword !== password) {
      showError("confirmPasswordError", "Passwords do not match.");

      confirmPasswordInput.classList.add("is-invalid");

      isValid = false;
    }

    // Gender Validation

    if (gender === "") {
      showError("genderError", "Please select your gender.");

      genderInput.classList.add("is-invalid");

      isValid = false;
    }

    // Terms Validation

    if (!termsInput.checked) {
      showError("termsError", "Please accept the Terms and Conditions.");

      isValid = false;
    }

    // Successful Submission

    if (isValid) {
      successMessage.textContent =
        "Registration successful! Thank you for joining Cognifyz.";

      registrationForm.reset();
    } else {
      successMessage.textContent = "";
    }
  });
}

// Show Error Message

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);

  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Clear Errors

function clearErrors() {
  document.querySelectorAll(".error").forEach(function (error) {
    error.textContent = "";
  });

  document.querySelectorAll(".is-invalid").forEach(function (field) {
    field.classList.remove("is-invalid");
  });
}
