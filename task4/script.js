const calcGasoline = () => {
  const price = document.querySelector("#price").value;
  const money = document.querySelector("#money").value;
  const answer = document.querySelector("#answer");

  const amount = (money / price).toFixed(2);

  let text = `You could get about ${amount} liters. `;

  amount >= 10
    ? (text += `Good, you can escape now.`)
    : (text += `Sorry, you have to stay here.`);

  if (price == 0) {
    answer.textContent = "Invalid price.";
  } else {
    answer.textContent = text;
  }
};
