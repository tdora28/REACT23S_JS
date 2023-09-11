// Collect HTML buttons
const sendBtn = document.querySelector("#sendBtn");
const refreshBtn = document.querySelector("#refreshBtn");

// Hide .questions screen and #sendBtn
// Reveal .decision screen and #refreshBtn
const switchMachineScreen = () => {
  document.querySelector(".questions").style.display = "none";
  sendBtn.style.display = "none";
  document.querySelector(".decision").style.display = "block";
  refreshBtn.style.display = "block";
};

// Write error message inside .decision__answer
const buildErrorMsg = () => {
  document.querySelector(".decision__answer").textContent =
    "Please enter a question!";
};

// Build greeting text for .decision__greeting
// If nothing is given or the string is only white space: "Hello!"
// Otherwise include the given string (text) in the greeting
const buildGreeting = (text) => {
  document.querySelector(".decision__greeting").textContent =
    !text || !text.replace(/\s/g, "").length ? "Hello!" : `Hello, ${text}!`;
};

// Build a short summary text for .decision__summary
// Include the given string (text)
const buildSummary = (text) => {
  document.querySelector(
    ".decision__summary"
  ).textContent = `The answer to "${text}" is:`;
};

// Pick an answer based on the generated random number (1-10)
const pickAnswer = (num) => {
  let text = "";

  switch (num) {
    case 1:
      text = "Signs point to yes, like stars in a galaxy far, far away.";
      break;
    case 2:
      text = "As I see it, yes, a brighter tomorrow awaits.";
      break;
    case 3:
      text = "It is decidedly so, destiny aligns.";
      break;
    case 4:
      text = "Outlook good, the planets align in your favor.";
      break;
    case 5:
      text = "Outlook not so stellar, recalibrate and try again.";
      break;
    case 6:
      text = "Don't count on it, the cosmic winds are not in your favor";
      break;
    case 7:
      text = "My cosmic circuits say no, tread carefully.";
      break;
    case 8:
      text = "Better not tell you now, the fates are still weaving.";
      break;
    case 9:
      text = "Ask again later, the interstellar signals are unclear.";
      break;
    case 10:
      text = "Concentrate and ask again, your aura is too fuzzy.";
      break;
    default:
      text = "No idea!";
      break;
  }

  document.querySelector(".decision__answer").textContent = text;
};

// Check user input
// Populate UI with correct messages
const decisionMachine = () => {
  const userName = document.querySelector("#userName").value;
  const question = document.querySelector("#userQuestion").value;
  const randomNum = Math.floor(Math.random() * 10 + 1);

  switchMachineScreen();

  if (!question || !question.replace(/\s/g, "").length) {
    buildErrorMsg();
  } else {
    setFace(randomNum);
    buildGreeting(userName);
    buildSummary(question);
    pickAnswer(randomNum);
  }
};

// Add event listener to submit btn
sendBtn.addEventListener("click", decisionMachine);
refreshBtn.addEventListener("click", () => {
  location.reload();
});

// Display the correct child of .face__mouth div depending on the given number (num) by toggling the .show-face class
// The numbers correspond to the answers, which all have an emotion tied to them (happy, sad, neutral)
const setFace = (num) => {
  let faces = document.querySelectorAll(".face__mouth>*");
  let search = "";

  if (num < 5) {
    search = "face__happy";
  } else if (num < 8) {
    search = "face__sad";
  } else {
    search = "face__neutral";
  }

  for (let face of faces) {
    if (
      face.classList.contains("show-face") &&
      !face.classList.contains(search)
    ) {
      face.classList.remove("show-face");
    } else if (
      !face.classList.contains("show-face") &&
      face.classList.contains(search)
    ) {
      face.classList.add("show-face");
    }
  }
};
