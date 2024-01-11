const textBox = document.querySelector('#textBox');
const plus = document.querySelector('#plus');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const minus = document.querySelector('#minus');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const erase = document.querySelector('#erase');
const a = document.querySelector('.buttons');
const square = document.querySelector('#square');
const dot = document.querySelector('#dot');

// -------------------------------------------------------

let x = 7;
let Y = false;
let chosenMinus = false;
let chosenMultiply = false;
let chosenDivide = false;
let chosenPlus = false;
let btnValue = [];
let numbersToCount = [];
let temp = 0;
let char;
let btn1 = 0;
let dotClicked = false;

for (let i = 0; i < 10; i++) {
    const Btn = document.createElement("button");
    Btn.innerHTML = x;
    Btn.classList.add('Nrbtn');
    if (i > 8) {
        btn1 = document.querySelector('.plus-btn').appendChild(Btn);
    }
    else
        btn1 = document.querySelector('.buttons').appendChild(Btn);
    placeNumbersInOrder(i);
}

const btn = document.querySelectorAll('.Nrbtn');

btn.forEach(element => element.addEventListener('click', () => {
    if(dotClicked){
        btnValue.push('.' + element.textContent);
        textBox.innerHTML = btnValue.join("");
        dotClicked=false;
    }else{
        btnValue.push(element.textContent);
        textBox.innerHTML = btnValue.join("");
    }

}));

btn.onmouseenter = () => { btn.style.backgroundColor = "black"; }

equals.addEventListener('click', () => {
    equalsTo();
})

clear.addEventListener('click', () => {
    textBox.innerHTML = "";
    numbersToCount = [];
    btnValue = [];
    temp = 0;
    chosenDivide = false;
    chosenMultiply = false;
    chosenPlus = false;
    chosenMinus = false;
    sum = 0;
    dotClicked=false;
})

function equalsTo() {
    let sum = 0;
    numbersToCount.push(textBox.textContent.replace(`${char}`, ""))
    textBox.innerHTML = "";

    if (chosenMinus) {
        for (let i = 0; i < numbersToCount.length; i++) {
            sum = Number(numbersToCount[0]);
            if (i > 0)
                sum -= Number(numbersToCount[i]);
        }
        chosenMinus = false;
    } else if (chosenMultiply) {
        for (let i = 0; i < numbersToCount.length; i++) {
            sum = Number(numbersToCount[0]);
            if (i > 0)
                sum *= Number(numbersToCount[i]);
        }
        chosenMultiply = false;
    } else if (chosenDivide) {
        for (let i = 0; i < numbersToCount.length; i++) {
            sum = Number(numbersToCount[0]);
            if (i > 0)
                sum /= Number(numbersToCount[i]);
        }
        chosenDivide = false;
    }
    else if (chosenPlus) {
        for (let i = 0; i < numbersToCount.length; i++) {
            sum += Number(numbersToCount[i]);
        }
        chosenPlus = true;
    }
    textBox.innerHTML = `${sum}`;
    temp = sum;
    numbersToCount = [];
    btnValue = [];
}

plus.addEventListener('click', () => {
    char = '+';
    chosenPlus = true;
    chosenPlus = choseMath(char, chosenPlus)
})

minus.addEventListener('click', () => {
    char = '-';
    chosenMinus = true;
    chosenMinus = choseMath(char, chosenMinus);
})

multiply.addEventListener('click', () => {
    char = '*';
    chosenMultiply = true;
    chosenMultiply = choseMath(char, chosenMultiply)
})

divide.addEventListener('click', () => {
    char = '/';
    chosenDivide = true;
    chosenDivide = choseMath(char, chosenDivide);
})

erase.addEventListener('click', () => {
    let textBoxValue = textBox.textContent;
    let newValue = textBoxValue.substring(0, textBoxValue.length - 1);
    temp = newValue;
    if (textBox.textContent.length > 0) {
        textBox.innerHTML = "";
        textBox.innerHTML = temp;
    }
})

square.addEventListener('click', () => {
    let valueOne = textBox.textContent;
    Number(valueOne);
    let result = valueOne * valueOne;
    textBox.innerHTML = result;
})

function placeNumbersInOrder(i) {
    x++;
    if (x > 9) {
        x = 4;
        Y = true;
    }
    if (Y && x > 6) {
        x = 1;
        Y = false;
    }
    if (i > 7)
        x = 0;
}

dot.addEventListener('click', () => {
    dotClicked=true;
});

function choseMath(symbol, boolean) {
    if (temp != "") {
        equalsTo();
        textBox.innerHTML = "";
        textBox.innerHTML =`${temp}` + `${symbol}`;
        numbersToCount = [];
        numbersToCount.push(textBox.textContent.replace(`${symbol}`, ""))
    }
    else {
        numbersToCount.push(textBox.textContent.replace(`${symbol}`, ""));
        textBox.innerHTML = btnValue.join("") + `${symbol}`;
    }
    btnValue = [];
    return boolean = true;
}