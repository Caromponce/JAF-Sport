var productos = [];
var carrito = localStorage.setItem('carrito', JSON.stringify([]));
var tarjetaHTML = '';
class Producto {
    constructor(idParam, nombreParam, urlImagenParam, precioParam, stockParam) {
        this.id = idParam;
        this.nombre = nombreParam;
        this.urlImagen = urlImagenParam;
        this.precio = precioParam;
        this.stock = stockParam;
    }
}

function sumarObjetoAlCarrito(idParam, nombreParam, precioParam, cantidadParam) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let item = {
        id: idParam,
        nombre: nombreParam,
        precio: precioParam,
        cantidad: cantidadParam,
        subtotal: precioParam * cantidadParam
    }
    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // carrito.forEach(element => {
    //     element.nombre  
    // });
    return carrito.length;
}

function getTotal() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let acumuladorTotal = 0;
    carrito.forEach(item => {
        acumuladorTotal = acumuladorTotal + item.subtotal;
    });
    return acumuladorTotal;
}

function actualizarSubtotal(idProductoApretado, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    const indiceItemEncontrado = carrito.findIndex(item => (item.id == idProductoApretado));
    if (nuevaCantidad === 0) {
        carrito = carrito.filter(item => item.id != idProductoApretado);
    } else {
        carrito[indiceItemEncontrado].cantidad = nuevaCantidad;
        carrito[indiceItemEncontrado].subtotal = nuevaCantidad * carrito[indiceItemEncontrado].precio;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (carrito.length == 0) {
        $("#modal-bodyCarritoVacio").show();
        $("#carrito button[type=submit]").hide();
        $("#sumaModalCarrito").html(``); //jquery
    } else {
        $("#sumaModalCarrito").html(`La suma de su carrito es: $${getTotal()}`); //jquery
    }
}

function eliminarItem(idProductoApretado) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    const indiceItemEncontrado = carrito.findIndex(item => (item.id == idProductoApretado));
    carrito.splice(indiceItemEncontrado, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    $("#sumaModalCarrito").html(`La suma de su carrito es: $${getTotal()}`); //jquery
}
window.addEventListener('load', function () {
    $('#loader').hide();
    let productosBDD;
    $.ajax({
        url: "bdd.json",
        async: false,
        dataType: "json",
        success: function (productos) {
            productosBDD = productos;
        }
    })
    for (let indiceBDD = 0; indiceBDD < productosBDD.length; indiceBDD++) {
        let producto = new Producto(productosBDD[indiceBDD]['id'], productosBDD[indiceBDD]['nombre'], productosBDD[indiceBDD]['urlImagen'], productosBDD[indiceBDD]['precio'], productosBDD[indiceBDD]['stock']);
        productos.push(producto);
        cargarTarjetas(producto, producto.id);
    }
    $("#containerTarjetas").html(tarjetaHTML); //jquery

    $('.btnOcultoCard').hide();
    $('.card--inicio a').on('click', function () {
        let indiceProducto = $(this).data("idprod");
        sumarAlCarrito(indiceProducto);
        animarCarrito();
        switchBtnAgregarCarrito(this);
    })
});

function cargarTarjetas(productoParaCargarHTML, indiceBDD) {
    let disponibilidadStock = '';
    let btnDeshabilitado = '';
    if (productoParaCargarHTML.stock > 0) {
        disponibilidadStock = 'Agregar al carrito';
    } else {
        disponibilidadStock = 'No hay stock';
        btnDeshabilitado = 'disabled';
    }
    tarjetaHTML = tarjetaHTML +
        `<div class="flex-fill card card--inicio mx-4 my-2 p-2" style="width: 18rem;">
    <img src="${productoParaCargarHTML.urlImagen}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${productoParaCargarHTML.nombre}</h5>
    <p class="card-text">$ ${productoParaCargarHTML.precio}</p>
    <a  class="btn btn-primary ${btnDeshabilitado}" data-idprod="${indiceBDD}">${disponibilidadStock}</a>
    <a  class="btn btn-primary disabled btnOcultoCard"> Agregado al Carrito</a>
    </div>
    </div>
    `
}

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

function sumarAlCarrito(idProd) {
    let precioProductoSeleccionado = productos[idProd].precio;
    let nombreProductoSeleccionado = productos[idProd].nombre;
    let cantidadItems = sumarObjetoAlCarrito(idProd, nombreProductoSeleccionado, precioProductoSeleccionado, 1);
    $("#badgeCarrito").html(cantidadItems); //jquery
    let textoOld = $("#carrito .modal-bodyProductos").html();
    $("#carrito .modal-bodyProductos").html(textoOld +
        `<div class="row mx-2 mb-2">
            <div class="col-4"> 
                <p>${nombreProductoSeleccionado}</p>
            </div>
            <div class="col-3 p-0 seleccionStock">
                <div class="qty">
                    <button class='minuss rounded-pill btn-outline-dark btn p-1'><i class="fa fa-minus"></i></button>
                    <input type="number" class="count" name="qty" value="1" data-idprod=${idProd} disabled>
                    <button class='pluss rounded-pill btn-outline-dark btn p-1'><i class="fa fa-plus"></i></button>
                </div>
            </div>
            <div class="col-1">
                <span class="font-weight-bold">x</span>
            </div>
            <div class="col-3">
                <p>$${precioProductoSeleccionado}</p>
            </div>
            <div class="col-1">
                <button class='trashh rounded-pill btn-outline-dark btn p-1' data-idprod=${idProd}>
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>`); //jquery
    $("#sumaModalCarrito").html(`La suma de su carrito es: $${getTotal()}`); //jquery
    loadListeners();
}

function loadListeners() {
    $(".pluss").on('click', function () {
        let inputBrother = $(this).siblings('input');
        let idProductoApretado = $(inputBrother).data("idprod");
        $.ajax({
            url: "bdd.json",
            dataType: "json",
            success: function (productos) {
                productos.forEach(element => {
                    if (element.id == idProductoApretado) {
                        if ((inputBrother.val()) < element.stock) {
                            let suma = parseInt(inputBrother.val()) + 1;
                            inputBrother.val(suma).attr('value', suma);
                            actualizarSubtotal(idProductoApretado, suma);
                        }
                    }
                });
            }
        })
    });
    $(".minuss").on('click', function () {
        let inputBrother = $(this).siblings('input');
        let idProductoApretado = $(inputBrother).data("idprod");
        let resta = parseInt(inputBrother.val()) - 1;
        inputBrother.val(resta).attr('value', resta);
        if (inputBrother.val() == 0) {
            inputBrother.val(1).attr('value', parseInt(1));
        } else {
            actualizarSubtotal(idProductoApretado, resta);
        }
    });
    $(".trashh").on('click', function () {
        let idProductoApretado = $(this).data("idprod");
        actualizarSubtotal(idProductoApretado, 0);
        $(this).parents('.row').remove();
        $('a[data-idprod=' + idProductoApretado + ']').siblings("a").fadeOut("fast", function () {
            $(this).siblings("a").fadeIn("slow")
        })
    });
}


//eventos generales
$(function () {
    //evento click abrir carrito
    $('#btnOpenCarrito').on('click', function (event) {
        let carrito = JSON.parse(localStorage.getItem('carrito'));
        if (carrito.length == 0) {
            $("#modal-bodyCarritoVacio").show();
            $("#carrito button[type=submit]").hide();
            $("#modal-bodyCarritoComprado").hide();
        } else {
            $("#modal-bodyCarritoVacio").hide();
            $("#carrito button[type=submit]").show();
            $('#modal-bodyCarritoComprado').hide();
        }
    })

    //evento click inicar compra
    $("#carrito button[type=submit]").on('click', function (event) {
        $('#loader').show();
        setTimeout(function (e) {
            let carrito = JSON.parse(localStorage.getItem('carrito'));
            //proximamente => enviar datos de carrito al backend...
            $('.modal-bodyProductos').hide();
            $('#modal-bodyCarritoComprado').show();
            $("#sumaModalCarrito").hide(); //jquery
            $("#carrito button[type=submit]").hide();
            $('#loader').hide();
        }, 2000)
    })
})