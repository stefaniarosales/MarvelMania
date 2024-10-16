
/* -------------------------------------------------------------------------------- */
/* --------------------------------- Menú hamburguesa ----------------------------- */
/* -------------------------------------------------------------------------------- */
//Lógica para abrir y cerrar el menú hamburguesa
document.getElementById('navbar-toggler').addEventListener('click', function() {
    const menu = document.getElementById('navbar-menu-id');
    const isActive = menu.classList.toggle('active');
    
    // Cambiar el icono de hamburguesa a una "X" y viceversa
    this.innerHTML = isActive ? "✖" : "☰"
});

/* //Lógica para abrir y cerrar el menú hamburguesa
document.getElementById('navbar-toggler').addEventListener('click', function() {
    const menu = document.getElementById('navbar-menu');
    const isActive = menu.classList.toggle('active');
    
    // Cambiar el icono de hamburguesa a una "X" y viceversa
    this.innerHTML = isActive ? "✖" : "☰"
});
 */
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
    ocultarElementosFueraDeLaVista();
}

function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    console.log(cartCount)

    cartItems.innerHTML = '';

    let total = 0;
    let cantidadTotalProductos = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        cantidadTotalProductos += producto.cantidad;

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
    cartCount.innerText = cantidadTotalProductos;

    // Comprobar si el carrito está vacío
    if (carrito.length === 0) {
        cartItems.style.display = 'none'; // Ocultar el contenedor si está vacío
    } else {
        cartItems.style.display = 'block'; // Mostrar el contenedor si tiene productos
    }
}

function abrirModalCarrito() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.add('open'); // Agrega la clase para mostrar el modal
    }
}

function cambiarCantidad(id, delta) {
    const producto = carrito.find(p => p.id === id);
    
    if (producto) {
        producto.cantidad += delta;

        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            actualizarCarrito();
            guardarCarrito();
        }
    }
    event.stopPropagation();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
        guardarCarrito();
        ocultarElementosFueraDeLaVista();
    }
    event.stopPropagation();
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
    cartModal.classList.toggle('open');
}); 


// Función para ocultar los items fuera de la vista
function ocultarElementosFueraDeLaVista() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartModal = document.getElementById('cart-items')

    cartItems.forEach(item => {
        if (item.offsetTop > cartModal.clientHeight) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
}
// Llamar a la función cuando se cambia el tamaño de la ventana
window.addEventListener('resize', ocultarElementosFueraDeLaVista);

//cerrar el carrito y el menu si estos se encuentran abiertos
document.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const navbarMenu = document.getElementById('navbar-menu-id');
    const navbarToggler = document.getElementById('navbar-toggler');
    const addToCartButtons = document.querySelectorAll('button[onclick^="agregarAlCarrito"]');

    // Verificar si el clic fue dentro del carrito o el ícono del carrito
    const isClickInsideCart = cartModal.contains(e.target) || cartIcon.contains(e.target);

    // Verificar si el clic fue en un botón de "Agregar al carrito"
    let isClickAddToCart = false;
    addToCartButtons.forEach(button => {
        if (button.contains(e.target)) {
            isClickAddToCart = true;
        }
    });

    // Cerrar el carrito solo si el clic fue fuera del carrito y no en "Agregar al carrito"
    if (cartModal.classList.contains('open') && !isClickInsideCart && !isClickAddToCart) {
        cartModal.classList.remove('open');
    }

    // Verificar si el clic fue fuera del menú de navegación
    const isClickInsideNavbar = navbarMenu.contains(e.target) || navbarToggler.contains(e.target);

    // Cerrar el menú si está activo y el clic fue fuera de él
    if (navbarMenu.classList.contains('active') && !isClickInsideNavbar) {
        navbarMenu.classList.remove('active');
        navbarToggler.innerHTML = "☰"
    }
});

/* -------------------------------------------------------------------------------- */
/* --------------------------------- Btn Scroll  ---------------------------------- */
/* -------------------------------------------------------------------------------- */

// Mostrar el botón al hacer scroll
window.onscroll = function() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Volver al inicio al hacer clic
document.getElementById('scrollToTopBtn').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* -------------------------------------------------------------------------------- */
/* --------------------------------- Formulario de Contact ------------------------ */
/* -------------------------------------------------------------------------------- */

document.getElementById('contactForm').addEventListener('submit', function(e) {
    event.preventDefault();
    
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
        document.getElementById('contactForm').reset(); // Reinicia el formulario
    }
});


