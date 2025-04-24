document.addEventListener("DOMContentLoaded", function() {

	var mq = window.matchMedia('(orientation: portrait)');

	if (mq.matches) {
		console.log("version téléphone")

	} else {
		console.log("version ordi")
		let startCircle = null;
		// let addressContainer = document.body.querySelector(".address");
		let circles = document.body.querySelectorAll(".anchor");

		function handleClick(element) {
			for (let other of circles) {
				if (other !== startCircle) {
					other.style.fill = "rgba(0, 0, 0, 100)";
				}
			}
			if (element !== startCircle) {
				element.style.fill = "rgba(150, 150, 150, 100)";
			}
		}

		if (document.location.href.indexOf("#") != -1) {
			startCircle = document.getElementById(document.location.hash.split('#')[1]);
			startCircle.style.fill = "rgba(150, 150, 150, 100)";
			handleClick(startCircle);
		}

		for (circle of circles) {
			let c = circle;
			circle.addEventListener("click", (e) => {
				handleClick(c);
			});
		}
	}

});

window.addEventListener("hashchange", function() {
	let hash = document.location.hash.replace("#", "");
	let section = document.getElementById(hash);
	if (section) {
		let h1 = section.querySelector("h1");
		if (h1) {
			h1.classList.remove("animate__flash"); // reset si nécessaire
			void h1.offsetWidth; // reflow pour relancer l'animation
			h1.classList.add("animate__flash");
		}
	}
});