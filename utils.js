const urlProductList = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function fetchProductDetails(url, prodictId) {
  const response = await fetch(`${url}/${prodictId}`);
  return await response.json();
}

function toggleMenu(element) {
  element.addEventListener("click", () => {
    const hamburgerList = document.querySelector(".hamburger-list");
    hamburgerList.classList.add("show-hamburger");
    const hamburgerIcon = document.querySelector(".hamburger-menu");
    hamburgerIcon.classList.add("hide");
    const cross = document.querySelector(".cross");
    cross.classList.add("show");

    cross.addEventListener("click", () => {
      hamburgerList.classList.remove("show-hamburger");
      hamburgerIcon.classList.remove("hide");
      cross.classList.remove("show");
    });
  });
}

function cartValue() {
  const val = parseInt(localStorage.getItem("cartNumbers"));
  if (val) {
    const elements = document.querySelectorAll(".cart-num");
    for (let ele of elements) ele.textContent = val;
  }
}

function addProductsToCart() {}

export {
  urlProductList,
  fetchData,
  fetchProductDetails,
  toggleMenu,
  cartValue,
};
