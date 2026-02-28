document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const contenedor = document.getElementById('detalle-producto');
    const breadcrumbSpan = document.getElementById('breadcrumb-producto');

    if (!id) {
        contenedor.innerHTML = '<p class="error">No product specified</p>';
        return;
    }

    const producto = productos.find(p => p.id === id);
    if (!producto) {
        contenedor.innerHTML = '<p class="error">Product not found</p>';
        return;
    }

    if (breadcrumbSpan) breadcrumbSpan.textContent = producto.nombre;

    let incluyeHTML = '';
    if (producto.incluye && producto.incluye.length) {
        incluyeHTML = `
            <div class="detalle-incluye">
                <h3>Includes</h3>
                <ul>
                    ${producto.incluye.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    const html = `
        <div class="detalle-header">
            <h1>${producto.nombre}</h1>
        </div>
        <div class="detalle-contenido">
            <div class="detalle-imagen" style="background-image: url('${producto.imagen}')"></div>
            <div class="detalle-info">
                <p class="detalle-ubicacion"><i class="fas fa-map-marker-alt"></i> ${producto.ubicacion || 'Cusco'}</p>
                <p class="detalle-duracion"><i class="far fa-calendar-alt"></i> ${producto.duracion}</p>
                <p class="detalle-precio">$${producto.precio}</p>
                <p class="detalle-descripcion">${producto.descripcion || 'No description available'}</p>
                ${incluyeHTML}
                <button class="btn agregar-carrito" 
                        data-id="${producto.id}"
                        data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}"
                        data-duracion="${producto.duracion}"
                        data-imagen="${producto.imagen}"
                        data-ubicacion="${producto.ubicacion}">
                    Add to cart
                </button>
            </div>
        </div>
    `;

    contenedor.innerHTML = html;
});
