// Smooth scroll com fallback para mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const yOffset = -80; // offset para o navbar
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            // Tenta primeiro o método nativo
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            } else {
                // Fallback para browsers antigos
                window.scrollTo(0, y);
            }
        }
    });
});