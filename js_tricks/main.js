const header = document.querySelector("header");
const backButton = document.querySelector("#backToTop");
const mobButton = document.querySelector(".mobile");
const nav = document.querySelector("nav ul");
const menuItems = document.querySelectorAll("nav ul li a");

window.onscroll = function () {
  scrollFunction();
};

// Code from W3S
function scrollFunction() {
  // Hiding back to top btn on scroll
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backButton.style.display = "block";
  } else {
    backButton.style.display = "none";
  }

  // Show header bg on scroll
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("background");
  } else {
    header.classList.remove("background");
  }
}

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

  if (nav.classList.contains("responsive")) {
    nav.classList.remove("responsive");
  } else {
    nav.classList.add("responsive");
  }
};

backButton.addEventListener("click", getToTop);
mobButton.addEventListener("click", mobMenu);
