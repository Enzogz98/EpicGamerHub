import { Reseña } from "./clases/classJuego.js";
import { getLocalStorage, insertLocalStorage, getSessionStorage } from "./dataStorageManager.js";

let d = document;
let titleJuego = d.getElementById("tituloJuego");
let containerReseña = d.getElementById("reseñas");
let añadirReseñaBtn = d.getElementById("añadirReseñaBtn");
let textoReseña = d.getElementById("textoReseña");
let btnLike = d.getElementById("btnLike");
let btnDisLike = d.getElementById("btnDislike");
let pLikes = d.getElementById("pLikes");
let pDislikes = d.getElementById("pDislikes");

let reseña = new Reseña();
let usuarioLogueado = getSessionStorage('sesion');

/*
Funcion para mostrar comentarios
*/
let mostrarComentarios = (comentarios) => {
  comentarios.map((e) => {
    let div = d.createElement("div");
    let p = d.createElement("p");
    p.textContent = e;
    div.classList.add("containerComentario");
    p.classList.add("pComentario");
    div.appendChild(p);
    containerReseña.appendChild(div);
  });
};

const mostrarVentanaInicioSesion = () =>{
  Swal.fire({
    title: "Ups!",
    text: "Debes iniciar sesión para poder dejar una reseña.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Iniciar Sesión",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = window.location.origin + '/pages/login.html'
    }
  });
};

const mostrarVentanaError = (texto) =>{
  Swal.fire({
    title: "Error!",
    text: `Ya ${texto} en este juego`,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}

const cargaInicial = () =>{
  if (reseniasData.comentarios.length > 0) {
    let total = reseniasData.likes + reseniasData.dislikes;
    let parrafoPrincipal = d.createElement("p");
    parrafoPrincipal.classList.add("parrafoPrincipal");
    parrafoPrincipal.innerHTML = `Se muestran ${
      reseniasData.comentarios.length
    } reseñas con una valoración del juego de <b> ${
      (isNaN(reseniasData.likes/total)) ? 0 : Math.round((reseniasData.likes/total)*10)
    }</b> puntos`;
    containerReseña.innerHTML = '';
    containerReseña.appendChild(parrafoPrincipal);
  
    mostrarComentarios(reseniasData.comentarios);
  } else {
    containerReseña.innerHTML =
      "El juego aun no tiene reseñas... Quieres añadir?";
  }
}

/*Se crea la logica para guardar las reseñas*/
let juegos = getLocalStorage("juegos");

let juego = juegos.find((e) => e.nombre === titleJuego.textContent);

let reseniasData = {
  usuario: juego.resenias.usuario || [],
  comentarios: juego.resenias.comentarios || [],
  likes: juego.resenias.likes || 0,
  dislikes: juego.resenias.dislikes || 0,
  valoracion: juego.resenias.valoracion || 0,
};



/*Logica para añadir las reseñas*/
añadirReseñaBtn.addEventListener("click", (e) => {
  if(usuarioLogueado && usuarioLogueado.rol === 'invitado'){
    const comentarioUsuario = reseniasData.comentarios.find(c => c.includes(usuarioLogueado.usuario));
    if(comentarioUsuario){
      mostrarVentanaError('dejaste una reseña');
    }else{
      let texto = `${usuarioLogueado.usuario}: ${textoReseña.value}`;
      reseña.agregarComentario(texto);
    
      reseniasData.comentarios.push(texto);
      juego.resenias = reseniasData;
    
      insertLocalStorage("juegos", juegos);
    
      cargaInicial();
      // mostrarComentarios(reseniasData.comentarios);
      d.getElementById("textoReseña").value = '';
    }
  }else{
    mostrarVentanaInicioSesion();
  }
});

pLikes.innerHTML = reseniasData.likes;
pDislikes.innerHTML = reseniasData.dislikes;

btnLike.addEventListener("click", (e) => {
  if(usuarioLogueado && usuarioLogueado.rol === 'invitado'){
    const usuarioResenia = reseniasData.usuario.find(u => u === usuarioLogueado.usuario);
    if(usuarioResenia){
      mostrarVentanaError('votaste');
    }else{
      reseniasData.likes += 1;
      reseña.agregarVotoPositivo();
      reseniasData.valoracion = reseña.calcularValoracion();
      reseniasData.usuario.push(usuarioLogueado.usuario);
      juego.resenias = reseniasData;
      insertLocalStorage("juegos", juegos);
    
      pLikes.innerHTML = reseniasData.likes;
      pDislikes.innerHTML = reseniasData.dislikes;
    }
  }else{
    mostrarVentanaInicioSesion();
  }
});

btnDisLike.addEventListener("click", (e) => {
  if(usuarioLogueado && usuarioLogueado.rol === 'invitado'){
    const usuarioResenia = reseniasData.usuario.find(u => u === usuarioLogueado.usuario);
    if(usuarioResenia){
      mostrarVentanaError('votaste');
    }else{
      reseniasData.dislikes += 1;
      reseña.agregarVotoPositivo();
      reseniasData.valoracion = reseña.calcularValoracion();
      reseniasData.usuario.push(usuarioLogueado.usuario);
      juego.resenias = reseniasData;
      insertLocalStorage("juegos", juegos);
    
      pLikes.innerHTML = reseniasData.likes;
      pDislikes.innerHTML = reseniasData.dislikes;
    }
  }else{
    mostrarVentanaInicioSesion();
  }
});

cargaInicial();
