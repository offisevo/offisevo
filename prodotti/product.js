// SLIDER
// Define the intersection observer callback
function onIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAutoSlide(); // Start auto-slide when the element is visible
            observer.disconnect(); // Stop observing once it becomes visible
        }
    });
}
// Create the intersection observer
const observer = new IntersectionObserver(onIntersection, {
    root: null, // Use the viewport as the root
    threshold: 0.1 // Trigger when at least 10% of the element is visible
});
// Select the slider container to observe
const sliderElement = document.querySelector('.product-slider');
observer.observe(sliderElement);

// old slider code start
let currentSlide = 0; // Track the active slide index
const slides = document.querySelector(".product-slides");
const totalSlides = document.querySelectorAll(".product-slide").length;
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
    const dots = document.querySelectorAll(".product-dot");
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
});

// Event listeners for manual controls
document.querySelector(".product-prev").addEventListener("click", () => changeSlide(-1));
document.querySelector(".product-next").addEventListener("click", () => changeSlide(1));

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
const slider = document.querySelector(".product-slider");
slider.addEventListener("touchstart", handleTouchStart, { passive: true });
slider.addEventListener("touchmove", handleTouchMove, { passive: true }); // Optional
slider.addEventListener("touchend", handleTouchEnd, { passive: true });



// LOAD FOOTER
function loadFooter() {
    fetch('../footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-container').innerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  }
  
  // Load the footer when the document is fully loaded
  document.addEventListener('DOMContentLoaded', loadFooter);