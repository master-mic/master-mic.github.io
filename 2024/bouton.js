/*document.addEventListener('DOMContentLoaded', function() {
	var menuLinks = document.querySelectorAll('.mobile-menu a');
		menuLinks.forEach(function(link) {
			link.addEventListener('click', function() {
			document.querySelector('.mobile-menu-overlay').style.display = 'none';
		});
	});
});*/


const menuItems = document.querySelectorAll('.menu-item');
console.log[menuItems]

// Add event listeners to each menu item
menuItems.forEach(item => {
  // Add event listener for click event
  item.addEventListener('click', () => {
    // Remove 'active' class from all menu items
    menuItems.forEach(menuItem => {
      menuItem.classList.remove('active');
    });
    // Add 'active' class to the clicked menu item
    item.classList.add('active');
  });

  // Add event listener for touchstart event (for mobile devices)
  item.addEventListener('touchstart', () => {
    // Simulate click event for touch devices
    item.click();
  });
});