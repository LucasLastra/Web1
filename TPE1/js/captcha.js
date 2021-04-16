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
        captchaField.value = "";
    } else {
        captchaField.parentNode.insertBefore(captchaError, captchaField);
        captchaField.setAttribute("class", "error input");
        captchaError.removeAttribute("class", "hide");
        captchaError.setAttribute("class","error-msj");
        captchaError.innerHTML = "Captcha Incorrecto";
        captchaField.value = "";
    }
    setTimeout(function() {
        captchaField.setAttribute("class", "input");
        captchaError.setAttribute("class", "hide");
        setCaptchaNumber();

    }, 3000);

}