
/* -------------------------------------------------------------------------------- */
/* --------------------------------- Menú hamburguesa ----------------------------- */
/* -------------------------------------------------------------------------------- */

document.getElementById('navbar-toggler').addEventListener('click', function() {
    const menu = document.getElementById('navbar-menu');
    const isActive = menu.classList.toggle('active');
    
    // Cambiar el icono de hamburguesa a una "X" y viceversa
    this.innerHTML = isActive ? "✖" : "☰"
    // Cambia según el estado del menú
});


/* -------------------------------------------------------------------------------- */
/* --------------------------------- Renderizado de products ---------------------- */
/* -------------------------------------------------------------------------------- */


let currentIndex = 0;
const itemsPerPage = 8;
const productsSection = document.getElementById('products');
const loadMoreButton = document.getElementById('loadMore');

function loadProducts() {
    const nextIndex = currentIndex + itemsPerPage;
    const productsToLoad = productosMarvel.slice(currentIndex, nextIndex);

    productsToLoad.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <button>Añadir al carrito</button>
        `;

        productsSection.appendChild(productDiv);
    });

    currentIndex = nextIndex;

    // Deshabilitar el botón si no quedan más productos
    if (currentIndex >= productosMarvel.length) {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'No hay más productos';
    }
}

// Cargar los primeros productos al inicio
loadProducts();

// Añadir evento al botón "Ver más"
loadMoreButton.addEventListener('click', loadProducts);






