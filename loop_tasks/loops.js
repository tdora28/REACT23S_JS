// Loop Assignments (Don’t use arrays)

// 1.  Make a program that prints all positive numbers that are odd and smaller
//     than 100 starting from 1. (1 3 5 7 9 11...)
const task1 = () => {
  for (let i = 1; i < 100; i += 2) {
    console.log(i);
  }
};
// task1();

// 2.  Make a program that prints all positive numbers that are smaller than
//     100 and even, in this order: 2 98 4 96 6 94... Print result in one line.
//     No repeating numbers!
const task2 = () => {
  let solution = "";

  for (let i = 2; i <= 50; i += 2) {
    if (i != 50) {
      solution += `${i} ${100 - i} `;
    } else {
      solution += i;
    }
  }

  console.log(solution);
};
// task2();

// 3.  Make a program that asks repeatedly from the user the distance (km) and
//     time (h) and calculates average speed. The program ends when user gives
//     0 for the distance. (After getting 0, the program does not ask anything
//     from the user.)
const task3 = () => {
  let distance, timeInHours;

  while (true) {
    distance = Number(prompt("Distance in kilometers:"));
    if (distance === 0) {
      break;
    }

    timeInHours = Number(prompt("Time in hours:"));

    if (
      isNaN(distance) ||
      isNaN(timeInHours) ||
      distance < 0 ||
      timeInHours < 0
    ) {
      alert("Please enter positive numbers.");
    } else {
      alert(
        `Your average speed is ${(distance / timeInHours).toFixed(2)} km/h.`
      );
    }
  }
};
// task3();

// 4.  Make a program that asks 20 numbers from user. After that the program
//     prints out how many of those numbers where even.
const task4 = () => {
  let evenNumCounter = 0;

  for (let i = 0; i < 20; i++) {
    let userInput = Number(prompt(`Enter a positive number (${i + 1}/20):`));

    if (!isNaN(userInput) && userInput >= 0 && userInput % 2 === 0) {
      evenNumCounter++;
    }
  }

  console.log("You entered " + evenNumCounter + " even number(s).");
};
// task4();

// 5.  Make a program that asks numbers from the user, until user gives 0 and
//     then program ends. In the end program prints out average of the numbers.
const task5 = () => {
  let numberCounter = 0;
  let sumCounter = 0;
  let numberInput;

  while (true) {
    numberInput = parseFloat(prompt("Enter a number:"));

    if (numberInput === 0) {
      break;
    }

    if (!isNaN(numberInput)) {
      numberCounter++;
      sumCounter += numberInput;
    }
  }

  console.log(
    `The average of the numbers you typed in is ${(
      sumCounter / numberCounter
    ).toFixed(2)}`
  );
};
// task5();

// 6.  Make a program that asks 25 numbers form the user. In the end program
//     printsout average of the numbers.
const task6 = () => {
  let sum = 0;
  let counter = 0;
  let userInput;

  for (let i = 0; i < 25; i++) {
    userInput = parseFloat(prompt(`Please enter a number (${i + 1}/25):`));

    if (!isNaN(userInput)) {
      sum += userInput;
      counter++;
    }
  }

  console.log(
    `The average of the numbers you typed is: ${(sum / counter).toFixed(2)}`
  );
};
// task6();

// 7.  Make a program that ask first one number from the user. After that the
//     program asks: "Do you want to continue giving numbers?(y/n)". If user
//     answers y, the program continues to ask another number. If user answers
//     n, program ends. In the end program prints out average of the numbers.
function task7() {
  let numberInput;
  let progressInput;
  let counter = 0;
  let sum = 0;

  do {
    progressInput = "";

    numberInput = parseFloat(prompt("Please enter a number:"));
    if (!isNaN(numberInput)) {
      counter++;
      sum += numberInput;
      console.log(numberInput);
    }

    do {
      if (
        progressInput.toLowerCase() === "y" ||
        progressInput.toLowerCase() === "n"
      ) {
        break;
      }

      progressInput = prompt("Do you want to continue giving numbers? (y/n)");
    } while (true);

    if (progressInput.toLowerCase() === "n") {
      break;
    }
  } while (true);

  console.log(
    `The average of the numbers you typed in is: ${(sum / counter).toFixed(2)}`
  );
}
// task7();

// 8.  Make a program that asks first how many numbers user wants to give to
//     the program. After that program asks those numbers. In the end program
//     prints out the smallest number that user gave.
const task8 = () => {
  const numberOfNums = parseInt(
    prompt("How many numbers would you like to enter?")
  );

  if (isNaN(numberOfNums)) {
    console.log("That is not a number!");
    return false;
  }

  let comparisonNum;

  for (let i = 0; i < numberOfNums; i++) {
    let inputNum = parseFloat(
      prompt(`Please enter a number (${i + 1}/${numberOfNums}):`)
    );

    if (isNaN(inputNum)) {
      inputNum = 0;
    }

    if (i === 0) {
      comparisonNum = inputNum;
    } else if (inputNum < comparisonNum) {
      comparisonNum = inputNum;
    }
  }

  console.log(`The smallest of the numbers you gave is: ${comparisonNum}`);
};
// task8();

// 9.  Make a program that asks ten numbers and in the end prints out two
//     biggest numbers.
const task9 = () => {
  let numberInput;
  let bigNum1 = 0;
  let bigNum2 = 0;

  for (let i = 0; i < 10; i++) {
    numberInput = parseFloat(prompt(`Please enter a number (${i + 1}/10):`));

    if (isNaN(numberInput)) {
      numberInput = 0;
    }

    if (i === 0) {
      bigNum1 = numberInput;
    } else if (i === 1) {
      bigNum2 = numberInput;
    } else if (i > 1) {
      if (numberInput > bigNum1 || numberInput > bigNum2) {
        bigNum1 > bigNum2 ? (bigNum2 = numberInput) : (bigNum1 = numberInput);
      }
    }
  }

  console.log(`The two biggest numbers are: ${bigNum1} and ${bigNum2}.`);
};
// task9();

// 10. Make a program that asks ten numbers. Program calculates and prints out
//     sum and average, also prints out the smallest and biggest number.
const task10 = () => {
  let numberInput;
  let sum = 0;
  let average;
  let smallestNum;
  let biggestNum;

  for (let i = 0; i < 10; i++) {
    numberInput = parseFloat(prompt(`Please enter a number (${i + 1}/10):`));

    if (isNaN(numberInput)) {
      numberInput = 0;
    }

    sum += numberInput;

    if (i === 0) {
      smallestNum = numberInput;
      biggestNum = numberInput;
    } else {
      if (numberInput < smallestNum) {
        smallestNum = numberInput;
      }
      if (numberInput > biggestNum) {
        biggestNum = numberInput;
      }
    }
  }

  average = sum / 10;

  console.log(`Sum: ${sum.toFixed(2)}`);
  console.log(`Average: ${average.toFixed(2)}`);
  console.log(`Smallest number: ${smallestNum}`);
  console.log(`Biggest number: ${biggestNum}`);
};
// task10();
