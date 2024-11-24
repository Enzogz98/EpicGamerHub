import { getLocalStorage } from "./dataStorageManager.js";

let d = document;

const parametroURL = new URLSearchParams(window.location.search);
const codigoDeJuego = parametroURL.get("codigo");

const listaDeJuegos = getLocalStorage("juegos");
const juego = listaDeJuegos.find(
  (elemento) => elemento.codigo === codigoDeJuego
);

let renderizarJuego = (juego) => {
    //Componentes para hacer el renderizado dinamico
    let tituloJuego = d.getElementById('tituloJuego')
    let imagenJuego = d.getElementById('imagenJuego');
    let desarrolladorJuego = d.getElementById('desarrolladorJuego');
    let precioJuego = d.getElementById('precioJuego');
    let descripcionJuego = d.getElementById('descripcionJuego');
    let categoriaJuego = d.getElementById('categoriaJuego');
    let sistemaOperativoJuegoM = d.getElementById('sistemaOperativoJuegoM');
    let procesadorM= d.getElementById('procesadorM');
    let ramM= d.getElementById('ramM');
    let tarjetaGraficaM= d.getElementById('tarjetaGraficaM');
    let espacioM= d.getElementById('espacioM');

    let sistemaOperativoJuegoR= d.getElementById('sistemaOperativoJuegoR');
    let procesadorR= d.getElementById('procesadorR');
    let ramR= d.getElementById('ramR');
    let tarjetaGraficaR= d.getElementById('tarjetaGraficaR');
    let espacioR= d.getElementById('espacioR');

    if(juego){
        tituloJuego.textContent = juego.nombre
        imagenJuego.src = juego.imagen
        desarrolladorJuego.textContent = juego.desarrollador
        precioJuego.textContent = `$${juego.precio }`
        desarrolladorJuego.textContent = juego.desarrollador
        descripcionJuego.textContent = juego.descripcion 
        categoriaJuego.textContent = juego.categoria

        sistemaOperativoJuegoM.textContent = juego.requisitosMinimos.sistemaOperativo
        procesadorM.textContent = juego.requisitosMinimos.procesador
        ramM.textContent = juego.requisitosMinimos.ram
        tarjetaGraficaM.textContent = juego.requisitosMinimos.tarjetaGrafica
        espacioM.textContent = juego.requisitosMinimos.almacenamiento


        sistemaOperativoJuegoR.innerText = juego.requisitos.sistemaOperativo
        procesadorR.innerText = juego.requisitos.procesador
        ramR.innerText = juego.requisitos.ram
        tarjetaGraficaR.innerText = juego.requisitos.tarjetaGrafica
        espacioR.innerText = juego.requisitos.almacenamiento

    }
}

//Renderizar el juego
renderizarJuego(juego);
