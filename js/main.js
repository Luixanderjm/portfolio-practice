import burgerButton from "./burger-button.js";
import contactForm from "./contact-form.js";

document.addEventListener("DOMContentLoaded", () => {
  burgerButton(".header-container", ".menu-toggle", ".nav-menu");
  contactForm("contact-form");
});
