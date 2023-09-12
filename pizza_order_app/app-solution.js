const form = document.querySelector("form");
const customer = document.querySelector("#clientName");
const size = document.querySelectorAll('input[name="pizzaSize"]');
const toppings = document.querySelectorAll('input[name="topping"]');
const delivery = document.querySelector("#deliveryOpt");
const order_price = document.querySelector("#price");
const submitBtn = document.querySelector("#submitBtn");
const summaryBox = document.querySelector(".order-summary");
const reloadBtn = document.querySelector("#reloadBtn");

const pizzaOrder = () => {
  let customerName = customer.value;
  let sizeResult = "";
  let toppingsResult = [];
  let deliveryResult = delivery.options[delivery.selectedIndex].value;
  let price = 0;

  size.forEach((item) => {
    if (item.checked) {
      sizeResult = item.id;
    }
  });

  switch (sizeResult) {
    case "size2":
      price += 7.5;
      break;
    case "size4":
      price += 10.5;
      break;
    case "size6":
      price += 12.5;
      break;
    case "size8":
      price += 15.5;
      break;
  }

  let sizeName = document.querySelector(
    `label[for="${sizeResult}"]`
  ).textContent;

  toppings.forEach((item) => {
    if (item.checked) {
      toppingsResult.push(item.value);
    }
  });

  if (toppingsResult.length > 4) {
    price += (toppingsResult.length - 4) * 0.5;
  }

  if (deliveryResult === "deliveryHome") {
    price += 5;
  }

  let deliveryName = document.querySelector(
    `option[value="${deliveryResult}"]`
  ).textContent;

  order_price.textContent = `€${price.toFixed(2)}`;

  summaryBox.innerHTML = `
    <h2>Thank you for ordering, ${customerName}!</h2>
    <p>You ordered ${sizeName} with the following toppings:</p>
    <p>${
      toppingsResult.length === 0 ? "No toppings" : toppingsResult.join(", ")
    }</p>
    <p>For delivery method you chose: ${deliveryName}</p>
    <h3>Total: €${price.toFixed(2)}</h3>
  `;
};

const renderSummary = (e) => {
  e.preventDefault();

  if (customer.value === "" || delivery.value == "") {
    alert("Please fill out the required fields! (*)");
  } else {
    summaryBox.style.display = "block";
    reloadBtn.style.display = "block";
    submitBtn.value = "Order Sent";
    for (let element of form.elements) {
      element.disabled = "true";
    }
    window.scrollTo(0, document.body.scrollHeight);
  }
};

form.addEventListener("input", pizzaOrder);

submitBtn.addEventListener("click", renderSummary);

reloadBtn.addEventListener("click", () => {
  window.location.reload();
  window.scrollTo(0, document.body.scrollTop);
});
