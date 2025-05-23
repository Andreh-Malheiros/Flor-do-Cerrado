// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Header Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
        
        // Create close button if it doesn't exist
        if (!document.querySelector('.close-menu')) {
            const closeMenu = document.createElement('div');
            closeMenu.classList.add('close-menu');
            closeMenu.innerHTML = '<i class="fas fa-times"></i>';
            nav.appendChild(closeMenu);
            
            closeMenu.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        }
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// Testimonial Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    slides[n].classList.add('active');
    dots[n].classList.add('active');
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', function() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    });
}

if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Auto slide
setInterval(function() {
    if (slides.length > 0) {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
}, 5000);

// Back to top button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form submission
const formWhatsapp = document.getElementById('form-whatsapp');
const formSuccess = document.querySelector('.form-success');

if (formWhatsapp) {
    formWhatsapp.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        formWhatsapp.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form
        formWhatsapp.reset();
    });
}

// Animate on scroll
const animatedElements = document.querySelectorAll('[data-aos]');

function checkScroll() {
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Product hover effect
const produtoCards = document.querySelectorAll('.produto-card');

produtoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.produto-overlay').style.opacity = '1';
        this.querySelector('.btn-overlay').style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.produto-overlay').style.opacity = '0';
        this.querySelector('.btn-overlay').style.transform = 'translateY(20px)';
    });
});

// Parallax effect for banner
window.addEventListener('scroll', function() {
    const banner = document.querySelector('.banner');
    if (banner) {
        const scrollPosition = window.scrollY;
        banner.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Image lazy loading
const images = document.querySelectorAll('img');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                imageObserver.unobserve(image);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
}