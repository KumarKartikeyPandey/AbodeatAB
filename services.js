// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize services functionality
    initializeServicesTabs();
    initializeServicesAnimations();
    setupServicesInteractions();
});

function initializeServicesTabs() {  
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');
    
    // Add click event listeners to tabs
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetService = tab.getAttribute('data-service');
            
            // Remove active class from all tabs and contents
            serviceTabs.forEach(t => t.classList.remove('active'));
            serviceContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content with animation
            const targetContent = document.getElementById(targetService);
            if (targetContent) {
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 100);
            }
            
            // Add ripple effect
            createRippleEffect(tab, event);
        });
        
        // Add hover effects
        tab.addEventListener('mouseenter', () => {
            if (!tab.classList.contains('active')) {
                tab.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        tab.addEventListener('mouseleave', () => {
            if (!tab.classList.contains('active')) {
                tab.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

function initializeServicesAnimations() {
    // Animate service tabs on scroll
    const tabsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const tabs = entry.target.querySelectorAll('.service-tab');
                tabs.forEach((tab, tabIndex) => {
                    setTimeout(() => {
                        tab.style.opacity = '1';
                        tab.style.transform = 'translateY(0)';
                    }, tabIndex * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    const tabsContainer = document.querySelector('.services-tab-nav');
    if (tabsContainer) {
        // Initially hide tabs for animation
        const tabs = tabsContainer.querySelectorAll('.service-tab');
        tabs.forEach(tab => {
            tab.style.opacity = '0';
            tab.style.transform = 'translateY(30px)';
            tab.style.transition = 'all 0.6s ease-out';
        });
        
        tabsObserver.observe(tabsContainer);
    }
    
    // Animate service content cards
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const serviceContents = document.querySelectorAll('.service-content');
    serviceContents.forEach(content => {
        content.style.transition = 'all 0.6s ease-out';
        contentObserver.observe(content);
    });
}

function setupServicesInteractions() {
    // Enhanced tab interactions
    const serviceTabs = document.querySelectorAll('.service-tab');
    
    serviceTabs.forEach(tab => {
        // Add focus handling for accessibility
        tab.addEventListener('focus', () => {
            tab.style.outline = '2px solid var(--primary-blue)';
            tab.style.outlineOffset = '2px';
        });
        
        tab.addEventListener('blur', () => {
            tab.style.outline = 'none';
        });
        
        // Add keyboard navigation
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });
    
    // Add smooth scrolling to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn-primary, .cta-buttons .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('onclick');
            if (href && href.includes('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1].replace("'", "").replace(")", "");
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add parallax effect to service images
    const serviceImages = document.querySelectorAll('.service-detail-image img');
    
    window.addEventListener('scroll', () => {
        serviceImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.1;
                img.style.transform = `translateY(${rate}px) scale(1.05)`;
            }
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add counter animation for stats
function animateServiceStats() {
    const statNumbers = document.querySelectorAll('.services-stat .stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = target / 100;
        const hasPlus = stat.textContent.includes('+');
        const hasPercent = stat.textContent.includes('%');
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                let displayValue = Math.ceil(current);
                
                if (hasPercent) {
                    stat.textContent = displayValue + '%';
                } else if (hasPlus) {
                    stat.textContent = displayValue + '+';
                } else {
                    stat.textContent = displayValue;
                }
                
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const servicesHeroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateServiceStats, 1000);
            servicesHeroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const servicesHero = document.querySelector('.services-hero');
if (servicesHero) {
    servicesHeroObserver.observe(servicesHero);
}

// Tab keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeTab = document.querySelector('.service-tab.active');
    const allTabs = Array.from(document.querySelectorAll('.service-tab'));
    const currentIndex = allTabs.indexOf(activeTab);
    
    if (e.key === 'ArrowRight' && currentIndex < allTabs.length - 1) {
        e.preventDefault();
        allTabs[currentIndex + 1].click();
        allTabs[currentIndex + 1].focus();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        allTabs[currentIndex - 1].click();
        allTabs[currentIndex - 1].focus();
    }
});

// Enhanced mobile touch interactions
if ('ontouchstart' in window) {
    const serviceTabs = document.querySelectorAll('.service-tab');
    
    serviceTabs.forEach(tab => {
        let touchStartTime;
        
        tab.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            tab.style.transform = 'scale(0.95)';
        });
        
        tab.addEventListener('touchend', (e) => {
            tab.style.transform = 'scale(1)';
            
            // Prevent accidental double-taps
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 500) {
                e.preventDefault();
                setTimeout(() => tab.click(), 100);
            }
        });
        
        tab.addEventListener('touchcancel', () => {
            tab.style.transform = 'scale(1)';
        });
    });
}

// Service content lazy loading for better performance
function lazyLoadServiceContent() {
    const serviceContents = document.querySelectorAll('.service-content');
    
    serviceContents.forEach(content => {
        const images = content.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.getAttribute('data-src');
                        image.removeAttribute('data-src');
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            imageObserver.observe(img);
        });
    });
}

// Initialize lazy loading
lazyLoadServiceContent();

// Add smooth transitions for benefit items
const benefitItems = document.querySelectorAll('.benefit-item');
benefitItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
        item.style.boxShadow = 'var(--shadow-md)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.boxShadow = 'none';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Add loading states for dynamic content
function showLoadingState(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Tab switching with loading animation
function switchServiceTab(targetService) {
    const targetContent = document.getElementById(targetService);
    const allContents = document.querySelectorAll('.service-content');
    
    // Show loading state
    allContents.forEach(content => {
        if (content.classList.contains('active')) {
            showLoadingState(content);
        }
    });
    
    // Switch after short delay to show loading state
    setTimeout(() => {
        allContents.forEach(content => {
            content.classList.remove('active');
            hideLoadingState(content);
        });
        
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }, 150);
}

// Initialize tooltips for service features (if needed)
function initializeServiceTooltips() {
    const featureItems = document.querySelectorAll('.service-features-list li');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            // Add subtle highlight effect
            item.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
            item.style.borderRadius = '4px';
            item.style.padding = '4px 8px';
            item.style.margin = '4px -8px';
        });
        
        item.addEventListener('mouseleave', (e) => {
            item.style.backgroundColor = 'transparent';
            item.style.padding = '0';
            item.style.margin = '0';
        });
    });
}

// Initialize tooltips
initializeServiceTooltips();

// Add print styles optimization
function optimizeForPrint() {
    const printStyles = `
        @media print {
            .service-tab {
                page-break-inside: avoid;
            }
            .service-detail {
                page-break-inside: avoid;
            }
            .services-hero {
                page-break-after: always;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
}

optimizeForPrint();

console.log('Services page initialized successfully');