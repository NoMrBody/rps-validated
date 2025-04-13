document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault(); // preventing browser from default form submitting stuff

  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isTeamSizeValid = validateTeamSize();
  const areCheckboxesValid = validateCheckboxes();

  // form validity indicator
  const isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isTeamSizeValid &&
    areCheckboxesValid;

  if (isFormValid) {
    document.getElementById("container").style.display = "none";
    launchGame();
    // document.getElementById("game").style.display = "block";
    // alert("VALID");
  }
});

function validateFirstName() {
  const firstName = document.getElementById("firstName").value.trim();
  const errorField = document.getElementById("firstNameError");
  const inputField = document.getElementById("firstName");

  if (firstName === "") {
    errorField.textContent = "First Name is required";
    inputField.classList.add("error-border"); // add red border
    return false;
  }
  errorField.textContent = "";
  inputField.classList.remove("error-border"); // remove red border
  return true;
}

function validateLastName() {
  const lastName = document.getElementById("lastName").value.trim();
  const errorField = document.getElementById("lastNameError");
  const inputField = document.getElementById("lastName");

  if (lastName === "") {
    errorField.textContent = "Last Name is required";
    inputField.classList.add("error-border");
    return false;
  }
  errorField.textContent = "";
  inputField.classList.remove("error-border");
  return true;
}

function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const errorField = document.getElementById("emailError");
  const inputField = document.getElementById("email");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular experssion to validate email

  if (email === "") {
    errorField.textContent = "Email is required";
    inputField.classList.add("error-border");
    return false;
  } else if (!pattern.test(email)) {
    // email not empty but pattern didn't match
    errorField.textContent = "Invalid email format";
    inputField.classList.add("error-border");
    return false;
  }
  errorField.textContent = "";
  inputField.classList.remove("error-border");
  return true;
}

function validatePassword() {
  const password = document.getElementById("password").value.trim();
  const errorField = document.getElementById("passwordError");
  const inputField = document.getElementById("password");

  if (password === "") {
    errorField.textContent = "Password is required";
    inputField.classList.add("error-border");
    return false;
  } else if (password.length < 8) {
    errorField.textContent = "Password must be at least 8 characters";
    inputField.classList.add("error-border");
    return false;
  }
  errorField.textContent = "";
  inputField.classList.remove("error-border");
  return true;
}

function validateTeamSize() {
  const teamSize = document.getElementById("teamSize").value;
  const errorField = document.getElementById("selectorError");
  const selectorField = document.getElementById("teamSize");

  if (teamSize === "") {
    errorField.textContent = "Please select size of a team";
    selectorField.classList.add("error-border");
    return false;
  }
  errorField.textContent = "";
  selectorField.classList.remove("error-border");
  return true;
}

function validateCheckboxes() {
  const selected = document.querySelectorAll(
    'input[name="technologies"]:checked'
  );
  const errorField = document.getElementById("checkboxError");

  if (selected.length < 3) {
    // less than 3 are selected
    errorField.textContent = "Select at least 3 technologies";
    return false;
  }
  errorField.textContent = "";
  return true;
}

// initial values of variables
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0; // tracking rounds for history

function launchGame() {
  document.getElementById("game").style.display = "block"; // make game 'appear'
  getInitialState();
}

function getInitialState() {
  // setting initial scores as 0
  document.getElementById(
    "player-score"
  ).innerHTML = `<p>PLAYER SCORE: ${playerScore}</p>`;
  document.getElementById(
    "computer-score"
  ).innerHTML = `<p>COMPUTER SCORE: ${computerScore}</p>`;
}

// start listening button actions
document
  .getElementById("rock-btn")
  .addEventListener("click", () => playRound("rock"));
document
  .getElementById("paper-btn")
  .addEventListener("click", () => playRound("paper"));
document
  .getElementById("scissors-btn")
  .addEventListener("click", () => playRound("scissors"));

document.getElementById("rst-button").addEventListener("click", resetGame); // reset progess after clicking reset button

function playRound(playerMove) {
  const choices = ["rock", "paper", "scissors"];
  // 0 <= Math.random() < 1
  const computerMove = choices[Math.floor(Math.random() * 3)];  // index is either 0, 1 or 2 due to floor method

  // Show 'move-preview'
  const movePreview = document.querySelector(".moves-preview");
  const messagePreview = document.querySelector(".message-field");
  movePreview.style.display = "flex";
  messagePreview.style.display = "block";
  document.querySelector(
    ".moves-preview__p1"
  ).innerHTML = `<img src="resources/${playerMove}.png" alt="${playerMove}" height="90" title="${playerMove}">`;  // make player move icon appear
  document.querySelector(
    ".moves-preview__pc"
  ).innerHTML = `<img src="resources/${computerMove}.png" alt="${computerMove}" height="90" title="${computerMove}">`;  // make computer move icon appear

  const messageEl = document.getElementById("message-field__message");  // variable for message
  let result = "";

  if (playerMove === computerMove) {
    result = "IT'S A DRAW 🤝🏻";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "YOU WON ! 🎉";
    playerScore++;
  } else {
    result = "COMPUTER WON 🥀";
    computerScore++;
  }

  document.getElementById(
    "player-score"
  ).innerHTML = `<p>PLAYER SCORE: ${playerScore}</p>`;
  document.getElementById(
    "computer-score"
  ).innerHTML = `<p>COMPUTER SCORE: ${computerScore}</p>`;

  messageEl.textContent = result;

  roundNumber++;

  addToHistory(playerMove, computerMove, result); // adding game result to the history
}

function resetGame() {
  // reset variables to initial state
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;

  // Reset scores
  document.getElementById(
    "player-score"
  ).innerHTML = `<p>PLAYER SCORE: ${playerScore}</p>`;
  document.getElementById(
    "computer-score"
  ).innerHTML = `<p>COMPUTER SCORE: ${computerScore}</p>`;

  document.querySelector(".moves-preview").style.display = "none";  // to disappear move icons

  document.querySelector(".message-field").style.display = "none";  // to disappear previous result message

  // clean-up game records
  const historyList = document.getElementById("history__lst-content");
  historyList.innerHTML = "";
}

function addToHistory(playerMove, computerMove, result) {
  const historyDiv = document.querySelector(".history__lst-content");
  const entry = document.createElement("li");  // creating list item inside unordered list
  entry.textContent = `Round ${roundNumber}: Player chose - ${playerMove}, computer chose - ${computerMove} -> ${result}`;
  historyDiv.prepend(entry);  // to stack game records
}
