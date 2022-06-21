import { toggleMenu, cartValue } from "./utils.js";

window.addEventListener("DOMContentLoaded", async function () {
  try {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    toggleMenu(hamburgerMenu);
    cartValue();
  } catch (error) {
    console.log(`Caught Error ${error}`);
  }
});
