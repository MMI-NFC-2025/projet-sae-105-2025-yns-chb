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
});
