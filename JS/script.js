


// ------------------------------------------


// Estructura Objetos
function Producto(id, nombre, precio, stock, imagen, categoria, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
    this.categoria = categoria;
    this.cantidad = cantidad;
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

cart.addEventListener('click', () => {
    order.classList.toggle('activado')
})

const getTotal = () => {
    let total = 0;
    let resultado = "";
    console.log("CARRITO", carritoCompleto)
    carritoCompleto.forEach((item) => {

        total += item[0].precio * 1;
    });
    carritoCompleto
        .map(
            (item, index) =>
                resultado +=
                `(${index + 1}) Nombre: ${item[0].nombre}, cantidad : ${item[0].cantidad
                }, con un precio de S/ ${item[0].precio}.`
        )
    let final = ` Con un total de S/ ${total}`;
    return resultado + final;
}

fetch("../data/productos.json")
    .then((response) => response.json())
    .then((data) => {
        for (const producto of data) {
            listaPost.push(new Producto(producto.id, producto.nombre, producto.precio, producto.stock, producto.imagen, producto.categoria));
        }
        renderizarProductos(listaPost)
    })

procesarPedidoBtn.addEventListener("click", procesarPedido)


// ------------------------------------------------
// Catalogo de Productos
function renderizarProductos(products) {
    CONTAINERCard.innerText = "";
    products.forEach((producto) => {
        if (producto.stock != 0) {
            const card = document.createElement("div");
            card.classList.add('box-product');
            card.innerHTML = `
                    <img src=${producto.imagen} alt="" />`;

            const listHeart = document.createElement("button");
            listHeart.classList.add("fas");
            listHeart.classList.add("fa-heart");


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

            card.append(listHeart);
            card.append(detail);
            detail.append(title);
            detail.append(precio);
            detail.append(miBoton);
            CONTAINERCard.append(card);
        }
    })

}
// ---------------------------------------------
// Agregar productos al Carrito
function anadirProductoAlCarrito(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Producto agregado al carrito',
        icon: 'success',
        confirmButtonText: 'Cerrar',
        background: '#854747',
        color: 'white',
    })

    carrito.push(e.target.getAttribute("marcador"));
    console.log(carrito)
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}


function renderizarCarrito() {
    DOMCarrito.innerText = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = listaPost.filter((productoBaseDatos) => {
            return productoBaseDatos.id === parseInt(item);
        });
        const numeroUnidades = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        miItem[0].cantidad = numeroUnidades;
        carritoCompleto.push(miItem);
        console.log("unidades", carritoCompleto)
        const cartOrder = document.createElement("div");
        cartOrder.classList.add('cart-order');

        const cartImage = document.createElement("div");
        cartImage.classList.add("cart-image")
        cartImage.innerHTML = `<img src=${miItem[0].imagen} alt=""/>`

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
        const miItem = listaPost.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
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

const filtros = document.querySelectorAll('input[name="filter_price"]');
console.log("DD",filtros)
filtros.forEach((filtro) => {
    filtro.addEventListener("click", filtrarPorPrecio)
});

function filtrarPorPrecio(e) {
    e.preventDefault();
    let option = e.target.value;
    console.log(option)
    let filtroPrecio = option === "ascendente" ? 
    listaPost.sort((a,b) => {
        return a.precio - b.precio;
    }) : listaPost.sort((a,b) => {
        return  b.precio - a.precio;
    })
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










// })    
