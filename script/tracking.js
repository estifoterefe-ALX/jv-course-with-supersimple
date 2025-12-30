import { totalcart } from "../data/cart.js";
import { productsById } from "../data/products.js";
document.querySelector(".cart-quantity").innerText = totalcart();
function createOrderTracking(data) {
  const orderTracking = document.createElement("div");
  orderTracking.className = "order-tracking";

  /* Delivery Date */
  const deliveryDate = document.createElement("div");
  deliveryDate.className = "delivery-date";
  deliveryDate.textContent = `Arriving on ${data.product.arrivedAt}`;

  /* Product Name */
  const productInfoName = document.createElement("div");
  productInfoName.className = "product-info";
  productInfoName.textContent = productsById[data.product.productId].name;

  /* Quantity */
  const productInfoQuantity = document.createElement("div");
  productInfoQuantity.className = "product-info";
  productInfoQuantity.textContent = `Quantity: ${data.product.quantity}`;

  /* Product Image */
  const productImage = document.createElement("img");
  productImage.className = "product-image";
  productImage.src = productsById[data.product.productId].image;
  productImage.alt = productsById[data.product.productId].name;

  /* Progress Labels */
  const labelsContainer = document.createElement("div");
  labelsContainer.className = "progress-labels-container";

  const statuses = ["Preparing", "Shipped", "Delivered"];

  statuses.forEach((status) => {
    const label = document.createElement("div");
    label.className = "progress-label";
    label.textContent = status;

    if (data.product.status === status) {
      label.classList.add("current-status");
    }

    labelsContainer.appendChild(label);
  });

  /* Progress Bar */
  const progressBarContainer = document.createElement("div");
  progressBarContainer.className = "progress-bar-container";

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  switch (data.product.status) {
    case "Preparing":
      progressBar.style.width = "5%";
      break;

    case "Shipped":
      progressBar.style.width = "66%";
      break;

    case "Delivered":
      progressBar.style.width = "100%";
      break;

    default:
      progressBar.style.width = "5%";
  }

  progressBarContainer.appendChild(progressBar);

  orderTracking.append(
    deliveryDate,
    productInfoName,
    productInfoQuantity,
    productImage,
    labelsContainer,
    progressBarContainer
  );

  return orderTracking;
}
function displayTracking() {
  const ordersGrid = document.querySelector(".main");
  const itemRaw = sessionStorage.getItem("trackingOrderId");
  if (!itemRaw) {
    const msg = document.createElement("div");
    msg.className = "no-tracking-message";
    msg.textContent = "No tracking data available.";
    ordersGrid.appendChild(msg);
    return;
  }
  let item;
  try {
    item = JSON.parse(itemRaw);
  } catch (e) {
    const msg = document.createElement("div");
    msg.className = "no-tracking-message";
    msg.textContent = "Invalid tracking data.";
    ordersGrid.appendChild(msg);
    return;
  }
  ordersGrid.appendChild(createOrderTracking(item));
}
displayTracking();
