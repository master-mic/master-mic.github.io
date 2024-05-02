document.addEventListener('DOMContentLoaded', function() {
	var menuLinks = document.querySelectorAll('.mobile-menu a');
		menuLinks.forEach(function(link) {
			link.addEventListener('click', function() {
			document.querySelector('.mobile-menu-overlay').style.display = 'none';
		});
	});
});