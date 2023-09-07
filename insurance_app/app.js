// HTML Elements
const form = document.querySelector("form");
const submitBtn = document.querySelector("#submitBtn");
const reloadBtn = document.querySelector("#reloadBtn");
const resultBox = document.querySelector("#resultBox");
const result = document.querySelector("#result");

// Calculates the base score according to the user's age (number)
const calcBaseScore = (num) => {
  let baseScore = 500;

  if (num < 18) {
    baseScore *= 1;
  } else if (num < 26) {
    baseScore *= 1.1;
  } else if (num < 36) {
    baseScore *= 1.3;
  } else if (num < 46) {
    baseScore *= 1.6;
  } else if (num < 56) {
    baseScore *= 2;
  } else if (num < 66) {
    baseScore *= 2.5;
  } else {
    baseScore *= 3.1;
  }

  return baseScore;
};

// Counts how many checkboxes are checked in a category (identifier), then multiplies them by the given rate
const calcModifier = (identifier, rate) => {
  return (
    document.querySelectorAll(`input[name="${identifier}"]:checked`).length *
    rate
  );
};

// Submit button eventlistener
// Collects input data
// Calculates the insurance score (by multiplying the base score with the added modifiers)
// Renders the page: displays the result, hides the submit btn, and disables every form field
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const age = +document.querySelector("#age").value;
  const baseScore = calcBaseScore(age);
  const currHealthModifier = calcModifier("currHealth", 0.01);
  const healthyHabitsModifier = calcModifier("healthyHabits", -0.05);
  const unhealthyHabitsModifier = calcModifier("unhealthyHabits", 0.05);
  const modifierRate =
    baseScore *
    (currHealthModifier + healthyHabitsModifier + unhealthyHabitsModifier);

  resultBox.style.display = "block";
  result.textContent = baseScore + modifierRate;
  submitBtn.style.display = "none";

  for (const element of form.elements) {
    element.disabled = true;
  }
});

// Reloads the page
reloadBtn.addEventListener("click", () => window.location.reload());

// Habit pairs (HTML elements)
const pair0 = document.querySelectorAll('input[data-pair="0"]');
const pair1 = document.querySelectorAll('input[data-pair="1"]');
const pair2 = document.querySelectorAll('input[data-pair="2"]');
const pair3 = document.querySelectorAll('input[data-pair="3"]');
const pair4 = document.querySelectorAll('input[data-pair="4"]');

// Adds eventlistener to a collection of checkboxes
// The good health habit will get deselected if the user chooses the opposing unhealthy habit, and vice versa.
const addStateToggleForHabitPairs = (arr) => {
  for (const elem of arr) {
    elem.addEventListener("click", () => {
      if (arr[0] === elem) {
        // First, healthy elem
        if (elem.checked) {
          arr[1].checked = false;
        }
      } else {
        // Second, unhealthy elem
        if (elem.checked) {
          arr[0].checked = false;
        }
      }
    });
  }
};

// Applying state toggle to the habit pairs
addStateToggleForHabitPairs(pair0);
addStateToggleForHabitPairs(pair1);
addStateToggleForHabitPairs(pair2);
addStateToggleForHabitPairs(pair3);
addStateToggleForHabitPairs(pair4);
