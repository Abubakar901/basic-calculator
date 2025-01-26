addEventListener("DOMContentLoaded", function () {
    const toggleDarkModeBtn = this.document.getElementById("toggle-dark-mode");
    const tempResultScreen = this.document.getElementById('temp-result');
    const resultScreen = this.document.getElementById('result');
    const btns = this.document.getElementById('button-container');
    let currentOperation = "";

    // Light/Dark mode theme switcher
    toggleDarkModeBtn.addEventListener('click', function () {
        document.body.classList.toggle("dark-mode");
        toggleDarkModeBtn.textContent = document.body.classList.contains("dark-mode") ? '☀️' : '🌙';
    })

    // Handle mouse click input
    btns.addEventListener('click', (event) => {
        const target = event.target;
        const value = target.getAttribute("data-value");
        const actions = target.getAttribute("data-action");
        
        if (value) {
            appendValue(value);
        } else if (actions === "equals") {
            calculateEquation();
        } else if (actions === "clear") {
            clearScreen()
        } else if (actions === "backspace") {
            clearLastIndex();
        }
    })

    // Handle keyboard input
    this.document.addEventListener('keydown', (event) => {
        const pressedKey = event.key;
        if('0123456789().'.includes(pressedKey)) {
            appendValue(pressedKey);
        } else if (pressedKey === '+' || pressedKey === '-' || pressedKey === '*' || pressedKey === '/') {
            appendValue(pressedKey); 
        } else if (pressedKey === 'Enter') {
            calculateEquation(); 
        } else if (pressedKey === 'Backspace') {
            clearLastIndex();
        } else if (pressedKey === 'Escape') {
            clearScreen(); 
        }
    })

    // Clear the last character from the input
    const clearLastIndex = () => {
        if (currentOperation.length === 1) {
            resultScreen.textContent = "0";
        }
        else if (currentOperation != "0") {
            currentOperation = currentOperation.slice(0, currentOperation.length - 1);
            resultScreen.textContent = currentOperation;
        }
        calculateTempScreen();
    }

    // for calculating equation
    const calculateEquation = () => {
        try {
            const result = new Function(`return ${currentOperation}`)();
            currentOperation = result.toString();
            resultScreen.textContent = currentOperation;
            tempResultScreen.textContent = "";
        } catch (error) {
            return "Error: Invalid expression";
        }
    };

    // Clears the screen and reset all values
    const clearScreen = () => {
        resultScreen.textContent = "0";
        tempResultScreen.textContent = "";
        currentOperation = "";
    }

    // Calculate temporary result (display result below the equation if applicable) 
    const calculateTempScreen = () => {
        if(/[+\-*/][1-9]/.test(currentOperation)) {
            tempResultScreen.textContent = new Function(`return ${currentOperation}`)();
        } else {
            tempResultScreen.textContent = "";
        }
    };

    // Append the value (number/operator) to the current operation
    const appendValue = (value) => {
        const operators = ["+", "-", "*", "/"];
        const lastCharacter = currentOperation.charAt(currentOperation.length - 1);

        // Prevents starting an operation with invalid operators (+, *, /) if no current operation exists.
        if(currentOperation === ""){ 
            if(["+", "*", "/"].includes(value)) {
                return
            }
        }

        if (operators.includes(value)) {                                                                                                   
            if (operators.includes(lastCharacter)) {
                currentOperation = currentOperation.slice(0, -1) + value;
            } else {
                    currentOperation += value; 
                
            }
        } else {
            currentOperation += value;
        }

        resultScreen.textContent = currentOperation;
        calculateTempScreen();
    }
});