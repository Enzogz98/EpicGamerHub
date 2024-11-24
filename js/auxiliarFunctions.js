export const limpiarFormularios = (form) => {
  const inputs = form.querySelectorAll("input");
  const selects = form.querySelectorAll("select");

  if (selects.length > 0) {
    selects.forEach((select) => {
      select.classList.remove("is-valid", "is-invalid");
    });
  }

  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });

  form.reset();
};

export const key = "clave-super-secreta";

export const encriptarContrasenia = (password, key) => {
  const encrypted = CryptoJS.AES.encrypt(password, key).toString();
  return encrypted;
};

export const desencriptarContrasenia = (encryptedPassword, key) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
};

//Favoritos
export const crearCardFavorito = (juego) => {
  const canvas = document.querySelector(".listaFavoritos-container");
  canvas.innerHTML += `<div class="card card-customized mt-3">
    <div class="row g-0 justify-content-center align-items-center">
      <div class="col-3 img-favoritos-container">
        <img src="${juego.imagen}" alt="Imagen del juego" class="img-favoritos">
      </div>
      <div class="col-9">
        <div class="card-body text-center">
          <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0" aria-label="Eliminar" onclick="eliminarFavorito('${juego.codigo}')"></button>
          <h5 class="card-title text-light mb-4 fs-6">${juego.nombre}</h5>
          <button class="btn-customized fs-6" onclick="verDetalle('${juego.codigo}')">Ver detalles</button>
        </div>
      </div>
    </div>
  </div>`;
};

export const cargaInicialDeFavoritos = (arrayFavoritos) => {
  const canvas = document.querySelector(".listaFavoritos-container");
  canvas.innerHTML = '';
  if (arrayFavoritos.length !== 0) {
    arrayFavoritos.map((fav) => crearCardFavorito(fav));
  } else {
    canvas.innerHTML = `<p class='parraFav mt-4 text-secondary'>Aún no tienes juegos favoritos<p>`;
  }
};

export function mostrarAlerta(mensaje, tipo) {
  const tiposValidos = ["success", "error", "warning", "info"];

  if (!tiposValidos.includes(tipo)) {
    console.error(
      "Tipo de alerta no válido. Use uno de: success, error, warning, info"
    );
    return;
  }

  Swal.fire({
    icon: tipo,
    title: mensaje,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  });
}

// Funcion para maquetar los juegos obtenidos de un array de objetos
export const mostrarJuegos = (arrayDeJuegos, iteraciones, contenedor) => {
  if (arrayDeJuegos.length !== 0) {
    contenedor.innerHTML = "";
    for (let i = 0; i < iteraciones; i++) {
      contenedor.innerHTML += `
          <div class="col-sm-6 col-md-5 col-lg-3 mb-5">
          <div class="card card-customized pb-1 h-100">
            <div class="img-card-container p-1">
              <img
                src="${arrayDeJuegos[i].imagen}"
                alt="Portada del juego"
              />
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h3 class="fs-4 fw-bold text-light">${arrayDeJuegos[i].nombre}</h3>
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="fs-6 genero">${arrayDeJuegos[i].categoria}</h4>
                  <div class="text-secondary">
                    <i class="bi bi-playstation fs-5"></i>
                    <i class="bi bi-xbox fs-5"></i>
                    <i class="bi bi-windows fs-5"></i>
                  </div>
                </div>
              </div>       
              <div>
                <p class="price fs-2">$${arrayDeJuegos[i].precio}</p>
                <button class="btn-customized" onclick="verDetalle('${arrayDeJuegos[i].codigo}')">Más información</button>
              </div>
            </div>
          </div>
        </div>`;
    }
  } else {
    contenedor.innerHTML =
      '<h2 class="fs-2 mt-5 text-center text-secondary">No hay juegos para mostrar</h2>';
  }
};
