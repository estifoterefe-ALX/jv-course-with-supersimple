import { addOrder } from "../data/order-return.js";
import { cart } from "../data/cart.js";
import { productsById } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatPrice } from "./Utils/formater.js";
export function displayPaymentSummary(summary) {
  const container = document.createElement("div");
  container.className = "payment-summary";

  /* Title */
  const title = document.createElement("div");
  title.className = "payment-summary-title";
  title.textContent = "Order Summary";

  /* Calculations */
  const totalBeforeTax = summary.itemsTotal + summary.shipping;
  const tax = Math.round(totalBeforeTax * summary.taxRate);
  const orderTotal = totalBeforeTax + tax;

  /* Helper function for rows */
  function createRow(label, value, extraClass = "") {
    const row = document.createElement("div");
    row.className = `payment-summary-row ${extraClass}`;

    const text = document.createElement("div");
    text.textContent = label;

    const money = document.createElement("div");
    money.className = "payment-summary-money";
    money.textContent = formatPrice(value);

    row.append(text, money);
    return row;
  }

  /* Rows */
  const itemsRow = createRow(
    `Items (${summary.itemsCount}):`,
    summary.itemsTotal
  );

  const shippingRow = createRow("Shipping & handling:", summary.shipping);

  const subtotalRow = createRow(
    "Total before tax:",
    totalBeforeTax,
    "subtotal-row"
  );

  const taxRow = createRow(`Estimated tax (${summary.taxRate * 100}%):`, tax);

  const totalRow = createRow("Order total:", orderTotal, "total-row");

  /* Button */
  const button = document.createElement("button");
  button.className = "place-order-button button-primary";
  button.textContent = "Place your order";
  button.addEventListener("click", () => {
    alert("Order placed successfully!");
    const item = cart.map((i) => ({
      totalPrice: productsById[i.id].priceCents * i.count,
      productId: i.id,
      quantity: i.count,
      arrivedAt: i.shippingDate,
      status: "Preparing",
    }));

    const items = {
      orderDate: dayjs().format("dddd, MMMM D"),
      orderId: generateUUID(),
      product: item,
    };
    addOrder(items);
  });

  /* Assemble */
  container.append(
    title,
    itemsRow,
    shippingRow,
    subtotalRow,
    taxRow,
    totalRow,
    button
  );

  return container;
}

function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    // Fallback for very old environments if needed
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
