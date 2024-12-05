// MOBILE MENU
document.querySelector(".menu-toggle").addEventListener("click", () => {
  const navList = document.querySelector(".nav-list");
  navList.classList.toggle("active"); // Toggle the "active" class to show/hide the menu
});
// Close the mobile menu whenever there's a click outside it
document.addEventListener("click", (event) => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");
  // Check if the click is outside the navList and menuToggle
  if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
      navList.classList.remove("active"); // Hide the menu
  }
});
