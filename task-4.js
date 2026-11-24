// Select the button
const colorButton = document.getElementById("colorButton");

// Select the message paragraph
const message = document.getElementById("message");

// Background colors
const colors = [
  "#dbeafe",
  "#dcfce7",
  "#fef3c7",
  "#fce7f3",
  "#ede9fe",
  "#cffafe",
];

// Track the current color
let currentIndex = 0;

// Button click event
colorButton.addEventListener("click", function () {
  // Change background color
  document.body.style.backgroundColor = colors[currentIndex];

  // Display message
  message.textContent = "Background color changed successfully!";

  // Move to the next color
  currentIndex++;

  // Reset index when all colors are used
  if (currentIndex >= colors.length) {
    currentIndex = 0;
  }
});
