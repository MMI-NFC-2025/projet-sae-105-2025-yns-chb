// Gestion du menu hamburger
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const headerBrand = document.querySelector('.header__brand');
    const page = document.body;

    // Vérifie si les éléments existent avant d'ajouter l'événement
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            const isClosed = !isOpen;

            // Mise à jour des attributs ARIA pour accessibilité
            menuToggle.setAttribute('aria-expanded', isClosed);

            // Toggle les classes pour afficher/masquer le menu et animer le hamburger
            menuToggle.classList.toggle('active', isClosed);
            mainNav.classList.toggle('active', isClosed);

            // Empêcher le scroll du body quand le menu est ouvert
            page.classList.toggle('u-noscroll', isClosed);
        });

        // Fermer le menu quand on clique sur un lien
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                page.classList.remove('u-noscroll');
            });
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function (event) {
            const isClickInsideMenu = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                page.classList.remove('u-noscroll');
            }
        });
    }

    // Carrousel: films associés
    const carousels = document.querySelectorAll('.movies__related-films');
    carousels.forEach(section => {
        const track = section.querySelector('.movies__carousel');
        const prev = section.querySelector('.movies__carousel-prev');
        const next = section.querySelector('.movies__carousel-next');
        if (!track || !prev || !next) return;

        const getStep = () => {
            const card = track.querySelector('.movies__film-card');
            if (!card) return track.clientWidth * 0.9;
            const style = getComputedStyle(track);
            const gap = parseFloat(style.columnGap || style.gap || '16') || 16;
            return card.getBoundingClientRect().width + gap;
        };

        const scrollToPos = (left) => track.scrollTo({ left, behavior: 'smooth' });

        next.addEventListener('click', () => {
            const step = getStep();
            const endThreshold = track.scrollWidth - track.clientWidth - 2;
            const nextLeft = track.scrollLeft + step;
            if (track.scrollLeft >= endThreshold) {
                scrollToPos(0);
            } else {
                scrollToPos(nextLeft);
            }
        });

        prev.addEventListener('click', () => {
            const step = getStep();
            const prevLeft = track.scrollLeft - step;
            if (track.scrollLeft <= 2) {
                scrollToPos(track.scrollWidth);
            } else {
                scrollToPos(prevLeft);
            }
        });
    });
});
