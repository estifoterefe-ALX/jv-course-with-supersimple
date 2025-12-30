import { totalcart } from "../data/cart.js";
import { orders } from "../data/order-return.js";
import { productsById } from "../data/products.js";
document.querySelector(".cart-quantity").innerText = totalcart();

function createOrder(order) {
  const orderContainer = document.createElement("div");
  orderContainer.className = "order-container";

  /* ---------- HEADER ---------- */
  const orderHeader = document.createElement("div");
  orderHeader.className = "order-header";

  const leftSection = document.createElement("div");
  leftSection.className = "order-header-left-section";

  const orderDate = document.createElement("div");
  orderDate.className = "order-date";

  const orderDateLabel = document.createElement("div");
  orderDateLabel.className = "order-header-label";
  orderDateLabel.textContent = "Order Placed:";

  const orderDateValue = document.createElement("div");
  orderDateValue.textContent = order.orderDate;

  orderDate.append(orderDateLabel, orderDateValue);

  const orderTotal = document.createElement("div");
  orderTotal.className = "order-total";

  const orderTotalLabel = document.createElement("div");
  orderTotalLabel.className = "order-header-label";
  orderTotalLabel.textContent = "Total:";
  let totalamount = 0;
  order.product.forEach((p) => {
    totalamount += p.totalPrice;
  });
  const orderTotalValue = document.createElement("div");
  orderTotalValue.textContent = `$${(totalamount / 100).toFixed(2)}`;

  orderTotal.append(orderTotalLabel, orderTotalValue);

  leftSection.append(orderDate, orderTotal);

  const rightSection = document.createElement("div");
  rightSection.className = "order-header-right-section";

  const orderIdLabel = document.createElement("div");
  orderIdLabel.className = "order-header-label";
  orderIdLabel.textContent = "Order ID:";

  const orderIdValue = document.createElement("div");
  orderIdValue.textContent = order.orderId;

  rightSection.append(orderIdLabel, orderIdValue);

  orderHeader.append(leftSection, rightSection);

  /* ---------- ORDER DETAILS ----------*/
  const detailsGrid = document.createElement("div");
  detailsGrid.className = "order-details-grid";

  order.product.forEach((product) => {
    /* Image */
    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image-container";

    const image = document.createElement("img");
    image.src = productsById[product.productId].image;

    imageContainer.appendChild(image);

    /* Product Details */
    const productDetails = document.createElement("div");
    productDetails.className = "product-details";

    const productName = document.createElement("div");
    productName.className = "product-name";
    productName.textContent = productsById[product.productId].name;

    const deliveryDate = document.createElement("div");
    deliveryDate.className = "product-delivery-date";
    deliveryDate.textContent = `Arriving on: ${product.arrivedAt}`;

    const quantity = document.createElement("div");
    quantity.className = "product-quantity";
    quantity.textContent = `Quantity: ${product.quantity}`;

    const buyAgainBtn = document.createElement("button");
    buyAgainBtn.className = "buy-again-button button-primary";

    const buyAgainIcon = document.createElement("img");
    buyAgainIcon.className = "buy-again-icon";
    buyAgainIcon.src = "images/icons/buy-again.png";

    const buyAgainText = document.createElement("span");
    buyAgainText.className = "buy-again-message";
    buyAgainText.textContent = "Buy it again";

    buyAgainBtn.append(buyAgainIcon, buyAgainText);

    productDetails.append(productName, deliveryDate, quantity, buyAgainBtn);

    /* Actions */
    const productActions = document.createElement("div");
    productActions.className = "product-actions";

    const trackLink = document.createElement("a");
    trackLink.href = "tracking.html";
    trackLink.addEventListener("click", () => {
      sessionStorage.setItem(
        "trackingOrderId",
        JSON.stringify({
          orderId: order.orderId,
          product: product,
        })
      );
    });

    const trackButton = document.createElement("button");
    trackButton.className = "track-package-button button-secondary";
    trackButton.textContent = "Track package";

    trackLink.appendChild(trackButton);
    productActions.appendChild(trackLink);

    detailsGrid.append(imageContainer, productDetails, productActions);
  });

  orderContainer.append(orderHeader, detailsGrid);
  return orderContainer;
}

function displayOrders() {
  const ordersSection = document.querySelector(".orders-grid");
  const frag = document.createDocumentFragment();
  if (orders.length === 0) {
    const noOrdersMessage = document.createElement("div");
    noOrdersMessage.className = "no-orders-message";
    ordersSection.appendChild(noOrdersMessage);
  } else {
    orders.forEach((order) => {
      const orderElement = createOrder(order);
      frag.appendChild(orderElement);
    });
    ordersSection.appendChild(frag);
  }
}

displayOrders();
