
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ── MOBILE MENU ────────────────────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        mobileMenu.classList.toggle('hidden');
    });
}

// ── COUNTDOWN TIMER (Home Page) ────────────────────────────────
function updateCountdown() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();


    let deadline = new Date(currentYear, currentMonth, 25, 23, 59, 59);


    if (now > deadline) {
        deadline = new Date(currentYear, currentMonth + 1, 25, 23, 59, 59);
    }

    const diff = deadline - now;

    if (diff <= 0) return updateCountdown();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    const dEl = document.getElementById('countdown-days');
    const hEl = document.getElementById('countdown-hours');
    const mEl = document.getElementById('countdown-mins');
    const sEl = document.getElementById('countdown-secs');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);
}

if (document.getElementById('countdown-secs')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ── STATS COUNTER ANIMATION ────────────────────────────────────
function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const update = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target, 10);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.4 });

    statNumbers.forEach(el => observer.observe(el));
}

// ── ACTIVE NAV LINK (Professional Routing) ─────────────────────
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ── GALLERY MODALS/INTERACTION ────────────────────────────────
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-4px)';
        item.style.transition = 'transform 0.3s ease';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});
