let cart = [];

const itemName = document.getElementById('itemName');
const itemPrice = document.getElementById('itemPrice');
const itemQty = document.getElementById('itemQty');
const addBtn = document.getElementById('addBtn');
const cartList = document.getElementById('cartList');
const emptyMsg = document.getElementById('emptyMsg');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');
const discountNote = document.getElementById('discountNote');

addBtn.addEventListener('click', function () {
  const name = itemName.value.trim();
  const price = Number(itemPrice.value);
  const qty = Number(itemQty.value);

  if (name === '') {
    alert('Please enter an item name.');
    return;
  }
  if (price <= 0) {
    alert('Please enter a valid price.');
    return;
  }
  if (qty <= 0) {
    alert('Please enter a valid quantity.');
    return;
  }

  // Create an object for the item
  const item = {
    name: name,
    price: price,
    qty: qty
  };

  // Use array method push to add the object
  cart.push(item);

  // Clear inputs
  itemName.value = '';
  itemPrice.value = '';
  itemQty.value = '1';

  renderCart();
});

// Remove item from cart
function removeItem(index) {
  // Use array method splice to remove one item
  cart.splice(index, 1);
  renderCart();
}

// Render the cart list
function renderCart() {
  cartList.innerHTML = '';

  // Use a simple for loop to go through each item
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const li = document.createElement('li');

    const left = document.createElement('div');
    left.innerHTML = '<span class="item-name">' + item.name + '</span>' +
      '<div class="item-meta">₹' + item.price.toFixed(2) + ' × ' + item.qty + '</div>';

    const right = document.createElement('div');
    right.innerHTML = '₹' + (item.price * item.qty).toFixed(2);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '✕';
    // Use closure to pass the index
    removeBtn.addEventListener('click', function () {
      removeItem(i);
    });

    li.appendChild(left);
    li.appendChild(right);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  }

  // Show or hide empty message
  if (cart.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
  }

  updateSummary();
}

// Calculate and update the summary
function updateSummary() {
  // Use array method reduce to calculate subtotal
  let subtotal = cart.reduce(function (sum, item) {
    return sum + item.price * item.qty;
  }, 0);
 

  let discount = 0;
  let note = '';

  if (subtotal >= 1000) {
    discount = subtotal * 0.15; // 15% off above ₹1000
    note = '🎉 You got 15% off (above ₹1000)!';
  } else if (subtotal >= 500) {
    discount = subtotal * 0.10; // 10% off above ₹500
    note = '🎉 You got 10% off (above ₹500)!';
  } else if (subtotal >= 200) {
    discount = subtotal * 0.05; // 5% off above ₹200
    note = '✨ You got 5% off (above ₹200)!';
  } else {
    note = 'Add items worth ₹200+ to unlock a discount.';
  }

  let total = subtotal - discount;

  // Update the display
  subtotalEl.textContent = '₹' + subtotal.toFixed(2);
  discountEl.textContent = '-₹' + discount.toFixed(2);
  totalEl.textContent = '₹' + total.toFixed(2);
  discountNote.textContent = note;
}

// Initial render
renderCart();
