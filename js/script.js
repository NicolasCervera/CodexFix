document.addEventListener('DOMContentLoaded', function () {
    // --- Navegación Móvil ---
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            // Alterna la clase 'open' inmediatamente
            nav.classList.toggle('open');

            if (nav.classList.contains('open')) {
                // Pequeño retardo para permitir que el navegador recalcule el layout
                // después de cambiar display de none a flex.
                // Esto es crucial para que scrollHeight tenga el valor correcto.
                nav.style.display = 'flex'; // Aseguramos que esté visible para calcular scrollHeight
                setTimeout(() => {
                    nav.style.maxHeight = nav.scrollHeight + "px";
                    nav.style.opacity = "1"; // Asegura que la opacidad también se anime
                }, 10); // Un retardo muy pequeño (10ms) suele ser suficiente
            } else {
                nav.style.maxHeight = "0"; // Inicia la transición de cierre
                nav.style.opacity = "0"; // Inicia la transición de opacidad

                // Después de la transición, oculta completamente el menú
                nav.addEventListener('transitionend', function handler() {
                    if (!nav.classList.contains('open')) { // Asegúrate de que solo se ejecute al cerrar
                        nav.style.display = 'none';
                        nav.removeEventListener('transitionend', handler);
                    }
                });
            }
        });
    }

    // Cerrar el menú al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                nav.style.maxHeight = "0"; // Cierra la transición
                nav.style.opacity = "0";

                nav.addEventListener('transitionend', function handler() {
                    if (!nav.classList.contains('open')) {
                        nav.style.display = 'none';
                        nav.removeEventListener('transitionend', handler);
                    }
                });
            }
        });
    });

    // --- Header Sticky con Sombra ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Acordeón para FAQs ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.closest('.accordion-item');
            const currentContent = currentItem.querySelector('.accordion-content');

            // Cierra todos los acordeones que no sean el actual
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.closest('.accordion-item');
                const otherContent = otherItem.querySelector('.accordion-content');
                if (otherItem !== currentItem && otherContent.classList.contains('open')) {
                    otherContent.classList.remove('open');
                    otherContent.style.maxHeight = null; // Resetea max-height para cerrarlo
                    otherHeader.classList.remove('active');
                }
            });

            // Abre o cierra el acordeón actual
            header.classList.toggle('active');
            currentContent.classList.toggle('open');

            if (currentContent.classList.contains('open')) {
                // Establece el max-height a la altura real del contenido para la transición
                const verticalPadding = parseFloat(getComputedStyle(currentContent).paddingTop) + parseFloat(getComputedStyle(currentContent).paddingBottom);
                currentContent.style.maxHeight = (currentContent.scrollHeight + verticalPadding) + "px";
            } else {
                currentContent.style.maxHeight = null; // Resetea para cerrar
            }
        });
    });
});