// HTML elements
const pizzaShowcase = document.querySelector("#pizzaShowcase");
const modalOverlay = document.querySelector(".overlay");
const pizzaModal = document.querySelector("#pizzaModal");
const cancelPizzaBtn = document.querySelector("#cancelPizzaBtn");
const submitPizzaBtn = document.querySelector("#submitPizzaBtn");
const pizzaForm = document.querySelector("#pizzaForm");
const pizzaTitle = document.querySelector("#pizzaTitle");
const pizzaInfo = document.querySelector("#pizzaInfo");
const priceInfo = document.querySelector("#priceInfo");
const pizzasInCart = document.querySelector("#pizzasInCart");

// Constants
const SIZE_M_PRICE = 200;
const SIZE_L_PRICE = 400;
const EXTRA_TOPPING_PRICE = 50;
const NUMBER_OF_FREE_TOPPINGS = 4;

// Classes
class Pizza {
  constructor(id, name, basePrice, size, url, toppings) {
    this.id = id;
    this.name = name;
    this.basePrice = basePrice;
    this.size = size;
    this.url = url;
    this.toppings = toppings;
  }

  getPrice() {
    let totalPrice;

    switch (this.size) {
      case "S":
        totalPrice = this.basePrice;
        break;
      case "M":
        totalPrice = this.basePrice + SIZE_M_PRICE;
        break;
      case "L":
        totalPrice = this.basePrice + SIZE_L_PRICE;
        break;
      default:
        break;
    }

    let extraToppings = this.toppings.length - NUMBER_OF_FREE_TOPPINGS;

    if (extraToppings < 0) {
      extraToppings = 0;
    }

    return totalPrice + extraToppings * EXTRA_TOPPING_PRICE;
  }
}

class PizzaOrder {
  customerName = "";
  deliveryType = "EAT_IN"; // other values: TAKEOUT, DELIVERY
  pizzas = [];

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  // deletePizza(index) {
  //   this.pizzas.splice(index, 1);
  // }

  getPrice() {
    let totalPrice = 0;
    // check the delivery type and fee
    // loop over the pizzas and sum up their prices
    return totalPrice;
  }
}

class UI {
  static makePizzaCard({ id, name, basePrice, url, toppings }) {
    const div = document.createElement("div");
    div.classList.add("pizza-card");
    div.innerHTML = `
    <img src="${url}" alt="${name}" />
    <h3>${name}</h3>
    <p>${toppings.join(", ")}</p>
    <p>€${(basePrice / 100).toFixed(2)}</p>
    <button class="addPizzaBtn" data-index="${id}">Add</button>
    `;
    pizzaShowcase.appendChild(div);
  }

  static makePizzaTag(obj) {
    const pizzas = obj.pizzas;

    pizzasInCart.innerHTML = "";

    for (const pizza of pizzas) {
      const div = document.createElement("div");
      div.classList.add("pizza-tag");
      div.innerHTML = `
        <img src="${pizza.url}" alt="${pizza.name}" />
        <h3>${pizza.name}</h3>
        <p>€${(pizza.getPrice() / 100).toFixed(2)}</p>
        <button class="deletePizzaBtn">X</button>
      `;
      pizzasInCart.appendChild(div);
    }
  }

  static closeModal() {
    modalOverlay.classList.remove("show-modal");
    pizzaModal.classList.remove("show-modal");
    pizzaForm.reset();
  }
}

// Init new pizza order
const newPizzaOrder = new PizzaOrder();

// Creating list of pizzas
let pizzaList = [];
const pizza1 = new Pizza("1", "Artichoke Ace", 1200, "S", "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg", ["artichoke", "mozarella", "white sauce"]);
const pizza2 = new Pizza("2", "Vegetarian Vibe", 1000, "S", "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg", []);
const pizza3 = new Pizza("3", "Peppery Perfection", 1350, "S", "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg", []);
const pizza4 = new Pizza("4", "Magical Mozarella", 1300, "S", "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg", []);
pizzaList.push(pizza1);
pizzaList.push(pizza2);
pizzaList.push(pizza3);
pizzaList.push(pizza4);

// Creating pizza cards for the showcase
for (let item of pizzaList) {
  UI.makePizzaCard(item);
}

// Init reference and currently selected pizza
let referencePizza;
let selectedPizza;

// Add eventlistener to the created btns on the pizza cards
const addPizzaBtns = document.querySelectorAll(".addPizzaBtn");
for (let btn of addPizzaBtns) {
  btn.addEventListener("click", () => {
    // Update global reference for currently selected pizza
    referencePizza = pizzaList[btn.dataset.index - 1];

    // Create new pizza from the selection
    selectedPizza = new Pizza();
    for (const property in referencePizza) {
      selectedPizza[property] = referencePizza[property];
    }

    // Show pizza modal
    modalOverlay.classList.add("show-modal");
    pizzaModal.classList.add("show-modal");
    pizzaTitle.textContent = selectedPizza.name;
    pizzaInfo.textContent = selectedPizza.toppings.join(", ");
    priceInfo.textContent = `€${(selectedPizza.getPrice() / 100).toFixed(2)}`;
  });
}

// Cancel pizza form
cancelPizzaBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Hide and clear pizza modal
  UI.closeModal();
});

pizzaForm.addEventListener("input", () => {
  // Create and update pizza object based on the selected pizza and the additional requirements
  let size = pizzaForm.querySelector('input[name="size"]:checked').value;
  let extraToppings = [...pizzaForm.querySelectorAll('input[name="toppings"]:checked')].map((item) => item.value);
  selectedPizza.size = size;
  selectedPizza.toppings = referencePizza.toppings.concat(extraToppings);

  // Update price shown on the card
  let quantity = +pizzaForm.querySelector("#pizzaQuantity").value;
  priceInfo.textContent = `€${((selectedPizza.getPrice() * quantity) / 100).toFixed(2)}`;
});

// Submit pizza
submitPizzaBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Get number of pizza to add to order
  const pizzaQuantity = pizzaForm.querySelector("#pizzaQuantity").value;

  // Add pizza(s) to order
  for (let i = 0; i < pizzaQuantity; i++) {
    newPizzaOrder.addPizza(selectedPizza);
  }

  UI.makePizzaTag(newPizzaOrder);

  // Hide and clear pizza modal
  UI.closeModal();
});
