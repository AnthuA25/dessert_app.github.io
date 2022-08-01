
// const ham = document.querySelector('.ham');
// const enlaces = document.querySelector('.link-menu');

// ham.addEventListener('click', () => {
//     enlaces.classList.toggle('activado');
// })

const cart = document.getElementById('cart-shopping-icons');
// console.log(cart)
const order = document.querySelector('.shopping-cart')
console.log(order)

cart.addEventListener('click',() =>{
    order.classList.toggle('activado')
})

function Producto(nombre, precio, stock, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
};

const productoA = new Producto("Pie de Limon", 45, 300, "/image/biscocho.jpg");
const productoB = new Producto("Selva Negra", 38, 400, "/image/biscocho.jpg");
const productoC = new Producto("Cupcakes", 38, 100, "/image/biscocho.jpg");
const productoD = new Producto("Alfajores", 25, 500, "/image/biscocho.jpg")
const productoE = new Producto("Pie de Manzana", 25, 500, "/image/biscocho.jpg")
const productoF = new Producto("Brownies", 25, 500, "/image/biscocho.jpg")
const productoG = new Producto("Brownies", 25, 500, "/image/biscocho.jpg")
const productoH = new Producto("Brownies", 25, 500, "/image/biscocho.jpg")
const productoI = new Producto("Brownies", 25, 500, "/image/biscocho.jpg")

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


for (const producto of listaProductos) {
    if (producto.stock != 0) {
        
        let container = document.getElementById('store')
        let card = document.createElement('div');
        let detail = document.createElement('div')
        card.className = 'box-product';
        container.appendChild(card)
        card.innerHTML =`<a href="#" class="fas fa-heart"></a>
        <img src=${producto.imagen} alt="" />`
        card.appendChild(detail);
        detail.className = 'details'
        detail.innerHTML =` <h3>${producto.nombre}</h3>
        <span>S/.${producto.precio}</span><br/>
        <button class="button-store">Agregar a Carrito</button>`
    }
}

let nombresProductos = [];

const listarProductos = () => {
    for (const producto of listaProductos) {
        nombresProductos.push(producto.nombre)
    }
}
listarProductos();

// let cantidadAComprar = prompt("Ingrese cantidad de productos a comprar");
let precioTotal = 0;

function calcularPrecio(cantidad, precio) {
    precioTotal += cantidad * precio;
}

function calcularStock(cantidad, producto) {
    if (producto.stock >= cantidad) {
        calcularPrecio(cantidad, producto.precio)
        alert("El precio total es de: S/." + (cantidad * producto.precio))
    } else {
        alert("No contamos con stock disponible. Nuestro stock actual es de: " + producto.stock + " unidades")
    }
}

let productoSeleccionado = [];

for (let i = 0; i < cantidadAComprar; i++) {
    // var compraProducto = prompt("Ingrese nombre del producto:\n " + nombresProductos.join("\n "));
    // let cantidadProductos = prompt("Ingrese cantidad de productos a comprar");
    productoSeleccionado.push(compraProducto);
    if (compraProducto === productoA.nombre) {
        calcularStock(cantidadProductos, productoA);
    } else if (compraProducto === productoB.nombre) {
        calcularStock(cantidadProductos, productoB);
    } else if (compraProducto === productoC.nombre) {
        calcularStock(cantidadProductos, productoC)
    } else if (compraProducto === productoD.nombre) {
        calcularStock(cantidadProductos, productoD)
    } else {
        alert("No tenemos ese producto")
    }
}


alert(`Productos seleccionados :\n ${productoSeleccionado} \n  Este es el precio total de S/:  ${precioTotal}`);


const buscarProducto = () => {
    let busqueda = prompt("Buscar Producto");
    let busquedaProducto = listaProductos.find(producto => producto.nombre === busqueda);
    return busquedaProducto
    // console.log(busquedaProducto);
}

console.log(buscarProducto());

const filtrarPrecio = () => {
    let filtrar = parseInt(prompt("Ingrese el precio a buscar"))

    let busquedaPrecio = listaProductos.filter(producto => producto.precio === filtrar)
    return busquedaPrecio
}

console.log(filtrarPrecio())


















