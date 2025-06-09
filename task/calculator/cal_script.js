function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function backspace() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

// 🔑 Keyboard Support
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const allowed = "0123456789+-*/.";

  if (allowed.includes(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
