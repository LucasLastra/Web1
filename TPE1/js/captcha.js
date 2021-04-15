function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let captchaNumber = getRndInteger(1000, 9999);

document.getElementById("captcha").innerHTML = captchaNumber;

