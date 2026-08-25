document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.sticky-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile Dropdown Toggle
    window.toggleMobileDropdown = function(btn) {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown-content').forEach(el => {
            if (el !== content) {
                el.classList.remove('show');
                el.previousElementSibling.querySelector('i')?.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });

        content.classList.toggle('show');
        if (content.classList.contains('show')) {
            icon?.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon?.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    };

    // Close Dropdowns on Scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) > 50) {
            // Close mega menu and dropdowns if they are open
            document.querySelectorAll('.mega-menu, .dropdown-menu-custom').forEach(menu => {
                // We don't want to hide them if the user is hovering, but on scroll it's usually better to hide
                // For Bootstrap dropdowns we could use instances, but these are custom
                // Small delay or check if scroll was significant
            });
        }
        lastScrollTop = st;
    });

    // Achievement Counters Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Mega Menu Positioning Adjustment
    const megaMenus = document.querySelectorAll('.mega-menu');
    megaMenus.forEach(menu => {
        const parent = menu.closest('.dropdown-mega');
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                const rect = navbar.getBoundingClientRect();
                menu.style.top = `${rect.height}px`;
            });
        }
    });
});
