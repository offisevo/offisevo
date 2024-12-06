// LOAD HEADER AND FOOTER (handling paths dinamically for compatibility with github pages)
document.addEventListener('DOMContentLoaded', () => {
  loadContent('header.html', 'header-container', () => {
      initializeDropdownMenu(); // Initialize dropdown menu after header is loaded
      initializeMobileMenu(); // Initialize mobile menu after header is loaded
  });
  loadContent('footer.html', 'footer-container');
});

// Fix the path relative to the JavaScript file location
function fixPath(relativePath) {
  const script = document.querySelector('script[src*="script.js"]');
  const scriptUrl = script ? script.src : '';
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);
  return new URL(relativePath, baseUrl).href;
}
// Function to adjust paths for images and other assets inside file called
function adjustPaths(containerId) {
  const baseUrl = fixPath('');
  const container = document.getElementById(containerId);
  const images = container.querySelectorAll('img');
  images.forEach(img => {
      const imgSrc = img.getAttribute('src');
      if (imgSrc) {
          img.src = new URL(imgSrc, baseUrl).href; // Adjust the path relative to the script
      }
  });
}
// General function to load HTML content into a container
function loadContent(url, containerId, callback) {
  fetch(fixPath(url))
      .then(response => response.text())
      .then(data => {
          document.getElementById(containerId).innerHTML = data;
          adjustPaths(containerId); // Adjust paths after loading content
          if (callback) callback(); // Execute any additional initialization
      })
      .catch(error => console.error(`Error loading ${url}:`, error));
}




// // LOAD HEADER
// function loadHeader() {
//   fetch('/header.html')
//       .then(response => response.text())
//       .then(data => {
//           document.getElementById('header-container').innerHTML = data;
//           initializeDropdownMenu(); // Initialize dropdown menu after header is loaded
//           initializeMobileMenu(); // Initialize mobile menu after header is loaded
//       })
//       .catch(error => console.error('Error loading header:', error));
// }
// document.addEventListener('DOMContentLoaded', loadHeader); // Load the header when the document is fully loaded

// // LOAD FOOTER
// function loadFooter() {
//   fetch('/footer.html')
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById('footer-container').innerHTML = data;
//     })
//     .catch(error => console.error('Error loading footer:', error));
// }
// document.addEventListener('DOMContentLoaded', loadFooter); // Load the footer when the document is fully loaded



// DROPDOWN NAVIGATION MENU
function initializeDropdownMenu() {
  const navItems = document.querySelectorAll('.nav-list li');
  let currentDropdown = null;
  let isTransitioning = false;

  navItems.forEach(item => {
      const dropdown = item.querySelector('.dropdown-wrapper');

      item.addEventListener('mouseenter', () => { // Show dropdown on mouse enter
          if (currentDropdown && currentDropdown !== dropdown) {
              currentDropdown.classList.add('quick-hide');
              setTimeout(() => {
                  currentDropdown.classList.remove('show');
                  currentDropdown.classList.remove('quick-hide');
                  requestAnimationFrame(() => {
                      dropdown.classList.add('show');
                  });
              }, 0); // Quick hide duration
          } else {
              dropdown.classList.add('show');
          }
          currentDropdown = dropdown;
          isTransitioning = true; // Start transition
          setTimeout(() => {
              isTransitioning = false;
          }, 1000); // Time to prevent click actions if in transition
      });

      item.addEventListener('mouseleave', () => { // Hide dropdown on mouse leave
          if (!dropdown.contains(event.relatedTarget)) { // Check if leaving to a child element
              dropdown.classList.remove('show');
          }
      });

      item.addEventListener('click', (event) => { // Toggle dropdown on click
          if (isTransitioning) {
              // Prevent click actions if in transition
              event.preventDefault();
              event.stopPropagation();
              return;
          }
          if (dropdown.classList.contains('show')) {
              dropdown.classList.remove('show');
          } else {
              dropdown.classList.add('show');
          }
      });

      // Prevent closing the dropdown when clicking inside it
      dropdown.addEventListener('click', (event) => {
          event.stopPropagation(); // Stop the click event from bubbling up
      });
  });
}



// MOBILE MENU
function initializeMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  menuToggle.addEventListener("click", () => {
      navList.classList.toggle("active"); // Toggle the "active" class to show/hide the menu
  });

  // Close the mobile menu whenever there's a click outside it
  document.addEventListener("click", (event) => {
      // Check if the click is outside the navList and menuToggle
      if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
          navList.classList.remove("active"); // Hide the menu
      }
  });
}
