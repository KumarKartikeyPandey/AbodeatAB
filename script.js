// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor
function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.9;
    cursorY += (mouseY - cursorY) * 0.9;
    
    // Smooth follower movement
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// Start cursor animation
if (window.innerWidth > 1024) {
    animateCursor();
}

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .testimonial-card, .blog-card, .team-member-card, .founder-card-enhanced');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Function to ensure headings are visible
function ensureHeadingsVisible() {
    const headings = document.querySelectorAll('.visible-heading');
    headings.forEach(heading => {
        heading.style.display = 'block';
        heading.style.opacity = '1';
        heading.style.visibility = 'visible';
        heading.style.color = 'var(--text-dark)';
        heading.style.fontWeight = '700';
        heading.style.marginBottom = '1rem';
        heading.style.zIndex = '10';
        heading.style.position = 'relative';
    });
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation classes to elements
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .story-section, .founder-card-enhanced, .team-member-card, .blog-card, .achievement-card');
animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Counter animation for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number, .card-number, .stat-overview-number, .achievement-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else if (counter.textContent.includes('$')) {
                    counter.textContent = '$' + Math.ceil(current) + 'B+';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateCounters, 1000);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = contactForm.querySelector('.btn-form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to testimonial cards
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.title-highlight');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Add mouse follow effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;
        
        hero.style.background = `
            radial-gradient(circle at ${xPercent}% ${yPercent}%, 
            rgba(59, 130, 246, 0.1) 0%, 
            transparent 50%),
            linear-gradient(135deg, var(--primary-blue) 0%, #1e3a8a 100%)
        `;
    });
}

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--accent-gold));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Add lazy loading for images with permanent visibility
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Ensure image remains visible
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            
            // Add fade-in effect only on first load
            if (!img.classList.contains('loaded')) {
                img.style.transition = 'opacity 0.5s ease';
                img.classList.add('loaded');
            }
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    // Set initial state to ensure images are visible
    img.style.opacity = '1';
    img.style.visibility = 'visible';
    imageObserver.observe(img);
});

// Blog card interactions
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Platform logo hover effects
const platformLogos = document.querySelectorAll('.platform-logo');
platformLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
});

// Add error handling for failed image loads
images.forEach(img => {
    img.addEventListener('error', () => {
        img.style.background = 'linear-gradient(45deg, #f3f4f6, #e5e7eb)';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.innerHTML = '<span style="color: #6b7280; font-size: 0.875rem;">Image not available</span>';
    });
});

// Initialize stagger animations
const initializeStaggerAnimations = () => {
    // Service cards stagger
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Testimonial cards stagger
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('fade-in-up');
    });
    
    // Blog cards stagger
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Team members stagger
    const teamMembers = document.querySelectorAll('.team-member-card, .founder-card-enhanced');
    teamMembers.forEach((member, index) => {
        member.style.animationDelay = `${index * 0.1}s`;
        member.classList.add('scale-in');
    });
};

// Performance monitoring
const performanceObserver = new PerformanceObserver ? new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    });
}) : null;

if (performanceObserver) {
    try {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
        // Performance observer not supported
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure headings are visible immediately
    ensureHeadingsVisible();
    
    initializeStaggerAnimations();
    createScrollProgress();
    
    // Add entrance animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize marquee animation restart on hover
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        marqueeContent.addEventListener('mouseenter', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });
        
        marqueeContent.addEventListener('mouseleave', () => {
            marqueeContent.style.animationPlayState = 'running';
        });
    }
    
    // Final check to ensure all headings are visible after page load
    setTimeout(ensureHeadingsVisible, 100);
});

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('.section-header, .story-section, .consultation-card');
revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    element.style.transitionDelay = `${index * 0.1}s`;
    
    observer.observe(element);
});

// Window load event to ensure everything is ready
window.addEventListener('load', () => {
    // Final insurance to make all headings visible
    ensureHeadingsVisible();
    
    // Hide cursor on mobile devices
    if (window.innerWidth <= 1024) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});

// Periodic check to ensure headings remain visible
setInterval(ensureHeadingsVisible, 5000);

// Enhanced team member card interactions
const teamMemberCards = document.querySelectorAll('.team-member-card');
teamMemberCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced founder card interactions
const founderCards = document.querySelectorAll('.founder-card-enhanced');
founderCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Story section animations
const storySections = document.querySelectorAll('.story-section');
storySections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
    observer.observe(section);
});