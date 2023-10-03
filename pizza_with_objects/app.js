const pizzaSelectionDisplay = document.querySelector('.p-names');
const pizzaForm = document.querySelector('#pizzaForm');
const pizzasInCart = document.querySelector('#pizzasInCart');
const orderForm = document.querySelector('#orderForm');
const checkTotal = document.querySelector('#checkTotal');
const modal = document.querySelector('#summaryModal');
const summaryDisplay = document.querySelector('#summaryText');
const summaryName = document.querySelector('#summaryName');
const closeModalBtn = document.querySelector('#closeModal');

const SIZE_M_PRICE = 200;
const SIZE_L_PRICE = 400;
const DELIVERY_PRICE = 500;
const EXTRA_TOPPING_PRICE = 50;

class Pizza {
  constructor(name, basePrice, baseToppings, size, extraToppings) {
    this.name = name;
    this.basePrice = basePrice;
    this.baseToppings = baseToppings;
    this.size = size;
    this.extraToppings = extraToppings;
  }

  getPrice() {
    let totalPrice;

    switch (this.size) {
      case 'S':
        totalPrice = this.basePrice;
        break;
      case 'M':
        totalPrice = this.basePrice + SIZE_M_PRICE;
        break;
      case 'L':
        totalPrice = this.basePrice + SIZE_L_PRICE;
        break;
      default:
        break;
    }

    if (this.extraToppings.length > 0) {
      totalPrice += this.extraToppings.length * EXTRA_TOPPING_PRICE;
    }

    return totalPrice;
  }
}

class PizzaOrder {
  customerName = '';
  deliveryType = 'EAT_IN'; // other values: TAKEOUT, DELIVERY
  pizzas = [];

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  deletePizza(index) {
    this.pizzas.splice(index, 1);
  }

  getPrice() {
    let totalPrice = 0;

    this.pizzas.forEach((pizza) => {
      totalPrice += pizza.getPrice();
    });

    if (this.deliveryType === 'DELIVERY') {
      totalPrice += DELIVERY_PRICE;
    }

    return totalPrice;
  }
}

const pizzaSelection = [
  {
    code: 'artichokeAce',
    name: 'Artichoke Ace',
    basePrice: 1500,
    baseToppings: ['artichoke', 'white sauce', 'basil', 'parmesan'],
    image: 'img/pexels-roman-odintsov-5902953.jpg',
  },

  {
    code: 'magicalMozarella',
    name: 'Magical Mozarella',
    basePrice: 1200,
    baseToppings: ['mozarella', 'tomato sauce', 'basil'],
    image: 'img/pexels-andre-saddi-13985154.jpg',
  },

  {
    code: 'pepperyPerfection',
    name: 'Peppery Perfection',
    basePrice: 1400,
    baseToppings: ['pepperoni', 'gouda', 'tomato sauce', 'corn'],
    image: 'img/pexels-beqa-tefnadze-803290.jpg',
  },
];

const formatPrice = (num) => {
  return `€${(num / 100).toFixed(2)}`;
};

const renderPizzaSelection = (item) => {
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'pizzaName';
  radio.id = item.code;
  radio.value = item.name;

  const label = document.createElement('label');
  label.classList.add('p-name');
  label.htmlFor = item.code;
  label.innerHTML = `
    <img src="${item.image}" />
    <strong>${item.name}</strong>
    <p>${formatPrice(item.basePrice)}</p>
    <p>${item.baseToppings.join(', ')}</p>
  `;

  pizzaSelectionDisplay.appendChild(radio);
  pizzaSelectionDisplay.appendChild(label);
};

const preselectPizza = () => {
  pizzaSelectionDisplay.firstElementChild.checked = true;
};

const collectPizzaData = () => {
  let pizzaType;
  const pizzaTypes = document.querySelectorAll('input[name="pizzaName"]');
  pizzaTypes.forEach((type, i) => {
    if (type.checked) {
      pizzaType = pizzaSelection[i];
    }
  });

  const pizzaSize = document.querySelector('input[name="size"]:checked').value;

  let extraToppings = [];
  const toppingsCheckboxes = document.querySelectorAll('input[name="toppings"]');
  toppingsCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      extraToppings.push(checkbox.value);
    }
  });

  const quantity = +document.querySelector('#pizzaQuantity').value;

  const dataForPizzaConstructor = {
    name: pizzaType.name,
    basePrice: pizzaType.basePrice,
    baseToppings: pizzaType.baseToppings,
    size: pizzaSize,
    extraToppings: extraToppings,
  };

  return [dataForPizzaConstructor, quantity];
};

const createPizzaObj = (obj) => {
  const pizza = new Pizza();

  for (const prop in pizza) {
    pizza[prop] = obj[prop];
  }

  return pizza;
};

const addShoppingCartContent = (obj) => {
  if (obj.pizzas.length == 0) {
    pizzasInCart.textContent = 'Shopping cart empty.';
    checkTotal.classList.remove('visible');
  } else {
    pizzasInCart.textContent = '';
    for (const item of obj.pizzas) {
      createPizzaTag(item);
    }
    checkTotal.classList.add('visible');
    checkTotal.textContent = `Total: ${getTotalPrice(obj)}`;
  }
  deletePizza(currentOrder);
};

const getTotalPrice = (obj) => {
  return formatPrice(obj.getPrice());
};

const createPizzaTag = (obj) => {
  const div = document.createElement('div');
  div.classList.add('pizza-tag');
  div.innerHTML = `
    <h5>${obj.name} (${obj.size})</h5>
    <p>${formatPrice(obj.getPrice())}</p>
    <button class="button button--small delete">X</button>
  `;
  pizzasInCart.appendChild(div);
};

const deletePizza = (obj) => {
  const deleteButtons = document.querySelectorAll('.delete');

  let deleteIndex;

  deleteButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
      deleteIndex = i;
      obj.deletePizza(deleteIndex);
      addShoppingCartContent(obj);
    });
  });
};

const collectOrderData = (obj) => {
  const customerName = document.querySelector('#customerName').value;
  const delivery = document.querySelector('#delivery').value;
  const itemCount = obj.pizzas.length;

  if (itemCount === 0) {
    alert('Your shopping cart is empty.');
  } else if (customerName === '') {
    alert('Please enter your name');
  } else {
    finalizeOrderObj(obj, customerName, delivery);
  }
};

const finalizeOrderObj = (obj, customerName, delivery) => {
  obj.customerName = customerName;
  obj.deliveryType = delivery;
};

const showSummary = (obj) => {
  modal.classList.add('show');

  summaryName.textContent = obj.customerName;

  summaryDisplay.innerHTML = createSummaryTable(obj.pizzas);

  if (obj.deliveryType === 'DELIVERY') {
    summaryDisplay.innerHTML += `<p>Delivery cost: ${formatPrice(DELIVERY_PRICE)}</p>`;
  }

  summaryDisplay.innerHTML += `<strong>Total: ${formatPrice(obj.getPrice())}</strong>`;
};

const createSummaryTable = (arr) => {
  let table = `
    <table>
        <tr>
          <th>#</th>
          <th>Pizza</th>
          <th>Size</th>
          <th>Price</th>
        </tr>
  `;

  arr.forEach((pizza, id) => {
    table += `
  <tr>
    <td>${id + 1}</td>
    <td>${pizza.name}</td>
    <td>${pizza.size}</td>
    <td>${formatPrice(pizza.getPrice())}</td>
  </tr>`;
  });

  table += `</table>`;
  return table;
};

const resetPage = () => {
  modal.classList.remove('show');
  window.location.reload();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

for (const pizza of pizzaSelection) {
  renderPizzaSelection(pizza);
}

preselectPizza();

const currentOrder = new PizzaOrder();

let currentPizzaData = collectPizzaData();

pizzaForm.addEventListener('input', () => {
  currentPizzaData = collectPizzaData();
});

pizzaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const quantity = currentPizzaData[1];

  for (let i = 0; i < quantity; i++) {
    const pizza = createPizzaObj(currentPizzaData[0]);
    currentOrder.addPizza(pizza);
  }

  addShoppingCartContent(currentOrder);

  pizzaForm.reset();
  preselectPizza();

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  collectOrderData(currentOrder);

  if (currentOrder.pizzas.length > 0) {
    showSummary(currentOrder);
  }
});

closeModalBtn.addEventListener('click', resetPage);
