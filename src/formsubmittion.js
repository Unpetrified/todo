import makers from "./elementMakers";

const form = document.querySelector(".pop-up form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const label = makers.getLabel("theid", "Hello")

    console.log(label);
})