const buttons = document.querySelectorAll(".card_button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".skill_card");

        const description = card.querySelector(".card_decription");
        const arrow = card.querySelector(".card_button_arrow");

        card.classList.toggle("unwrap")
        description.classList.toggle("unwrap");
        arrow.classList.toggle("unwrap");
    });
});