"use strict"

let dataBandas = [
    {
        radiohead: {
            genero: "Rock",
            banda: "Radiohead",
            discografia: ["In Rainbows", "Hail to the Thief"]
        }
    },
    {
        redhot: {
            genero: "Funk",
            banda: "Red Hot Chili Peppers",
            discografia: ["I'm with You", "The Getaway"]
        }
    },
    {
        metallica: {
            genero: "Thrash",
            banda: "Metallica",
            discografia: ["St. Anger", "Death Magnetic", "Hardwired... to Self-Destruct"]
        }
    },
    {
        divididos: {
            genero: "rock",
            banda: "divididos",
            discografia: ["El narigon del siglo", "amapola del 66"]
        }
    },
    {
        piojos: {
            genero: "rock",
            banda: "Los Piojos",
            discografia: ["Azul", "3er arco", "Ay ay ay"]
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
            if (data.pokemon == true) {
                htmlBandas += `<tr>
                <td><mark>${data.genero}</mark></td>
                <td><mark>${data.banda}</mark></td>
                <td><mark>${data.discografia}</mark></td>
               </tr>`;
            } else {
                htmlBandas += `<tr>
                <td>${data.genero}</td>
                <td>${data.banda}</td>
                <td>${data.discografia}</td>
               </tr>`;
            }
        }
    }
    document.querySelector("#tablaBandas").innerHTML = htmlBandas;
}

let bandsToAdd = [];

function loadData() {
    let genre = document.getElementById("genre").value;
    let band = document.getElementById("band").value;
    let disc = document.getElementById("disc").value;
    let standBy = document.querySelector("#bandsToAdd");
    standBy.innerHTML += `<li>${genre}, ${band}, ${disc}</li>`;

    let newObj = {};

    newObj[band] = {
        genero: genre,
        banda: band,
        discografia: [disc]
    }
    bandsToAdd.push(newObj);
    standBy.classList.remove("hide");
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
            discografia: abilities,
            pokemon: true
        }
        pokemonsToAdd.push(newObj);
    }
    dataBandas = [...dataBandas, ...pokemonsToAdd];
    fillTable();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
