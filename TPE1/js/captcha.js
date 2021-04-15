document.getElementById("captchaButton").addEventListener("click", checkCaptcha);

let captchaNumber;

function setCaptchaNumber() {
    captchaNumber = getRndInteger(1000, 9999);
    document.getElementById("captcha").innerHTML = captchaNumber;
};

setCaptchaNumber();

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let captchaError = document.getElementById("captchaError");

document.querySelector("#captchaField").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    document.querySelector("#captchaButton").click();
    event.preventDefault();
});

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
        setCaptchaNumber();

    }, 3000);

}