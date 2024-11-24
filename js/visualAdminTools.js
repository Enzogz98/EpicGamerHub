const btnAgregarJuegos = document.getElementById("btnAgregarJuego");
const modalJuegos = new bootstrap.Modal(document.getElementById("modalJuegos"));
const btnCloseModal = document.getElementById('btnCloseModal');

const mostrarSeccionModal = (numeroSeccion) => {
  const secciones = document.querySelectorAll(".form-section");
  secciones.forEach((seccion) => seccion.classList.add("d-none"));
  document.getElementById(`seccion${numeroSeccion}`).classList.remove("d-none");
};

const abrirModal = () => {
  modalJuegos.show();
};

const cerrarModal = () =>{
  modalJuegos.hide();
}

btnAgregarJuegos.addEventListener("click", abrirModal);
btnCloseModal.addEventListener('click', cerrarModal);
