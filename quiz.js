const fractions = [
    { num: 1, den: 16 }, { num: 1, den: 8 }, { num: 3, den: 16 },
    { num: 1, den: 4 }, { num: 5, den: 16 }, { num: 3, den: 8 },
    { num: 7, den: 16 }, { num: 1, den: 2 }, { num: 9, den: 16 },
    { num: 5, den: 8 }, { num: 11, den: 16 }, { num: 3, den: 4 },
    { num: 13, den: 16 }, { num: 7, den: 8 }, { num: 15, den: 16 }
];
let selectedFractions = [];
let currentFraction = {};
let correctDecimal = 0;

function createCheckboxes() {
    const container = document.getElementById("checkbox-container");
    fractions.forEach(f => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${f.num}/${f.den}"> ${f.num}/${f.den}`;
        container.appendChild(label);
    });
}

function startQuiz() {
    selectedFractions = Array.from(document.querySelectorAll("#checkbox-container input:checked"))
        .map(checkbox => checkbox.value.split("/").map(Number));

    if (selectedFractions.length === 0) {
        alert("Please select at least one fraction.");
        return;
    }
    nextQuestion();
}

function nextQuestion() {
    if (selectedFractions.length === 0) return;
    const [num, den] = selectedFractions[Math.floor(Math.random() * selectedFractions.length)];
    currentFraction = { num, den };
    correctDecimal = num / den; // Calculate the exact decimal value without rounding
    document.getElementById("fraction-display").innerText = `FRACTION: ${num}/${den}`;
    document.getElementById("input-field").value = "";
}

function pressKey(key) {
    const input = document.getElementById("input-field");
    input.value += key;
}

function backspace() {
    const input = document.getElementById("input-field");
    input.value = input.value.slice(0, -1);
}

function checkAnswer() {
    const userAnswer = document.getElementById("input-field").value.trim();
    if (parseFloat(userAnswer) === correctDecimal) {
        alert("Correct!");
        nextQuestion();
    } else {
        alert(`Incorrect. The correct answer is ${correctDecimal}`);
    }
}

function showAnswer() {
    alert(`The correct answer is ${correctDecimal}`);
    nextQuestion();
}

// Initialize
createCheckboxes();
