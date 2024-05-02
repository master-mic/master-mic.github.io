document.addEventListener("DOMContentLoaded", function() {
	var fixedDiv = document.querySelector(".fond");
	var images = {}; // Object to store image elements
	var spans = {}; // Object to store span elements

	// Function to check if element is in viewport
	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		var footerHeight = 5 * window.innerHeight / 100; // Assuming the footer height is 2rem
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight - footerHeight || document.documentElement.clientHeight - footerHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
	}

	// Load images into objects
	function loadImages() {
		var filename = window.location.pathname.split("/").pop(); // Get the filename (e.g., firstname_lastname.html)
		var directory = "./medias/" + filename.split(".")[0] + "/"; // Construct the directory path (e.g., ./medias/firstname_lastname/)

		// Find all span elements with IDs starting with "id-"
		var spanElements = document.querySelectorAll('[id^="id-"]');
		var numImages = spanElements.length;

		// Load images based on the number of span elements found
		for (var i = 1; i <= numImages; i++) {
			var image = new Image();
			image.src = directory + "0" + i + ".jpeg";
			images["img" + i] = image;
		}
	}

	// Load images into fixed div if corresponding span is in viewport
	function loadImagesIfVisible() {
		var imagesLoaded = false;
		for (var i = 1; i <= Object.keys(images).length; i++) {
			if (spans["span" + i] && isElementInViewport(spans["span" + i])) {
				// Load image into fixed div
				fixedDiv.innerHTML = ''; // Clear any existing content
				var imageWrapper = document.createElement("div");
				imageWrapper.classList.add("image-wrapper");
				var img = images["img" + i].cloneNode(true);
				imageWrapper.appendChild(img);
				fixedDiv.appendChild(imageWrapper);
				imagesLoaded = true;
			}
		}
		// If no span is in viewport, revert fixed div to empty state
		if (!imagesLoaded) {
			fixedDiv.innerHTML = ''; // Clear any existing content
		}
	}

		// Load images on page load
	loadImages();

// Store span elements in objects
	var spanElements = document.querySelectorAll('[id^="id-"]');
	spanElements.forEach(function(span, index) {
		spans["span" + (index + 1)] = span;
	});

	// Add event listener to the image container
	var imageContainer = document.querySelector('.image-container');
	imageContainer.addEventListener('mouseover', function() {
		if (document.querySelector('.image-wrapper img')) {
			// Change color to blue and add bottom border only for the corresponding span
			var currentImageNumber = Object.keys(images).find(key => images[key].src === document.querySelector('.image-wrapper img').src).match(/\d+/)[0];
			Object.entries(spans).forEach(([key, span]) => {
				var spanNumber = key.substring(4); // Extract the number from the span key
				if (currentImageNumber === spanNumber) {
					// Check if the corresponding span matches the current image
					span.style.color = 'white';
					span.style.backgroundColor = 'black';
					span.style.borderBottom = '3px solid black';
					span.style.zIndex = '20';
					span.style.position = 'relative';
					// Show description
					var description = span.querySelector('.image-description');
					description.style.display = 'inline';
				}
			});
		}
	});

	imageContainer.addEventListener('mouseleave', function() {
		// Revert color and border to default on hover out
		Object.values(spans).forEach(span => {
			span.style.color = 'lightgrey';
			span.style.backgroundColor = 'lightgrey';
			span.style.borderBottom = '3px solid lightgrey';
			span.style.zIndex = '';
			// Hide description
			var description = span.querySelector('.image-description');
			if (description) {
				description.style.display = 'none'; // Hide the description
			}
		});
	});

		// Vérifier si l'appareil est un mobile en mode portrait
	var isMobilePortrait = window.innerWidth < window.innerHeight;
	
	// Ajouter un écouteur d'événement pour les clics en dehors des images et des légendes sur les mobiles en mode portrait uniquement
	if (isMobilePortrait) {
		document.addEventListener('click', function(event) {
			// Vérifie si le clic s'est produit en dehors des images et des légendes
			var isClickOutsideImageAndLegend = !event.target.closest('.image-wrapper') && !event.target.closest('.image-description');
			
			if (isClickOutsideImageAndLegend) {
				// Cacher toutes les légendes
				Object.values(spans).forEach(span => {
					var description = span.querySelector('.image-description');
					if (description) {
						description.style.display = 'none'; // Hide the description
					}
				});
			}
		});
	}

	// Check if images are in viewport on scroll
	window.addEventListener('scroll', function() {
		loadImagesIfVisible();
	});
});

document.addEventListener('DOMContentLoaded', function() {

});