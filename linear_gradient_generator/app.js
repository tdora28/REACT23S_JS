const formInput = document.querySelector("form");
const resultBox = document.querySelector("#result");
const color1 = document.querySelector("#color1");
const color2 = document.querySelector("#color2");
const directions = document.querySelectorAll('input[name="direction"]');

let copyText = resultBox.textContent;

const bgGenerator = () => {
  let selectedValue;

  for (const item of directions) {
    if (item.checked) {
      selectedValue = item.value;
    }
  }

  const gradient = `linear-gradient(${selectedValue}, ${color1.value}, ${color2.value})`;

  document.body.style.backgroundImage = gradient;
  resultBox.textContent = `background: ${gradient};`;
  copyText = `background: ${gradient};`;
};

formInput.addEventListener("input", bgGenerator);

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(copyText);
    alert("Content copied to clipboard");
  } catch (err) {
    alert("Failed to copy: ", err);
  }
};
