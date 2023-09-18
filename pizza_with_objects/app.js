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

const pizzaShowcase = document.querySelector('#pizzaShowcase');

class Pizza {
  constructor(name, toppings, basePrice, size) {
    this.name = name;
    this.toppings = toppings;
    this.basePrice = basePrice;
    this.size = size;
  }
}
