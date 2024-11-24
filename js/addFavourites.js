import { getLocalStorage, insertLocalStorage } from "./dataStorageManager.js";
import {
  crearCardFavorito,
  cargaInicialDeFavoritos,
} from "./auxiliarFunctions.js";

const listaJuegos = getLocalStorage("juegos");
const listaFavoritos = getLocalStorage("favoritos");

const parametroURL = new URLSearchParams(window.location.search);
const codigoDeJuego = parametroURL.get("codigo");

const btnAgregarFavorito = document.getElementById("btnAgregarFavorito"),
  btnFavoritos = document.getElementById("btnFavoritos");
const offCanvas = new bootstrap.Offcanvas(
  document.getElementById("offcanvasFavoritos")
);

const agregarFavorito = () => {
  const juego = listaJuegos.find((game) => game.codigo === codigoDeJuego);
  const parraFav = document.querySelector(".parraFav");

  if (parraFav) {
    parraFav.classList.add("d-none");
  }

  if (validarJuego(codigoDeJuego)) {
    listaFavoritos.push(juego);
    insertLocalStorage("favoritos", listaFavoritos);
    crearCardFavorito(juego);
    Swal.fire({
      title: "Enhorabuena!",
      text: `${juego.nombre} se añadio a favoritos con éxito`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }
};

const validarJuego = (codigo) => {
  if (listaFavoritos.length !== 0) {
    const juegoBuscado = listaFavoritos.find((game) => game.codigo === codigo);
    if (juegoBuscado) {
      Swal.fire({
        title: "Ups!",
        text: "Ya agregaste este juego a favoritos",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

const abrirCanvas = () => {
  offCanvas.show();
};

window.verDetalle = (codigoDeJuego) => {
  window.location.href =
    window.location.origin + "/pages/detalleJuego.html?codigo=" + codigoDeJuego;
};

window.eliminarFavorito = (codigo) => {
  const posicionJuego = listaFavoritos.findIndex(
    (game) => game.codigo === codigo
  );
  listaFavoritos.splice(posicionJuego, 1);
  insertLocalStorage("favoritos", listaFavoritos);
  const canvas = document.querySelector(".listaFavoritos-container");
  canvas.removeChild(canvas.children[posicionJuego]);
  cargaInicialDeFavoritos(listaFavoritos);
};


btnAgregarFavorito.addEventListener("click", agregarFavorito);
btnFavoritos.addEventListener("click", abrirCanvas);

cargaInicialDeFavoritos(listaFavoritos);
