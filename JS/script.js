
let nombreProductoA = "Pie de Limon";
let precioProductoA = 45;
let stockProductoA = 300;

let nombreProductoB = "Selva Negra";
let precioProductoB = 38;
let stockProductoB = 400;

let nombreProductoC = "Cupcakes";
let precioProductoC = 38;
let stockProductoC = 100;

let nombreProductoD = "Brownies";
let precioProductoD = 25;
let stockProductoD = 500;

let cantidadAComprar = prompt("Ingrese cantidad de productos a comprar");
let precioTotal = 0;

function calcularPrecio(cantidad, precio) {
    precioTotal += cantidad * precio;
}

function calcularStock(cantidad, stock, precio) {
    if (stock >= cantidad) {
        calcularPrecio(cantidad, precio)
        alert("El precio total es de: S/." + (cantidad * precio))
    } else {
        alert("No contamos con stock disponible. Nuestro stock actual es de: " + stock + " unidades")
    }
}

for (let i = 0; i < cantidadAComprar; i++) {
    var compraProducto = prompt("Ingrese nombre del producto:\n- Pie de Limon\n- Selva Negra\n- Cupcakes\n- Brownies");
    let cantidadProductos = prompt("Ingrese cantidad de productos a comprar");
    if (compraProducto === 'Pie de Limon') {
        calcularStock(cantidadProductos, stockProductoA, precioProductoA);
    } else if (compraProducto === 'Selva Negra') {
        calcularStock(cantidadProductos, stockProductoB, precioProductoB);
    } else if (compraProducto === 'Cupcakes') {
        calcularStock(cantidadProductos, stockProductoC, precioProductoC)
    } else if (compraProducto ==='Brownies') {
        calcularStock(cantidadProductos, stockProductoD, precioProductoD)
    } else {
        alert("No tenemos ese producto")
    }
}

alert("Este es el precio total es de S/: " + precioTotal);







