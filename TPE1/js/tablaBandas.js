"use strict"
function tablaBandas() {

    const url = "https://60d9dfbd5f7bf10017547810.mockapi.io/api/v1/bandas";

    //Defino acciones de los botones
    //Agregar un elemento
    document.getElementById("discosButtonAdd").addEventListener("click", loadData);

    //Agregar varios elementos aleatorios
    document.getElementById("discosButtonx3").addEventListener("click", sendX3);

    //Inserta los elementos a la tabla del arreglo de nuevos objetos para agregar
    document.getElementById("discosButtonSend").addEventListener("click", sendBandas);

    // Filtro y search
    document.getElementById("filterSearch").addEventListener("keyup", filterSearch);

    //Genero y muestro la tabla cuando se muestra la pagina
    fillTable();

    //Funcion para generar y mostrar la tabla
    async function fillTable() {
        let htmlBandas = '';
        let tablaBandasDOM = document.querySelector("#tablaBandas");
        tablaBandasDOM.innerHTML = "";

        try {
            let respuesta = await doRequest(url, "GET");
            if (respuesta.status == 200) {
                console.log("status OK");

                let dataBandas = await respuesta.json();

                //recorro el arreglo y sus objetos y creo las filas de la tabla
                for (const banda of dataBandas) {
                    let row = document.createElement("tr");
                    for (const key in banda) {
                        let data = banda[key];
                        if (data.pokemon == true) {
                            htmlBandas += `<tr>
                        <td><mark>${data.genero}</mark></td>
                        <td><mark>${data.nombre}</mark></td>
                        <td><mark>${data.discografia}</mark></td>
                        </tr>`;
                        } else {
                            htmlBandas = `
                        <td>${data.genero}</td>
                        <td>${data.nombre}</td>
                        <td>${data.discografia}</td>
                        `;
                        }
                        row.innerHTML = htmlBandas;
                        let buttonEdit = document.createElement("td");
                        buttonEdit.appendChild(createButton(banda.id, "edit"));
                        let buttonDelete = document.createElement("td");
                        buttonDelete.appendChild(createButton(banda.id, "delete"));
                        row.appendChild(buttonEdit);
                        row.appendChild(buttonDelete);
                        tablaBandasDOM.appendChild(row);
                    }
                }
            } else {
                console.log("error de conexion");
            }
        } catch (error) {
            console.log(error);
        }
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

    async function postBandas(bandsToAdd) {

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
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async function sendBandas() {

        if (bandsToAdd == "") {
            document.querySelector("#bandsToAdd").classList.toggle('hide');
            document.querySelector("#bandsToAdd").innerHTML = 'Primero debes agregar bandas!';
        } else {
            postBandas(bandsToAdd);
            bandsToAdd = [];
            document.querySelector("#bandsToAdd").innerHTML = 'Cargando...';
        }
        setTimeout(() => {
            fillTable();
            document.querySelector("#bandsToAdd").innerHTML = '';
            document.querySelector("#bandsToAdd").classList.add('hide');
        }, 3000);
    }

    function sendX3() {
        //suponer que son bandas aleatorias
        let bandasAleatorias = [
            {
                "banda": {
                    "genero": "rock",
                    "nombre": "Los Piojos",
                    "discografia": [
                        "Azul",
                        "3er arco",
                        "Ay ay ay"
                    ]
                }
            },
            {
                "banda": {
                    "genero": "rock",
                    "nombre": "divididos",
                    "discografia": [
                        "El narigon del siglo",
                        "amapola del 66"
                    ]
                }
            },
            {
                "banda": {
                    "genero": "Thrash",
                    "nombre": "Metallica",
                    "discografia": [
                        "St. Anger",
                        "Death Magnetic",
                        "Hardwired... to Self-Destruct"
                    ]
                }
            },
            {
                "banda": {
                    "genero": "Funk",
                    "nombre": "Red Hot Chili Peppers",
                    "discografia": [
                        "I'm with You",
                        "The Getaway"
                    ]
                }
            },
            {
                "banda": {
                    "genero": "Rock",
                    "nombre": "Radiohead",
                    "discografia": [
                        "In Rainbows",
                        "Hail to the Thief"
                    ]
                }
            }
        ]
        for (let i = 0; i < 3; i++) {
            bandsToAdd.push(bandasAleatorias[
                Math.floor(Math.random() * bandasAleatorias.length)
            ])
        }
        sendBandas();
    }

    function filterSearch() {

        var input, filter, table, tr, td, i, j, txtValue;
        input = document.getElementById("filterSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("tablaBandas");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < 3; j++) {
                if (td[j]) {
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        if (i < tr.length - 1) {
                            i++;
                        }
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }

    function createButton(name, action) {

        let button = document.createElement("button");
        button.name = name;
        button.classList.add("button");
        button.innerHTML = action;
        if (action === "edit") {
            button.addEventListener('click', editRow);
        }
        if (action === "delete") {
            button.addEventListener('click', deleteRow);
        }
        return button;
    }

    async function editRow() {

        let input = document.createElement("input");
        let buttonSend = document.createElement("button");

        this.disabled = true;
        let id = this.name;

        let response = await doRequest(url + `/${id}`, "GET");
        let banda = await response.json();
        let contador = 0;

        while (contador < banda['banda'].discografia.length) {
            input.value += banda['banda'].discografia[contador] + ",";
            contador++;
        }

        input.classList.add("input");
        await this.parentNode.previousElementSibling.replaceWith(input);

        buttonSend.classList.add("button");
        buttonSend.innerHTML = "SEND";
        buttonSend.addEventListener('click', () => {

            banda['banda'].discografia = [input.value];
            doRequest(url + `/${id}`, "PUT", banda);
            fillTable();
        });

        input.parentNode.insertBefore(buttonSend, input);
    }

    async function deleteRow() {

        let id = this.name;
        let response = await doRequest(url + `/${id}`, "DELETE");

        if (response.ok) {
            fillTable();
        }
    }

}