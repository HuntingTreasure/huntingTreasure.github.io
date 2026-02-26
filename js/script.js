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

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (overlay) {
    overlay.addEventListener('click', toggleMenu);
}

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Verificar si es enlace interno (con #) o externo
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Es un enlace a otra página
            window.location.href = targetId;
        }
        
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
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
        slides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));
        
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

    if (heroPrev) {
        heroPrev.addEventListener('click', () => {
            prevSlide();
            clearInterval(slideInterval);
            startSlider();
        });
    }

    if (heroNext) {
        heroNext.addEventListener('click', () => {
            nextSlide();
            clearInterval(slideInterval);
            startSlider();
        });
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            startSlider();
        });
    });

    startSlider();
}

// ===== SLIDER DE DESTINOS (solo en index.html) =====
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
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 992) {
            cardsPerView = 2;
        } else if (window.innerWidth <= 1200) {
            cardsPerView = 3;
        } else {
            cardsPerView = 4;
        }

        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth + 30;
            maxPosition = Math.max(0, cards.length - cardsPerView);
            
            updateDots();
            
            if (currentPosition > maxPosition) {
                currentPosition = maxPosition;
            }
            
            updateSliderPosition();
        }
    }

    function updateSliderPosition() {
        const translateX = -currentPosition * cardWidth;
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        
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
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentPosition) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateSliderPosition();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateSliderPosition();
        }
    });

    window.addEventListener('load', updateSliderDimensions);
    window.addEventListener('resize', updateSliderDimensions);
}

// ===== BOTONES VER TODO (redirigen a páginas) =====
document.querySelectorAll('.btn-ver-todo').forEach(button => {
    button.addEventListener('click', function() {
        const section = this.closest('section');
        if (section) {
            if (section.id === 'destinos') {
                window.location.href = 'destinos.html';
            } else if (section.id === 'paquetes') {
                window.location.href = 'paquetes.html';
            } else if (section.id === 'blog') {
                window.location.href = 'blog.html';
            } else {
                alert('¡Próximamente! Estaremos mostrando todos los items.');
            }
        }
    });
});

// ===== EFECTOS INTERACTIVOS =====
document.querySelectorAll('.btn, .btn-small, .btn-reservar').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        alert('¡Gracias por tu interés! Pronto te contactaremos.');
    });
});

// ===== PAGINACIÓN (para destinos.html) =====
document.querySelectorAll('.paginacion .page').forEach(page => {
    page.addEventListener('click', function() {
        document.querySelectorAll('.paginacion .page').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        // Aquí puedes cargar más destinos vía AJAX si lo deseas
    });
});

// ===== SCROLL SUAVE PARA ENLACES DEL FOOTER =====
document.querySelectorAll('.footer-section a[href^="#"], .footer-col a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});