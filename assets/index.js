
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





/* -------------------------------------------------------------------------------- */
/* --------------------------------- Formulario de Contact ------------------------ */
/* -------------------------------------------------------------------------------- */

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    // Limpiar mensajes de error
    let hasError = false;
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('successMessage').textContent = '';

    // Validación del campo nombre
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').textContent = 'El nombre es obligatorio.';
        hasError = true;
    }

    // Validación del campo correo electrónico
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'El correo electrónico es obligatorio.';
        hasError = true;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Introduce un correo electrónico válido.';
        hasError = true;
    }

    // Validación del campo mensaje
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('messageError').textContent = 'El mensaje es obligatorio.';
        hasError = true;
    }

    // Mostrar mensaje de éxito si no hay errores
    if (!hasError) {
        document.getElementById('successMessage').textContent = 'El formulario ha sido enviado con éxito.';
        // Opcional: Aquí podrías enviar el formulario usando Fetch API o XMLHttpRequest si fuera necesario.
        document.getElementById('contactForm').reset(); // Reinicia el formulario
    }
});


