const form = document.querySelector("form");
const customer = document.querySelector("#clientName");
const size = document.querySelectorAll('input[name="pizzaSize"]');
const toppings = document.querySelectorAll('input[name="topping"]');
const delivery = document.querySelector("#deliveryOpt");
const order_price = document.querySelector("#price");
const submitBtn = document.querySelector("#submitBtn");
const reloadBtn = document.querySelector("#reloadBtn");
const toppingsLabel = document.querySelector("#tab-label");
const summaryBox = document.querySelector(".order-summary");

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

  if (toppingsResult.length === 0) {
    toppingsLabel.textContent = `\u2013 Choose toppings \u2013`;
  } else {
    toppingsLabel.textContent = `${toppingsResult.length} topping(s) selected`;
  }

  if (deliveryResult === "deliveryHome") {
    price += 5;
  }

  let deliveryName = document.querySelector(
    `option[value="${deliveryResult}"]`
  ).textContent;

  order_price.textContent = `€${price.toFixed(2)}`;

  summaryBox.querySelector(
    "h2"
  ).textContent = `Thank you for ordering, ${customerName}!`;
  summaryBox.querySelector(
    "p"
  ).textContent = `You ordered ${sizeName} with the following toppings: `;
  summaryBox.querySelector("p").textContent += `${
    toppingsResult.length === 0 ? "No toppings" : toppingsResult.join(", ")
  }`;
  summaryBox.querySelector(
    "p"
  ).textContent += `. For delivery method you chose: ${deliveryName}.`;
  summaryBox.querySelector("h3").textContent = `Total: €${price.toFixed(2)}`;
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
