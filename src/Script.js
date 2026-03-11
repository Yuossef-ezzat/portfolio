// =========================================
// 1. Mobile Menu Functionality
// =========================================
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// =========================================
// 2. Header: add .scrolled class on scroll
// =========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// =========================================
// 3. Scroll Spy: Highlight Active Nav Link
// =========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function scrollSpy() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160; // adjust for fixed header
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollSpy);
window.addEventListener('load', scrollSpy);

// =========================================
// 4. ScrollReveal Animations (Responsive Safe)
// =========================================
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '50px',
        duration: 1000,
        easing: 'ease-out',
        reset: false, // don't repeat animations
        mobile: false // disable animations on small screens for responsiveness
    });

    sr.reveal('.hero-subtitle', { origin: 'top', delay: 100 });
    sr.reveal('.hero-title', { origin: 'left', delay: 200 });
    sr.reveal('.hero-role', { origin: 'right', delay: 300 });
    sr.reveal('.hero-description', { origin: 'bottom', delay: 400 });
    sr.reveal('.hero-buttons', { origin: 'bottom', delay: 500 });
    sr.reveal('.hero-socials', { origin: 'bottom', delay: 600 });

    sr.reveal('.about-image', { origin: 'left', delay: 100 });
    sr.reveal('.about-text', { origin: 'right', delay: 200 });

    sr.reveal('.timeline-item', { origin: 'bottom', interval: 200 });
    sr.reveal('.skills-grid', { origin: 'bottom', interval: 200 });
    sr.reveal('.services-list .service-item', { origin: 'bottom', interval: 200 });
    sr.reveal('.projects-grid .project-card', { origin: 'bottom', interval: 200 });
    sr.reveal('.edu-certs-grid', { origin: 'bottom', interval: 200 });
    sr.reveal('.contact-info', { origin: 'left', delay: 100 });
    sr.reveal('.contact-form', { origin: 'right', delay: 200 });
}

// =========================================
// 5. Scroll To Top Button
// =========================================
const scrollTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================
// 6. Contact Form AJAX Submission
// =========================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        fetch('https://formsubmit.co/ajax/yuossefezzatmostafa@gmail.com', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Disable all form fields — keep form visible but locked
                const inputs = contactForm.querySelectorAll('input, textarea, button');
                inputs.forEach(el => {
                    el.disabled = true;
                    el.style.opacity = '0.5';
                    el.style.cursor = 'not-allowed';
                });
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';

                // Show inline success banner below the form
                successMessage.style.display = 'flex';
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = 'Error! Try again.';
                submitBtn.disabled = false;
            });
    });
}

// =========================================
// 7. Testimonials Slider
// =========================================
(function () {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('testimonialsDots');

    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    let current = 0;
    let autoTimer;

    // Build dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonials-dot');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
        dotsWrap.appendChild(dot);
    });

    function goTo(i) {
        current = (i + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dotsWrap.querySelectorAll('.testimonials-dot').forEach((d, idx) => {
            d.classList.toggle('active', idx === current);
        });
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 4000); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }
    startAuto();

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    });

    // Touch / swipe
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', startAuto);

    // ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.testimonials-subtitle', { origin: 'top', delay: 100, distance: '30px', duration: 800 });
        ScrollReveal().reveal('.testimonials-slider', { origin: 'bottom', delay: 200, distance: '40px', duration: 900 });
        ScrollReveal().reveal('.testimonials-controls', { origin: 'bottom', delay: 400, distance: '20px', duration: 800 });
    }
}());

// =========================================
// 8. Skills Filter
// =========================================
(function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (!filterBtns.length || !skillCards.length) return;

    function applyFilter(filter) {
        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');

            // fullstack = backend + frontend combined
            const match =
                (filter === 'backend' && category === 'backend') ||
                (filter === 'frontend' && category === 'frontend') ||
                (filter === 'fullstack' && (category === 'backend' || category === 'frontend' || category === 'fullstack')) ||
                (filter === 'soft' && category === 'soft');

            if (match) {
                card.classList.remove('hidden');
                card.classList.remove('fade-in');
                void card.offsetWidth; // force reflow for animation replay
                card.classList.add('fade-in');
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    // Apply the default active filter on page load
    const defaultBtn = document.querySelector('.filter-btn.active');
    if (defaultBtn) applyFilter(defaultBtn.getAttribute('data-filter'));
}());

// =========================================
// 9. Theme Toggle (Dark / Light)
// =========================================
(function () {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (!themeToggle) return;

    // Restore saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
}());

// =========================================
// 10. Language Toggle (EN / AR)
// =========================================
(function () {
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');
    const html = document.documentElement;

    if (!langToggle) return;

    function getTranslatables() {
        return document.querySelectorAll('[data-en]');
    }

    // Restore saved language
    const savedLang = localStorage.getItem('portfolio-lang') || 'en';
    applyLanguage(savedLang);

    langToggle.addEventListener('click', () => {
        const current = html.getAttribute('lang') === 'ar' ? 'ar' : 'en';
        const next = current === 'en' ? 'ar' : 'en';
        localStorage.setItem('portfolio-lang', next);
        applyLanguage(next);
    });

    function applyLanguage(lang) {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        if (langLabel) langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';

        getTranslatables().forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (!text) return;

            const hasChildElements = el.children.length > 0;
            if (hasChildElements) {
                for (const node of el.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        node.textContent = text + ' ';
                        break;
                    }
                }
            } else {
                el.textContent = text;
            }
        });

        // Translate form placeholders
        document.querySelectorAll('[data-' + lang + '-placeholder]').forEach(el => {
            el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
        });
    }
}());
