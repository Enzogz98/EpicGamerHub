import { getLocalStorage, insertLocalStorage } from "./dataStorageManager.js";

const usuariosRegistrados = getLocalStorage("usuarios");

const cargaInicial = () => {
  if (usuariosRegistrados.length !== 0) {
    usuariosRegistrados.map((user, posicion) => crearFila(user, posicion + 1));
  }
};

const crearFila = (user, fila) => {
  const tablaUsuarios = document.getElementById("tbodyUsuario");
  tablaUsuarios.innerHTML += `<tr>
  <th scope="row">${fila}</th>
  <td>${user.usuario}</td>
  <td>${user.nombre}</td>
  <td>${user.correo}</td>
  <td>${user.rol}</td>
  <td>
    <button class="btn btn-danger" onclick="eliminarUsuario('${user.codigo}')">Eliminar</button>
  </td>
</tr>`;
};

window.eliminarUsuario = (codigo) => {
  Swal.fire({
    title: "Estás seguro de eliminar este usuario?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const posicionUsuario = usuariosRegistrados.findIndex(
        (user) => user.codigo === codigo
      );
      usuariosRegistrados.splice(posicionUsuario, 1);
      insertLocalStorage("usuarios", usuariosRegistrados);
      const tablaUsuarios = document.getElementById("tbodyUsuario");
      tablaUsuarios.removeChild(tablaUsuarios.children[posicionUsuario]);
      Swal.fire({
        title: "Usuario eliminado!",
        text: "El usuario fue eliminado exitosamente.",
        icon: "success",
      });
    }
  });
};

cargaInicial();
