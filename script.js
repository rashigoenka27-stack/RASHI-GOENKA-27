// script.js
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Follower
const cursor = document.getElementById('cursor');

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Add hover effect for all interactive elements
    const links = document.querySelectorAll('a, button, .work-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
} else {
    if (cursor) cursor.style.display = 'none';
}

// 2. Responsive Menu Logic
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

// Initial setup: ensure menu is hidden correctly
if (menu) {
    gsap.set(menu, { xPercent: 100 });
}

/**
 * Function to Open Menu
 */
const openMenuAction = () => {
    if (menu) {
        gsap.to(menu, { 
            xPercent: 0, 
            duration: 0.8, 
            ease: "expo.inOut" 
        });

        // Staggered text entrance for links
        const menuLinks = menu.querySelectorAll('.menu-link');
        gsap.fromTo(menuLinks, 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.3
            }
        );
    }
};

/**
 * Function to Close Menu
 */
const closeMenuAction = () => {
    if (menu) {
        gsap.to(menu, { 
            xPercent: 100, 
            duration: 0.8, 
            ease: "expo.inOut" 
        });
    }
};

// Listeners
if (menuBtn) menuBtn.addEventListener('click', openMenuAction);
if (closeBtn) closeBtn.addEventListener('click', closeMenuAction);

// Close menu if any link is clicked (crucial for one-page feel)
const allMenuLinks = document.querySelectorAll('.menu-link');
allMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenuAction);
});

// Auto-close menu if window is resized to desktop width
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenuAction();
    }
});