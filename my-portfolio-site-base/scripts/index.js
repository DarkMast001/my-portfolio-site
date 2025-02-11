import { typeTextAnimation } from "./animationHeaderTextScript.js";

const typedTextElementWide = document.getElementById("typed-text-wide");
const cursorElementWide = document.querySelector(".cursor_wide");

const typedTextElementNarrow = document.getElementById("typed-text-narrow");
const cursorElementNarrow = document.querySelector(".cursor_narrow");

if (typedTextElementWide != null && cursorElementWide != null){
	setTimeout(() => {
		typeTextAnimation("<Home/>", typedTextElementWide, cursorElementWide);
	}, 500);
}

if (typedTextElementNarrow != null && cursorElementNarrow != null){
	setTimeout(() => {
		typeTextAnimation("<Home/>", typedTextElementNarrow, cursorElementNarrow);
	}, 500);
}