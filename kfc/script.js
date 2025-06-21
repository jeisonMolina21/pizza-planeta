// Cargar más productos
let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 4;

if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
        let boxes = [...document.querySelectorAll(".box-container .box")];
        for (let i = currentItem; i < currentItem + 4; i++) {
            if (boxes[i]) {
                boxes[i].style.display = 'inline-block';
            }
        }
        currentItem += 4;
        if (currentItem >= boxes.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Carrito de compras
const carrito = document.getElementById("carrito");
const elementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");

// Inicializar carrito
cargarEventListeners();

function cargarEventListeners() {
    if (elementos1) {
        elementos1.addEventListener("click", comprarElemento);
    }
    
    if (carrito) {
        carrito.addEventListener("click", eliminarElemento);
    }
    
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    }
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector("img").src,
        titulo: elemento.querySelector("h3").textContent,
        precio: elemento.querySelector(".precio").textContent,
        id: elemento.querySelector("a").getAttribute("data-id")
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100" />
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">x</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar")) {
        e.target.parentElement.parentElement.remove();
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

// Mostrar solo los primeros 4 productos inicialmente
document.addEventListener("DOMContentLoaded", function() {
    let boxes = document.querySelectorAll(".box-container .box");
    for (let i = 4; i < boxes.length; i++) {
        boxes[i].style.display = 'none';
    }
});
