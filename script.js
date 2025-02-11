const darkModeIcon = document.getElementById('darkmode-icon');
const calculator = document.querySelector('.calculator');
const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
const body = document.body;
const logo = document.querySelector('.logo-container img');

let isDarkMode = true;
let isResult = false;

const equalButton = document.querySelector('button:last-child');
equalButton.style.backgroundColor = 'rgb(0, 35, 163)';
equalButton.style.color = 'rgb(255, 255, 0)';

darkModeIcon.addEventListener('click', () => {
    if (isDarkMode) {
        //Light Mode
        body.style.backgroundColor = 'white';
        calculator.style.backgroundColor = 'rgb(0, 35, 163)';
        buttons.forEach(button => {
            button.style.backgroundColor = 'rgb(0, 35, 163)';
            button.style.color = 'rgb(255, 255, 0)';
        });
        const equalButton = document.querySelector('button:last-child');
        equalButton.style.backgroundColor = 'rgb(255, 255, 0)';
        equalButton.style.color = 'rgb(0, 35, 163)';
        display.style.backgroundColor = 'rgb(255, 255, 0)';
        display.style.color = 'black';
        display.style.setProperty('--placeholder-color', 'black');
        darkModeIcon.style.fill = 'black';
    } else {
        //Dark Mode
        body.style.backgroundColor = 'black';
        calculator.style.backgroundColor = 'rgb(255, 255, 0)';
        buttons.forEach(button => {
            button.style.backgroundColor = 'rgb(255, 255, 0)';
            button.style.color = 'rgb(0, 35, 163)';
        });
        const equalButton = document.querySelector('button:last-child');
        equalButton.style.backgroundColor = 'rgb(0, 35, 163)';
        equalButton.style.color = 'rgb(255, 255, 0)';
        display.style.backgroundColor = 'rgb(0, 35, 163)';
        display.style.color = 'white';
        display.style.setProperty('--placeholder-color', 'white');
        darkModeIcon.style.fill = 'white';
    }
    isDarkMode = !isDarkMode;
});

logo.addEventListener('click', () => {

    calculator.classList.add('glow');
    
    setTimeout(() => {
        calculator.classList.remove('glow');
    }, 5000);
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        const backSpace = button.querySelector("svg");
        const operators = ['+', '-', '*', '/'];

        if (buttonText === '=') {
            try {
                display.value = eval(display.value);
                isResult = true;
            } catch (error) {
                display.value = "Error";
            }
        } else if (buttonText === 'AC') {
            display.value = "";
            isResult = false;
        } else if (backSpace) {
            display.value = display.value.slice(0, -1);
        } else {
            if (isResult && !operators.includes(buttonText)) {
                display.value = buttonText;
                isResult = false;
            } else if (isResult && operators.includes(buttonText)) {
                display.value += buttonText;
                isResult = false;
            } else {
                display.value += buttonText;
            }
        }
    });
});

document.body.addEventListener('keydown', (event) => {
    const key = event.key;
    const operators = ['+', '-', '*', '/'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (key === 'Enter') {
        try {
            display.value = eval(display.value);
            isResult = true;
        } catch (error) {
            display.value = "Error";
        }
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
        display.value = "";
        isResult = false;
    } else if (numbers.includes(key) || operators.includes(key) || key === '(' || key === ')' || key === '.') {
        if (isResult && !operators.includes(key)) {
            display.value = key;
            isResult = false;
        } else if (isResult && operators.includes(key)) {
            display.value += key;
            isResult = false;
        } else {
            display.value += key;
        }
    }
});