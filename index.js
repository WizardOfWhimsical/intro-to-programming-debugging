const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// randomly generates a number between whatever and whatever
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// helper function for pluralization
// almost made the ternary twice in the code
function tenseForm(num){ 
  return num === 1 ? "guess" : "guesses";
}

function checkGuess() {
  /*running checks for empty input and out of range*/
  if(guessInput.value === '') {
    guessInput.value = '';
    alert("Please enter a number"); 
    // reutrn to exit the function so no wasted attempts
    return;
  }else if (guessInput.value < 1 || guessInput.value > 99) {
    guessInput.value = '';
    alert("Number must be between 1 and 99");
    // reutrn same here as well
    return;
  } 
// parses number input as an integer. comes in as string
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  // hide all messages function
  hideAllMessages();

  // check if you win
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = 'block';
    // could had went with innerText but innerHTML works here *mehea*
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${tenseForm(attempts)} to guess the correct number!`;
    correctMessage.style.display = "block";
    // shut these guys off so no glitching
    submitButton.disabled = true;
    guessInput.disabled = true;
    // gotta see the btn to click it
    resetButton.style.display = "block";
    // return to exit the game
    return;
  }

  // mesages let you know how to guess
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      // to display when the number is lower
      tooLowMessage.style.display = "block";
    } else {
      // to didplay when the number is higher
      tooHighMessage.style.display = "block";
    }

    // how many guesses you have left 
    const remainingAttempts = maxNumberOfAttempts - attempts;

    // display message for guesses reached
    numberOfGuessesMessage.style.display = "block";

    // i wrote a switch statement here first, but ternary hit me
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${tenseForm(remainingAttempts)} remaining`;
  }

  // trigger for end game
  // first err seen extra "="
  // stays disabled after reset when you hit max attemps??
  if (attempts === maxNumberOfAttempts) {
    maxGuessesMessage.style.display = "block";
    submitButton.disabled = true;
    guessInput.disabled = true;
  // alert(`Sorry, the correct number was ${targetNumber}. Try again!`);
  // setup();
  }
  //clearing the input box after each guess
  guessInput.value = '';
  // need to see btn to reset
  resetButton.style.display = "block";
}

// proper naming says it all
function hideAllMessages() {
  // took the "<=" out of the for loop
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}

// second err seen no "c" in function
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  // so i can cheat when i want to :D
  console.log(`target number: ${targetNumber}`);
  // this is not attepmts, ops i lost count. think im at 6
  // Reset number of attempts
  attempts = 0;
  guessInput.value = '';
  // err 3, nothing is set to work
  // Enable the input and submit button
  // FKING FINALLY disabled was misspelled
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);


setup();
