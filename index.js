import { urlProductList, fetchData, toggleMenu, cartValue } from "./utils.js";

// fetch clothes and accessories data

const init = () => {
  const main = document.querySelector("main");
  const container = document.createElement("section");
  container.classList.add("container-1");
  const cloth_heading = document.createElement("h2");
  cloth_heading.classList.add("heading");
  const clothing_div = document.createElement("div");
  clothing_div.classList.add("card-container");
  cloth_heading.setAttribute("id", "clothing-section");

  const accessory_heading = document.createElement("h2");
  accessory_heading.classList.add("heading");
  const accessory_div = document.createElement("div");
  accessory_div.classList.add("card-container");
  accessory_heading.setAttribute("id", "accessories-section");

  cloth_heading.innerHTML = "Clothing for Men and Women";
  accessory_heading.innerHTML = "Accessories for Men and Women";
  main.appendChild(container);
  container.appendChild(cloth_heading);
  container.appendChild(clothing_div);
  container.appendChild(accessory_heading);
  container.appendChild(accessory_div);
  cartValue();
  const response = fetchData(urlProductList);
  response
    .then((productList) => {
      for (let prod of productList) {
        const cards = document.createElement("div");
        cards.classList.add("cards");
        cards.setAttribute("id", `product-id-${prod.id}`);

        const a = document.createElement("a");
        a.setAttribute("href", `./product.html?id=${prod.id}`);

        const prod_image = document.createElement("img");
        prod_image.classList.add("p-image");
        prod_image.setAttribute("src", prod.preview);

        const prod_details = document.createElement("div");
        prod_details.classList.add("prod-details");
        const prod_name = document.createElement("h3");
        const prod_brand = document.createElement("h4");
        const prod_price = document.createElement("h5");

        prod_name.innerHTML = prod.name;
        prod_brand.innerHTML = prod.brand;
        prod_price.innerHTML = `Rs ${prod.price}`;

        if (!prod.isAccessory) {
          clothing_div.appendChild(cards);
        } else {
          accessory_div.appendChild(cards);
        }

        cards.appendChild(a);
        a.appendChild(prod_image);
        a.appendChild(prod_details);
        prod_details.appendChild(prod_name);
        prod_details.appendChild(prod_brand);
        prod_details.appendChild(prod_price);
      }
    })
    .catch((res) => {
      console.log("Caught Error", res);
    });

  const hamburgerMenu = document.querySelector(".hamburger-menu");
  toggleMenu(hamburgerMenu);
};
window.addEventListener("DOMContentLoaded", init);
