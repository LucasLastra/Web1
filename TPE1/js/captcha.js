function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let captchaNumber = getRndInteger(1000, 9999);

document.getElementById("captcha").innerHTML = captchaNumber;

document.getElementById("captchaButton").addEventListener("click", checkCaptcha);

let captchaError = document.getElementById("captchaError");

function checkCaptcha() {


    let captchaField = document.getElementById("captchaField");
    console.log(captchaField.value);

    if (captchaField.value == captchaNumber) {
        alert("Enviado exitosamente");
    } else {

        captchaField.parentNode.insertBefore(captchaError, captchaField);

        captchaField.setAttribute("class", "error");

        captchaError.innerHTML = "Captcha Incorrecto";

    }

    setTimeout(function() {
        captchaField.setAttribute("class", "");
        captchaError.remove()

    }, 3000);



}