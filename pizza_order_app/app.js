// HTML Container elements
const priceBox = document.querySelector("#price");
const summaryBox = document.querySelector(".order-summary");
const form = document.querySelector("form");

// HTML Input elements
const toppings = document.querySelectorAll('input[name="topping"]');
const toppingsLabel = document.querySelector("#tab-label");
const submitBtn = document.querySelector("#submitBtn");
const reloadBtn = document.querySelector("#reloadBtn");

// Store data for the order
const orderData = {
  sizePrice: 7.5,
  toppingsPrice: 0,
  deliveryPrice: 0,
  size: `2 servings (€7.50)`,
  toppings: [],
  delivery: "",
  sum: function () {
    return `€${(
      this.sizePrice +
      this.toppingsPrice +
      this.deliveryPrice
    ).toFixed(2)}`;
  },
};

// Update price with the help of orderData's sum method
const updatePrice = () => (priceBox.textContent = orderData.sum());

// Set initial content for the priceBox
updatePrice();

// Get price with radio input id
const calcSizePrice = (id) => {
  switch (id) {
    case "size2":
      return 7.5;
    case "size4":
      return 10.5;
    case "size6":
      return 12.5;
    case "size8":
      return 15.5;
    default:
      return 0;
  }
};

// Set price and Save data for summary message
// with eventlisteners

const setSize = (element) => {
  if (!element.name === "pizzaSize") {
    return;
  }

  orderData.sizePrice = calcSizePrice(element.id);
  updatePrice();
  orderData.size = element.nextElementSibling.textContent;
};

const setToppings = (element) => {
  if (!element.name === "topping") {
    return;
  }

  let selectedToppings = [];
  toppingsLabel.textContent = "";

  for (let elem of toppings) {
    if (elem.checked === true) {
      selectedToppings.push(elem.nextElementSibling.textContent);
    }
  }

  if (selectedToppings.length > 4) {
    orderData.toppingsPrice = (selectedToppings.length - 4) * 0.5;
  } else {
    orderData.toppingsPrice = 0;
  }

  updatePrice();
  orderData.toppings = [...selectedToppings];

  if (selectedToppings.length === 0) {
    toppingsLabel.textContent = `\u2013 Choose toppings \u2013`;
  } else {
    toppingsLabel.textContent = `${selectedToppings.length} topping(s) selected (+ €${orderData.toppingsPrice})`;
  }
};

const setDelivery = (element) => {
  if (element.value === "deliveryHome") {
    orderData.deliveryPrice = 5;
  } else {
    orderData.deliveryPrice = 0;
  }
  updatePrice();

  if (element.value === "") {
    orderData.delivery = "";
  } else {
    orderData.delivery = element.querySelector(
      `option[value="${element.value}"]`
    ).textContent;
  }
};

form.addEventListener("input", (e) => {
  const inputElement = e.target;
  const inputType = e.target.type;

  switch (inputType) {
    case "radio":
      setSize(inputElement);
      break;
    case "checkbox":
      setToppings(inputElement);
      break;
    case "select-one":
      setDelivery(inputElement);
      break;

    default:
      break;
  }
});

// Write out toppings list for the summary msg if there is one
const createToppingsList = (arr) => {
  let text = "";

  if (arr.length === 0) {
    text = "No toppings";
  } else {
    text = arr.join(", ");
  }

  if (arr.length > 4) text += ` (+ €${orderData.toppingsPrice})`;

  return text;
};

// Display msg according to the inputs

// Set eventlistener on submit btn
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Reset summaryBox to avoid duplicate content
  summaryBox.textContent = "";

  // Read input value (clientName)
  const client = document.querySelector("#clientName").value;

  // Show error msg when client or delivery data is empty
  if (client === "" || orderData.delivery === "") {
    alert("Please fill out the required fields! (*)");
  } else {
    // Build summary msg by adding HTML elements to the summaryBox
    summaryBox.style.display = "block";
    reloadBtn.style.display = "block";

    summaryBox.innerHTML = `
      <h2>Thank you for ordering, ${client}!</h2>
      <p>You ordered ${orderData.size} with the following toppings:</p>
      <p>${createToppingsList(orderData.toppings)}</p>
      <p>For delivery method you chose: ${orderData.delivery}</p>
      <h3>Total: ${orderData.sum()}</h3>
    `;

    // Scroll to the bottom of the page to see summary
    window.scrollTo(0, document.body.scrollHeight);

    // Disable form fields
    for (const element of form.elements) {
      element.disabled = true;
    }
  }
});

// Reload page with the reloadBtn
reloadBtn.addEventListener("click", () => {
  window.location.reload();

  // Scroll to the top of the page
  window.scrollTo(0, document.body.scrollTop);
});
