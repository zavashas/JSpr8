let a = ''; 
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '+/-', '%'];

const out = document.querySelector('.calc-screen p');

function updateScreen(value) {
    let numValue = Number(value);

    if (Math.abs(numValue) > 999999999 || (Math.abs(numValue) < 0.000001 && numValue !== 0)) {

        value = numValue.toExponential(2);
    } else {
        value = numValue.toFixed(8).replace(/\.?0+$/, '');
    }

    out.textContent = value;

    if (value.length > 8) {
        out.style.fontSize = '40pt';
    } else {
        out.style.fontSize = '50pt';
    }
}

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    updateScreen('0');
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;

    if (digit.includes(key)) {
        if ((b === '' && sign === '') || finish) {
            if (finish) {
                a = ''; 
                finish = false;
            }
            a += key; 
        } else {
            b += key; 
        }
        updateScreen(b === '' ? a : b);
        return;
    }

    if (action.includes(key)) {
        if (key === '+/-') {
            if (b === '' && a !== '') {
                a = String(-a);
                updateScreen(a);
            } else if (b !== '') {
                b = String(-b);
                updateScreen(b);
            }
            return;
        }

        if (key === '%') {
            if (a !== '' && b === '') {
                a = String(a / 100);
                updateScreen(a);
            } else if (a !== '' && b !== '') {
                b = String((a * b) / 100);
                updateScreen(b);
            }
            return;
        }

        if (b !== '' && sign !== '') {
            calculate();
            b = '';
        }

        sign = key; 
        finish = false;
        return;
    }

    if (key === '=') {
        calculate();
    }
};

function calculate() {
    if (b === '') return; 

    let result;
    switch (sign) {
        case '+':
            result = (+a) + (+b);
            break;
        case '-':
            result = a - b;
            break;
        case 'x':
            result = a * b;
            break;
        case '/':
            if (b === '0') {
                updateScreen('Ошибка');
                return;
            }
            result = a / b;
            break;
    }

    a = result; 
    b = ''; 
    finish = true;
    updateScreen(a.toString()); 
};


