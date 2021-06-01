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
document.getElementById("discosButtonx3").addEventListener("click", randomElem);

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

async function randomElem() {

    let pokemons = [];

    for (let index = 0; index < 3; index++) {
        let pokemon = getRndInteger(1, 150);
        pokemons.push(
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        );
    }

    let pokemonsToAdd = [];

    for (const almostPokemon of pokemons) {
        let pokemon = await almostPokemon.json();
        let abilities = pokemon.abilities.map(e => e.ability.name);

        let newObj = {};

        newObj[pokemon.name] = {
            genero: pokemon.types[0].type.name,
            banda: pokemon.name,
            discografia: abilities
        }

        pokemonsToAdd.push(newObj);
    }

    dataBandas = [...dataBandas, ...pokemonsToAdd];
    fillTable();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
