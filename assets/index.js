
//Menú hamburguesa

document.getElementById('navbar-toggler').addEventListener('click', function() {
    const menu = document.getElementById('navbar-menu');
    const isActive = menu.classList.toggle('active');
    
    // Cambiar el icono de hamburguesa a una "X" y viceversa
    this.innerHTML = isActive ? "✖" : "☰"
    // Cambia según el estado del menú
});










//renderizado de productos 
