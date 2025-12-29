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
    money.textContent = `$${(value / 100).toFixed(2)}`;

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
