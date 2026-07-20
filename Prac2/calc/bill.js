function calculateBill() {
  // Read inputs
  const customerName = document.getElementById("name").value.trim();
  const product = document.getElementById("product").value.trim();

  const price = Number(document.getElementById("price").value);
  const quantity = Number(document.getElementById("quantity").value);
  let discountPercent = Number(document.getElementById("discount").value || 0);

  // Constants
  const GST = 0.18;

  const outputEl = document.getElementById("output");

  // Validate numeric inputs to prevent NaN crashes on toFixed
  if (Number.isNaN(price) || price < 0) {
    outputEl.innerHTML = `<p style="color:#b91c1c"><b>Error:</b> Please enter a valid <u>Price</u> (₹).</p>`;
    return;
  }

  if (Number.isNaN(quantity) || quantity < 1) {
    outputEl.innerHTML = `<p style="color:#b91c1c"><b>Error:</b> Please enter a valid <u>Quantity</u> (minimum 1).</p>`;
    return;
  }

  if (Number.isNaN(discountPercent) || discountPercent < 0) discountPercent = 0;

  // Calculate
  const subtotal = price * quantity;
  const discountAmount = subtotal * (discountPercent / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = discountedSubtotal * GST;
  const total = discountedSubtotal + gstAmount;

  // Render
  const bill = {
    customerName,
    product,
    subtotal,
    discountPercent,
    discountAmount,
    discountedSubtotal,
    gstAmount,
    total
  };

  const {
    customerName: name,
    product: item,
    subtotal: sub,
    discountPercent: dp,
    discountAmount: da,
    discountedSubtotal: afterDiscount,
    gstAmount: gst,
    total: finalAmount
  } = bill;

  outputEl.innerHTML = `
    <h2>Billing Details</h2>
    <p><b>Customer:</b> ${name || "N/A"}</p>
    <p><b>Product:</b> ${item || "N/A"}</p>

    <p><b>Subtotal:</b> ₹${sub.toFixed(2)}</p>
    <p><b>Discount (${dp.toFixed(2)}%):</b> - ₹${da.toFixed(2)}</p>
    <p><b>After Discount:</b> ₹${afterDiscount.toFixed(2)}</p>
    <p><b>GST (18%):</b> ₹${gst.toFixed(2)}</p>
    <h3>Total Amount: ₹${finalAmount.toFixed(2)}</h3>
  `;

  // Optional debug logs
  console.log(`Customer: ${name}`);
  console.log(`Product: ${item}`);
  console.log(`Total Bill: ₹${finalAmount.toFixed(2)}`);
}

