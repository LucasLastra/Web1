"use strict"

function captcha() {

    //Event listener al clickear boton de formulario
    document.getElementById("captchaButton").addEventListener("click", checkCaptcha);

    let captchaNumber;

    //Funcion que obtiene un numero entero entre los valores enviados por parametros
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //Funcion para crear y mostrar el "captcha"
    function setCaptchaNumber() {
        captchaNumber = getRndInteger(1000, 9999);
        document.getElementById("captcha").innerHTML = captchaNumber;
    };

    setCaptchaNumber();

    //Funcion para habilitar el envio de captcha con tecla "enter"
    document.querySelector("#captchaField").addEventListener("keyup", event => {
        if (event.key !== "Enter") return;
        document.querySelector("#captchaButton").click();
        event.preventDefault();
    });

    //Funcion para validar si el captcha es correcto y mostrar mensaje de error o de exito
    function checkCaptcha() {
        let captchaField = document.getElementById("captchaField");
        let captchaMsg = document.getElementById("captchaMsg");

        captchaMsg.classList.remove("hide");
        if (captchaField.value == captchaNumber) {
            document.getElementById("formContacto").reset();
            captchaMsg.classList.add("successMsg");
            captchaMsg.innerHTML = "¡Mensaje enviado exitosamente!";
        } else {
            captchaField.classList.add("error");
            captchaMsg.classList.add("errorMsg");
            captchaMsg.innerHTML = "Captcha Incorrecto";
        }
        captchaField.value = "";

        //Mostrar el mensaje por 3 segundos y reiniciar el captcha
        setTimeout(function () {
            captchaField.classList.remove("error");
            captchaMsg.className = "hide";
            setCaptchaNumber();
        }, 3000);
    }
}