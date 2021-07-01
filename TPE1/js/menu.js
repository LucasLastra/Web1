"use strict";
document.querySelector(".menu").addEventListener("click", toggleMenu)

function toggleMenu(){
    document.querySelector(".navbar").classList.toggle("display-flex");
    document.querySelector(".navbar").classList.toggle("hide");
}