/**
 {
    orderdate today
    totalPrice
    orderId
    product
    arrived at shipping date
    quantity


}
 */
import { totalcart } from "../data/cart.js";
class orderHistory {
  orderDate;
  totalPrice;
  orderId;
  productId;
  quantity;
  arrivedAt;

  constructor(orders) {
    this.orderDate = orders.orderDate;
    this.totalPrice = orders.totalPrice;
    this.orderId = orders.orderId;
    this.productId = orders.productId;
    this.quantity = orders.quantity;
    this.arrivedAt = orders.arrivedAt;
  }
}

const orders = [];

try {
  const holder = JSON.parse(localStorage.getItem("orderHistory")) || [];
  if (Array.isArray(holder)) {
    holder.map((item) => {
      new orderHistory({ item });
    });
  }
} catch (error) {
  orders = [];
}

export function addOrder(item) {
  const o = item.map((i) => new orderHistory(i));
  orders.push(...o);
  localStorage.setItem("orderHistory", JSON.stringify(orders));
  console.log(orders, "ORDERS");
}

document.querySelector(".cart-quantity").innerText = totalcart();
