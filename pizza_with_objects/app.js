/*
Task 1
Write code which models a pizza as a class. Pizza has at least following properties: name, toppings, base price for a small pizza. Pizza has also a functions, which calculates it’s price.

Task 2
Write code which models an order to a pizza place as a class. The order has a customer name, delivery type, and there can be several pizzas in one order. Order can be updated by adding pizzas to it with a method of the order class.
*/

// class Pizza {
//   name;
//   toppings = [];
//   basePrice = 0; // In cents! Don't use floating point nums for money!
//   size = 2;

//   getPrice() {
//     return this.basePrice;
//   }
// }

// const americano = new Pizza();
// americano.name = 'americano';

/* --------------------------------- MY CODE -------------------------------- */

// HTML elements
const pizzaShowcase = document.querySelector('#pizzaShowcase');
const pizzaModal = document.querySelector('#pizzaModal');
const pizzaModalTitle = document.querySelector('#pizzaModalTitle');
const pizzaModalPrice = document.querySelector('#pizzaModalPrice');
const pizzaForm = document.querySelector('#pizzaForm');

const pizzaList = [
  {
    id: '0',
    name: 'Artichoke Ace',
    price: 1200,
    url: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
  },
  {
    id: '1',
    name: 'Vegetarian Vibe',
    price: 1000,
    url: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
  },
  {
    id: '2',
    name: 'Peppery Perfection',
    price: 1350,
    url: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
  },
  {
    id: '3',
    name: 'Magical Mozarella',
    price: 1300,
    url: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
  },
];

const additionalPrices = {
  sizeM: 200,
  sizeL: 200,
  topping: 50,
};

class UI {
  static makePizzaCard({ id, name, price, url }) {
    const div = document.createElement('div');
    div.classList.add('pizza-card');
    div.innerHTML = `
    <img src="${url}" alt="${name}" />
    <h3>${name}</h3>
    <p>€${(price / 100).toFixed(2)}</p>
    <button class="addPizzaBtn" data-index="${id}">Add</button>
    `;
    pizzaShowcase.appendChild(div);
  }
}

for (let item of pizzaList) {
  UI.makePizzaCard(item);
}

// TODO: create outer index for curr selected card

const addPizzaBtns = document.querySelectorAll('.addPizzaBtn');

for (let btn of addPizzaBtns) {
  btn.addEventListener('click', () => {
    const index = btn.dataset.index;
    let titleText, priceText;

    for (const item of pizzaList) {
      if (item.id === index) {
        titleText = item.name;
        priceText = `€${(item.price / 100).toFixed(2)}`;
      }
    }

    pizzaModal.classList.add('show-modal');
    pizzaModalTitle.textContent = titleText;
    pizzaModalPrice.textContent = priceText;
  });
}

pizzaForm.addEventListener('input', () => {});
