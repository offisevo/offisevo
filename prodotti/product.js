// PRODUCT SLIDER, NOT STARTING SLIDING ON PAGE LOAD
let currentSlide = 0; // Track the active slide index
const slides = document.querySelector(".product-slides");
const totalSlides = document.querySelectorAll(".product-slide").length;
let isSliding = false; // Prevent overlapping transitions
let autoSlideTimeout; // Timer to pause auto-slide after manual interaction
let autoSlideInterval; // Interval for automatic sliding
const autoSlideDelay = 4000; // Time between slides (4 seconds)
window.addEventListener('scroll', checkScroll); // Call the checkScroll function on scroll
checkScroll(); // Initial check in case the element is already in view

function isElementInViewport(el) { // Function to check if the element is in view
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function checkScroll() { // Function to handle the scroll event
    const slider = document.querySelector('.product-slider');
    if (isElementInViewport(slider)) {
        startAutoSlide(); // Start auto-slide when the element is visible
        window.removeEventListener('scroll', checkScroll); // Stop checking after starting
    }
}

function updateSlider() { // Update the slider position and active indicator
    // Move the slides container
    const offset = currentSlide * -100; // Calculate offset percentage
    slides.style.transform = `translateX(${offset}%)`;
    // Update the active class on the dots
    const dots = document.querySelectorAll(".product-dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}
function changeSlide(direction) { // Move to the next or previous slide
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
function goToSlide(index) { // Jump directly to a specific slide via indicators
    if (isSliding) return; // Block mid-animation jumps
    currentSlide = index;
    updateSlider();
    resetAutoSlide(); // Reset the auto-slide timer
}
function autoSlide() { // Auto-slide functionality
    changeSlide(1); // Move to the next slide
}
function startAutoSlide() {
    if (!autoSlideInterval) { // Start the interval only if it hasn't been set
        autoSlideInterval = setInterval(autoSlide, autoSlideDelay);
    }
}
function stopAutoSlide() {
    clearInterval(autoSlideInterval); // Clear both the interval and timeout
    autoSlideInterval = null; // Reset the interval variable
}
function resetAutoSlide() {
    clearTimeout(autoSlideTimeout); // Clear any pending timeout
    autoSlideTimeout = setTimeout(() => {
        autoSlide(); // Move to the next slide and restart auto-slide
        startAutoSlide();
    }, autoSlideDelay); // Wait X seconds before restarting auto-slide
}
document.addEventListener("DOMContentLoaded", () => { // Initialize the slider and set the first dot as active
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
let touchStartX = 0; // Variables to track touch positions
let touchEndX = 0;
function handleTouchStart(event) { // Function to handle touch start event
    touchStartX = event.changedTouches[0].screenX;
}
function handleTouchMove(event) {// Function to handle touch move event (optional)
    touchEndX = event.changedTouches[0].screenX;
}
function handleTouchEnd() { // Function to handle touch end event
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