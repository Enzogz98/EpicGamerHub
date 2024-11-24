export class Juego{
    #codigo;
    #nombre;
    #precio;
    #categoria;
    #imagenURL;
    #descripcion;
    #requisitos;
    #requisitosMinimos;
    #desarrollador;
    #resenias;
    constructor(codigo = uuidv4(), nombre, precio, categoria, imagen, descripcion, requisitos, requisitosMinimos, desarrollador){
        this.#codigo = codigo;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#categoria = categoria;
        this.#imagenURL = imagen;
        this.#descripcion = descripcion;
        this.#requisitos = requisitos;
        this.#requisitosMinimos = requisitosMinimos;
        this.#desarrollador = desarrollador;
        this.#resenias = new Reseña();
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(codigo) {
        this.#codigo = codigo;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get precio() {
        return this.#precio;
    }

    set precio(precio) {
        this.#precio = precio;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(categoria) {
        this.#categoria = categoria;
    }

    get imagenURL() {
        return this.#imagenURL;
    }

    set imagenURL(imagen) {
        this.#imagenURL = imagen;
    }

    get descripcion() {
        return this.#descripcion;
    }

    set descripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    get requisitos() {
        return this.#requisitos;
    }

    set requisitos(requisitos) {
        this.#requisitos = requisitos;
    }

    get requisitosMinimos() {
        return this.#requisitosMinimos;
    }

    set requisitosMinimos(requisitosMinimos) {
        this.#requisitosMinimos = requisitosMinimos;
    }

    get desarrollador() {
        return this.#desarrollador;
    }
    
    set desarrollador(desarrollador) {
        this.#desarrollador = desarrollador;
    }

    get resenias(){
        return this.#resenias;
    }

    toJSON(){
        return{
            codigo: this.codigo,
            nombre: this.nombre,
            precio: this.precio,
            categoria: this.categoria,
            imagen: this.imagenURL,
            descripcion: this.descripcion,
            requisitos: this.requisitos,
            requisitosMinimos: this.requisitosMinimos,
            desarrollador: this.desarrollador,
            resenias: this.resenias
        }
    }
}

export class RequisitosDelSistema{
    #sistemaOperativo;
    #procesador;
    #ram;
    #tarjetaGrafica;
    #almacenamiento;
    constructor(sistOper, procesador, ram, tarjetaGraf, almacenamiento){
        this.#sistemaOperativo = sistOper;
        this.#procesador = procesador;
        this.#ram = ram;
        this.#tarjetaGrafica = tarjetaGraf;
        this.#almacenamiento = almacenamiento;
    }

    get sistemaOperativo(){
        return this.#sistemaOperativo;
    }

    set sistemaOperativo(so){
        this.#sistemaOperativo = so;
    }

    get procesador(){
        return this.#procesador;
    }

    set procesador(proces){
        this.#procesador = proces;
    }

    get ram(){
        return this.#ram;
    }

    set ram(rm){
        this.#ram = rm;
    }

    get tarjetaGrafica(){
        return this.#tarjetaGrafica;
    }

    set tarjetaGrafica(tarjGr){
        this.#tarjetaGrafica = tarjGr;
    }

    get almacenamiento(){
        return this.#almacenamiento;
    }

    set almacenamiento(almac){
        this.#almacenamiento = almac;
    }

    toJSON(){
        return{
            sistemaOperativo: this.sistemaOperativo,
            procesador: this.procesador,
            ram: this.ram,
            tarjetaGrafica: this.tarjetaGrafica,
            almacenamiento: this.almacenamiento
        }
    }
}

export class Reseña{
    #usuarios;
    #votosPositivos;
    #votosNegativos;
    #comentarios;
    #valoracion;
    constructor(){
        this.#usuarios = [];
        this.#votosPositivos = 0;
        this.#votosNegativos = 0;
        this.#comentarios = [];
        this.#valoracion = 0;
    }

    get usuarios(){
        return this.#usuarios;
    }

    get votosPositivos(){
        return this.#votosPositivos;
    }

    get votosNegativos(){
        return this.#votosNegativos;
    }

    get comentarios(){
        return this.#comentarios;
    }

    get valoracion(){
        return this.#valoracion;
    }

    agregarVotoPositivo(){
        this.#votosPositivos++;
    }

    agregarVotoNegativo(){
        this.#votosNegativos++;
    }

    agregarComentario(comentario){
        this.#comentarios.push(comentario);
    }

    calcularValoracion(){
        let total = this.votosPositivos + this.votosNegativos;
        return total === 0 ? 0 : (this.votosPositivos/total)*10;
    }
}