class Producto {
    constructor(nombreParam, urlImagenParam, precioParam, stockParam) {
        this.nombre = nombreParam;
        this.urlImagen = urlImagenParam;
        this.precio = precioParam;
        this.stock = stockParam;
    }
    sumarPrecio() {
        carrito = carrito + this.precio;
    }
}

let producto1 = new Producto('Short con calza', 'res/shortConCalza2.jpg', 2200, 5);

var carrito = 0;

function sumarAlCarrito() {
    producto1.sumarPrecio();
    console.log(`La suma de su carrito es: ${carrito}`);
}