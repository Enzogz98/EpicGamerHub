# EPICGAMERHUB ENTERTAIMENT 🎮

Este proyecto se fundamenta en una plataforma de venta de videojuegos, brindando al usuario una experiencia extraordinaria desde la visualización de los juegos hasta la compra de los mismos. Sumérgete en una plataforma diseñada para ofrecer no solo la mejor selección de videojuegos, sino también una experiencia de usuario excepcional, desde la exploración de títulos hasta la adquisición de tus juegos favoritos.

## Caracteristicas del proyecto ⚙️
### Funcionalidades 🛠️
- **Administración de Juegos**: Podrás crear, leer, editar y eliminar juegos desde un panel de administración de juegos.
- **Administración de Usuarios**: Desde el panel de administración de usuarios, se podrá eliminar usuarios registrados.
- **Login**: El usuario podrá iniciar sesión en la plataforma.
- **Registro de usuarios**: Los usuarios nuevos podrán registrarse mediante una página de registro.
- **Favoritos**: También podrás agregar tus juegos favoritos a una lista de favoritos sin necesidad de iniciar sesión.
- **Reseñas**: Puedes dejar reseñas y puntuaciones a los juegos que desees; esto servirá como referencia sobre el juego para los demás usuarios.
- **Filtrado**: Para una mejor experiencia, se permitirá al usuario filtrar mediante la búsqueda de un juego específico o por categorías, agilizando así la búsqueda de un juego en particular.
### Administración de datos 📦
En el contexto de la administración de datos, hacemos uso de las siguientes herramientas proporcionadas por el navegador

- **LocalStorage**: Es un mecanismo de almacenamiento de datos en el navegador web que permite a las aplicaciones web guardar datos de forma persistente en el dispositivo del usuario. localStorage se utilizó para llevar a cabo las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de juegos, gestionar la lista de favoritos y realizar el registro y la administración de usuarios.
- **SessionStorage**: Similar a localStorage, el sessionStorage es un mecanismo de almacenamiento en el navegador; sin embargo, los datos almacenados en sessionStorage solo persisten durante la sesión actual del navegador. Esta opción se utiliza para gestionar la sesión de los usuarios que desean iniciar sesión en la página.

### Librerias 📚

- [Boostratp v5.3](https://getbootstrap.com/): Fue utilizado para dar estilo a nuestra página y reutilizar diferentes componentes que nos ofrece esta biblioteca.
- [Sweet Alert v2](https://sweetalert2.github.io/): Esta biblioteca nos ofrece ventanas mucho más amigables para el usuario final, por lo que nos parecía una buena incorporación al proyecto.
- [Crypto JS v4.2](https://cryptojs.gitbook.io/docs/): Con esta biblioteca proporcionamos seguridad y confianza a los usuarios que se registran en nuestra plataforma, encriptando sus contraseñas para una mayor seguridad, ya que los datos se guardan en localStorage.
- [uuid v4](https://www.uuidgenerator.net/version4): UUID se utilizó para obtener códigos de forma dinámica para el alta de juegos y usuarios. Con esta biblioteca, ahorramos al usuario final la tarea de pensar en diferentes códigos para cada alta que desee realizar.

## Ejecución del proyecto 🚀
Para la correcta ejecución del proyecto segui los siguientes pasos:

1. Debes clonar el repositorio de git en tu PC, lo puedes hacer utilizando el comando 

    ```git clone https://github.com/Agustin030s/epicGamerHub.git```

2. Una vez que hayas clonado el repositorio, abres la carpeta con el proyecto el visual studio code, lo puedes hacer de la siguiente manera:

    - Buscar la carpeta donde clonaste el repositorio de Git.
    - Hacer click derecho sobre la carpeta.
    - Presionar "Abrir con Visual Studio Code"

3. Listo, ya tienes el proyecto listo para ejecutarlo. Te recomendamos tener instalada la extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en tu VSC para la ejecución del proyecto.

### Uso de la plataforma:

Al ingresar a la página, te encontrarás con la página principal, donde podrás visualizar los juegos destacados y publicidad sobre juegos recientes o populares.

En la barra de navegación encontrarás diferentes opciones, como la de "Juegos" que te llevará a una página donde encontrarás todos los juegos disponibles y podrás filtrarlos por categoría o por búsqueda de un juego en especial.

Desde cualquiera de estas páginas mencionadas anteriormente, podrás acceder a los detalles de los juegos y ver sus requisitos, reseñas, etc. También, desde la página de detalles podrás agregar los juegos a la lista de favoritos.

También encontrarás una lista desplegable "Más opciones", en la cual verás diferentes botones; todos te llevarán a la página 404 debido a que estas páginas aún no están construidas.

Luego también podrás acceder a una página donde encontrarás información sobre el equipo que desarrolló este proyecto, desde donde podrás contactarnos por nuestro LinkedIn o ver nuestros proyectos de GitHub.

La penúltima opción es un botón con un icono de un "corazoncito". Si lo presionas, se abrirá un panel lateral a la derecha, donde encontrarás todos los juegos que añadiste a favoritos.

Y por último, en el icono de usuario, encontrarás las opciones para loguearte o registrarte. Si ya iniciaste sesión, en este mismo icono encontrarás la opción para cerrar la sesión y también visualizarás tu nombre de usuario.

Si eres usuario administrador, visualizarás una nueva opción llamada "Administrador", desde donde podrás acceder a la administración de juegos y usuarios. Para acceder como administrador, las credenciales por defecto son las siguientes:

```Correo: admin@admin.com```

```Clave: Admin1234```

Esto es todo; esperamos que tengas una buena experiencia con nuestra plataforma 🙌

## Equipo de EPICGAMERHUB 🧑‍💻
- Cornejo, Martin
- Gonzalez, Enzo
- Maza, Sebastian
- Mercado, Juan
