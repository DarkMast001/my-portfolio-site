const header = document.querySelector(".header");

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

const typeTextAnimation = (text, typedTextElement, cursorElement) => {
    let index = 0;

    function type() {
        if (index < text.length) {
            typedTextElement.textContent += text[index];
            index++;
            if (index > 0 && index <= 1)
                setTimeout(type, 400);
            else if (index > 1 && index <= 4)
                setTimeout(type, 200);
            else if (index > 4 && index <= 7)
                setTimeout(type, 400);
            else if (index > 7 && index <= 9)
                setTimeout(type, 200);
            else
                setTimeout(type, 300);
        } else {
            cursorElement.style.display = "none";
        }
    }

    type();
}

const playHeaderAnimation = () => {
    const word = header.getAttribute("data-page");

	if (typedTextElementWide != null && cursorElementWide != null){
		setTimeout(() => {
			typeTextAnimation(word, typedTextElementWide, cursorElementWide);
		}, 2000);
	}
	
	if (typedTextElementNarrow != null && cursorElementNarrow != null){
		setTimeout(() => {
			typeTextAnimation(word, typedTextElementNarrow, cursorElementNarrow);
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