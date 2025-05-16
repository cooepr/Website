// Future JavaScript for animations and interactions

// Smooth scrolling for navigation links
document.querySelectorAll('header nav a[href^="#"], header nav a[href^="index.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') || (href.startsWith('index.html#') && window.location.pathname.includes('index.html'))) {
            e.preventDefault();
            const targetId = '#' + href.split('#')[1];
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
    });
});

// Active class on scroll (throttled)
let activeLinkTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(activeLinkTimeout);
    activeLinkTimeout = setTimeout(() => {
        let current = '';
        const sections = document.querySelectorAll('main section[id]');
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 60;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        if (!current && sections.length > 0) {
             if (scrollPosition < sections[0].offsetTop - headerHeight - 60) {
                 current = sections[0].getAttribute('id');
             } else if (scrollPosition >= sections[sections.length - 1].offsetTop - headerHeight - 60) {
                 current = sections[sections.length - 1].getAttribute('id');
             }
         }

        const navLinks = document.querySelectorAll('header nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${current}` || linkHref === `index.html#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);
});

// Hide Header on Scroll Down, Show on Scroll Up
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 10; // Increased threshold slightly

if (header) { // Check if header exists before adding listener
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) {
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight){
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
}

// REMOVE Static Exchange Rates
/*
const exchangeRates = { ... };
const supportedCurrencies = Object.keys(exchangeRates);
*/

// REMOVE Currency Elements
/*
const currencySelector = document.getElementById('currency-selector');
*/
// Keep price elements if needed for other things, otherwise remove querySelectorAll for it
const priceElements = document.querySelectorAll('[data-price-usd]'); // Keep for now, may remove later

// REMOVE Update Price Display Function
/*
function updatePrices(selectedCurrency) { ... }
*/

// --- Theme Toggling --- //
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const toggleIcon = themeToggleButton?.querySelector('i');

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (toggleIcon) toggleIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        if (toggleIcon) toggleIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    }
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// --- Initialize Page --- //
document.addEventListener('DOMContentLoaded', () => {

    // Set Initial Theme
    const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(preferredTheme);

    // Animation on Scroll (remains the same)
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // observer.unobserve(entry.target); // Optional: Unobserve after first animation
                }
            });
        }, { threshold: 0.1 });
        fadeInElements.forEach(el => { observer.observe(el); });
    } else {
        fadeInElements.forEach(el => { el.style.opacity = '1'; });
    }
});
