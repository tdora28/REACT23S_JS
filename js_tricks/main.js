const header = document.querySelector("header");
const backButton = document.querySelector("#backToTop");
const mobButton = document.querySelector(".mobile");
const nav = document.querySelector("nav ul");
const menuItems = document.querySelectorAll("nav ul li a");
const modalButton = document.querySelector("#modalButton");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector("#closeButton");

window.onscroll = function () {
  scrollFunction();
};

// Code from W3S
const scrollFunction = () => {
  // Hiding back to top btn on scroll
  backButton.style.display = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ? "block" : "none";

  // Show header bg on scroll
  document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ? header.classList.add("background") : header.classList.remove("background");
};

// Scroll to top
const getToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Mobile menu
const mobMenu = () => {
  // When link clicked, close menu
  for (const item of menuItems) {
    item.addEventListener("click", mobMenu);
  }

  nav.classList.contains("responsive") ? nav.classList.remove("responsive") : nav.classList.add("responsive");
};

// Toggle modal visibility
const modalShow = (e) => {
  overlay.classList.toggle("visible");
};

backButton.addEventListener("click", getToTop);
mobButton.addEventListener("click", mobMenu);
modalButton.addEventListener("click", modalShow);
closeButton.addEventListener("click", modalShow);
