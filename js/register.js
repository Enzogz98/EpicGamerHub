import Usuario from "./clases/classUsuario.js";
import {
  validarTexto,
  validarContrasenia,
  validarEmail,
  validarCheckBox,
} from "./formValidation.js";

import { insertLocalStorage, getLocalStorage } from "./dataStorageManager.js";
import {
  limpiarFormularios,
  key,
  encriptarContrasenia,
} from "./auxiliarFunctions.js";

const email = document.querySelector("#correoRegister"),
  username = document.querySelector("#username"),
  contrasenia = document.querySelector("#contraseniaRegister"),
  contrasenia2 = document.querySelector("#contraseniaRegisterConfirm"),
  termCondiciones = document.querySelector("#checkboxRegister"),
  nombre = document.querySelector("#name");

const formRegister = document.querySelector("#formRegister");
const usuarios = getLocalStorage("usuarios");

const crearUsuario = (e) => {
  e.preventDefault();
  if (
    validarContrasenia(contrasenia) &&
    validarContrasenia(contrasenia2) &&
    validarTexto(email, 10, 320) &&
    validarTexto(username, 3, 50) &&
    validarUsuario(username.value) &&
    validarTexto(nombre, 3, 200) &&
    validarEmail(email) &&
    validarEmailRegistrado(email.value) &&
    validarCheckBox(termCondiciones)
  ) {
    if (contrasenia.value === contrasenia2.value) {
      const contraseniaEncriptada = encriptarContrasenia(
        contrasenia.value,
        key
      );
      const user = new Usuario(
        undefined,
        username.value,
        nombre.value,
        email.value,
        contraseniaEncriptada,
        "invitado"
      );
      usuarios.push(user);
      insertLocalStorage("usuarios", usuarios);
      limpiarFormularios(formRegister);
      Swal.fire({
        title: "Usuario registrado!",
        text: "El usuario se registro exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        willClose: () => {
          window.location.href = window.location.origin + "/pages/login.html";
        },
      });
    }
  }
};

const validarUsuario = (usuario) => {
  const usuarioBuscado = usuarios.find((user) => user.usuario === usuario);
  if (usuarioBuscado) {
    Swal.fire({
      title: "Error",
      text: "Ya existe el nombre de usuario que ingresaste, por favor elige otro nombre de usuario",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  } else {
    return true;
  }
};

const validarEmailRegistrado = (email) => {
  const usuarioBuscado = usuarios.find((user) => user.correo === email);
  if(usuarioBuscado){
    Swal.fire({
      title: "Ups!",
      text: `Ya existe un usuario registrado con el email ${usuarioBuscado.correo}, deseas iniciar sesión?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = window.location.origin + "/pages/login.html";
      }
    });
  }else{
    return true;
  }
};

formRegister.addEventListener("submit", crearUsuario);
