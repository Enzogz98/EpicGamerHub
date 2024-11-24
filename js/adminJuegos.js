import { Juego, RequisitosDelSistema } from "./clases/classJuego.js";
import { limpiarFormularios, mostrarAlerta } from "./auxiliarFunctions.js";
import { getLocalStorage, insertLocalStorage } from "./dataStorageManager.js";
import {
  validarTexto,
  validarPrecio,
  validarRam,
  validarAlmacenamiento,
  validarImagen,
  validarCategoria,
} from "./formValidation.js";

const formJuegos = document.getElementById("formJuegos");
const modalJuegos = new bootstrap.Modal(
  document.getElementById("modalJuegos"),
  {
    backdrop: "static",
    keyboard: false,
  }
);
const tablaDeJuego = document.getElementById("datosJuego");
const juegos = getLocalStorage("juegos");
const btnCerrarModal = document.getElementById("btnCloseModal");

function restaurarPagina() {
  location.reload();
}
btnCerrarModal.addEventListener("click", restaurarPagina);

const crearFila = (juego, fila) => {
  tablaDeJuego.innerHTML += `
    <tr>
        <th scope="row">${fila}</th>
        <td class="simplificarTexto overflow-hidden text-truncate">${
          juego.nombre
        }</td>
        <td>${juego.precio}</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${
          juego.categoria
        }</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${
          juego.imagen
        }</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${
          juego.descripcion
        }</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${
          juego.desarrollador
        }</td>
        <td class="simplificarTexto overflow-hidden text-truncate">${
          juego.resenias.valoracion === undefined
            ? "Sin reseñas"
            : juego.resenias.valoracion
        }</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info" onclick="verDetalle('${
                  juego.codigo
                }')">Detalles</button>
                <button type="button" class="btn btn-warning mx-2" onclick="editarJuego('${
                  juego.codigo
                }')">Editar</button>
                <button type="button" class="btn btn-danger" onclick="eliminarJuego('${
                  juego.codigo
                }')">Eliminar</button>
            </div>
        </td>
    </tr>`;
};

// Funcion para cargar los juegos
const cargaInicialDeJuegos = () => {
  if (juegos.length !== 0) {
    juegos.map((juego, posicion) => crearFila(juego, posicion + 1));
  } else {
    console.log("No hay juegos cargados");
  }
};

const validarYObtenerDatos = () => {
  const codigo = uuidv4();
  const nombre = document.getElementById("nombre");
  const precio = document.getElementById("precio");
  const categoria = document.getElementById("categoria");
  const imagen = document.getElementById("imagen");
  const descripcion = document.getElementById("descripcion");
  const desarrollador = document.getElementById("desarrollador");

  const sistOperativo = document.getElementById("sistOperativo");
  const procesador = document.getElementById("procesador");
  const ram = document.getElementById("ram");
  const tarjGraf = document.getElementById("tarjGraf");
  const almacenamiento = document.getElementById("almacenamiento");

  let requisitos;

  if (
    validarTexto(sistOperativo, 5, 150) &&
    validarTexto(procesador, 5, 200) &&
    validarRam(ram) &&
    validarTexto(tarjGraf, 10, 200) &&
    validarAlmacenamiento(almacenamiento)
  ) {
    requisitos = new RequisitosDelSistema(
      sistOperativo.value,
      procesador.value,
      ram.value,
      tarjGraf.value,
      almacenamiento.value
    );
  } else {
    mostrarAlerta(
      "Por favor, completa todos los campos de requisitos del sistema",
      "error"
    );
  }

  const sistOperativoMin = document.getElementById("sistOperativoMin");
  const procesadorMin = document.getElementById("procesadorMin");
  const ramMin = document.getElementById("ramMin");
  const tarjGrafMin = document.getElementById("tarjGrafMin");
  const almacenamientoMin = document.getElementById("almacenamientoMin");

  let requisitosMin;

  if (
    validarTexto(sistOperativoMin, 5, 150) &&
    validarTexto(procesadorMin, 5, 200) &&
    validarRam(ramMin) &&
    validarTexto(tarjGrafMin, 10, 200) &&
    validarAlmacenamiento(almacenamientoMin)
  ) {
    requisitosMin = new RequisitosDelSistema(
      sistOperativoMin.value,
      procesadorMin.value,
      ramMin.value,
      tarjGrafMin.value,
      almacenamientoMin.value
    );
  } else {
    mostrarAlerta(
      "Por favor, completa todos los campos de requisitos mínimos",
      "error"
    );
  }

  let nuevoJuego;

  if (
    validarTexto(nombre, 3, 150) &&
    validarPrecio(precio) &&
    validarCategoria(categoria) &&
    validarImagen(imagen) &&
    validarTexto(descripcion, 10, 800) &&
    validarTexto(desarrollador, 2, 70)
  ) {
    nuevoJuego = new Juego(
      codigo,
      nombre.value,
      parseFloat(precio.value),
      categoria.value,
      imagen.value,
      descripcion.value,
      requisitos,
      requisitosMin,
      desarrollador.value
    );
  } else {
    mostrarAlerta("Por favor, completa todos los campos", "error");
  }

  return nuevoJuego;
};

// function validarYObtenerDatos() {
//   const codigo = uuidv4();
//   const nombre = document.getElementById("nombre").value.trim();
//   const precio = parseFloat(document.getElementById("precio").value);
//   const categoria = document.getElementById("categoria").value;
//   const imagen = document.getElementById("imagen").value.trim();
//   const descripcion = document.getElementById("descripcion").value.trim();

//   if (!nombre || isNaN(precio) || !categoria || !imagen || !descripcion) {
//     mostrarAlerta("Por favor, completa todos los campos", "error");
//     return null;
//   }

//   const sistOperativo = document.getElementById("sistOperativo").value.trim();
//   const procesador = document.getElementById("procesador").value.trim();
//   const ram = document.getElementById("ram").value;
//   const tarjGraf = document.getElementById("tarjGraf").value.trim();
//   const almacenamiento = document.getElementById("almacenamiento").value;

//   if (!sistOperativo || !procesador || !ram || !tarjGraf || !almacenamiento) {
//     mostrarAlerta(
//       "Por favor, completa todos los campos de requisitos del sistema",
//       "error"
//     );
//     return null;
//   }

//   const requisitos = new RequisitosDelSistema(
//     sistOperativo,
//     procesador,
//     ram,
//     tarjGraf,
//     almacenamiento
//   );

//   const sistOperativoMin = document
//     .getElementById("sistOperativoMin")
//     .value.trim();
//   const procesadorMin = document.getElementById("procesadorMin").value.trim();
//   const ramMin = document.getElementById("ramMin").value;
//   const tarjGrafMin = document.getElementById("tarjGrafMin").value.trim();
//   const almacenamientoMin = document.getElementById("almacenamientoMin").value;

//   if (
//     !sistOperativoMin ||
//     !procesadorMin ||
//     !ramMin ||
//     !tarjGrafMin ||
//     !almacenamientoMin
//   ) {
//     mostrarAlerta(
//       "Por favor, completa todos los campos de requisitos mínimos",
//       "error"
//     );
//     return null;
//   }

//   const requisitosMinimos = new RequisitosDelSistema(
//     sistOperativoMin,
//     procesadorMin,
//     ramMin,
//     tarjGrafMin,
//     almacenamientoMin
//   );

//   const desarrollador = document.getElementById("desarrollador").value.trim();

//   if (!desarrollador) {
//     mostrarAlerta("Por favor, ingresa el nombre del desarrollador", "error");
//     return null;
//   }

//   const nuevoJuego = new Juego(
//     codigo,
//     nombre,
//     precio,
//     categoria,
//     imagen,
//     descripcion,
//     requisitos,
//     requisitosMinimos,
//     desarrollador
//   );

//   return nuevoJuego;
// }

window.verDetalle = (codigoDeJuego) => {
  window.location.href = "./detalleJuego.html?codigo=" + codigoDeJuego;
};

window.editarJuego = (codigo) => {
  const JuegoAEditar = juegos.find((juego) => juego.codigo === codigo);
  const indiceJuego = juegos.findIndex((juego) => juego.codigo === codigo);

  console.log(modalJuegos._element);

  let formJuego = modalJuegos._element.querySelector("#formJuegos");
  let tituloModal = modalJuegos._element.querySelector("#modalJuegosLabel");
  let btnSubmit = formJuego.querySelector('button[type="submit"]');

  let nombreInput = formJuego.querySelector("#nombre");
  let precioInput = formJuego.querySelector("#precio");
  let categoriaSelect = formJuego.querySelector("#categoria");
  let imagenInput = formJuego.querySelector("#imagen");
  let descripcionInput = formJuego.querySelector("#descripcion");
  let sistOperativoR = formJuego.querySelector("#sistOperativo");
  let procesadorR = formJuego.querySelector("#procesador");
  let ramSelectR = formJuego.querySelector("#ram");
  let tarjetaGraficaR = formJuego.querySelector("#tarjGraf");
  let almacenamientoR = formJuego.querySelector("#almacenamiento");

  let sistOperativoM = formJuego.querySelector("#sistOperativoMin");
  let procesadorM = formJuego.querySelector("#procesadorMin");
  let ramSelectM = formJuego.querySelector("#ramMin");
  let tarjetaGraficaM = formJuego.querySelector("#tarjGrafMin");
  let almacenamientoM = formJuego.querySelector("#almacenamientoMin");

  let desarrolladorInput = formJuego.querySelector("#desarrollador");

  tituloModal.textContent = "Editar juego";
  nombreInput.value = JuegoAEditar.nombre;
  precioInput.value = JuegoAEditar.precio;
  categoriaSelect.value = JuegoAEditar.categoria;
  imagenInput.value = JuegoAEditar.imagen;
  descripcionInput.value = JuegoAEditar.descripcion;

  sistOperativoR.value = JuegoAEditar.requisitos.sistemaOperativo;
  procesadorR.value = JuegoAEditar.requisitos.procesador;
  ramSelectR.value = JuegoAEditar.requisitos.ram;
  tarjetaGraficaR.value = JuegoAEditar.requisitos.tarjetaGrafica;
  almacenamientoR.value = JuegoAEditar.requisitos.almacenamiento;

  sistOperativoM.value = JuegoAEditar.requisitosMinimos.sistemaOperativo;
  procesadorM.value = JuegoAEditar.requisitosMinimos.procesador;
  ramSelectM.value = JuegoAEditar.requisitosMinimos.ram;
  tarjetaGraficaM.value = JuegoAEditar.requisitosMinimos.tarjetaGrafica;
  almacenamientoM.value = JuegoAEditar.requisitosMinimos.almacenamiento;

  desarrolladorInput.value = JuegoAEditar.desarrollador;
  btnSubmit.textContent = "Editar";

  modalJuegos.show();

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      validarTexto(nombreInput, 3, 150) &&
      validarPrecio(precioInput) &&
      validarCategoria(categoriaSelect) &&
      validarImagen(imagenInput) &&
      validarTexto(descripcionInput, 10, 800) &&
      validarTexto(desarrolladorInput, 2, 70) &&
      validarTexto(sistOperativoR, 5, 150) &&
      validarTexto(procesadorR, 5, 200) &&
      validarRam(ramSelectR) &&
      validarTexto(tarjetaGraficaR, 10, 200) &&
      validarAlmacenamiento(almacenamientoR) &&
      validarTexto(sistOperativoM, 5, 150) &&
      validarTexto(procesadorM, 5, 200) &&
      validarRam(ramSelectM) &&
      validarTexto(tarjetaGraficaM, 10, 200) &&
      validarAlmacenamiento(almacenamientoM)
    ) {
      JuegoAEditar.nombre = nombreInput.value;
      JuegoAEditar.precio = precioInput.value;
      JuegoAEditar.categoria = categoriaSelect.value;
      JuegoAEditar.imagen = imagenInput.value;
      JuegoAEditar.descripcion = descripcionInput.value;
  
      JuegoAEditar.requisitos.sistemaOperativo = sistOperativoR.value;
      JuegoAEditar.requisitos.procesador = procesadorR.value;
      JuegoAEditar.requisitos.ram = ramSelectR.value;
      JuegoAEditar.requisitos.tarjetaGrafica = tarjetaGraficaR.value;
      JuegoAEditar.requisitos.almacenamiento = almacenamientoR.value;
  
      JuegoAEditar.requisitosMinimos.sistemaOperativo = sistOperativoM.value;
      JuegoAEditar.requisitosMinimos.procesador = procesadorM.value;
      JuegoAEditar.requisitosMinimos.ram = ramSelectM.value;
      JuegoAEditar.requisitosMinimos.tarjetaGrafica = tarjetaGraficaM.value;
      JuegoAEditar.requisitosMinimos.almacenamiento = almacenamientoM.value;
  
      JuegoAEditar.desarrollador = desarrolladorInput.value;
  
      let nuevoArrayConElJuegoEditado = juegos.map((juego, i) => {
        if (i === indiceJuego) {
          return (juego = JuegoAEditar);
        } else {
          return juego;
        }
      });
  
      Swal.fire({
        title: "Confirmación",
        text: "Estás seguro de editar el Juego?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Editar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          insertLocalStorage("juegos", nuevoArrayConElJuegoEditado);
          limpiarFormularios(formJuego);
          modalJuegos.hide();
          Swal.fire({
            title: "Juego editado!",
            text: "El juego fue editado exitosamente.",
            icon: "success",
            willClose: () => {
              location.reload();
            },
          });
        }
      });
    }else{
      mostrarAlerta('Ingresa datos validos', 'error');
    }
  });
};

window.eliminarJuego = (codigo) => {
  Swal.fire({
    title: "Estás seguro de borrar el Juego?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const indiceJuego = juegos.findIndex((juego) => juego.codigo === codigo);
      juegos.splice(indiceJuego, 1);
      insertLocalStorage("juegos", juegos);
      limpiarTabla();
      cargaInicialDeJuegos();
      Swal.fire({
        title: "Juego eliminado!",
        text: "El juego fue eliminado exitosamente.",
        icon: "success",
      });
    }
  });
};

const limpiarTabla = () => {
  tablaDeJuego.innerHTML = "";
};

formJuegos.addEventListener("submit", function (event) {
  event.preventDefault();

  const nuevoJuego = validarYObtenerDatos();

  if (nuevoJuego) {
    juegos.push(nuevoJuego);
    insertLocalStorage("juegos", juegos);

    limpiarFormularios(formJuegos);
    crearFila(nuevoJuego, juegos.length);

    mostrarAlerta("Juego agregado exitosamente", "success");
  }
});

cargaInicialDeJuegos();
