// select items 
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const passwordCopied = document.getElementById('password-copied');

const aleatory = {
    lower: getAleatoryLower,
    upper: getAleatoryUpper,
    number: getAleatoryNumber,
    symbol: getAleatorySymbol
}

// clipboard
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password) {return;}

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    passwordCopied.innerHTML = 'Senha copiada com sucesso';
});

generate.addEventListener('click', () => {
    const length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;

    resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// generating password
function generatePassword(lower, upper, number, symbol, length) {

    // clearing copied password message
    passwordCopied.innerHTML = '';

    // clearing generated password
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    // Doesn't have a selected type
    if(typesCount === 0) {
        return '';
    }

    // create a loop
    for(let i=0; i<length; i+=typesCount){
        typesArr.forEach(type => {
            const functionName = Object.keys(type)[0];
            generatedPassword += aleatory[functionName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    // check if the password entered is greater than the maximum possible
    if(finalPassword.length > 32) {
        alert('Sua senha deve ter até 32 caracteres');
        return finalPassword = '';
    } else {
        return finalPassword;
    }
    
}

function getAleatoryLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getAleatoryUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getAleatoryNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getAleatorySymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}