"use strict";

var calorieCounter = document.getElementById("calorie-counter");
var budgetNumberInput = document.getElementById("budget");
var entryDropdown = document.getElementById("entry-dropdown");
var addEntryButton = document.getElementById("add-entry");
var clearButton = document.getElementById("clear");
var output = document.getElementById("output");
var isError = false;

function cleanInputString(str) {
  var regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  var regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  var targetInputContainer = document.querySelector("#".concat(entryDropdown.value, " .input-container"));
  var entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  var HTMLString = "\n  <label for=\"".concat(entryDropdown.value, "-").concat(entryNumber, "-name\">Entry ").concat(entryNumber, " Name</label>\n  <input type=\"text\" placeholder=\"Name\" id=\"").concat(entryDropdown.value, "-").concat(entryNumber, "-name\" />\n  <label for=\"").concat(entryDropdown.value, "-").concat(entryNumber, "-calories\">Entry ").concat(entryNumber, " Calories</label>\n  <input type=\"number\" min=\"0\" placeholder=\"Calories\" id=\"").concat(entryDropdown.value, "-").concat(entryNumber, "-calories\" />\n  ");
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;
  var breakfastNumberInputs = document.querySelectorAll("#breakfast input[type=number]");
  var lunchNumberInputs = document.querySelectorAll("#lunch input[type=number]");
  var dinnerNumberInputs = document.querySelectorAll("#dinner input[type=number]");
  var snacksNumberInputs = document.querySelectorAll("#snacks input[type=number]");
  var exerciseNumberInputs = document.querySelectorAll("#exercise input[type=number]");
  var breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  var lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  var dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  var snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  var exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  var budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  var consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  var remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  var surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = "\n  <span class=\"".concat(surplusOrDeficit.toLowerCase(), "\">").concat(Math.abs(remainingCalories), " Calorie ").concat(surplusOrDeficit, "</span>\n  <hr/>\n  <p>").concat(budgetCalories, " Calories Budgeted</p>\n  <p>").concat(consumedCalories, " Calories Consumed</p>\n  <hr/>\n  <p>").concat(exerciseCalories, " Calories Burned</p>\n  ");
  output.classList.remove("hide");
}

function getCaloriesFromInputs(list) {
  var calories = 0;

  for (var i = 0; i < list.length; i++) {
    var currVal = cleanInputString(list[i].value);
    var invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert("Invalid Input: ".concat(invalidInputMatch[0]));
      isError = true;
      return null;
    }

    calories += Number(currVal);
  }

  return calories;
}

function clearForm() {
  var inputContainers = Array.from(document.querySelectorAll(".input-container"));

  for (var i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);