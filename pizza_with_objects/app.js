const pizzaSelectionDisplay = document.querySelector('.p-names');
const pizzaForm = document.querySelector('#pizzaForm');
const pizzasInCart = document.querySelector('#pizzasInCart');
const orderForm = document.querySelector('#orderForm');
const checkTotal = document.querySelector('#checkTotal');

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
    image: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
  },

  {
    code: 'magicalMozarella',
    name: 'Magical Mozarella',
    basePrice: 1200,
    baseToppings: ['mozarella', 'tomato sauce', 'basil'],
    image: 'https://images.pexels.com/photos/13985154/pexels-photo-13985154.jpeg',
  },

  {
    code: 'pepperyPerfection',
    name: 'Peppery Perfection',
    basePrice: 1400,
    baseToppings: ['pepperoni', 'gouda', 'tomato sauce', 'corn'],
    image: 'https://images.pexels.com/photos/6147830/pexels-photo-6147830.jpeg',
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

const showSummary = (obj) => {};

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
});

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  collectOrderData(currentOrder);
  showSummary(currentOrder);
});
