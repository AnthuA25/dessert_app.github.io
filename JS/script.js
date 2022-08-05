
// const ham = document.querySelector('.ham');
// const enlaces = document.querySelector('.link-menu');

// ham.addEventListener('click', () => {
//     enlaces.classList.toggle('activado');
// })

const cart = document.getElementById('cart-shopping-icons');
const order = document.querySelector('.shopping-cart')

cart.addEventListener('click', () => {
    order.classList.toggle('activado')
})


// ------------------------------------------
// Estructura Objetos
function Producto(id,nombre, precio, stock, imagen, categoria) {
    this.id = id,
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
    this.categoria = categoria;
};

const productoA = new Producto(1,"Pie de Limon", 45, 300, "/image/biscocho.jpg", "Tarta");
const productoB = new Producto(2,"Selva Negra", 38, 400, "/image/biscocho.jpg", "Keke");
const productoC = new Producto(3,"Cupcakes", 38, 100, "/image/biscocho.jpg", "Bocaditos");
const productoD = new Producto(4,"Alfajores", 25, 500, "/image/biscocho.jpg", "Bocaditos")
const productoE = new Producto(5,"Pie de Manzana", 25, 500, "/image/biscocho.jpg", "Tarta")
const productoF = new Producto(6,"Brownies", 25, 500, "/image/biscocho.jpg", "Bocaditos")
const productoG = new Producto(7,"Torta la Sirenita", 25, 500, "/image/biscocho.jpg", "Tortas Decorativas")
const productoH = new Producto(8,"Brownies", 25, 500, "/image/biscocho.jpg", "Tortas Decorativas")
const productoI = new Producto(9,"Keke de Zanahoria", 25, 500, "/image/biscocho.jpg", "Keke")
console.log(productoA)
let listaProductos = [
    productoA,
    productoB,
    productoC,
    productoD,
    productoE,
    productoF,
    productoG,
    productoH,
    productoI
]


// ------------------------------------------------
// Catalogo de Productos
for (const producto of listaProductos) {
    if (producto.stock != 0) {

        let container = document.getElementById('store')
        let card = document.createElement('div');
        card.className = 'box-product';
        card.innerHTML = `<a href="#" class="fas fa-heart"></a>
        <img src=${producto.imagen} alt="" />`
        let detail = document.createElement('div')
        detail.className = 'details'
        detail.innerHTML = ` <h3>${producto.nombre}</h3>
        <span>S/.${producto.precio}</span><br/>`
        let addToCart = document.createElement('button')
        addToCart.innerText = 'Agregar a Carrito'
        addToCart.className = 'button-store'
        card.appendChild(detail);
        container.appendChild(card)
        detail.appendChild(addToCart)
    }
}


// ---------------------------------------------
// Agregar productos al Carrito
let carrito = [];

// Filtrar por  Categorias
// let tortas = document.getElementById('tortas')
// tortas.addEventListener("click", filtrarCategoria)

// function filtrarCategoria() {
//     let listaA = listaProductos.filter((producto) => producto.categoria === "Tortas Decorativas")
//     // console.log(listaA)

//     // listaA.innerHTML = ""
//     for (const producto of listaA) {
//         if (producto.stock != 0) {
//             let container = document.getElementById('store')
//             let card = document.createElement('div');
//             let detail = document.createElement('div')
//             let addToCart = document.createElement('button')
//             card.className = 'box-product';
//             container.appendChild(card)
//             card.innerHTML = `<a href="#" class="fas fa-heart"></a>
//             <img src=${producto.imagen} alt="" />`
//             card.appendChild(detail);
//             detail.className = 'details'
//             detail.innerHTML = ` <h3>${producto.nombre}</h3>
//             <span>S/.${producto.precio}</span><br/>`
//             addToCart.innerText = 'Agregar a Carrito'
//             addToCart.className = 'button-store'
//             detail.appendChild(addToCart)
//         }
//     }
// }




// let nombresProductos = [];

// const listarProductos = () => {
//     for (const producto of listaProductos) {
//         nombresProductos.push(producto.nombre)
//     }
// }
// listarProductos();

// let cantidadAComprar = prompt("Ingrese cantidad de productos a comprar");
//let precioTotal = 0;

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
//     // var compraProducto = prompt("Ingrese nombre del producto:\n " + nombresProductos.join("\n "));
//     // let cantidadProductos = prompt("Ingrese cantidad de productos a comprar");
//     productoSeleccionado.push(compraProducto);
//     if (compraProducto === productoA.nombre) {
//         calcularStock(cantidadProductos, productoA);
//     } else if (compraProducto === productoB.nombre) {
//         calcularStock(cantidadProductos, productoB);
//     } else if (compraProducto === productoC.nombre) {
//         calcularStock(cantidadProductos, productoC)
//     } else if (compraProducto === productoD.nombre) {
//         calcularStock(cantidadProductos, productoD)
//     } else {
//         alert("No tenemos ese producto")
//     }
// }


// alert(`Productos seleccionados :\n ${productoSeleccionado} \n  Este es el precio total de S/:  ${precioTotal}`);                       

// Busqueda de Productos
let productoBuscar = document.getElementById('form-search');
let iconoBuscador = document.getElementById('buscar')
const buscarProducto = (e) => {
    let busquedaProducto = listaProductos.find(producto => producto.nombre === productoBuscar);
    // console.log(productoBuscar)
}




const filtrarPrecio = () => {
    // let filtrar = parseInt(prompt("Ingrese el precio a buscar"))

    // let busquedaPrecio = listaProductos.filter(producto => producto.precio === filtrar)
    // return busquedaPrecio
}

// console.log(filtrarPrecio())


















