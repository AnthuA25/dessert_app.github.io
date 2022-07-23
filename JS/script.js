
// function Producto(nombre, precio, stock) {
//     this.nombre = nombre;
//     this.precio = precio;
//     this.stock = stock;
// };

// const productoA = new Producto("Pie de Limon", 45, 300);
// const productoB = new Producto("Selva Negra", 38, 400);
// const productoC = new Producto("Cupcakes", 38, 100);
// const productoD = new Producto("Brownies", 25, 500)

// let listaProductos = [
//     productoA,
//     productoB,
//     productoC,
//     productoD
// ]

// let nombresProductos = [];

// const listarProductos = () =>{
//     for(const producto of listaProductos){
//         nombresProductos.push(producto.nombre)
//     }
// }
// listarProductos();


// let cantidadAComprar = prompt("Ingrese cantidad de productos a comprar");
// let precioTotal = 0;

// function calcularPrecio(cantidad, precio) {
//     precioTotal += cantidad * precio;
// }

// function calcularStock(cantidad, producto) {
//     if (producto.stock >= cantidad) {
//         calcularPrecio(cantidad, producto.precio)
//         alert("El precio total es de: S/." + (cantidad * producto.precio))
//     } else {
//         alert("No contamos con stock disponible. Nuestro stock actual es de: " + producto.stock + " unidades")
//     }
// }

// let productoSeleccionado = [];

// for (let i = 0; i < cantidadAComprar; i++) {
//     var compraProducto = prompt("Ingrese nombre del producto:\n "  + nombresProductos.join("\n "));
//     let cantidadProductos = prompt("Ingrese cantidad de productos a comprar");
//     productoSeleccionado.push(compraProducto);
//     if (compraProducto === productoA.nombre.toLowerCase()) {
//         calcularStock(cantidadProductos, productoA);
//     } else if (compraProducto === productoB.nombre.toLowerCase()) {
//         calcularStock(cantidadProductos, productoB);
//     } else if (compraProducto === productoC.nombre.toLowerCase()) {
//         calcularStock(cantidadProductos, productoC)
//     } else if (compraProducto === productoD.nombre.toLowerCase()) {
//         calcularStock(cantidadProductos, productoD)
//     } else {
//         alert("No tenemos ese producto")
//     }
// }


// alert("Productos seleccionados :\n" + productoSeleccionado+ "\n"+ "Este es el precio total de S/: "+ precioTotal);




















