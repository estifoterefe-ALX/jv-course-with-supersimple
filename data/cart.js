export const cart = (() => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    return [];
  }
})();
const cartObj = Object.fromEntries(cart.map((i) => [i.id, i.count]));
export function addToCart(item) {
  //const existItem = cart.find((i) => i.id === item.id);
  if (cartObj[item.id]) {
    cartObj[item.id] += item.count;
  } else {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(itemId, index) {
  if (typeof index === "number" && index >= 0 && index < cart.length) {
    cart.splice(index, 1);
  } else {
    const idx = cart.findIndex((i) => i.id === itemId);
    if (idx !== -1) cart.splice(idx, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function totalcart() {
  const totalCart = cart.reduce((acc, item) => acc + item.count, 0);
  return totalCart;
}

export function countUpdater(itemId, value) {
  // const item = cart.find((i) => i.id === itemId);
  if (cartObj[itemId]) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      cartObj[itemId] = parsed;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// export function countUpdater(itemId, value) {
//   const item = cart.findIndex((i) => i.id === itemId);
//   if (item !== -1) {
//     cart[item].count = value;
//     console.log("test");
//   }
//   console.log(cart, "DSFSDFASDFASDF");
//   localStorage.setItem("cart", JSON.stringify(cart));
// }
