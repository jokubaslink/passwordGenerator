const settingsSelectors = document.querySelectorAll(
  '.settingsWindow input[type="checkbox"]'
);
/* -- */
const uppercaseCheck = document.querySelector(".uppercaseCheck");
const lowercaseCheck = document.querySelector(".lowercaseCheck");
const numberCheck = document.querySelector(".numberCheck");
const symbolCheck = document.querySelector(".symbolCheck");
/* -- */
const lengthSlider = document.querySelector(".lengthSlider");
const lengthIndicator = document.querySelector(".lengthIndicator");
const generatedPasswordField = document.querySelector(
  ".generatedPasswordField"
);

const upperCaseChars = getChars(65, 90);
const lowerCaseChars = getChars(97, 122);
const numbers = getChars(48, 57);
const symbols =
  getChars(33, 47) + getChars(58, 64) + getChars(91, 96) + getChars(123, 126);

function getChars(a, b) {
  let chars = "";

  for (let i = a; i <= b; i++) {
    chars += String.fromCharCode(i);
  }

  return chars;
}

settingsSelectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    if (checkForOneSetting()) {
      generatePsw(settings);
    } else {
      alert("You cannot have no options!");
      generatedPasswordField.value = "Select character option!";
    }
  });
});

const settings = {
  pswLength: lengthIndicator.value,
  upperCase: uppercaseCheck.checked,
  lowerCase: lowercaseCheck.checked,
  number: numberCheck.checked,
  symbol: symbolCheck.checked,
};

function modifyLength() {
  lengthIndicator.value = lengthSlider.value;
  generatePsw(settings);
}

function generatePsw(settings) {
  const generatedPassword = [];
  let chars = "";

  if (lowercaseCheck.checked) chars += lowerCaseChars;
  if (uppercaseCheck.checked) chars += upperCaseChars;
  if (numberCheck.checked) chars += numbers;
  if (symbolCheck.checked) chars += symbols;

  for (let i = 0; i < lengthIndicator.value; i++) {
    const rIdx = Math.floor(Math.random() * chars.length);
    generatedPassword.push(chars[rIdx]);
  }

  generatedPasswordField.value = generatedPassword.join("");
}

generatePsw(settings);

function checkForOneSetting() {
  for (let i = 0; i < settingsSelectors.length; i++) {
    if (settingsSelectors[i].checked) return true;
  }

  return false;
}
