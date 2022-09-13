

// ------------------------------------------


// Estructura Objetos
function Producto(id, nombre, precio, stock, imagen, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
    this.categoria = categoria;
    this.cantidad = 1;
};



// -------------------------------
// Variables

let listaPost = [];
let listaDeseos = [];
let carrito = [];
let carritoCompleto = [];
const CONTAINERCard = document.getElementById('store');
const DOMCarrito = document.querySelector(".shopping");
const DOMTotal = document.querySelector("#total");
const procesarPedidoBtn = document.getElementById('procesar-pedido');
const cart = document.getElementById('cart-shopping-icons');
const order = document.querySelector('.shopping-cart');
const btnPedido = document.getElementById('procesar-pedido');

procesarPedidoBtn.addEventListener("click", procesarPedido)
cart.addEventListener('click', () => {
    order.classList.toggle('activado')
})

fetch("../data/productos.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data.length)
        for (const producto of data) {
            listaPost.push(new Producto(producto.id, producto.nombre, producto.precio, producto.stock, producto.imagen, producto.categoria));
        }
        renderizarProductos(listaPost)
    })

const getTotal = () => {
    let total = 0;
    let resultado = "";
    carrito.forEach((item) => {

        total += item.precio * 1;
    });
    carrito
        .map(
            (item, index) =>
                resultado +=
                `(${index + 1}) Nombre: ${item.nombre}, cantidad : ${item.cantidad
                }, con un precio de S/ ${item.precio}.`
        )
    let final = ` Con un total de S/ ${total}`;
    return resultado + final;
}




// ------------------------------------------------
// Catalogo de Productos
function renderizarProductos(products) {
    CONTAINERCard.innerText = "";
    products.forEach((producto) => {
        if (producto.stock != 0) {
            const card = document.createElement("div");
            card.classList.add('box-product');
            card.innerHTML = `
                        <img src=${producto.imagen} alt="" />
                        <button id="listar${producto.id}" class="fas fa-heart"></button>`;


            const detail = document.createElement("div");
            detail.classList.add('details');
            detail.innerHTML = `<h3>${producto.nombre}</h3>
                                    <span>S/${producto.precio}</span>
                <button id="comprarbtn${producto.id}" class="button-store">Agregar a Carrito</button>`
            // card.append(listHeart);
            card.append(detail);

            CONTAINERCard.append(card);

            const botonComprar = document.getElementById(`comprarbtn${producto.id}`);
            botonComprar.addEventListener("click", () => {
                anadirProductoAlCarrito(producto.id)
            });
        }
    })

}

// ---------------------------------------------
// Agregar productos al Carrito
function anadirProductoAlCarrito(productoNuevo) {
    const productoId = listaPost.find(producto => producto.id == productoNuevo);
    carrito.push(productoId)
    Swal.fire({
        title: 'Producto agregado al carrito',
        icon: 'success',
        confirmButtonText: 'Cerrar',
        background: '#854747',
        color: 'white',
    })
    renderizarCarrito();
}


function renderizarCarrito() {
    DOMCarrito.innerText = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const numeroUnidades = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const cartOrder = document.createElement("div");
        cartOrder.classList.add('cart-order');
        cartOrder.innerHTML = `<div class="cart-image">
                                    <img src=${item.imagen} alt=""/>
                                </div>
                                <div class="cart-description">
                                    <h3>${item.nombre}</h3>
                                    <span class="quantity">Cantidad: ${numeroUnidades}</span>
                                    <p>S/.${item.precio}</p>
                                </div>
                                <div>
                                <button onclick ="borrarProductoCarrito(${item.id})">X</button>
                                </div>`
        DOMCarrito.appendChild(cartOrder);
        guardarCarritoEnLocalStorage();
    });
    DOMTotal.innerText = calcularTotal();
}




function borrarProductoCarrito(id) {
    carrito = carrito.filter((producto) => producto.id !== id)
    // carrito = carrito.filter((carritoId) => {
    //     return carritoId !== id;
    // });
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        return total + item.precio;
    }, 0).toFixed(2);
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function obtenerCarritoEnLocalStorage() {
    let productos;
    if (localStorage.getItem('carrito') === null) {
        productos = [];
    } else {
        productos = JSON.parse(localStorage.getItem('carrito'));
    }
    return productos;
}

function procesarPedido(e) {
    e.preventDefault();
    if (obtenerCarritoEnLocalStorage().length === 0) {
        Swal.fire({
            title: '¡El carrito esta vacío!',
            icon: 'warning',
            confirmButtonText: 'Cerrar',
            background: '#854747',
            color: 'white',
        });
    } else {
        location.href = `https://api.whatsapp.com/send?phone=998419770&text=Buen día. He revisado su página dessetApp: ${getTotal()}`;
    }
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
    let busquedaProducto = listaPost.find(producto => producto.nombre === productoBuscar.value);
    if (busquedaProducto) {
        productosEncontrados.push(busquedaProducto);
        renderizarProductos(productosEncontrados);
        productoBuscar.value = ""
    } else {
        Swal.fire({
            title: 'Producto no encontrado',
            icon: 'warning',
            confirmButtonText: 'Cerrar',
            background: '#854747',
            color: 'white',
        })
    }
}


// ---------------------------------------------
// Filtrado por Precio

const filtros = Array.from(document.getElementById('btn-price').children);
filtros.forEach((filtro) => {
    filtro.addEventListener("click", filtrarPorPrecio)
});

function filtrarPorPrecio(e) {
    e.preventDefault();
    let option = e.target.id;
    let filtroPrecio = option === "ascendente" ?
        listaPost.sort((a, b) => {
            return a.precio - b.precio;
        }) : listaPost.sort((a, b) => {
            return b.precio - a.precio;
        });
    renderizarProductos(filtroPrecio);
}






// ---------------------------------------------
// Filtrar por  Categorias
const categorias = Array.from(document.getElementById('categories-lists').children);
categorias.forEach((categoria) => {
    categoria.addEventListener("click", filtrarCategoria)
});

function filtrarCategoria(e) {
    e.preventDefault();
    let option = e.target.id;
    let filtroCategoria = listaPost.filter(producto => producto.categoria === option);
    renderizarProductos(filtroCategoria);
}


// resetearFiltros
const resetoFiltros = document.getElementById("Reseteo");

resetoFiltros.addEventListener("click", () => {
    renderizarProductos(listaPost);
})



