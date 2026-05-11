import burgerButton from "./burger-button.js";
import contactForm from "./contact-form.js";
import switchTheme from "./theme-toggle.js";

document.addEventListener("DOMContentLoaded", () => {
  burgerButton(".header-container", ".menu-toggle", ".nav-menu");
  contactForm("contact-form", ".contact-form-loader", ".contact-form-response p");
  switchTheme("theme-toggle");
});
