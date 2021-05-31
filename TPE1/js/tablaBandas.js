"use strict"

let dataBandas = {
    divididos: {
        genero: "rock",
        banda: "divididos",
        discografia: ["El narigon del siglo", "amapola del 66"]
    },
    divididos1: {
        genero: "pop",
        banda: "divididos",
        discografia: ["El narigon del siglo", "amapola del 66"]
    },
    divididos2: {
        genero: "rock",
        banda: "divididos",
        discografia: ["El narigon del siglo", "amapola del 66"]
    },
    divididos3: {
        genero: "rock",
        banda: "divididos",
        discografia: ["El narigon del siglo", "amapola del 66"]
    },
    divididos4: {
        genero: "metal",
        banda: "divididos",
        discografia: ["El narigon del siglo", "amapola del 66"]
    },
    divididos5: {
        genero: "pop",
        banda: "divididos",
        discografia: ["El narigon del siglo", "amapola del 66"]
    },
    divididos6: {
        genero: "metal",
        banda: "divididos",
        discografia: ["El narigon del siglo", "amapola del 66"]
    }
};

document.getElementById("discosButton").addEventListener("click", loadData);
document.getElementById("discosButtonSend").addEventListener("click", addBands);

fillTable();

function fillTable() {
    let htmlBandas = '';

    for (const banda in dataBandas) {
        let data = dataBandas[banda];
        htmlBandas += `<tr>
                        <td>${data.genero}</td>
                        <td>${data.banda}</td>
                        <td>${data.discografia}</td>
                       </tr>`;
    }
    document.querySelector("#tablaBandas").innerHTML = htmlBandas;
}

let bandsToAdd = [];

function loadData() {
    let genre = document.getElementById("genre").value;
    let band = document.getElementById("band").value;
    let disc = document.getElementById("disc").value;

    document.querySelector("#bandsToAdd").innerHTML += band;

    bandsToAdd[band] = {
        genero: genre,
        banda: band,
        discografia: [disc]
    };
}

function addBands() {

    for (const band in bandsToAdd) {
        if (dataBandas[band]) {
            dataBandas[band].genero = bandsToAdd[band].genero;
            dataBandas[band].discografia.push(bandsToAdd[band].discografia);
        } else {
            dataBandas[band] = {

                genero: bandsToAdd[band].genero,
                banda: band,
                discografia: bandsToAdd[band].discografia

            };
        }
    }

    fillTable();
}


