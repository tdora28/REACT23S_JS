const pizzaSelectionDisplay = document.querySelector('.p-names');

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

for (const pizza of pizzaSelection) {
  renderPizzaSelection(pizza);
}
