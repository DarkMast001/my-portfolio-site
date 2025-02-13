import { typeTextAnimation } from "./animationHeaderTextScript.js";

const typedTextElementWide = document.getElementById("typed-text-wide");
const cursorElementWide = document.querySelector(".cursor_wide");
const typedTextElementNarrow = document.getElementById("typed-text-narrow");
const cursorElementNarrow = document.querySelector(".cursor_narrow");

const burgerIcon = document.querySelector(".burger_icon");
const burgerIconText = document.querySelector(".burger_icon_text_group");

const overlay = document.getElementById("overlay");

const showAndHideMenu = () => {
	burgerIcon.classList.toggle("activate");
	burgerIconText.classList.toggle("hidden");
	overlay.classList.toggle("hidden");
}

const hideBurgerMenu = () => {
	if (burgerIcon.classList.contains("activate")){
		burgerIconText.classList.add("hidden");
		burgerIcon.classList.remove("activate");
		overlay.classList.add("hidden");
	}
}

const playHeaderAnimation = () => {
	if (typedTextElementWide != null && cursorElementWide != null){
		setTimeout(() => {
			typeTextAnimation("<Home/>", typedTextElementWide, cursorElementWide);
		}, 2000);
	}
	
	if (typedTextElementNarrow != null && cursorElementNarrow != null){
		setTimeout(() => {
			typeTextAnimation("<Home/>", typedTextElementNarrow, cursorElementNarrow);
		}, 2000);
	}
}

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.burger_link');

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            hideBurgerMenu();
        });
    });
});

document.querySelector(".burger_icon").addEventListener("click", function() {
	showAndHideMenu();
});

document.addEventListener("click", (event) => {
	if (!burgerIcon.contains(event.target))
		hideBurgerMenu();
})

playHeaderAnimation();