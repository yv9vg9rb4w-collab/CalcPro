let expression = "";
let ANS = "0";

const display = document.getElementById("display");
const history = document.getElementById("history");

function renderScroll(text) {
  display.innerHTML = "";

  for (let char of text) {

    if (!"0123456789.".includes(char)) {
      display.innerHTML += `<span>${char}</span>`;
      continue;
    }

    const digit = document.createElement("span");
    digit.className = "digit";

    const inner = document.createElement("span");
    inner.className = "digit-inner";
    inner.innerHTML = `${char}<br>${char}`;

    digit.appendChild(inner);
    display.appendChild(digit);
  }
}

function addNum(n) {
  expression += n;
  renderScroll(expression);
}

function addOp(op) {
  expression += op;
  renderScroll(expression);
}

function toggleSign() {
  if (!expression) return;
  if (expression.startsWith("-")) {
    expression = expression.slice(1);
  } else {
    expression = "-" + expression;
  }
  renderScroll(expression);
}

function useANS() {
  expression += ANS;
  renderScroll(expression);
}

function clearAll() {
  expression = "";
  display.innerHTML = "";
}

function calculate() {
  try {
    let exp = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/");

    const result = eval(exp);
    history.textContent = expression + " =";
    expression = result.toString();
    ANS = expression;
    renderScroll(expression);
  } catch {
    display.textContent = "Erreur";
  }
}
