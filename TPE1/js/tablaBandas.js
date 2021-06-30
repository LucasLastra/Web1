"use strict"
let url = "https://60d9dfbd5f7bf10017547810.mockapi.io/api/v1/bandas";

async function getBandas() {
    let htmlBandas = "";
    try {
        let respuesta = await fetch(url);
        if (respuesta.status == 200) {
            console.log("status OK");

            let arrayBandas = await respuesta.json();

            for (let i = 0; i < arrayBandas.length; i++) {
                if (arrayBandas[i].banda.pokemon == true) {
                    htmlBandas += `<tr>
                    <td><mark>${arrayBandas[i].banda.genero}</mark></td>
                    <td><mark>${arrayBandas[i].banda.nombre}</mark></td>
                    <td><mark>${arrayBandas[i].banda.discografia}</mark></td>
                   </tr>`;
                } else {
                    htmlBandas += `<tr>
                    <td>${arrayBandas[i].banda.genero}</td>
                    <td>${arrayBandas[i].banda.nombre}</td>
                    <td>${arrayBandas[i].banda.discografia}</td>
                   </tr>`;
                }
            }
            document.querySelector("#tablaBandas").innerHTML = htmlBandas;
        } else {
            console.log("error de conección");
        }
    } catch (error) {
        console.log(error);
    }
}
getBandas();


let bandsToAdd = [];
let pokemonsToAdd = [];
//Funcion para agregar nuevos datos a la tabla
function loadData() {
    let genre = document.getElementById("genre");
    let band = document.getElementById("band");
    let disc = document.getElementById("disc");
    //Compruebo si los campos no estan vacios
    if (genre.value == '') {
        genre.classList.add("error");
        setTimeout(() => { genre.classList.remove("error"); }, 3000);
    }
    else if (band.value == '') {
        band.classList.add("error");
        setTimeout(() => { band.classList.remove("error"); }, 3000);
    }
    else if (disc.value == '') {
        disc.classList.add("error");
        setTimeout(() => { disc.classList.remove("error"); }, 3000);
    } else {

        genre = genre.value;
        band = band.value;
        disc = disc.value;

        let standBy = document.querySelector("#bandsToAdd");
        standBy.innerHTML += `<li>${genre}, ${band}, ${disc}</li>`;

        let newObj = {};
        //Creo el nuevo objeto
        newObj["banda"] = {
            genero: genre,
            nombre: band,
            discografia: [disc]
        }
        //Lo guardo en un array de nuevos objetos
        bandsToAdd.push(newObj);
        standBy.classList.remove("hide");
        document.getElementById("formDiscos").reset();
    }
}

async function postBanda(bandsToAdd) {
    for (let i = 0; i < bandsToAdd.length; i++) {
        let nuevaBanda = {
            "banda": {
                "genero": bandsToAdd[i].banda.genero,
                "nombre": bandsToAdd[i].banda.nombre,
                "discografia": bandsToAdd[i].banda.discografia
            }
        }
        doRequest(url, "POST", nuevaBanda);
    }
    getBandas();
}

async function doRequest(url, method, body) {
    let data = {
        "method": method,
        "headers": { "Content-type": "application/json" }
    };
    if (body) {
        data['body'] = JSON.stringify(body);
    }
    try {
        let res = await fetch(url, data)
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function post3Pokemons() {
    await randomElem();
    postBanda(pokemonsToAdd);
    getBandas();
}

async function sendBandas(){
    postBanda(bandsToAdd);
    bandsToAdd = [];
    document.querySelector("#bandsToAdd").innerHTML = 'Cargando...';

    //CAMBIAR!!!
    setTimeout(() => {
        getBandas();
        document.querySelector("#bandsToAdd").innerHTML = '';
        document.querySelector("#bandsToAdd").classList.add('hide');
    }, 3000);
}

//Defino acciones de los botones
//Agregar un elemento
document.getElementById("discosButtonAdd").addEventListener("click", loadData);
//Agrega 3 elementos sorpresa y random
document.getElementById("discosButtonx3").addEventListener("click", post3Pokemons);
//Inserta los elementos a la tabla del arreglo de nuevos objetos para agregar
document.getElementById("discosButtonSend").addEventListener("click", sendBandas);


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

    pokemonsToAdd = [];
    //Con los datos de la pokeapi creo un nuevo objeto y lo agrego a la tabla 
    for (const almostPokemon of pokemons) {
        let pokemon = await almostPokemon.json();
        let abilities = pokemon.abilities.map(e => e.ability.name);

        let newObj = {};

        newObj["banda"] = {
            genero: pokemon.types[0].type.name,
            nombre: pokemon.name,
            discografia: abilities,
            pokemon: true
        }
        pokemonsToAdd.push(newObj);
    }
}
//Funcion para obtener un numero random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
