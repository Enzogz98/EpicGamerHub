import { getLocalStorage, insertSessionStorage } from "./dataStorageManager.js";
import { desencriptarContrasenia, key } from "./auxiliarFunctions.js";
import { limpiarFormularios } from "./auxiliarFunctions.js";

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const contrasenia = document.getElementById("contrasenia").value;

    const usuarios = getLocalStorage("usuarios");

    const usuario = usuarios.find((user) => user.correo === correo);

    if (!usuario) {
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas. Verifica tu correo electrónico y contraseña.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    const contraseniaDesencriptada = desencriptarContrasenia(
      usuario.contrasenia,
      key
    );

    if (contrasenia === contraseniaDesencriptada) {
      insertSessionStorage("sesion", usuario);
      if (usuario.rol === "administrador") {
        Swal.fire({
          title: "Inicio de sesión exitoso!",
          text: `Bienvenido ${usuario.usuario}`,
          icon: "success",
          confirmButtonText: "Aceptar",
          willClose: () => {
            window.location.href =
              window.location.origin + "/pages/administrador.html";
          },
        });
      } else {
        Swal.fire({
          title: "Inicio de sesión exitoso!",
          text: `Bienvenido ${usuario.usuario}`,
          icon: "success",
          confirmButtonText: "Aceptar",
          willClose: () => {
            window.location.href = window.location.origin + "/index.html";
          },
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Contraseña incorrecta. Intentalo nuevamente",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      limpiarFormularios(document.getElementById("loginForm"));
      return false;
    }
  });
