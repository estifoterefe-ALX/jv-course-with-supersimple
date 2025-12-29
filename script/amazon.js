import { products } from "../data/products.js";
import { addToCart, totalcart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const productMainContainer = document.querySelector(".products-grid");
const cartQuantityEl = document.querySelector(".cart-quantity");
cartQuantityEl.innerText = totalcart();

function displayProducts(product) {
  const productContainer = document.createElement("div");
  productContainer.className = "product-container";
  /* Image */
  const imageContainer = document.createElement("div");
  imageContainer.className = "product-image-container";

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image;
  image.alt = product.name;

  imageContainer.appendChild(image);

  /* Name */
  const name = document.createElement("div");
  name.className = "product-name limit-text-to-2-lines";
  name.textContent = product.name;

  /* Rating */
  const ratingContainer = document.createElement("div");
  ratingContainer.className = "product-rating-container";

  const ratingStars = document.createElement("img");
  ratingStars.className = "product-rating-stars";
  ratingStars.src = `images/ratings/rating-${product.rating.stars * 10}.png`;

  const ratingCount = document.createElement("div");
  ratingCount.className = "product-rating-count link-primary";
  ratingCount.textContent = product.rating.count;

  ratingContainer.append(ratingStars, ratingCount);

  /* Price */
  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = `$${(product.priceCents / 100).toFixed(2)}`;

  /* Quantity selector */
  const quantityContainer = document.createElement("div");
  quantityContainer.className = "product-quantity-container";

  const select = document.createElement("select");

  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if (i === 1) option.selected = true;
    select.appendChild(option);
  }

  quantityContainer.appendChild(select);

  /* Spacer */
  const spacer = document.createElement("div");
  spacer.className = "product-spacer";

  /* Added to cart */
  const added = document.createElement("div");
  added.className = "added-to-cart";

  const checkIcon = document.createElement("img");
  checkIcon.src = "images/icons/checkmark.png";

  added.append(checkIcon, " Added");

  /* Button */
  const button = document.createElement("button");
  button.className = "add-to-cart-button button-primary";
  button.textContent = "Add to Cart";
  button.addEventListener("click", () => {
    addToCart({
      id: product.id,
      count: parseInt(select.value, 10),
      shipping: 0,
      shippingDate: dayjs().add(5, "day").format("dddd, MMMM D"),
    });
    cartQuantityEl.innerText = totalcart();
    added.style.opacity = "1";
    setTimeout(() => {
      added.style.opacity = "0";
    }, 1000);
  });
  /* Assemble */
  productContainer.append(
    imageContainer,
    name,
    ratingContainer,
    price,
    quantityContainer,
    spacer,
    added,
    button
  );

  return productContainer;
}

{
  const frag = document.createDocumentFragment();
  products.forEach((product) => {
    const items = displayProducts(product);
    frag.appendChild(items);
  });
  productMainContainer.appendChild(frag);
}
