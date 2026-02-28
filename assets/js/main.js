/**
 * ZOOM Unisex Salon - Main JavaScript
 * Handles core functionality: scroll effects, animations, mobile menu, and FAB
 */

// ============================================
// 1. STICKY HEADER ON SCROLL
// ============================================
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// 2. SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
}

// ============================================
// 3. MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!mobileMenuToggle || !mobileNav) return;

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
}

// ============================================
// 4. FLOATING ACTION BUTTON (FAB)
// ============================================
function initFAB() {
    const fabToggle = document.getElementById('fab-toggle');
    const fabContainer = document.getElementById('fab-container');

    if (!fabToggle || !fabContainer) return;

    fabToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        fabContainer.classList.toggle('active');
    });

    // Close FAB menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!fabContainer.contains(event.target)) {
            fabContainer.classList.remove('active');
        }
    });
}

// ============================================
// 5. SET ACTIVE NAVIGATION LINK
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// INITIALIZE ALL ON DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
});

// Wait for components to load before initializing component-dependent functions
document.addEventListener('componentsLoaded', function() {
    initStickyHeader();
    initMobileMenu();
    initFAB();
    setActiveNavLink();
});
