/*
Task 1
Write code which models a pizza as a class. Pizza has at least following properties: name, toppings, base price for a small pizza. Pizza has also a functions, which calculates it’s price.
*/

const extraToppingPrice = 50;
const numberOfFreeToppings = 4;

class Pizza {
  name;
  toppings = [];
  basePrice = 0; // In cents! Don't use floating point nums for money!
  size = "S";

  getPrice() {
    let extraToppings = this.toppings.length - numberOfFreeToppings;
    if (extraToppings < 0) {
      extraToppings = 0;
    }
    return this.basePrice + extraToppings * extraToppingPrice;
  }
}

class Pizza2 {
  constructor(name, toppings, basePrice, size) {
    this.name = name;
    this.toppings = toppings;
    this.basePrice = basePrice;
    this.size = size;
  }

  getPrice() {
    return this.basePrice;
  }
}

class Pizza3 {
  // Setting default values
  name;
  toppings = [];
  basePrice = 0; // In cents! Don't use floating point nums for money!
  size = "S";

  // Constructor can overwrite the default values
  constructor(name, toppings, basePrice, size) {
    this.name = name;
    this.toppings = toppings;
    this.basePrice = basePrice;
    this.size = size;
  }

  getPrice() {
    return this.basePrice;
  }
}

const americano1 = new Pizza();
americano1.name = "americano";
americano1.toppings = ["ham", "tomato", "cheese"];
americano1.basePrice = 1000;
console.log(americano1.getPrice());

const americano2 = new Pizza2("americano", ["ham", "tomato", "cheese"], 1000, "S");
americano2.basePrice = 1100;

/*
Task 2
Write code which models an order to a pizza place as a class. The order has a customer name, delivery type, and there can be several pizzas in one order. Order can be updated by adding pizzas to it with a method of the order class.
*/

class PizzaOrder {
  customerName = "";
  deliveryType = "EAT_IN"; // other values: TAKE_OUT, DELIVERY
  pizzas = [];

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  getPrice() {
    let totalPrice = 0;
    // check the delivery type and fee
    // loop over the pizzas and sum up their prices
    return totalPrice;
  }
}
