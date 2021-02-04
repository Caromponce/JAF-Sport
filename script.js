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
var productosBDD = [{
        'nombre': 'Short con calza',
        'urlImagen': 'res/shortConCalza2.jpg',
        'precio': 2200,
        'stock': 5
    },
    {
        'nombre': 'Top deportivo turqueza',
        'urlImagen': 'res/topDeportivoTurquesa.jpg',
        'precio': 1200,
        'stock': 0
    },
    {
        'nombre': 'Short calza',
        'urlImagen': 'res/shortCalza.jpg',
        'precio': 1400,
        'stock': 8
    }
];

var tarjetaHTML = '';

var productos = [];
for (let indiceBDD = 0; indiceBDD < productosBDD.length; indiceBDD++) {
    let producto = new Producto(productosBDD[indiceBDD]['nombre'], productosBDD[indiceBDD]['urlImagen'], productosBDD[indiceBDD]['precio'], productosBDD[indiceBDD]['stock']);
    productos.push(producto);
    cargarTarjetas(producto, indiceBDD);
}
var containerTarjetas = document.getElementById('containerTarjetas');
containerTarjetas.innerHTML = tarjetaHTML;
var carritoPrecio = 0;

var objetosCarritos = [];

function sumarAlCarrito(indice) {
    productos[indice].sumarPrecio();
    objetosCarritos.push(productos[indice]);
    console.log(`La suma de su carrito es: ${carritoPrecio}`);
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
                <p class="card-text">${productoParaCargarHTML.precio}</p>
                <a href="#" class="btn btn-primary ${btnDeshabilitado}" onclick="sumarAlCarrito(${indiceBDD})">${disponibilidadStock}</a>
            </div>
        </div>
`
}