const backButton = document.querySelector("#backToTop");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backButton.style.display = "block";
  } else {
    backButton.style.display = "none";
  }
}

const getToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

backButton.addEventListener("click", getToTop);
