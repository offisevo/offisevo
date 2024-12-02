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
