import { mostrarJuegos } from "./auxiliarFunctions.js";
import { getLocalStorage } from "./dataStorageManager.js";

// VARIABLES 

const listaDeJuegos = getLocalStorage('juegos');
const contenedorJuegos = document.getElementById('gamesContainer');
const buscarJuegos = document.getElementById('searchGames');
const inputJuego = document.getElementById('inputGames');

const accion = document.getElementById('btnAccion');
const fantasia = document.getElementById('btnFantasia');
const aventura = document.getElementById('btnAventura');
const terror = document.getElementById('btnTerror');
const animado = document.getElementById('btnAnimado');
const deporte = document.getElementById('btnDeporte');

const btnAllGames = document.getElementById('btnAllGames');

// Función para buscar juegos por texto 
const busquedaDeJuegos = (e) => {
    e.preventDefault();
    const juegoBuscado = listaDeJuegos.filter((juego) => juego.nombre.toLowerCase().includes(inputJuego.value.toLowerCase()));
    let mensaje = `<h3 class="order-first d-block text-center text-light fs-1 mb-5">Se muestran resultados de busqueda de '${inputJuego.value}'</h3>`;

    if (juegoBuscado.length !== 0) {
        if (juegoBuscado.length === listaDeJuegos.length) {
            // En caso que el usuario pulse buscar con el input vacio, se mostraran todos los juegos sin el mensaje 
            mostrarJuegos(listaDeJuegos,listaDeJuegos.length,contenedorJuegos);
        } else {
            mostrarJuegos(juegoBuscado,juegoBuscado.length,contenedorJuegos);
            contenedorJuegos.innerHTML += mensaje;
        }
        
    } else {
        contenedorJuegos.innerHTML = `<p class="text-center text-secondary display-6">No se encontro el juego buscado</p>`
        contenedorJuegos.innerHTML += mensaje;
    }

}

// Funcion para buscar juegos por generos 
const buscarJuegosPorGeneros = (generoBuscado) => {
    const generoJuego = listaDeJuegos.filter((juego) => juego.categoria === generoBuscado);
    let mensaje = `<h3 class="order-first d-block text-center text-light fs-1 mb-5">Se muestran juegos de <span class="text-info text-uppercase fw-bold">${generoBuscado}</span></h3>`;
    
    if (generoJuego.length === 0) {
        contenedorJuegos.innerHTML = `<p class="text-center text-secondary display-6">No se encontraron juegos que coincidan con '${generoBuscado}'</p>`
        contenedorJuegos.innerHTML += mensaje;

        btnAllGames.classList.remove('d-none')

    } else {
        mostrarJuegos(generoJuego,generoJuego.length,contenedorJuegos);
        contenedorJuegos.innerHTML += mensaje;

        btnAllGames.classList.remove('d-none')
    }

}

// Mostramos todos los juegos guardados en el localStorage
mostrarJuegos(listaDeJuegos, listaDeJuegos.length, contenedorJuegos);

window.verDetalle = (codigoDeJuego) => {
    window.location.href = './detalleJuego.html?codigo=' + codigoDeJuego;
}

buscarJuegos.addEventListener('submit',busquedaDeJuegos);

accion.addEventListener('click', ()=> buscarJuegosPorGeneros('Accion'));
fantasia.addEventListener('click', ()=> buscarJuegosPorGeneros('Fantasia'));
aventura.addEventListener('click', ()=> buscarJuegosPorGeneros('Aventura'));
terror.addEventListener('click', ()=> buscarJuegosPorGeneros('Terror'));
animado.addEventListener('click', ()=> buscarJuegosPorGeneros('Animado'));
deporte.addEventListener('click', ()=> buscarJuegosPorGeneros('Deporte'));

btnAllGames.addEventListener('click', () => {
    mostrarJuegos(listaDeJuegos,listaDeJuegos.length,contenedorJuegos);
    btnAllGames.classList.add('d-none')
})

