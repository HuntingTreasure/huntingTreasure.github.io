// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');
const menuLinks = document.querySelectorAll('.nav-menu a');

function toggleMenu() {
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);
if (overlay) overlay.addEventListener('click', toggleMenu);

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = targetId;
        }
        if (navMenu.classList.contains('active')) toggleMenu();
    });
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const heroDots = document.querySelectorAll('.dot-hero');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');

if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        heroDots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (heroPrev) heroPrev.addEventListener('click', () => { prevSlide(); clearInterval(slideInterval); startSlider(); });
    if (heroNext) heroNext.addEventListener('click', () => { nextSlide(); clearInterval(slideInterval); startSlider(); });

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            startSlider();
        });
    });

    startSlider();
}

// ===== SLIDER DE DESTINOS (index) =====
const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

if (sliderTrack && prevBtn && nextBtn) {
    const cards = document.querySelectorAll('.card');
    let currentPosition = 0;
    let cardWidth = 0;
    let cardsPerView = 4;
    let maxPosition = 0;

    function updateSliderDimensions() {
        if (window.innerWidth <= 768) cardsPerView = 1;
        else if (window.innerWidth <= 992) cardsPerView = 2;
        else if (window.innerWidth <= 1200) cardsPerView = 3;
        else cardsPerView = 4;

        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth + 30;
            maxPosition = Math.max(0, cards.length - cardsPerView);
            updateDots();
            if (currentPosition > maxPosition) currentPosition = maxPosition;
            updateSliderPosition();
        }
    }

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(${-currentPosition * cardWidth}px)`;
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition >= maxPosition;
        updateActiveDot();
    }

    function updateDots() {
        if (sliderDots) {
            sliderDots.innerHTML = '';
            for (let i = 0; i <= maxPosition; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    currentPosition = i;
                    updateSliderPosition();
                });
                sliderDots.appendChild(dot);
            }
            updateActiveDot();
        }
    }

    function updateActiveDot() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === currentPosition) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    prevBtn.addEventListener('click', () => { if (currentPosition > 0) { currentPosition--; updateSliderPosition(); } });
    nextBtn.addEventListener('click', () => { if (currentPosition < maxPosition) { currentPosition++; updateSliderPosition(); } });

    window.addEventListener('load', updateSliderDimensions);
    window.addEventListener('resize', updateSliderDimensions);
}

// ===== CARRITO DE COMPRAS =====
document.addEventListener('DOMContentLoaded', function() {
    const carritoIcono = document.getElementById('carritoIcono');
    const carritoPanel = document.getElementById('carritoPanel');
    const overlayCarrito = document.getElementById('overlayCarrito');
    const cerrarCarrito = document.getElementById('cerrarCarrito');
    const carritoItems = document.getElementById('carritoItems');
    const carritoTotal = document.getElementById('carritoTotal');
    const carritoContador = document.getElementById('carritoContador');
    const btnPagar = document.getElementById('btnPagar');
    const carritoContenedor = document.getElementById('carritoContenedor');
    const carritoTotalPagina = document.getElementById('carritoTotalPagina');
    const btnPagarPagina = document.getElementById('btnPagarPagina');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarUI();
        if (carritoContenedor) renderizarCarritoPagina();
    }

    function actualizarUI() {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        if (carritoContador) carritoContador.textContent = totalItems;

        if (carritoItems) {
            carritoItems.innerHTML = '';
            let total = 0;
            carrito.forEach((item, index) => {
                total += item.precio * item.cantidad;
                const itemHTML = `
                    <div class="carrito-item" data-index="${index}">
                        <div class="carrito-item-img" style="background-image: url('${item.imagen || 'https://via.placeholder.com/60'}')"></div>
                        <div class="carrito-item-info">
                            <h4>${item.nombre}</h4>
                            <p>${item.duracion}</p>
                            <p class="carrito-item-precio">$${item.precio} x ${item.cantidad}</p>
                        </div>
                        <div class="carrito-item-eliminar" data-index="${index}"><i class="fas fa-trash-alt"></i></div>
                    </div>
                `;
                carritoItems.insertAdjacentHTML('beforeend', itemHTML);
            });

            document.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    eliminarItem(this.dataset.index);
                });
            });

            if (carritoTotal) carritoTotal.textContent = total.toFixed(2);
        }
    }

    function renderizarCarritoPagina() {
        if (!carritoContenedor) return;
        carritoContenedor.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            carritoContenedor.innerHTML = '<p class="carrito-vacio">Your cart is empty</p>';
            if (carritoTotalPagina) carritoTotalPagina.textContent = '0.00';
            return;
        }

        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            const itemHTML = `
                <div class="carrito-item-pagina" data-index="${index}">
                    <img src="${item.imagen || 'https://via.placeholder.com/80'}" alt="${item.nombre}" class="carrito-item-img-pagina">
                    <div class="carrito-item-info-pagina">
                        <h4>${item.nombre}</h4>
                        <p><i class="fas fa-clock"></i> ${item.duracion}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${item.ubicacion || 'Cusco'}</p>
                    </div>
                    <div class="carrito-item-precio-pagina">
                        <p>$${item.precio}</p>
                        <div class="carrito-cantidad">
                            <button class="btn-cantidad" data-index="${index}" data-action="decrease">-</button>
                            <span>${item.cantidad}</span>
                            <button class="btn-cantidad" data-index="${index}" data-action="increase">+</button>
                        </div>
                    </div>
                    <button class="btn-eliminar-pagina" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            carritoContenedor.insertAdjacentHTML('beforeend', itemHTML);
        });

        if (carritoTotalPagina) carritoTotalPagina.textContent = total.toFixed(2);

        document.querySelectorAll('.btn-cantidad').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.dataset.index;
                if (this.dataset.action === 'increase') {
                    carrito[index].cantidad += 1;
                } else if (this.dataset.action === 'decrease' && carrito[index].cantidad > 1) {
                    carrito[index].cantidad -= 1;
                }
                guardarCarrito();
            });
        });

        document.querySelectorAll('.btn-eliminar-pagina').forEach(btn => {
            btn.addEventListener('click', function() {
                eliminarItem(this.dataset.index);
            });
        });
    }

    window.agregarAlCarrito = function(producto) {
        const existente = carrito.find(item => item.id === producto.id);
        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();

        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-carrito';
        notificacion.textContent = '✓ Added to cart';
        document.body.appendChild(notificacion);
        setTimeout(() => notificacion.remove(), 2000);
    };

    function eliminarItem(index) {
        carrito.splice(index, 1);
        guardarCarrito();
    }

    if (carritoIcono) {
        carritoIcono.addEventListener('click', () => {
            if (carritoPanel) carritoPanel.classList.add('abierto');
            if (overlayCarrito) overlayCarrito.classList.add('active');
        });
    }
    if (cerrarCarrito) {
        cerrarCarrito.addEventListener('click', () => {
            if (carritoPanel) carritoPanel.classList.remove('abierto');
            if (overlayCarrito) overlayCarrito.classList.remove('active');
        });
    }
    if (overlayCarrito) {
        overlayCarrito.addEventListener('click', () => {
            if (carritoPanel) carritoPanel.classList.remove('abierto');
            overlayCarrito.classList.remove('active');
        });
    }

    // ===== PAGO =====
    async function procesarPago() {
        if (carrito.length === 0) {
            alert('Your cart is empty');
            return;
        }

        const btn = event.target;
        btn.textContent = 'Generating PDF...';
        btn.disabled = true;

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(20);
            doc.setTextColor(26, 77, 94);
            doc.text('Hunting Treasure - Booking Summary', 20, 20);

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            let y = 40;
            let total = 0;

            carrito.forEach((item, index) => {
                doc.text(`${index + 1}. ${item.nombre}`, 20, y);
                y += 6;
                doc.text(`   Duration: ${item.duracion}`, 20, y);
                y += 6;
                doc.text(`   Price: $${item.precio} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}`, 20, y);
                y += 10;
                total += item.precio * item.cantidad;
            });

            doc.setFontSize(14);
            doc.setTextColor(255, 191, 0);
            doc.text(`TOTAL: $${total.toFixed(2)}`, 20, y + 10);
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Thank you for choosing Hunting Treasure!', 20, y + 25);

            const pdfBlob = doc.output('blob');
            const formData = new FormData();
            formData.append('file', pdfBlob, `booking_${Date.now()}.pdf`);

            const response = await fetch('https://api.gofile.io/uploadFile', { method: 'POST', body: formData });
            const data = await response.json();

            if (data.status !== 'ok') throw new Error('Upload failed');

            const enlacePDF = data.data.downloadPage;

            const metodoPagoSelect = document.getElementById('metodoPago');
            const metodoPago = metodoPagoSelect ? metodoPagoSelect.value : 'Not specified';

            let mensaje = 'Good afternoon, I would like to purchase these packages:\n\n';
            carrito.forEach(item => {
                mensaje += `- ${item.nombre} (${item.duracion}) - $${item.precio} x ${item.cantidad}\n`;
            });
            mensaje += `\nTotal: $${total.toFixed(2)}\n`;
            mensaje += `Payment method: ${metodoPago}\n\n`;
            mensaje += `You can see the full details here:\n${enlacePDF}`;

            const url = `https://wa.me/51931023833?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');

        } catch (error) {
            console.error(error);
            alert('There was a problem generating the PDF. Please try again or contact us directly.');
        } finally {
            btn.textContent = 'Pay with WhatsApp';
            btn.disabled = false;
        }
    }

    if (btnPagar) btnPagar.addEventListener('click', procesarPago);
    if (btnPagarPagina) btnPagarPagina.addEventListener('click', procesarPago);

    window.consultarPago = function(metodo) {
        const mensaje = `Good afternoon, I would like more information about paying with ${metodo}.`;
        const url = `https://wa.me/51931023833?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');

        const alerta = document.createElement('div');
        alerta.className = 'alerta-flotante';
        alerta.innerHTML = `💳 Payment with ${metodo}<br>We are working on this option. You can now inquire via WhatsApp.`;
        document.body.appendChild(alerta);
        setTimeout(() => alerta.remove(), 4000);
    };

    actualizarUI();
    if (carritoContenedor) renderizarCarritoPagina();
});

// ===== AGREGAR AL CARRITO DESDE CUALQUIER BOTÓN =====
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.agregar-carrito');
    if (!btn) return;

    e.preventDefault();
    const producto = {
        id: btn.dataset.id,
        nombre: btn.dataset.nombre,
        precio: parseFloat(btn.dataset.precio),
        duracion: btn.dataset.duracion,
        imagen: btn.dataset.imagen,
        ubicacion: btn.dataset.ubicacion
    };
    if (window.agregarAlCarrito) window.agregarAlCarrito(producto);
});

// ===== BOTONES VER TODO =====
document.querySelectorAll('.btn-ver-todo').forEach(button => {
    button.addEventListener('click', function() {
        const section = this.closest('section');
        if (section) {
            if (section.id === 'destinos') window.location.href = 'destinos.html';
            else if (section.id === 'paquetes') window.location.href = 'paquetes.html';
            else if (section.id === 'blog') window.location.href = 'blog.html';
            else alert('Coming soon!');
        }
    });
});

// ===== PAGINACIÓN =====
document.querySelectorAll('.paginacion .page').forEach(page => {
    page.addEventListener('click', function() {
        document.querySelectorAll('.paginacion .page').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('.footer-section a[href^="#"], .footer-col a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
