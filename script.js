document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for Background Halos
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const halo1 = document.querySelector('.halo-1');
        const halo2 = document.querySelector('.halo-2');

        if (halo1) halo1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        if (halo2) halo2.style.transform = `translate(${-x * 50}px, ${-y * 50}px)`;
    });

    // Tech Stack Nodes Animation
    const techNodes = document.querySelectorAll('.tech-node');
    techNodes.forEach((node, index) => {
        // Subtle floating animation with different delays
        node.style.animation = `float ${3 + index}s infinite alternate ease-in-out`;
    });

    // Intersection Observer for Reveal
    const revealElements = document.querySelectorAll('.exp-card, .featured-project, .tech-node');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Smooth Scroll (Native)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
