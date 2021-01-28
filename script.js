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

let producto1 = new Producto('Short con calza', 'res/shortConCalza2.jpg', 2200, 5);
let producto2 = new Producto('Top deportivo turqueza', 'res/topDeportivoTurquesa.jpg', 1200, 6);
let producto3 = new Producto('Short calza', 'res/shortCalza.jpg', 1400, 8);

var carritoPrecio = 0;

var productos = [producto1, producto2, producto3];
var objetosCarritos = [];

function sumarAlCarrito(indice) {
    productos[indice].sumarPrecio();
    objetosCarritos.push(productos[indice]);
    console.log(`La suma de su carrito es: ${carritoPrecio}`);
}