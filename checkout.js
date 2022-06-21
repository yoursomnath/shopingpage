import { toggleMenu, cartValue } from "./utils.js";

function placeOrder() {
  const ele = document.querySelector(".place-order");

  ele.addEventListener("click", () => {
    localStorage.clear();
  });
}

function init() {
  let cartItemList = localStorage.getItem("productsInCart");
  cartItemList = JSON.parse(cartItemList);
  for (let i in cartItemList) {
    const mainDiv = document.querySelector(".cart-items-outter");
    const container = document.createElement("div");
    container.classList.add("inner-card-container");
    const preview = document.createElement("img");
    preview.classList.add("prev-img");
    const detail = document.createElement("div");
    detail.classList.add("details");
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    mainDiv.appendChild(container);
    container.appendChild(preview);
    container.appendChild(detail);
    detail.appendChild(h3);
    detail.appendChild(p1);
    detail.appendChild(p2);

    preview.setAttribute("src", cartItemList[i]["preview"]);
    h3.innerHTML = cartItemList[i]["name"];
    p1.innerHTML = `x${cartItemList[i]["inCart"]}`;
    p2.innerHTML = `Amount: ${cartItemList[i]["price"]}`;
  }
  const total = localStorage.getItem("totalCost");
  const totalcost = document.querySelector(".total-amt");
  if (total) totalcost.innerHTML = total;
}

window.addEventListener("DOMContentLoaded", async function () {
  try {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    toggleMenu(hamburgerMenu);
    cartValue();
    init();
    placeOrder();
  } catch (error) {
    console.log(`Caught Error ${error}`);
  }
});
