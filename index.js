// SLIDER
let currentSlide = 0; // Track the active slide index
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;
let isSliding = false; // Prevent overlapping transitions
let autoSlideTimeout; // Timer to pause auto-slide after manual interaction
let autoSlideInterval; // Interval for automatic sliding
const autoSlideDelay = 3000; // Time between slides (3 seconds)
// Update the slider position and active indicator
function updateSlider() {
  // Move the slides container
  const offset = currentSlide * -100; // Calculate offset percentage
  slides.style.transform = `translateX(${offset}%)`;
  // Update the active class on the dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}
// Move to the next or previous slide
function changeSlide(direction) {
  // Prevent overlapping slide actions
  if (isSliding) return;
  isSliding = true;
  currentSlide += direction;
  // Wrap around if out of bounds
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Go to the last slide
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0; // Go to the first slide
  }
  updateSlider(); // Update the slider
  // Allow new slide actions after the animation completes
  setTimeout(() => {
    isSliding = false;
  }, 500); // Match the CSS transition duration
  resetAutoSlide(); // Reset the auto-slide timer
}
// Jump directly to a specific slide via indicators
function goToSlide(index) {
  if (isSliding) return; // Block mid-animation jumps
  currentSlide = index;
  updateSlider();
  resetAutoSlide(); // Reset the auto-slide timer
}
// Auto-slide functionality
function autoSlide() {
  changeSlide(1); // Move to the next slide
}
function startAutoSlide() {
  // Start the interval only if it hasn't been set
  if (!autoSlideInterval) {
    autoSlideInterval = setInterval(autoSlide, autoSlideDelay);
  }
}
function stopAutoSlide() {
  // Clear both the interval and timeout
  clearInterval(autoSlideInterval);
  autoSlideInterval = null; // Reset the interval variable
}
function resetAutoSlide() {
  stopAutoSlide(); // Stop any ongoing auto-slide
  clearTimeout(autoSlideTimeout); // Clear any pending timeout
  autoSlideTimeout = setTimeout(() => {
    startAutoSlide(); // Restart auto-slide after the delay
  }, autoSlideDelay); // Wait 5 seconds before restarting auto-slide
}
// Initialize the slider and set the first dot as active
document.addEventListener("DOMContentLoaded", () => {
  updateSlider();
  startAutoSlide(); // Start the auto-slide on page load
});

// Event listeners for manual controls
document.querySelector(".prev").addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));
// Add event listener for keyboard navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      changeSlide(1); // Move to the next slide
    } else if (event.key === "ArrowLeft") {
      changeSlide(-1); // Move to the previous slide
    }
});
// Support for swiping
// Variables to track touch positions
let touchStartX = 0;
let touchEndX = 0;
// Function to handle touch start event
function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}
// Function to handle touch move event (optional)
function handleTouchMove(event) {
  touchEndX = event.changedTouches[0].screenX;
}
// Function to handle touch end event
function handleTouchEnd() {
  if (touchEndX < touchStartX - 50) {
    changeSlide(1); // Swipe left, move to the next slide
  } else if (touchEndX > touchStartX + 50) {
    changeSlide(-1); // Swipe right, move to the previous slide
  }
}
// Add touch event listeners to the slider container
const slider = document.querySelector(".slider");
slider.addEventListener("touchstart", handleTouchStart, { passive: true });
slider.addEventListener("touchmove", handleTouchMove, { passive: true }); // Optional
slider.addEventListener("touchend", handleTouchEnd, { passive: true });







// PRODUCT SELECTION MENU
document.addEventListener("DOMContentLoaded", function() {
  // Add the 'spawn' class to the first-level menu after a short delay (2 seconds)
  const firstLevelMenu = document.querySelector('.level-1');
  setTimeout(() => {
    if (firstLevelMenu) {
      firstLevelMenu.classList.add('spawn');
    }
  }, 100);
  // Add event listener to the document to detect clicks outside the menu-container
  document.addEventListener('click', function(event) {
    const menuContainer = document.querySelector('.menu-container');
    if (!menuContainer.contains(event.target)) {
      resetMenu();
    }
  });
});
// Generalized showMenu function with level as a parameter
function showMenu(menuId, clickedElement, level) {
  // Hide all menus that are deeper than the current level
  const allMenus = document.querySelectorAll('.menu');
  allMenus.forEach(menu => {
    const menuLevel = parseInt(menu.classList[1].split('-')[1]);  // Extract the level from class
    if (menuLevel > level) {
      menu.style.display = 'none'; // Hide menus at deeper levels
      menu.classList.remove('shrink', 'spawn'); // Reset animations
    }
  });
  // Show the clicked menu (this is the menu that corresponds to the `menuId`)
  const menuToShow = document.getElementById(`menu-${menuId}`);
  if (menuToShow) {
    menuToShow.style.display = 'flex';  // Show the menu
    setTimeout(() => {
      menuToShow.classList.remove('shrink');
      menuToShow.classList.add('spawn'); // Trigger spawn effect
    }, 100); // Delay to ensure the menu is displayed before applying the class
  }
  // Apply transform and opacity change to all menus at the same level as the clicked one
  const parentLevelMenus = clickedElement.closest('.menu-container').querySelectorAll(`.level-${level}`);
  parentLevelMenus.forEach(menu => {
    menu.classList.remove('spawn');
    menu.classList.add('shrink');
  });
}
// Function to reset the menu to the initial state
function resetMenu() {
  const allMenus = document.querySelectorAll('.menu');
  const firstLevelMenu = document.querySelector('.level-1');
  allMenus.forEach(menu => {
    menu.style.display = 'none'; // Hide all menus
    menu.classList.remove('shrink', 'spawn'); // Reset animations
  });
  if (firstLevelMenu) {
    firstLevelMenu.style.display = 'flex'; // Show the first-level menu
    firstLevelMenu.classList.add('spawn'); // Trigger spawn effect
  }
}




// PRODUCTS POPUP
function showPopup(popupId) {
  const popup = document.getElementById(`popup${popupId}`);
  const overlay = document.getElementById('popup-overlay');
  if (popup) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden'; // Disable background scrolling
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Compensate for scrollbar width
      overlay.style.display = "block"; // Show the overlay
      setTimeout(() => {
          overlay.classList.remove('hide');
          overlay.classList.add('show');
          popup.classList.remove('hide');
          popup.classList.add('show');
          enableHorizontalScroll(popup); // Enable horizontal scrolling for popup content
          loadImages(popup).then(() => {
              popup.querySelector('.images-container').style.visibility = 'visible';
          });
      }, 10); // Small delay to ensure display style is set
  }
}

function enableHorizontalScroll(popup) {
  const imagesContainer = popup.querySelector('.images-container');
  if (imagesContainer) {
      imagesContainer.addEventListener('wheel', function(event) {
          if (event.deltaY !== 0) {
              imagesContainer.scrollLeft += event.deltaY; // Translate vertical scroll to horizontal scroll
              event.preventDefault(); // Prevent default vertical scroll behavior
          }
      }, { passive: false });
  }
}

function enableVerticalScroll() {
  document.body.style.overflow = ''; // Enable background scrolling by resetting the overflow property
  document.body.style.paddingRight = ''; // Remove the padding compensation
  const imagesContainers = document.querySelectorAll('.images-container');
  imagesContainers.forEach(container => {
      const newContainer = container.cloneNode(true);
      container.parentNode.replaceChild(newContainer, container);
  });
}

function loadImages(popup) { // Function for lazy loading images
  return new Promise((resolve) => {
      const images = popup.querySelectorAll('img[data-src]');
      let loadedCount = 0;

      const onLoad = () => {
          loadedCount += 1;
          if (loadedCount === images.length) {
              resolve(); // Resolve the promise when all images are loaded
          }
      };

      images.forEach(img => {
          img.addEventListener('load', onLoad);
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src'); // Remove data-src attribute after loading
      });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const closePopupButtons = document.querySelectorAll(".close-popup-button");
  const overlay = document.getElementById('popup-overlay');
  const leftArrows = document.querySelectorAll('.left-scroll-arrow-button');
  const rightArrows = document.querySelectorAll('.right-scroll-arrow-button');

  function closePopup(popup) {
      if (popup) {
          popup.classList.remove('show');
          popup.classList.add('hide');
          overlay.classList.remove('show');
          overlay.classList.add('hide');
          setTimeout(() => {
              overlay.style.display = "none"; // Hide the overlay
              enableVerticalScroll(); // Enable vertical scroll after closing the popup
          }, 500); // Match the closing transition duration
      }
  }

  // Function to close popup when clicking the close button
  closePopupButtons.forEach(button => {
      button.addEventListener("click", () => {
          const popup = button.closest(".popup");
          closePopup(popup);
      });
  });

  // Function to close popup when pressing the Esc key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
          const popup = document.querySelector('.popup.show');
          closePopup(popup);
      }
  });

  // Handle left arrow click
  leftArrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
          const imagesContainer = arrow.nextElementSibling;
          imagesContainer.scrollBy({ left: -1450, behavior: 'smooth' }); // Adjust scroll distance as needed
      });
  });

  // Handle right arrow click
  rightArrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
          const imagesContainer = arrow.previousElementSibling;
          imagesContainer.scrollBy({ left: 1450, behavior: 'smooth' }); // Adjust scroll distance as needed
      });
  });
});




// LOAD FOOTER
function loadFooter() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
}

// Load the footer when the document is fully loaded
document.addEventListener('DOMContentLoaded', loadFooter);