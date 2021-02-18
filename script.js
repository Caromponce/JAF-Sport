var productos = [];
var carritoPrecio = 0;
var objetosCarritos = [];
var tarjetaHTML = '';
class Producto {
    constructor(nombreParam, urlImagenParam, precioParam, stockParam) {
        this.nombre = nombreParam;
        this.urlImagen = urlImagenParam;
        this.precio = precioParam;
        this.stock = stockParam;
    }
    sumarPrecio() {
        carritoPrecio = carritoPrecio + this.precio;
    }
}

window.addEventListener('load', function () {
    for (let indiceBDD = 0; indiceBDD < productosBDD.length; indiceBDD++) {
        let producto = new Producto(productosBDD[indiceBDD]['nombre'], productosBDD[indiceBDD]['urlImagen'], productosBDD[indiceBDD]['precio'], productosBDD[indiceBDD]['stock']);
        productos.push(producto);
        cargarTarjetas(producto, indiceBDD);
    }
    // var containerTarjetas = document.getElementById('containerTarjetas');
    // containerTarjetas.innerHTML = tarjetaHTML;
    $("#containerTarjetas").html(tarjetaHTML); //jquery



    $('.card--inicio a').on('click', function () {
        let indiceProducto = this.id.split('_')[1];
        sumarAlCarrito(indiceProducto);
    })
});

function sumarAlCarrito(indice) {
    productos[indice].sumarPrecio();
    objetosCarritos.push(productos[indice]);
    $("#badgeCarrito").html(objetosCarritos.length); //jquery
    let textoOld = $("#cantidadModalCarrito").html();
    $("#cantidadModalCarrito").html(textoOld + `<p>${objetosCarritos[objetosCarritos.length - 1].nombre}</p>`); //jquery
    $("#sumaModalCarrito").html(`La suma de su carrito es: ${carritoPrecio}`); //jquery
}

function cargarTarjetas(productoParaCargarHTML, indiceBDD) {
    let disponibilidadStock = '';
    let btnDeshabilitado;
    if (productoParaCargarHTML.stock > 0) {
        disponibilidadStock = 'Agregar al carrito';
    } else {
        disponibilidadStock = 'No hay stock';
        btnDeshabilitado = 'disabled';
    }
    tarjetaHTML = tarjetaHTML +
        `<div class="card card--inicio" style="width: 18rem;">
    <img src="${productoParaCargarHTML.urlImagen}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${productoParaCargarHTML.nombre}</h5>
    <p class="card-text">$ ${productoParaCargarHTML.precio}</p>
    <a href="#" class="btn btn-primary ${btnDeshabilitado}" id="producto_${indiceBDD}">${disponibilidadStock}</a>
    </div>
    </div>
    `
}