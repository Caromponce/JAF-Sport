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
    $("#containerTarjetas").html(tarjetaHTML); //jquery

    $('.btnOcultoCard').hide();
    $('.card--inicio a').on('click', function () {
        let indiceProducto = this.id.split('_')[1];
        sumarAlCarrito(indiceProducto);
        animarCarrito();
        switchBtnAgregarCarrito(this);
    })
});

function animarCarrito() {
    $('#badgeCarritoForma').animate({
        fontSize: '1.85em'
    }, "slow", function () {
        $('#badgeCarritoForma').animate({
            fontSize: '1.33333em'
        }, "slow")
    })
}

function switchBtnAgregarCarrito(btnPress) {
    $(btnPress).fadeOut("fast", function () {
        $(btnPress).siblings("a").fadeIn("slow")
    })
}

function sumarAlCarrito(indice) {
    productos[indice].sumarPrecio();
    objetosCarritos.push(productos[indice]);
    $("#badgeCarrito").html(objetosCarritos.length); //jquery
    let textoOld = $("#carrito .modal-bodyProductos").html();
    $("#carrito .modal-bodyProductos").html(textoOld +
        `<div class="row">
            <div class="col-6"> 
                <p>${objetosCarritos[objetosCarritos.length - 1].nombre}</p>
            </div>
            <div class="col-3 seleccionStock">
                <div class="qty">
                    <span class="minus bg-dark">-</span>
                    <input type="number" class="count" name="qty" value="1" disabled>
                    <span class="plus bg-dark">+</span>
                </div>
            </div>
            <div class="col-3">
                <p>$${objetosCarritos[objetosCarritos.length - 1].precio}</p>
            </div>
        </div>`); //jquery
    $("#sumaModalCarrito").html(`La suma de su carrito es: ${carritoPrecio}`); //jquery
    verificarStock();
}

function verificarStock() {
    $(".plus").on('click', function () {
        let inputBrother = $(this).siblings('input');
        inputBrother.val(parseInt(inputBrother.val()) + 1);
    });
    $(".minus").on('click', function () {
        let inputBrother = $(this).siblings('input');
        inputBrother.val(parseInt(inputBrother.val()) - 1);
        if (inputBrother.val() == 0) {
            inputBrother.val(1);
        }
    });
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
    <a  class="btn btn-primary ${btnDeshabilitado}" id="producto_${indiceBDD}">${disponibilidadStock}</a>
    <a  class="btn btn-primary disabled btnOcultoCard"> Agregado al Carrito</a>
    </div>
    </div>
    `
}