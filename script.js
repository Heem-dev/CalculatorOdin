const resultDisplay = document.querySelector(".resultDisplay");
const mainGrid = document.querySelector(".mainGrid");
let leftBracket = false;
let rightBracket = false;
let operatorState = false;
let operator = "";
let decimalState = false;
let secondDecimalState = false;
let opText = "";
let leftNums;
let rightNums;

document.querySelector(".equal").addEventListener("click", equal);

document.querySelector(".delAll").addEventListener("click", () => {
  leftBracket = false;
  rightBracket = false;
  operatorState = false;
  decimalState = false;
  secondDecimalState = false;

  operator = "";
  opText = "";
  resultDisplay.textContent = "";
  leftNums = null;
  rightNums = null;
});
document.querySelector(".del").addEventListener("click", () => {
  let arry = resultDisplay.textContent.split("");
  if (arry.at(-1) == opText) {
    operatorState = false;
    arry.pop();
  } else if (arry.at(-1) == "." && secondDecimalState == true) {
    secondDecimalState = false;
    arry.pop();
  } else if (
    arry.at(-1) == "." &&
    secondDecimalState == false &&
    decimalState == true
  ) {
    decimalState = false;
    arry.pop();
  } else {
    arry.pop();
  }
  resultDisplay.textContent = arry.join("");
});
function add(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a + b;
}

function minus(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a - b;
}

function divide(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a / b;
}

function multiply(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a * b;
}

mainGrid.querySelectorAll(".number").forEach((e) => {
  //   console.log(e.textContent);
  e.addEventListener("click", () => {
    updateDisplay(e.textContent);
  });
});

function updateDisplay(up) {
  resultDisplay.textContent += up;
}

mainGrid.querySelectorAll(".operation").forEach((e) => {
  e.addEventListener("click", operatorClicked);
});

function operatorClicked(e) {
  if (operatorState == false && resultDisplay.textContent != "") {
    opText = e.target.textContent;
    operatorState = true;
    leftBracket = true;
    leftNums = resultDisplay.textContent;
    if (opText == "×") {
      operator = "*";
      console.log("**");
    }
    if (opText == "÷") {
      operator = "/";
    }
    if (opText == "+") {
      operator = "+";
    }
    if (opText == "-") {
      operator = "-";
    }
    // resultDisplay.textContent += opText;
    updateDisplay(opText);
    // console.log(leftNums);
  }
  //   console.log(operator);
}

function equal() {
  if (leftBracket == true && operatorState == true) {
    let ary = resultDisplay.textContent.split("");
    // console.log(ary);
    const indx = ary.findIndex((e) => e == opText);
    // console.log(indx);
    ary.splice(0, indx + 1);
    rightNums = ary.join("");
    console.log(leftNums);
    console.log(operator);
    console.log(rightNums);
    rightBracket = true;

    switch (operator) {
      case "*":
        resultDisplay.textContent = multiply(leftNums, rightNums);
        break;
      case "/":
        if (rightNums <= 0) {
          break;
        }
        resultDisplay.textContent = divide(leftNums, rightNums);
        break;
      case "-":
        resultDisplay.textContent = minus(leftNums, rightNums);
        break;
      case "+":
        resultDisplay.textContent = add(leftNums, rightNums);
        break;
      default:
        break;
    }
    leftNums = resultDisplay.textContent;
    operatorState = false;
    decimalState = false;
    secondDecimalState = false;
  }
}

document.querySelector("#decimal").addEventListener("click", () => {
  if (decimalState == false && secondDecimalState == false) {
    leftNums += ".";
    updateDisplay(".");
    decimalState = true;
  } else if (
    decimalState == true &&
    secondDecimalState == false &&
    operatorState == true
  ) {
    rightNums += ".";
    updateDisplay(".");
    secondDecimalState = true;
  }
});
