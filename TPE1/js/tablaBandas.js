"use strict"

//Definir arreglo estatico

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

//Defino acciones de los botones
//Agregar un elemento
document.getElementById("discosButtonAdd").addEventListener("click", loadData);
//Agrega 3 elementos sorpresa y random
document.getElementById("discosButtonx3").addEventListener("click", randomElem);
//Inserta los elementos a la tabla del arreglo de nuevos objetos para agregar
document.getElementById("discosButtonSend").addEventListener("click", () => {
    dataBandas = [...dataBandas, ...bandsToAdd];
    fillTable();
    bandsToAdd = [];
    document.querySelector("#bandsToAdd").innerHTML = '';
    document.querySelector("#bandsToAdd").classList.add('hide');
});
//Eliminar elementos de la tabla
document.getElementById("discosButtonDelete").addEventListener("click", () => {
    dataBandas = [];
    fillTable();
});

//Genero y meustro la tabla cuando se muestra la pagina
fillTable();

//Funcion para generar y mostrar la tabla
function fillTable() {
    let htmlBandas = '';

    //recorro el arreglo y sus objetos y creo las filas de la tabla
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
    //Lo dibujo en pantalla
    document.querySelector("#tablaBandas").innerHTML = htmlBandas;
}

let bandsToAdd = [];
//Funcion para agregar nuevos datos a la tabla
function loadData() {
    let genre = document.getElementById("genre");
    let band = document.getElementById("band");
    let disc = document.getElementById("disc");
    //Compruebo si los campos no estan vacios
    if (genre.value == '') {
        genre.classList.add("error");
        setTimeout(() => {genre.classList.remove("error");}, 3000);
    }
    else if (band.value == '') {
        band.classList.add("error");
        setTimeout(() => {band.classList.remove("error");}, 3000);
    }
    else if (disc.value == '') {
        disc.classList.add("error");
        setTimeout(() => {disc.classList.remove("error");}, 3000);
    } else {

        genre = genre.value;
        band = band.value;
        disc = disc.value;

        let standBy = document.querySelector("#bandsToAdd");
        standBy.innerHTML += `<li>${genre}, ${band}, ${disc}</li>`;

        let newObj = {};
        //Creo el nuevo objeto
        newObj[band] = {
            genero: genre,
            banda: band,
            discografia: [disc]
        }
        //Lo guardo en un array de nuevos objetos
        bandsToAdd.push(newObj);
        standBy.classList.remove("hide");
        document.getElementById("formDiscos").reset();
    }
}
//Funcion para agregar 3 elementos random a la tabla
async function randomElem() {
    let pokemons = [];
    for (let index = 0; index < 3; index++) {
        //Elijo un numero al azar entre los primeros 150
        let pokemon = getRndInteger(1, 150);
        //Y traigo desde la pokeapi ese pokemon
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
    //Con los datos de la pokeapi creo un nuevo objeto y lo agrego a la tabla 
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
//Funcion para obtener un numero random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
