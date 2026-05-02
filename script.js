document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };

    const updateThemeIcon = (theme) => {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', toggleTheme);

    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const professions = [
        'Deep Learning Enthusiast',
        'MCA Student',
        'Python Developer',
        'AI Solution Architect'
    ];
    let profIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentProf = professions[profIndex];
        const displayedText = isDeleting 
            ? currentProf.substring(0, charIndex--) 
            : currentProf.substring(0, charIndex++);

        typingText.textContent = displayedText;

        if (!isDeleting && charIndex === currentProf.length + 1) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            profIndex = (profIndex + 1) % professions.length;
            typeSpeed = 500;
        } else {
            typeSpeed = isDeleting ? 50 : 100;
        }

        setTimeout(type, typeSpeed);
    };

    type();

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's a skill card, animate the progress bar
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        progressBar.style.width = progressBar.getAttribute('data-progress') + '%';
                    }
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
=======
    // Reveal animation on scroll
    const revealElements = document.querySelectorAll('.card, .timeline-item, .skill-group, .hero-content');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = '1s all ease';
            }
        });
    };

    // Set initial styles for reveal
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = '1s all ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Smooth scroll for nav links (Extra precaution)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
>>>>>>> 14aeb44825ccb3ccb2900a5347841e275f751d92
                    behavior: 'smooth'
                });
            }
        });
    });

<<<<<<< HEAD
    // Contact Form Handling (Simple Validation)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});

=======
    // Add a simple hover effect for the logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseover', () => {
        logo.style.letterSpacing = '5px';
        logo.style.transition = '0.5s all ease';
    });
    logo.addEventListener('mouseout', () => {
        logo.style.letterSpacing = '2px';
    });
});
>>>>>>> 14aeb44825ccb3ccb2900a5347841e275f751d92
