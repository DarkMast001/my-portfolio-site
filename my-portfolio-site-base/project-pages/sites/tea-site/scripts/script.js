const menuButton = document.getElementById("menuButton");
const menuContainer = document.getElementById("menuContainer");
const overlay = document.getElementById("overlay");

menuButton.addEventListener("click", () => {
	closeMenu();
});

btnCloseMenu.addEventListener("click", () => {
	closeMenu();
});

document.addEventListener("click", (event) => {
	if (!menuButton.contains(event.target) && !menuContainer.contains(event.target)) {
		menuContainer.classList.add("hidden");
		overlay.classList.add("hidden");
	}
});

menuContainer.addEventListener("click", (event) => {
	if (!menuButton.contains(event.target) && !menuContainer.contains(event.target)) {
		menuContainer.classList.add("hidden");
		overlay.classList.add("hidden");
	}
});

const closeMenu = () => {
	menuContainer.classList.toggle("hidden");
	overlay.classList.toggle("hidden");
};

const callToMe = () => {
	window.location.href = "tel:+370680123456";
}