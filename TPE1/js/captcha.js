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

let captchaConfirm = document.getElementById("captchaConfirm");

document.querySelector("#captchaField").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    document.querySelector("#captchaButton").click();
    event.preventDefault();
});

function checkCaptcha() {

    let captchaField = document.getElementById("captchaField");
    console.log(captchaField.value);

    captchaConfirm.removeAttribute("class", "hide");
    if (captchaField.value == captchaNumber) {
        
        captchaConfirm.setAttribute("class","success-msj");
        captchaConfirm.innerHTML = "¡Mensaje enviado exitosamente!";
    } else {
        captchaField.parentNode.insertBefore(captchaConfirm, captchaField);
        captchaField.setAttribute("class", "error input");
        captchaConfirm.setAttribute("class","error-msj");
        captchaConfirm.innerHTML = "Captcha Incorrecto";
        
    }
    captchaField.value = "";
    setTimeout(function() {
        captchaField.setAttribute("class", "input");
        captchaConfirm.setAttribute("class", "hide");
        setCaptchaNumber();

    }, 3000);

}