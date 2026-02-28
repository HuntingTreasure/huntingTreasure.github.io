document.addEventListener('DOMContentLoaded', function() {
    const destinos = productos.filter(p => p.tipo === 'destino');
    const contenedor = document.getElementById('destinos-seleccion');
    const itemsSeleccionadosDiv = document.getElementById('items-seleccionados');
    const totalSpan = document.getElementById('total-paquete');
    const botonAgregar = document.getElementById('agregar-paquete-carrito');
    const filtros = document.querySelectorAll('.filtro-btn');

    let seleccion = [];

    function renderDestinos(filtro = 'all') {
        let filtrados = destinos;
        if (filtro !== 'all') {
            filtrados = destinos.filter(d => d.categorias.includes(filtro));
        }

        contenedor.innerHTML = filtrados.map(d => `
            <div class="destino-seleccionable ${seleccion.some(s => s.id === d.id) ? 'seleccionado' : ''}" data-id="${d.id}">
                <div class="destino-imagen" style="background-image: url('${d.imagen}')"></div>
                <div class="destino-info">
                    <h4>${d.nombre}</h4>
                    <p>$${d.precio}</p>
                    <button class="btn-seleccionar" data-id="${d.id}">
                        ${seleccion.some(s => s.id === d.id) ? '✓ Selected' : 'Select'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    function actualizarResumen() {
        itemsSeleccionadosDiv.innerHTML = seleccion.map(item => `
            <div class="resumen-item">
                <span>${item.nombre} - $${item.precio}</span>
                <button class="btn-eliminar-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
            </div>
        `).join('');

        const total = seleccion.reduce((sum, item) => sum + item.precio, 0);
        totalSpan.textContent = total;

        document.querySelectorAll('.btn-eliminar-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                seleccion = seleccion.filter(item => item.id !== id);
                actualizarResumen();
                renderDestinos(document.querySelector('.filtro-btn.active').dataset.cat);
            });
        });
    }

    contenedor.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-seleccionar');
        if (!btn) return;
        const id = btn.dataset.id;
        const destino = destinos.find(d => d.id === id);
        if (seleccion.some(s => s.id === id)) {
            seleccion = seleccion.filter(s => s.id !== id);
        } else {
            seleccion.push(destino);
        }
        actualizarResumen();
        renderDestinos(document.querySelector('.filtro-btn.active').dataset.cat);
    });

    filtros.forEach(btn => {
        btn.addEventListener('click', () => {
            filtros.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDestinos(btn.dataset.cat);
        });
    });

    botonAgregar.addEventListener('click', () => {
        if (seleccion.length === 0) {
            alert('Select at least one destination');
            return;
        }

        const paquete = {
            id: 'custom_' + Date.now(),
            nombre: 'Custom package: ' + seleccion.map(s => s.nombre).join(' + '),
            duracion: 'Custom',
            precio: seleccion.reduce((sum, s) => sum + s.precio, 0),
            imagen: seleccion[0].imagen,
            ubicacion: 'Custom',
            cantidad: 1
        };

        if (window.agregarAlCarrito) window.agregarAlCarrito(paquete);
        seleccion = [];
        actualizarResumen();
        renderDestinos(document.querySelector('.filtro-btn.active').dataset.cat);
    });

    renderDestinos();
});
