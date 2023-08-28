// let messageBoard = document.querySelector("#message");

/*
let userName = prompt("Enter username:");
if (userName === "Dora") {
  console.log("Welcome!");
  messageBoard.innerText = "Welcome!";
} else {
  console.log("Access denied");
  messageBoard.innerText = "Access denied";
}
*/

/*
let temperature = parseInt(prompt("Enter the temperature in Celsius:"));
console.log(temperature);
if (temperature < 15) {
  messageBoard.innerText = "You should wear a jacket. It's below 15 °C.";
} else if (temperature >= 15) {
  messageBoard.innerText =
    "You can leave your jacket home. It's 15 or more °C.";
} else {
  messageBoard.innerText =
    "Something went wrong. Refresh the page and try again.";
}
*/

/*
let season = prompt("What is your favourite season?").toLowerCase();
switch (season) {
  case "spring":
    console.log("Spring is beautiful.");
    break;
  case "summer":
    console.log("Summer is awesome.");
    break;
  case "autumn":
    console.log("Autumn is colourful.");
    break;
  case "winter":
    console.log("Winter is relaxing.");
    break;
  default:
    console.log("Not sure what to say.");
    break;
}
*/

/* 
SALARY CALCULATOR
Program that asks about hourly salary
and how many hours the user worked in one day.
With this info, the program calculates the day's salary.
- first 7 hours by hourly salary
- next 2 hours, 50% extra
- rest of the hours 100% extra
*/
/*
let hourlySalary = parseInt(prompt("Please type in your hourly salary:"));
let workHours = parseInt(
  prompt("Please type in how many hours you've worked today:")
);
let salary = 0;
if (workHours <= 7) {
  salary = workHours * hourlySalary;
} else if (workHours <= 9) {
  salary = 7 * hourlySalary + (workHours - 7) * hourlySalary * 1.5;
} else if (workHours > 9) {
  salary = 10 * hourlySalary + (workHours - 9) * hourlySalary * 2;
} else {
  salary = 0;
}
console.log(`Your salary is ${salary} € for today.`);
*/
/*
Corrections:
- parseFloat instead of parseInt
- use .toFixed(2) when printing out the salary
- check: enter number between 0 and 24 in case of workHours
- condition for middle range: workHours > 7 && workHours <= 9
*/
/*
let hourlySalary = parseFloat(prompt("Please type in your hourly salary:"));
let workHours = parseFloat(
  prompt("Please type in how many hours you've worked today:")
);
let salary = 0;
if (workHours <= 7) {
  salary = workHours * hourlySalary;
} else if (workHours > 7 && workHours <= 9) {
  salary = 7 * hourlySalary + (workHours - 7) * hourlySalary * 1.5;
} else if (workHours > 9) {
  salary = 10 * hourlySalary + (workHours - 9) * hourlySalary * 2;
} else {
  salary = 0;
}
console.log(`Your salary is ${salary.toFixed(2)} € for today.`);
*/

/*
// RANDOM NUMBERS
// Collecting user input for 3 numbers
let firstNum = parseFloat(prompt("Please enter the first number:"));
let secondNum = parseFloat(prompt("Please enter the second number:"));
let thirdNum = parseFloat(prompt("Please enter the third number:"));

// Checking whether the three inputs are all numbers
function checkIfInputsAreNums(input1, input2, input3) {
  if (!isNaN(input1) && !isNaN(input2) && !isNaN(input3)) {
    return true;
  } else {
    return false;
  }
}
// Building the final message depending on the given conditions
function buildMessage(num1, num2, num3) {
  // The message we are building
  let message = "";

  if (num1 >= 0 && num2 >= 0 && num3 >= 0) {
    // all positive nums: print out sum and multiplication of nums
    message = `Sum: ${num1 + num2 + num3}, Multiplication: ${
      num1 * num2 * num3
    }`;
  } else if (num1 < 0 && num2 < 0 && num3 < 0) {
    // all negative nums: print "only negatives"
    message = "only negatives";
  } else {
    // at least one positive num: print out sum of nums
    message = `Sum: ${num1 + num2 + num3}`;
  }
  console.log(message);
}

// Storing the result after running the number type check
let isAllNum = checkIfInputsAreNums(firstNum, secondNum, thirdNum);

// Logging user inputs
console.log(`You entered: ${firstNum}, ${secondNum}, and ${thirdNum}`);

// If every input is a number, then we can build the final message.
// If not, then message: "You should enter numbers."
if (isAllNum) {
  buildMessage(firstNum, secondNum, thirdNum);
} else {
  console.log("You should enter numbers.");
}

const randomNumbers = () => {
  const num1 = Number(prompt("Please give first number:"));
  const num2 = Number(prompt("Please give second number:"));
  const num3 = Number(prompt("Please give third number:"));

  const mult = num1 * num2 * num3;
  const sum = num1 + num2 + num3;

  if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
    console.log("please enter numbers");
    return false;
  }

  if (num1 >= 0 && num2 >= 0 && num3 >= 0) {
    console.log("sum is: ", sum, " multiplication is: ", mult);
  } else if (num1 >= 0 || num2 >= 0 || num3 >= 0) {
    console.log("sum is: ", sum);
  } else {
    console.log("only negatives");
  }
};
randomNumbers();
*/

/*
// ODD OR EVEN?
function oddOrEven() {
  const num = Number(prompt("Please enter a positive number:"));

  if (isNaN(num) || num < 0) {
    oddOrEven();
  } else if (num % 2 === 0) {
    console.log(`${num} is an even number.`);
  } else {
    console.log(`${num} is an odd number.`);
  }
}
oddOrEven();

let num;
do {
  num = prompt("Give a number");

  if (num < 0) {
    alert("Please enter a positive number");
  }

  if (num == 0) {
    break;
  } else if (num != 0) {
    if (num % 2 == 0) {
      alert("Number " + num + " is even.");
    } else {
      alert("Number " + num + " is odd.");
    }
  }
} while (true);
*/

let numberInput;
do {
  numberInput = Number(prompt("Please enter a positive number:"));

  if (numberInput === 0) {
    break;
  }

  if (isNaN(numberInput) || numberInput < 0) {
    alert("You didn't enter a positive number.");
  } else if (numberInput % 2 === 0) {
    alert(`${numberInput} is an even number.`);
  } else {
    alert(`${numberInput} is an odd number.`);
  }
} while (numberInput !== 0);
