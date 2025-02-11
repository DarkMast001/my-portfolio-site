export function typeTextAnimation(text, typedTextElement, cursorElement) {
    let index = 0;

    function type() {
        if (index < text.length) {
            typedTextElement.textContent += text[index];
            index++;
            if (index > 0 && index <= 1)
                setTimeout(type, 400);
            else if (index > 1 && index <= 4)
                setTimeout(type, 200);
            else
                setTimeout(type, 400);
        } else {
            cursorElement.style.display = "none";
        }
    }

    type();
}