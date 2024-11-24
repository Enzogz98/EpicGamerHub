import {
  getSessionStorage,
  removeSessionStorage,
} from "./dataStorageManager.js";

const user = getSessionStorage("sesion");

const opcionesUser = document.getElementById("opcionesUser");
const opcionesAdmin = document.getElementById("opcionesAdmin");
const ocultarAdmin = document.querySelectorAll(".ocultarAdmin");
const btnCerrarSesion = document.querySelector("#btnCerrarSesion");

const usuarioLogueado = () => {
  if (user) {
    opcionesUser.children[0].classList.add("d-none");
    opcionesUser.children[1].classList.add("d-none");
    opcionesUser.children[2].classList.remove("d-none");
    opcionesUser.children[3].classList.remove("d-none");
    opcionesUser.children[2].children[0].value = user.usuario;
    if (user.rol === "administrador") {
      for (let i = 0; i < ocultarAdmin.length; i++) {
        ocultarAdmin[i].classList.add("d-none");
      }
      opcionesAdmin.classList.remove("d-none");
    }
  }
};

const cerrarSesion = () => {
  opcionesUser.children[0].classList.remove("d-none");
  opcionesUser.children[1].classList.remove("d-none");
  opcionesUser.children[2].classList.add("d-none");
  opcionesUser.children[3].classList.add("d-none");
  if (user.rol === "administrador") {
    for (let i = 0; i < ocultarAdmin.length; i++) {
      ocultarAdmin[i].classList.remove("d-none");
    }
    opcionesAdmin.classList.add("d-none");
  }

  removeSessionStorage("sesion");
  window.location.href = window.location.origin + "/index.html";
};

btnCerrarSesion.addEventListener("click", cerrarSesion);
usuarioLogueado();
