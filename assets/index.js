
/* -------------------------------------------------------------------------------- */
/* --------------------------------- Menú hamburguesa ----------------------------- */
/* -------------------------------------------------------------------------------- */

document.getElementById('navbar-toggler').addEventListener('click', function() {
    const menu = document.getElementById('navbar-menu-id');
    const isActive = menu.classList.toggle('active');
    console.log(isActive)
    
    // Cambiar el icono de hamburguesa a una "X" y viceversa
    this.innerHTML = isActive ? "✖" : "☰"

});


/* -------------------------------------------------------------------------------- */
/* --------------------------------- Renderizado de products ---------------------- */
/* -------------------------------------------------------------------------------- */

let productosFiltrados = [];
let indiceActual = 0;
const productosPorPagina = 8;
const carrito = [];

function filtrarProductos(categoria) {
    indiceActual = 0; // Reinicia el índice al filtrar
    productosFiltrados = categoria === 'Todos' 
        ? productosMarvel 
        : productosMarvel.filter(producto => producto.categoria === categoria);
    
    mostrarProductos();

    // Manejo de clases activas para los botones
    const botones = document.querySelectorAll('.categorias button');
    botones.forEach(button => {
        button.classList.remove('active');
        if (button.innerText === categoria || (categoria === 'Todos' && button.innerText === 'Todos')) {
            button.classList.add('active');
        }
    });
}

function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    const productosAMostrar = productosFiltrados.slice(0, indiceActual + productosPorPagina);
    
    productosAMostrar.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;

        contenedor.appendChild(productoDiv);
    });

    indiceActual += productosPorPagina; 

    // Ocultar el botón "Ver más" si ya se mostraron todos los productos
    const botonVerMas = document.getElementById('loadMore');
    if (indiceActual >= productosFiltrados.length) {
        botonVerMas.style.display = 'none';
    } else {
        botonVerMas.style.display = 'block';
    }
}

function cargarMasProductos() {
    mostrarProductos();
}

/* -------------------------------------------------------------------------------- */
/* --------------------------------- lógica del carrito --------------------------- */
/* -------------------------------------------------------------------------------- */

/* LocalStorange */
//guardar los datos en el localStorange.
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//traer los datos del LocalStorange al cargar la pagina.
function cargarCarrito() {
    const carritoGuardado =localStorage.getItem("carrito");
    if(carritoGuardado){
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarCarrito()
    }
}


function agregarAlCarrito(id) {
    const producto = productosMarvel.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
    abrirModalCarrito();
}

function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        itemDiv.innerHTML = `
        
            <div class="info-item">
                <span>${producto.nombre}</span>
                <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                <span>${producto.cantidad}</span>
                <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>
            <div class="trash">
                <button onclick="eliminarDelCarrito(${producto.id})">🗑️</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
    });

    cartTotal.innerText = total.toFixed(2);
}

function abrirModalCarrito() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('open');
    cartIcon.innerHTML = '❌';

}

function cambiarCantidad(id, delta) {
    const producto = carrito.find(p => p.id === id);
    producto.cantidad += delta;
    
    if (producto.cantidad <= 0) {
        eliminarDelCarrito(id);
    } else {
        actualizarCarrito();
        guardarCarrito();
    }
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
        guardarCarrito();
    }
}

document.getElementById('checkout-btn').addEventListener('click', function() {
    if (carrito.length > 0) {
        alert('Usted ha realizado la compra con éxito.');
        carrito.length = 0; // Vaciar carrito
        actualizarCarrito();
        guardarCarrito();
    } else {
        alert('El carrito está vacío.');
    }
});


// Mostrar todos los productos al cargar la página
filtrarProductos('Todos');
cargarCarrito();

// Lógica para abrir y cerrar el carrito
document.getElementById('cart-icon').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    const isOpen = cartModal.classList.toggle('open');
    this.innerHTML = isOpen ? '❌' : '🛒';
});


document.getElementById('navbar-toggler').addEventListener('click', function() {
    const menu = document.getElementById('navbar-menu');
    const isActive = menu.classList.toggle('active');
    
    // Cambiar el icono de hamburguesa a una "X" y viceversa
    this.innerHTML = isActive ? "✖" : "☰"
});


/* -------------------------------------------------------------------------------- */
/* --------------------------------- Formulario de Contact ------------------------ */
/* -------------------------------------------------------------------------------- */

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
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


