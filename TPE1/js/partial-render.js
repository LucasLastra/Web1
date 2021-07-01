"use strict";

window.history.pushState("home", "home", "home");

async function partialRender(url){

    let r = await fetch(url);
    let html = await r.text();
    let content = document.getElementById("section");
    
    content.innerHTML = html;
    if(url == 'contactanos.html'){
        captcha();
    }
    if(url == 'bandas.html'){
        tablaBandas();
    }
}
let home = document.getElementById("home");
let bandas = document.getElementById("bandas");
let contactanos = document.getElementById("contactanos");

home.addEventListener("click", () => {
    partialRender("home.html");
    document.getElementById(window.location.pathname.split("/")[1]).classList.remove('activa');
    window.history.pushState("home", "home", "home");
    document.getElementById(window.location.pathname.split("/")[1]).classList.add('activa');
});

bandas.addEventListener("click", () => {
    partialRender("bandas.html");
    document.getElementById(window.location.pathname.split("/")[1]).classList.remove('activa');
    window.history.pushState("bandas", "bandas", "bandas");
    document.getElementById(window.location.pathname.split("/")[1]).classList.add('activa');
    
});

contactanos.addEventListener("click", () => {
    partialRender("contactanos.html");
    document.getElementById(window.location.pathname.split("/")[1]).classList.remove('activa');
    window.history.pushState("contactanos", "contactanos", "contactanos");
    document.getElementById(window.location.pathname.split("/")[1]).classList.add('activa');
});

partialRender("home.html");