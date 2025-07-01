// Ultra-Premium Preloader with Advanced Loading States
let loadingProgress = 0;
const loadingStates = [
    'Initializing Premium Experience...',
    'Loading Royal Components...',
    'Preparing Glass Effects...',
    'Activating Neural Networks...',
    'Optimizing Performance...',
    'Finalizing Premium Interface...'
];

function updatePreloader() {
    const progressFill = document.getElementById('progressFill');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingStatus = document.getElementById('loadingStatus');
    
    if (progressFill && loadingPercentage && loadingStatus) {
        progressFill.style.width = loadingProgress + '%';
        loadingPercentage.textContent = loadingProgress + '%';
        
        const stateIndex = Math.floor((loadingProgress / 100) * loadingStates.length);
if (stateIndex < loadingStates.length) {
    loadingStatus.textContent = loadingStates[stateIndex];
}

const percent = Math.floor(loadingProgress);
loadingPercentage.textContent = `${percent}%`;
    }
}

function simulateLoading() {
    const interval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            updatePreloader();
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 500);
                }
            }, 500);
            clearInterval(interval);
        } else {
            updatePreloader();
        }
    }, 100);
}

// Custom Cursor Implementation
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-tab, .glow-on-hover');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add ripple effect
            createRipple(event);
        });
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Services Tab Functionality
const serviceTabs = document.querySelectorAll('.service-tab');
const serviceContents = document.querySelectorAll('.service-content');

serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        serviceTabs.forEach(t => t.classList.remove('active'));
        serviceContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const targetService = tab.getAttribute('data-service');
        const targetContent = document.getElementById(targetService);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Add ripple effect
        createRipple(event);
    });
});

// Typing Effect for "Digital Solutions"
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor effect
            element.innerHTML += '<span class="cursor-blink">|</span>';
            setTimeout(() => {
                const cursor = element.querySelector('.cursor-blink');
                if (cursor) cursor.remove();
            }, 3000);
        }
    }
    
    type();
}

// Smooth scroll for tabs
function scrollToService(serviceId) {
    const section = document.getElementById(serviceId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (target === 98 ? '%' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target === 98 ? '%' : '+');
        }
    }
    
    updateCounter();
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize preloader
    simulateLoading();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Start typing effect after a short delay
    setTimeout(() => {
        const typingElement = document.getElementById('typingText');
        if (typingElement) {
            typeWriter(typingElement, 'Digital Solutions', 150);
        }
    }, 2000);
    
    // Start counter animations after typing effect
    setTimeout(() => {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }, 4000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-detail, .benefit-item, .services-stat, .service-tab').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't prevent default for actual form submissions or links
        if (this.type !== 'submit' && !this.href && !this.onclick) {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.disabled = false;
            }, 2000);
        }
    });
});

// Parallax effect for floating images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.service-detail-image img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

document.querySelectorAll('.btn-primary, .btn-secondary, .service-tab, .gradient-btn, .glass-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Initialize hero animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations for hero elements
    setTimeout(() => {
        document.querySelectorAll('.services-hero-title, .services-hero-description').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 1000);
});

// Advanced Glass Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelectorAll('.glass-effect').forEach(element => {
        element.style.transform = `translateY(${rate * 0.1}px)`;
    });
});

// Neural Network Animation Controller
function initNeuralNetwork() {
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animationDelay = `${index * 0.5}s`;
        }, index * 100);
    });
    
    connections.forEach((connection, index) => {
        setTimeout(() => {
            connection.style.animationDelay = `${index * 0.8}s`;
        }, index * 150);
    });
}

// Floating Particles Controller
function initFloatingParticles() {
    const particles = document.querySelectorAll('.floating-particle');
    
    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 20;
        const randomDuration = 15 + Math.random() * 10;
        
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
    });
}

// Geometric Patterns Controller
function initGeometricPatterns() {
    const patterns = document.querySelectorAll('.pattern');
    
    patterns.forEach((pattern, index) => {
        const randomSpeed = 20 + Math.random() * 20;
        pattern.style.animationDuration = `${randomSpeed}s`;
    });
}

// Initialize all advanced animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initNeuralNetwork();
        initFloatingParticles();
        initGeometricPatterns();
    }, 1000);
});

// Performance optimization for animations
let ticking = false;

function updateAnimations() {
    // Update any frame-based animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Optimize scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        requestTick();
    }, 10);
});

// Add premium hover effects to all interactive elements
document.querySelectorAll('.glow-on-hover').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize premium loading sequence
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger cascade animations
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});