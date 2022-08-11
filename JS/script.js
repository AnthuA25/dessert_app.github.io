// importaciones
// import Swal from 'sweetalert2';



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
function Producto(id, nombre, precio, stock, imagen, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
    this.categoria = categoria;
};

const productoA = new Producto(1, "Pie de Limon", 45, 300, "/image/biscocho.jpg", "Tarta");
const productoB = new Producto(2, "Selva Negra", 38, 400, "/image/biscocho.jpg", "Kekes");
const productoC = new Producto(3, "Cupcakes", 38, 100, "/image/biscocho.jpg", "Bocaditos");
const productoD = new Producto(4, "Alfajores", 25, 500, "/image/biscocho.jpg", "Bocaditos")
const productoE = new Producto(5, "Pie de Manzana", 25, 500, "/image/biscocho.jpg", "Tarta")
const productoF = new Producto(6, "Brownies", 25, 500, "/image/biscocho.jpg", "Bocaditos")
const productoG = new Producto(7, "Torta la Sirenita", 25, 500, "/image/biscocho.jpg", "Tortas-Decorativas")
const productoH = new Producto(8, "Torta de Mickey Mouse", 25, 500, "/image/biscocho.jpg", "Tortas-Decorativas")
const productoI = new Producto(9, "Keke de Zanahoria", 25, 500, "/image/biscocho.jpg", "Kekes")


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

// -------------------------------
// Variables

let listaDeseos = [];
let carrito = [];
const CONTAINERCard = document.getElementById('store');
const CONTAINERList = document.getElementById("add-lists")
const DOMCarrito = document.querySelector(".shopping");
const DOMTotal = document.querySelector("#total");


// ------------------------------------------------
// Catalogo de Productos
function renderizarProductos(products) {
    CONTAINERCard.innerText = " ";
    products.forEach((producto) => {
        if (producto.stock != 0) {
            const card = document.createElement("div");
            card.classList.add('box-product');
            card.innerHTML = `<button id="butttonList" class="fas fa-heart"></button>
            <img src=${producto.imagen} alt="" />`;

            const detail = document.createElement("div");
            detail.classList.add('details');

            const title = document.createElement("h3");
            title.innerText = producto.nombre;

            const precio = document.createElement("span")
            precio.innerText = `S/.${producto.precio}`;

            const miBoton = document.createElement("button");
            miBoton.classList.add("button-store");
            miBoton.innerText = `Agregar a Carrito`;
            miBoton.setAttribute("marcador", producto.id);
            miBoton.addEventListener("click", anadirProductoAlCarrito);

            card.append(detail);
            detail.append(title);
            detail.append(precio);
            detail.append(miBoton);
            CONTAINERCard.append(card);
        }
    })


}

renderizarProductos(listaProductos)

// ---------------------------------------------
// Agregar productos al Carrito
function anadirProductoAlCarrito(e) {
    carrito.push(e.target.getAttribute('marcador'));
    renderizarCarrito();
    guardarCarritoEnLocalStorage();

}

function renderizarCarrito() {

    DOMCarrito.innerText = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = listaProductos.filter((productoBaseDatos) => {
            return productoBaseDatos.id === parseInt(item);
        });

        const numeroUnidades = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const cartOrder = document.createElement("div");
        cartOrder.classList.add('cart-order');

        const cartImage = document.createElement("div");
        cartImage.classList.add("cart-image")
        cartImage.innerHTML = `<img src=${miItem[0].imagen} alt="productos"/>`

        const cartDescription = document.createElement("div");
        cartDescription.classList.add("cart-description");
        cartDescription.innerHTML = `<h3>${miItem[0].nombre}</h3>
                                                    <span class="quantity">Cantidad: ${numeroUnidades}</span>
                                                    <p>S/.${miItem[0].precio}</p>`

        const cartButton = document.createElement("div");
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = 'X';
        botonEliminar.dataset.item = item;
        botonEliminar.addEventListener("click", borrarProductoCarrito);

        cartOrder.append(cartImage);
        cartOrder.append(cartDescription);
        cartOrder.append(cartButton);
        cartButton.append(botonEliminar)
        DOMCarrito.appendChild(cartOrder)
    });
    DOMTotal.innerText = calcularTotal();

}


function borrarProductoCarrito(e) {
    const id = e.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = listaProductos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}





// ---------------------------------------------
// Busqueda de Productos

let productoBuscar = document.getElementById('nombre-producto');
productoBuscar.addEventListener("input", inputProducto);

function inputProducto(e) {
    productoBuscar.value = e.target.value;
}


let botonBuscar = document.getElementById("buscar");
botonBuscar.addEventListener("click", buscarProducto);

function buscarProducto(e) {
    e.preventDefault();
    let productosEncontrados = [];
    let busquedaProducto = listaProductos.find(producto => producto.nombre === productoBuscar.value);
    productosEncontrados.push(busquedaProducto);
    renderizarProductos(productosEncontrados);
}


// ---------------------------------------------
// Filtrado por Precio

const filtrarPrecio = () => {
    // let filtrar = parseInt(prompt("Ingrese el precio a buscar"))

    // let busquedaPrecio = listaProductos.filter(producto => producto.precio === filtrar)
    // return busquedaPrecio
}

// console.log(filtrarPrecio())



// ---------------------------------------------
// Filtrar por  Categorias
const categorias = Array.from(document.getElementById('categories-lists').children);

categorias.forEach((categoria) => {
    categoria.addEventListener("click", filtrarCategoria)
});

function filtrarCategoria(e) {
    e.preventDefault();
    let option = e.target.id;
    let filtroCategoria = listaProductos.filter(producto => producto.categoria === option);
    renderizarProductos(filtroCategoria);
}













