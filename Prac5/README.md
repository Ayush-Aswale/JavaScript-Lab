# Experiment No. 5

## Experiment Title
**Demonstration of Arrays, Objects, DOM Manipulation, Cart Calculator, and Finding Maximum & Minimum Numbers using JavaScript**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

## Theory

JavaScript provides powerful built-in data structures such as Arrays and Objects along with Document Object Model (DOM) manipulation capabilities to build dynamic web applications.

### a) Arrays
1. An array is an ordered collection of data items stored under a single variable name.
2. Arrays in JavaScript support various built-in methods like `push()`, `splice()`, `reduce()`, and properties like `length`.
3. Elements can be dynamically added, removed, iterated over, or processed.

### b) Objects
1. Objects are collections of key-value pairs representing properties and methods.
2. They are used to group related data and behaviors together (such as representing an item with name, price, and quantity).

### c) DOM (Document Object Model) Manipulation
1. The DOM represents HTML documents as a structured tree of nodes.
2. JavaScript can select elements (`getElementById`), create new nodes (`createElement`), modify properties (`textContent`, `innerHTML`, `style`), append nodes (`appendChild`), and bind event listeners (`addEventListener`, `onclick`).

### d) Array Methods & Math Operations (Min/Max & Subtotal Calculation)
1. Using array methods such as `reduce()` allows performing aggregations like calculating subtotals and discounts across an array of objects.
2. Iterating through arrays using loops or using comparison logic helps in finding extreme values (maximum and minimum numbers) within a set of numbers.

---

## Experiment Program Code

### File: `5.1/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cart Calculator</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>🛒 Your Cart</h1>
    <p class="subtitle">Add items and see your total update</p>

    <div class="add-panel">
      <input type="text" id="itemName" placeholder="Item name" />
      <input type="number" id="itemPrice" placeholder="Price (₹)" min="0" />
      <input type="number" id="itemQty" placeholder="Qty" min="1" value="1" />
      <button id="addBtn">Add Item</button>
    </div>

    <div class="cart-panel">
      <h2>Items</h2>
      <ul id="cartList"></ul>
      <p id="emptyMsg" class="empty">Your cart is empty. Add some items!</p>
    </div>

    <div class="summary">
      <div class="row">
        <span>Subtotal</span>
        <span id="subtotal">₹0.00</span>
      </div>
      <div class="row">
        <span>Discount</span>
        <span id="discount">-₹0.00</span>
      </div>
      <div class="row total">
        <span>Total</span>
        <span id="total">₹0.00</span>
      </div>
      <p id="discountNote" class="note"></p>
    </div>
  </div>

<div></div>

  <footer>
    <p class="credit">Ayush Aswale &nbsp;|&nbsp; PRN: 24070521009</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

### File: `5.1/script.js`

```javascript
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
```

### File: `5.1/style.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa, #e8ecf1);
min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: #2c3e50;
}

.container {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 32px;
  width: 100%;
  max-width: 480px;
}

h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 24px;
}

.add-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}

.add-panel input {
  padding: 12px 14px;
  border: 1px solid #dce1e6;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
}

.add-panel input:focus {
  border-color: #5b8def;
}

#addBtn {
  padding: 12px;
  background: #5b8def;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

#addBtn:hover {
  background: #4a7ae0;
}

.cart-panel {
  margin-bottom: 24px;
}

.cart-panel h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

#cartList {
  list-style: none;
}

#cartList li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eef1f4;
  font-size: 14px;
}

#cartList li .item-name {
  font-weight: 600;
}

#cartList li .item-meta {
  color: #7f8c8d;
  font-size: 12px;
}

#cartList li .remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 16px;
  cursor: pointer;
  padding: 0 4px;
}

.empty {
  color: #95a5a6;
  font-size: 14px;
  text-align: center;
  padding: 16px 0;
}

.summary {
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 14px;
}

.row.total {
  font-size: 18px;
  font-weight: 700;
  border-top: 1px solid #dce1e6;
  margin-top: 8px;
  padding-top: 12px;
}

.note {
  margin-top: 10px;
  font-size: 13px;
  color: #27ae60;
  text-align: center;
}

footer {
  text-align: center;
  margin-top: 24px;
  padding: 12px;
  width: 100%;
  max-width: 480px;
}

.credit {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 600;
}
```

---

## Output

> **Attach the program output/screenshot.**
>
> The screenshot must clearly display:
> - **Student Name**
> - **PRN**
> - **File Path**

---

## Case Study Title
**Find Maximum & Minimum Numbers Webpage**

## Case Study Program Code

### File: `5.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find Max and Min</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🔢 Find Maximum & Minimum</h1>
        <p class="subtitle">Enter numbers separated by commas</p>

        <input type="text" id="numbersInput" placeholder="e.g. 5, 10, 3, 8">

        <button onclick="findMinMax()">Find Max & Min</button>

        <div id="result"></div>
    </div>

    <footer>
        <p>Made by <strong>Ayush Aswale</strong></p>
        <p>PRN: <strong>24070521009</strong></p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### File: `5.2/script.js`

```javascript
function findMinMax() {
    // Get the input element and its value
    var inputEl = document.getElementById("numbersInput");
    var input = inputEl.value.trim();

    var resultDiv = document.getElementById("result");

    // Handle empty input
    if (input === "") {
        resultDiv.style.display = "block";
        resultDiv.style.background = "#fdecea";
        resultDiv.style.color = "#b71c1c";
        resultDiv.innerHTML = "⚠️ Please enter some numbers separated by commas.";
        return;
    }

    // Split by comma and trim each part
    var parts = input.split(",");
    var numbers = [];

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i].trim();

        // Skip empty entries (e.g., from trailing or double commas)
        if (part === "") {
            continue;
        }

        var num = Number(part);

        // Validate: must be a finite number
        if (isNaN(num)) {
            resultDiv.style.display = "block";
            resultDiv.style.background = "#fdecea";
            resultDiv.style.color = "#b71c1c";
            resultDiv.innerHTML =
                "❌ Invalid input: <strong>" + part + "</strong> is not a number.";
            return;
        }

        numbers.push(num);
    }

    // If no valid numbers remain
    if (numbers.length === 0) {
        resultDiv.style.display = "block";
        resultDiv.style.background = "#fdecea";
        resultDiv.style.color = "#b71c1c";
        resultDiv.innerHTML = "⚠️ Please enter valid numbers separated by commas.";
        return;
    }

    // Find max and min
    var max = numbers[0];
    var min = numbers[0];

    for (var i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }

    // Show the result
    resultDiv.style.display = "block";
    resultDiv.style.background = "#f0fdf4";
    resultDiv.style.color = "#1b5e20";
    resultDiv.innerHTML =
        "Maximum: <strong>" + max + "</strong><br>Minimum: <strong>" + min +
        "</strong>";
}
```

### File: `5.2/style.css`

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
    text-align: center;
    width: 400px;
    border: 2px solid #e8e8e8;
}

h1 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 8px;
}

.subtitle {
    color: #7f8c8d;
    font-size: 14px;
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s;
}

input:focus {
    border-color: #6c5ce7;
}

button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.3s;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(108, 92, 231, 0.4);
}

#result {
    margin-top: 20px;
    font-size: 18px;
    color: #2c3e50;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    display: none;
}

footer {
    margin-top: 30px;
    text-align: center;
    color: #7f8c8d;
    font-size: 14px;
    line-height: 1.6;
}

footer strong {
    color: #2c3e50;
}
```

---

## Output (Case Study)

> **Attach the program output/screenshot.**
>
> The screenshot must clearly display:
> - **Student Name**
> - **PRN**
> - **File Path**

---

## Result / Conclusion

The practical was completed successfully. Arrays, objects, DOM manipulation, array methods (`push`, `splice`, `reduce`), and mathematical logic for finding maximum and minimum numbers were implemented using JavaScript. A Cart Calculator was created in 5.1 to dynamically manage shopping cart items and calculate totals with discounts. Additionally, a Find Maximum & Minimum page was created in 5.2 as a case study to parse comma-separated numbers and find the highest and lowest values with input validation.
