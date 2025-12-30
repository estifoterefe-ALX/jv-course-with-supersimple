import { totalcart } from "./cart.js";
class orderHistory {
  orderDate;
  orderId;
  product;

  constructor(orders) {
    this.orderDate = orders.orderDate;
    this.orderId = orders.orderId;
    this.product = orders.product;
  }
}

export let orders = [];

try {
  const holder = JSON.parse(localStorage.getItem("orderHistory")) || [];
  if (Array.isArray(holder)) {
    orders = holder.map((item) => {
      return new orderHistory(item);
    });
  }
} catch (error) {}

export function addOrder(item) {
  const o = new orderHistory(item);
  orders.push(o);
  localStorage.setItem("orderHistory", JSON.stringify(orders));
  localStorage.removeItem("cart");
  window.location.href = "amazon.html";
}
