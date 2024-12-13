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
// Adjust image paths
const images = container.querySelectorAll('img');
images.forEach(img => {
    const imgSrc = img.getAttribute('src');
    if (imgSrc) {
    img.src = new URL(imgSrc, baseUrl).href; // Adjust the path relative to the script
    }
});
// Adjust link paths
const links = container.querySelectorAll('a');
links.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref && !linkHref.startsWith('http') && !linkHref.startsWith('#')) {
    link.href = new URL(linkHref, baseUrl).href; // Adjust the path relative to the script
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



// DROPDOWN NAVIGATION MENU FOR DESKTOP
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

  document.addEventListener('DOMContentLoaded', function () {
    const navLink = document.querySelector('.nav-link');
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    const dropdownHeadings = document.querySelectorAll('.dropdown-heading');

    navLink.addEventListener('click', function (event) {
        event.preventDefault();
        dropdownWrapper.classList.toggle('show');
        
        dropdownHeadings.forEach(heading => {
            heading.classList.toggle('show');
        });
    });
  });
}



// MOBILE MENU
// function initializeMobileMenu() {
//   const menuToggle = document.querySelector(".menu-toggle");
//   const navList = document.querySelector(".nav-list");

//   menuToggle.addEventListener("click", () => {
//       navList.classList.toggle("active"); // Toggle the "active" class to show/hide the menu
//   });

//   // Close the mobile menu whenever there's a click outside it
//   document.addEventListener("click", (event) => {
//       // Check if the click is outside the navList and menuToggle
//       if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
//           navList.classList.remove("active"); // Hide the menu
//       }
//   });
// }



function initializeMobileMenu() {
    // Get the hamburger icon and the navigation container
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mobile-nav');
    const menu = document.getElementById('nav-menu');
    const menuItems = document.querySelectorAll('.nav-menu-item');
    const backButtons = document.querySelectorAll('.nav-back-button');
    // Toggle the visibility of the main menu when clicking the hamburger
    hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open'); // To change hamburger icon to X
    menu.classList.add('show');
    nav.classList.toggle('show');
    });

    // Handle menu item click to switch to the submenu
    menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        // Prevent the menu from closing when clicking a submenu item
        event.stopPropagation();
        // Get the submenu to display based on the data-target
        const targetSubmenu = document.getElementById(item.getAttribute('data-target'));
        if (targetSubmenu) {
        // First, close the currently visible submenu if any
        nav.querySelectorAll('.nav-submenu.show').forEach(submenu => {
            submenu.classList.remove('show'); // Hide currently visible submenus
            submenu.classList.add('hide'); // Add 'hide' class to close them
        });
        // Show the targeted submenu
        targetSubmenu.classList.remove('hide'); // Remove 'hide' class to slide it into view
        targetSubmenu.classList.add('show'); // Add 'show' class to slide it in
        // Optionally, hide the main menu if you want it to disappear when a submenu is opened
        menu.classList.remove('show');
        }
    });
    });

    // Handle "Go Back" button click to return to the parent menu
    backButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        // Get the parent submenu from the data-parent attribute of the button
        const parentSubmenuId = button.getAttribute('data-parent');
        const parentSubmenu = document.getElementById(parentSubmenuId);
        if (parentSubmenu) {
        // Hide the current submenu
        button.closest('.nav-submenu').classList.remove('show');
        // Show the parent submenu
        parentSubmenu.classList.remove('hide');
        parentSubmenu.classList.add('show'); // Add 'show' class to open it
        } else {
        // If no parent exists (i.e., we're at the root level), show the main menu
        nav.querySelectorAll('.nav-submenu').forEach(submenu => {
            submenu.classList.remove('show');
        });
        menu.classList.add('show');
        }
    });
    });

    // Close the navigation menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (nav.classList.contains('show') && !nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove('show');
            hamburger.classList.toggle('open'); // To change hamburger icon to X
            // Hide all submenus
            setTimeout(() => {
                nav.querySelectorAll('.nav-submenu').forEach(submenu => {
                    submenu.classList.remove('show', 'hide'); // Close submenu
                });
            }, 400); // Hide the submenus once the nav closes
        }
    });

    // Prevent scrolling inside the menu
    nav.addEventListener('touchmove', (event) => {
        event.preventDefault();
    }, { passive: false });
}