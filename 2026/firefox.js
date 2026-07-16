document.addEventListener("DOMContentLoaded", function () {
	const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

	if (isFirefox) {
		document.querySelectorAll(".wrap-section").forEach(div => {
			div.style.breakInside = "avoid";
            // div.style.backgroundColor = "pink";
		});
	}
});