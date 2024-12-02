// JavaScript to toggle the mobile menu
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




// Slider
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
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchmove", handleTouchMove); // Optional
slider.addEventListener("touchend", handleTouchEnd);



// Popup handling
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
    }, 10); // Small delay to ensure display style is set
  }
}

function enableHorizontalScroll(popup) {
  const imagesContainer = popup.querySelector('.images-container');
  imagesContainer.addEventListener('wheel', function(event) {
    if (event.deltaY !== 0) {
      imagesContainer.scrollLeft += event.deltaY; // Translate vertical scroll to horizontal scroll
      event.preventDefault(); // Prevent default vertical scroll behavior
    }
  }, { passive: false });
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

document.addEventListener("DOMContentLoaded", function() {
  const closePopupButtons = document.querySelectorAll(".close-popup-button");
  const overlay = document.getElementById('popup-overlay');
  const leftArrows = document.querySelectorAll('.left-scroll-arrow-button');
  const rightArrows = document.querySelectorAll('.right-scroll-arrow-button');

  // Function to close popup
  closePopupButtons.forEach(button => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      popup.classList.remove('show');
      popup.classList.add('hide');
      overlay.classList.remove('show');
      overlay.classList.add('hide');
      setTimeout(() => {
        overlay.style.display = "none"; // Hide the overlay
        enableVerticalScroll(); // Enable vertical scroll after closing the popup
      }, 500); // Match the closing transition duration
    });
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
