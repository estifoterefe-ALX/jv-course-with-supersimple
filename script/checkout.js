import { products } from "../data/products.js";
import { cart, countUpdater, removeFromCart, totalcart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { displayPaymentSummary } from "./summary.js";

const cartItemsContainer = document.querySelector(".order-summary");
document.querySelector(".return-to-home-link").innerText = totalcart();
const productsById = Object.fromEntries(products.map((p) => [p.id, p]));
function renderCartItem(cart, index) {
  const container = document.createElement("div");
  container.className = `cart-item-container cart-container-js--${cart.id}`;

  /* Delivery date */
  const deliveryDate = document.createElement("div");
  deliveryDate.className = "delivery-date";
  deliveryDate.textContent = "Delivery date: Tuesday, June 21";

  /* Grid */
  const grid = document.createElement("div");
  grid.className = "cart-item-details-grid";

  /* Image */
  const image = document.createElement("img");
  image.className = "product-image";
  image.src = productsById[cart.id].image;
  image.alt = productsById[cart.id].name;

  /* Item details */
  const details = document.createElement("div");
  details.className = "cart-item-details";

  const name = document.createElement("div");
  name.className = "product-name";
  name.textContent = productsById[cart.id].name;

  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = `$${(productsById[cart.id].priceCents / 100).toFixed(2)}`;

  /* Quantity */
  const quantity = document.createElement("div");
  quantity.className = "product-quantity";

  const quantityText = document.createElement("span");
  quantityText.innerHTML = `Quantity: <span class="quantity-label">${cart.count}</span>`;

  const update = document.createElement("span");
  update.className = "update-quantity-link link-primary";
  update.textContent = "Update";
  update.addEventListener("click", () => {
    const save = document.createElement("button");
    const input = document.createElement("input");
    save.className = `js-save-${cart.id}`;
    input.className = `js-input-${cart.id}`;
    input.type = "number";
    save.textContent = "save";
    update.style.opacity = 0;
    quantity.appendChild(input);
    quantity.appendChild(save);
    save.addEventListener("click", () => {
      countUpdater(cart.id, parseInt(input.value, 10));
      quantityText.innerHTML = `Quantity: <span class="quantity-label">${input.value}</span>`;
      save.remove();
      input.remove();
      update.style.opacity = 100;
      document.querySelector(".return-to-home-link").innerText = totalcart();
      summary();
    });
  });

  const del = document.createElement("span");
  del.className = `delete-quantity-link link-primary`;
  del.textContent = "Delete";
  del.addEventListener("click", () => {
    removeFromCart(cart.id, index);
    const dis = document.querySelector(`.cart-container-js--${cart.id}`);
    dis.remove();
    document.querySelector(".return-to-home-link").innerText = totalcart();
    summary();
  });

  quantity.append(quantityText, update, del);
  details.append(name, price, quantity);

  /* Delivery options */
  const deliveryOptions = document.createElement("div");
  deliveryOptions.className = "delivery-options";

  const title = document.createElement("div");
  title.className = "delivery-options-title";
  title.textContent = "Choose a delivery option:";

  deliveryOptions.append(title);

  const options = [
    {
      date: dayjs().add(1, "day").format("dddd, MMMM D"),
      price: 999,
    },
    {
      date: dayjs().add(3, "day").format("dddd, MMMM D"),
      price: 499,
    },
    {
      date: dayjs().add(5, "day").format("dddd, MMMM D"),
      price: 0,
      checked: true,
    },
  ];

  options.forEach((opt, index) => {
    const option = document.createElement("div");
    option.className = "delivery-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.className = "delivery-option-input";
    input.name = `delivery-option-${cart.id}`;
    input.checked = !!opt.checked;

    const info = document.createElement("div");

    const date = document.createElement("div");
    date.className = "delivery-option-date";
    date.textContent = opt.date;

    const price = document.createElement("div");
    price.className = "delivery-option-price";
    price.textContent = `${
      opt.price === 0 ? "Free Shipping" : `$${(opt.price / 100).toFixed(2)}`
    }`;
    input.addEventListener("change", () => {
      cart.shipping = opt.price;
      summary();
    });
    //summaryData.shipping += opt.checked ? opt.price / 100 : 0;

    info.append(date, price);
    option.append(input, info);
    deliveryOptions.append(option);
  });

  /* Assemble grid */
  grid.append(image, details, deliveryOptions);
  container.append(deliveryDate, grid);

  return container;
}

function renderCart() {
  const tempo = document.createDocumentFragment();
  cart.forEach((i, index) => {
    const items = renderCartItem(i, index);
    tempo.appendChild(items);
  });
  cartItemsContainer.appendChild(tempo);
}
renderCart();
summary();

function summary() {
  let summaryData = {
    taxRate: 0.1,
    shipping: shipping(),
    itemsTotal: totalPrice(),
    itemsCount: totalcart(),
  };
  const propsSummary = {
    taxRate: summaryData.taxRate,
    shipping: summaryData.shipping,
    itemsTotal: summaryData.itemsTotal,
    itemsCount: summaryData.itemsCount,
  };
  const productMainContainer = document.querySelector(".checkout-grid");
  const dd = document.querySelector(".payment-summary");
  if (dd) {
    dd.remove();
  }
  productMainContainer.appendChild(displayPaymentSummary(propsSummary));
}
function totalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.count * productsById[item.id].priceCents;
  });
  return total;
}

function shipping() {
  let shippingCost = 0;
  cart.forEach((item) => {
    shippingCost += item.count * item.shipping;
  });
  return shippingCost;
}
