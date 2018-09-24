document.getElementById("get-jokes").addEventListener("click", function (e) {
    e.preventDefault()
    const ui = new UI
    const character = new Character

    ui.numberOfJokes = document.getElementById("number")
    character.firstName = document.getElementById("firstName")
    character.lastName = document.getElementById("lastName")
    if (ui.numberOfJokes.value === "" || character.firstName.value === "" || character.lastName.value === "") {
        console.log("ERROR")
        ui.errorWithTimeout("MR. NORRIS DEMMANDS THAT FIELDS AREN'T EMPTY", "error")
    } else {
        const url = "http://api.icndb.com/jokes/random/" + ui.numberOfJokes.value + `?firstName=${firstName.value}&lastName=${lastName.value}`
        console.log(url)
        ui.printJokesFromURL(url, ui.numberOfJokes)
        ui.clearInput();
    }
})
document.getElementById("get-refresh").addEventListener("click", function (e) {
    window.location.reload()
}
)
class UI {

    constructor(numberOfJokes) {
        this.numberOfJokes = numberOfJokes
    }
    errorWithTimeout(message, className) {

        //create DIV element
        const div = document.createElement('div')
        div.className = `alert ${className} amber darken-4 center`;
        div.innerHTML = `<b>${message}</b><br>`;
        //Get PArent to insert node
        const container = document.querySelector(".container");
        const form = document.getElementById("jokes");
        container.insertBefore(div, form);
        //Delete Alert after 3secs
        setTimeout(function () {
            document.querySelector(".alert").remove();

        }, 3000);

    }
    clearInput() {
        let a = document.getElementById("number");
        let b = document.getElementById("firstName");
        let c = document.getElementById("lastName");
        a.value = "";
        b.value = "";
        c.value = "";
    }
    printJokesFromURL(url, numberOfJokes) {

        const xhr = new XMLHttpRequest(); // is an embedded HTTP Request a good approach within a class?
        xhr.open("GET", url, true);

        xhr.onload = function () {

            if (this.status === 200) {
                const jokesInJSON = this.responseText
                let jokes = JSON.parse(jokesInJSON)
                const list = document.querySelector(".jokes");
                jokes['value'].forEach(element => {

                    const joke = document.createElement("li");
                    joke.className = "card-panel red lighten-2"
                    joke.innerHTML = `${element["joke"]}`
                    list.appendChild(joke)
                });
            }
        }
        xhr.send();
    }
}
class Character {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

/**
 * 
 * Proyecto: Modificar el acceso al API de ChuckNorris para aceptar Nombre y Apellido
y generar chistes con el nombre y apellido indicados
Adicionalmente usar Materialize CSS
y, que se pongan creativos con la pagina 
Crear OBJETO personaje y Objeto UI
 * 
 */