const formInput = document.querySelector("form");
const resultBox = document.querySelector("#result");
const copyBtn = document.querySelector("#copyBtn");
const color1 = document.querySelector("#color1");
const color2 = document.querySelector("#color2");
const directions = document.querySelectorAll('input[name="direction"]');

const bgGenerator = () => {
  let selectedValue;

  for (const item of directions) {
    if (item.checked) {
      selectedValue = item.value;
    }
  }

  const gradientValue = `linear-gradient(${selectedValue}, ${color1.value}, ${color2.value})`;

  document.body.style.backgroundImage = gradientValue;
  resultBox.textContent = `background: ${gradientValue};`;
};

formInput.addEventListener("input", bgGenerator);
