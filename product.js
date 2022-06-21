import {
  urlProductList,
  fetchProductDetails,
  toggleMenu,
  cartValue,
} from "./utils.js";

//fetch product details
function productDetailsPage(productData) {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  toggleMenu(hamburgerMenu);

  const main = document.querySelector("main");
  const container = document.createElement("section");
  container.classList.add("container");

  const section1 = document.createElement("div");
  section1.classList.add("section-1");

  const previewImg = document.createElement("img");
  previewImg.classList.add("preview-img");
  previewImg.setAttribute("src", productData.preview);

  const section2 = document.createElement("div");
  section2.classList.add("section-2");

  const prodDetails = document.createElement("div");
  prodDetails.classList.add("prod-details");

  const h1 = document.createElement("h1");
  h1.innerHTML = productData.name;

  const prodBrand = document.createElement("h4");
  prodBrand.innerHTML = productData.brand;

  const prodPrice = document.createElement("h3");
  prodPrice.innerHTML = `Price: Rs `;

  const price = document.createElement("span");
  price.classList.add("price");
  price.innerHTML = productData.price;

  const prodDescription = document.createElement("div");
  prodDescription.classList.add("prod-description");

  const descriptionHEading = document.createElement("h3");
  descriptionHEading.innerHTML = `Description`;

  const descriptionPara = document.createElement("p");
  descriptionPara.classList.add("description-para");
  descriptionPara.innerHTML = productData.description;

  const previewImgSection = document.createElement("div");

  const previewHeading = document.createElement("h3");
  previewHeading.innerHTML = `Product Preview`;

  const previewImages = document.createElement("div");
  previewImages.classList.add("preview-images");

  const addToCart = document.createElement("div");

  const btn = document.createElement("button");
  btn.classList.add("add-to-cart");
  btn.innerHTML = "Add To Cart";

  main.appendChild(container);
  container.appendChild(section1);
  container.appendChild(section2);
  section1.appendChild(previewImg);
  section2.appendChild(prodDetails);
  prodDetails.appendChild(h1);
  prodDetails.appendChild(prodBrand);
  prodDetails.appendChild(prodPrice);
  prodPrice.appendChild(price);
  prodDetails.appendChild(prodDescription);
  prodDescription.appendChild(descriptionHEading);
  prodDescription.appendChild(descriptionPara);
  prodDetails.appendChild(previewImgSection);
  previewImgSection.appendChild(previewHeading);
  previewImgSection.appendChild(previewImages);
  section2.appendChild(addToCart);
  addToCart.appendChild(btn);

  for (let i = 0; i < productData.photos.length; i++) {
    let cls = `img${i}`;
    const img = document.createElement("img");
    img.classList.add(cls);
    img.classList.add("pre-image");
    if (i == 0) {
      img.classList.add("active");
    }
    img.setAttribute("src", productData.photos[i]);
    previewImages.appendChild(img);
  }

  const ele = document.querySelectorAll(".pre-image");
  ele.forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelector(".active").classList.remove("active");
      element.classList.add("active");
      previewImg.setAttribute("src", element.src);
    });
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  for (let addButton of addToCartButtons) {
    addButton.addEventListener("click", () => {
      cartNumbers(productData);
      cartValue();
      console.log(addButton.parentElement.parentElement);
    });
  }
}

function cartNumbers(productData) {
  const cartnum = parseInt(localStorage.getItem("cartNumbers"));
  if (cartnum) {
    localStorage.setItem("cartNumbers", cartnum + 1);
  } else {
    localStorage.setItem("cartNumbers", 1);
  }
  setItems(productData);
  totalCost(productData);
}

function setItems(productData) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[productData.id] == undefined) {
      cartItems = {
        ...cartItems,
        [productData.id]: productData,
      };
      cartItems[productData.id]["inCart"] = 0;

      console.log(cartItems[productData.id]);
    }
    cartItems[productData.id]["inCart"] += 1;
  } else {
    cartItems = {
      [productData.id]: productData,
    };
    cartItems[productData.id]["inCart"] = 1;
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(productData) {
  let cost = localStorage.getItem("totalCost");
  if (cost) {
    cost = parseInt(cost) + parseInt(productData.price);
  } else {
    cost = productData.price;
  }
  localStorage.setItem("totalCost", cost);
}

window.addEventListener("DOMContentLoaded", async function () {
  const urlID = window.location.search.replace(/[^0-9]/g, "");
  try {
    const prodData = await fetchProductDetails(urlProductList, urlID);
    productDetailsPage(prodData);
    cartValue();
  } catch (error) {
    console.log(`Caught Error ${error}`);
  }
});
