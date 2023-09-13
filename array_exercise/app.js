// Task 1
// Create an array called "names" and set it's items to be
// David, Ann, Leia, Mathew and Mark.
// Print the array.
const names = ["David", "Ann", "Leia", "Matthew", "Mark"];
document.querySelector("#task1").textContent = names.toString();

// Task 2
// Print the second item of the array from the task 1.
document.querySelector("#task2").textContent = names[1];

// Task 3
// Print the length of the array.
document.querySelector("#task3").textContent = names.length;

// Task 4
// Print the last item of the array
document.querySelector("#task4").textContent = names[names.length - 1];

// Task 5
// Add Peter as the last item to the array and print the whole array
names.push("Peter");
document.querySelector("#task5").textContent = names.join(", ");

// Task 6
// Print the array with spaces, not commas
document.querySelector("#task6").textContent = names.join(" ");

// Task 7
// Replace Mathew in the array with Lisa and Abraham
names.splice(3, 1, "Lisa", "Abraham");
document.querySelector("#task7").textContent = names.join(" ");

// Task 8
// Sort the array in the alphabetical order and print it
names.sort();
document.querySelector("#task8").textContent = names.join(" ");

// Task 9
// Create an array called numbers and fill it with values 1, 7, 45, 32, 27, 86.
// Sort the numbers from largest to smallest. Print them.
const numbers = [1, 7, 45, 32, 27, 86];
numbers.sort((a, b) => b - a);
document.querySelector("#task9").textContent = numbers.join(", ");

// Task 10
// Randomize the numbers array.
numbers.sort((a, b) => 0.5 - Math.random());
document.querySelector("#task10").textContent = numbers.join(", ");

// Task 11
// Find the largest and smallest value from the numbers array using sort() function.
// Print those values.
numbers.sort((a, b) => a - b);
document.querySelector("#task11").textContent = `Largest value: ${
  numbers[numbers.length - 1]
}, smallest value: ${numbers[0]}`;
