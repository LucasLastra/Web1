"use strict"

let dataBandas = [
    {
        divididos: {
            genero: "rock",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    },
    {
        divididos1: {
            genero: "pop",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    },
    {
        divididos2: {
            genero: "rock",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    },
    {
        divididos3: {
            genero: "rock",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    },
    {
        divididos4: {
            genero: "metal",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    },
    {
        divididos5: {
            genero: "pop",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    },
    {
        divididos6: {
            genero: "metal",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    }
];

document.getElementById("discosButton").addEventListener("click", loadData);

document.getElementById("discosButtonSend").addEventListener("click", () => {
    dataBandas = [...dataBandas, ...bandsToAdd];
    fillTable();
    bandsToAdd = [];
    document.querySelector("#bandsToAdd").innerHTML = '';
});

document.getElementById("discosButtonDelete").addEventListener("click", () => {
    dataBandas = [];
    fillTable();
});

fillTable();

function fillTable() {
    let htmlBandas = '';

    for (const banda of dataBandas) {
        for (const key in banda) {
            let data = banda[key];
            htmlBandas += `<tr>
                        <td>${data.genero}</td>
                        <td>${data.banda}</td>
                        <td>${data.discografia}</td>
                       </tr>`;
        }
    }

    document.querySelector("#tablaBandas").innerHTML = htmlBandas;
}

let bandsToAdd = [];

function loadData() {
    let genre = document.getElementById("genre").value;
    let band = document.getElementById("band").value;
    let disc = document.getElementById("disc").value;

    document.querySelector("#bandsToAdd").innerHTML += band + ',';

    let newObj = {};

    newObj[band] = {
        genero: genre,
        banda: band,
        discografia: [disc]
    }

    bandsToAdd.push(newObj);
}
