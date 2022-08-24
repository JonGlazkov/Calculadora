let input = document.getElementById('input');
let number = document.querySelectorAll('.numbers div');
let operator = document.querySelectorAll('.operators div');
let result = document.getElementById('result');
let clear = document.getElementById('clear');

resultDisplayed = false;

// adding click handlers to number buttons

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function(event) {
    // storing current input string and its last character in variables - used later

    let currentString = input.innerHTML;
    let lastCharacter = currentString[currentString.length - 1];

    // if the result is not displayed, then, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += event.target.innerHTML;
    } else if (resultDisplayed === true && lastCharacter === '+' || lastCharacter === '-' || lastCharacter === '×' || lastCharacter === '÷') {
      // if result is currently displayed and user pressed a operator, we need to keep adding to the string for next operation.
      resultDisplayed = false;
      input.innerHTML += event.target.innerHTML;
    } else {
      // if result is currentyle displayed and user pressed a number, we need to clear the input string and add the new input to start the new operation.
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += event.target.innerHTML;
    }
  });
}

// adding click handlers to number buttons
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(event) {
    // storing current input string and its last character in variables

    let currentString = input.innerHTML
    let lastCharacter = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastCharacter === '+' || lastCharacter === '-' || lastCharacter === '×' || lastCharacter === '÷') {
      let newString = currentString.substring(0, currentString.length - 1) + event.target.innerHTML
      input.innerHTML = newString;
    } else if ( currentString.length == 0) {
      // if first key pressed is an operator, don't do nothing
      window.alert("Enter a number first");
    } else {
      // else, just add the operator pressed to the input
      input.innerHTML += event.target.innerHTML;
    }
  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // this is the string that we will be processing eg. -10+26+33-56*34/23
  let inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  let numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  let operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})