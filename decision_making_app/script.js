// HTML elements

const submitBtn = document.querySelector('button[type="submit"]');
const nameInput = document.querySelector("#userName");
const questionInput = document.querySelector("#userQuestion");
const form = document.querySelector(".form");
const answerDiv = document.querySelector(".answer");
const refreshBtn = document.querySelector(".button--hidden");

// VARIABLES

// Store values from inputs
let userName = "";
let userQuestion = "";

// Generate random num between 1 and 10 (included)
const randomNum = Math.floor(Math.random() * 10 + 1);

// Store possible answers
const decisionStatements = {
  1: "The stars say yes, go for it!",
  2: "Trust your instincts and take the leap.",
  3: "Hmm, better try again later.",
  4: "Consider all options before making a move.",
  5: "Outlook is bright, proceed with confidence.",
  6: "Seek advice from a trusted friend before deciding.",
  7: "Signs point to unexpected opportunities.",
  8: "It's a toss-up, make a choice and see what happens.",
  9: "Take a step back and reassess before moving forward.",
  10: "Not the right time, patience will bring better results.",
};

// FUNCTIONS

// Return (string) greeting depending on user input
const generateGreeting = (userName, userQuestion) => {
  let greeting = `
    ${userName === "" ? "Hello!" : `Hello, ${userName}!`}
    Your question was: "${userQuestion}" &ndash;
    And the answer is:
  `;

  return greeting;
};

// Render UI that shows the answer
// 1. hide form
// 2. display answer div with appropriate greeting and randomly picked answer
// 3. display refresh button
const renderAnswerUI = (name, question) => {
  form.style.display = "none";

  answerDiv.style.display = "flex";
  answerDiv.innerHTML = `
  ${generateGreeting(name, question)}
  <span>${decisionStatements[randomNum]}</span>
`;

  refreshBtn.style.display = "block";
};

// EVENT LISTENERS

// Form submit button
// On click: 1.) catch input values, 2.) render UI to show the greeting and the answer
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  userName = nameInput.value;
  userQuestion = questionInput.value;

  renderAnswerUI(userName, userQuestion);
});

// Refresh button
refreshBtn.addEventListener("click", () => {
  window.location.reload();
});
