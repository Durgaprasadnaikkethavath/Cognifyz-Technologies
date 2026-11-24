// =====================================
// TASK 4: INTERACTIVE BUTTON
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

    currentIndex++;

    if (currentIndex >= colors.length) {
      currentIndex = 0;
    }
  });
}

// =====================================
// TASK 5: API INTEGRATION
// =====================================

// API URL
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Select HTML elements
const postsContainer = document.getElementById("posts-container");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error");

const loadMoreBtn = document.getElementById("loadMoreBtn");

// Number of posts to display
let currentPage = 0;

const postsPerPage = 6;

// Fetch API Data
async function fetchPosts() {
  try {
    // Show loading message
    loading.style.display = "block";
    errorMessage.textContent = "";

    // Fetch data from API
    const response = await fetch(API_URL);

    // Check response status
    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }

    // Convert response into JSON
    const posts = await response.json();

    // Hide loading message
    loading.style.display = "none";

    // Display first 6 posts
    displayPosts(posts);
  } catch (error) {
    // Handle errors
    loading.style.display = "none";

    errorMessage.textContent = "Something went wrong: " + error.message;

    console.error("API Error:", error);
  }
}

// Display API Data in HTML
function displayPosts(posts) {
  const startIndex = currentPage * postsPerPage;

  const endIndex = startIndex + postsPerPage;

  const selectedPosts = posts.slice(startIndex, endIndex);

  // Create post cards dynamically
  selectedPosts.forEach(function (post) {
    const postCard = document.createElement("div");

    postCard.classList.add("post-card");

    postCard.innerHTML = `
            <span class="post-id">
                Post #${post.id}
            </span>

            <h3>${post.title}</h3>

            <p>${post.body}</p>
        `;

    postsContainer.appendChild(postCard);
  });

  // Update page number
  currentPage++;

  // Hide button when all posts are displayed
  if (endIndex >= posts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

// Load More Button
loadMoreBtn.addEventListener("click", function () {
  fetchMorePosts();
});

// Load remaining posts
async function fetchMorePosts() {
  try {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Loading...";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to load more posts");
    }

    const posts = await response.json();

    displayPosts(posts);
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load More Posts";
  }
}

// Automatically fetch posts when page loads
if (postsContainer) {
  fetchPosts();
}
