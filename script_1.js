// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.initializeTheme();
        this.bindEvents();
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeToggle();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeToggle();
        this.animateThemeTransition();
    }

    updateThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.setAttribute('data-theme', this.theme);
        }
    }

    animateThemeTransition() {
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Ultra-Premium Preloader Management
class PreloaderManager {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.progressFill = document.getElementById('progressFill');
        this.loadingPercentage = document.getElementById('loadingPercentage');
        this.loadingStatus = document.getElementById('loadingStatus');
        this.progress = 0;
        this.isComplete = false;
        
        this.statusMessages = [
            'Initializing Premium Experience...',
            'Loading Royal Assets...',
            'Preparing Luxury Interface...',
            'Optimizing Performance...',
            'Finalizing Experience...',
            'Welcome to Excellence!'
        ];
        
        this.startLoading();
    }

    startLoading() {
        const interval = setInterval(() => {
            this.progress += Math.random() * 12 + 3;
            
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                this.completeLoading();
            }
            
            this.updateProgress();
            this.updateStatus();
        }, 150);

        // Ensure preloader completes after window load
        window.addEventListener('load', () => {
            if (!this.isComplete) {
                setTimeout(() => {
                    this.progress = 100;
                    this.updateProgress();
                    this.completeLoading();
                }, 500);
            }
        });
    }

    updateProgress() {
        if (this.progressFill) {
            this.progressFill.style.width = `${this.progress}%`;
        }
        if (this.loadingPercentage) {
            this.loadingPercentage.textContent = `${Math.round(this.progress)}%`;
        }
    }

    updateStatus() {
        if (this.loadingStatus) {
            const statusIndex = Math.floor((this.progress / 100) * (this.statusMessages.length - 1));
            this.loadingStatus.textContent = this.statusMessages[statusIndex];
        }
    }

    completeLoading() {
        if (this.isComplete) return;
        this.isComplete = true;
        
        setTimeout(() => {
            if (this.preloader) {
                this.preloader.style.opacity = '0';
                setTimeout(() => {
                    this.preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    this.initializePageAnimations();
                }, 800);
            }
        }, 1000);
    }

    initializePageAnimations() {
        // Trigger entrance animations
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Hero Image Slider Management
class HeroSliderManager {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = 4000; // 4 seconds
        
        if (this.slides.length > 0) {
            this.startSlider();
        }
    }

    startSlider() {
        setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }

    nextSlide() {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Move to next slide
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
    }
}

// Custom Cursor Management
class CursorManager {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        if (!this.cursor || !this.cursorFollower) return;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;
        
        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Add hover effects to interactive elements
        const hoverElements = document.querySelectorAll('a, button, .service-card, .blog-card, .platform-logo, .story-section, .achievement-card, .contact-method');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorFollower.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorFollower.classList.remove('hover');
            });
        });

        // Hide cursor on mobile
        if (window.innerWidth <= 1024) {
            this.cursor.style.display = 'none';
            this.cursorFollower.style.display = 'none';
        }
    }

    animate() {
        // Smooth cursor movement
        this.cursorX += (this.mouseX - this.cursorX) * 0.9;
        this.cursorY += (this.mouseY - this.cursorY) * 0.9;
        
        // Smooth follower movement
        this.followerX += (this.mouseX - this.followerX) * 0.1;
        this.followerY += (this.mouseY - this.followerY) * 0.1;
        
        if (this.cursor) {
            this.cursor.style.left = this.cursorX + 'px';
            this.cursor.style.top = this.cursorY + 'px';
        }
        
        if (this.cursorFollower) {
            this.cursorFollower.style.left = this.followerX + 'px';
            this.cursorFollower.style.top = this.followerY + 'px';
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Animation Manager
class ScrollAnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        this.initializeAnimations();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
            }
        });
    }

    animateElement(element) {
        element.classList.add('animated');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add stagger effect for child elements
        const children = element.querySelectorAll('.service-card, .blog-card, .story-section, .achievement-card');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initializeAnimations() {
        const animateElements = document.querySelectorAll(
            '.section-header, .service-card, .blog-card, .story-section, .achievement-card, .contact-method, .about-stats-overview'
        );
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            this.observer.observe(el);
        });
    }
}

// Header Management
class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.lastScrollY = window.scrollY;
        
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
        
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (this.header) {
            if (currentScrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }
        
        this.lastScrollY = currentScrollY;
    }

    toggleMobileMenu() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.classList.toggle('active');
            this.mobileMenu.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.classList.remove('active');
            this.mobileMenu.classList.remove('active');
        }
    }

    handleAnchorClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const headerHeight = this.header ? this.header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Counter Animation Manager
class CounterManager {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number, .card-number, .stat-overview-number, .achievement-number');
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.5 }
        );
        
        this.initializeCounters();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 60; // 60 frames animation
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const value = Math.ceil(current);
                
                if (counter.textContent.includes('%')) {
                    counter.textContent = value + '%';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = value + '+';
                } else {
                    counter.textContent = value;
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                // Restore original formatting
                if (counter.textContent.includes('%')) {
                    counter.textContent = target + '%';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        updateCounter();
    }

    initializeCounters() {
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
}

// Interactive Effects Manager
class InteractiveEffectsManager {
    constructor() {
        this.initializeRippleEffect();
        this.initializeParallaxEffect();
        this.initializeHoverEffects();
        this.initializeTypingEffect();
        this.initializeFormValidation();
        this.initializeAdvancedAnimations();
    }

    initializeRippleEffect() {
        const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .gradient-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initializeParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Parallax for hero background
            const heroOverlay = document.querySelector('.hero-bg-overlay');
            if (heroOverlay) {
                heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            // Parallax for floating shapes
            const shapes = document.querySelectorAll('.bg-shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    initializeHoverEffects() {
        // Service cards hover effect
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                this.addGlowEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                this.removeGlowEffect(card);
            });
        });

        // Blog cards hover effect
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                this.addGlowEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                this.removeGlowEffect(card);
            });
        });

        // Platform logos hover effect
        const platformLogos = document.querySelectorAll('.platform-logo');
        platformLogos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
    }

    initializeTypingEffect() {
        const titleHighlight = document.querySelector('.title-highlight');
        if (titleHighlight) {
            const text = titleHighlight.textContent;
            titleHighlight.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    titleHighlight.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1500);
        }
    }

    initializeFormValidation() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('.btn-form-submit');
        const originalText = submitBtn.textContent;
        
        // Add loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Show success animation
            this.showSuccessAnimation(submitBtn);
            
            // Reset form
            setTimeout(() => {
                e.target.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    }

    showSuccessAnimation(button) {
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    initializeAdvancedAnimations() {
        // Floating animation for cards
        const floatingElements = document.querySelectorAll('.floating-card, .achievement-card');
        floatingElements.forEach((element, index) => {
            element.style.animation = `float ${6 + index}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.5}s`;
        });

        // Pulse animation for important elements
        const pulseElements = document.querySelectorAll('.stat-number, .achievement-number');
        pulseElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'pulse 1s ease-in-out';
            });
            
            element.addEventListener('animationend', () => {
                element.style.animation = '';
            });
        });
    }
}

// Marquee Animation Manager
class MarqueeManager {
    constructor() {
        this.initializeMarquee();
    }

    initializeMarquee() {
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent) {
            marqueeContent.addEventListener('mouseenter', () => {
                marqueeContent.style.animationPlayState = 'paused';
            });
            
            marqueeContent.addEventListener('mouseleave', () => {
                marqueeContent.style.animationPlayState = 'running';
            });
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.monitorPerformance();
    }

    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.entryType === 'navigation') {
                            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
                        }
                    });
                });
                
                observer.observe({ entryTypes: ['navigation'] });
            } catch (e) {
                console.log('Performance monitoring not supported');
            }
        }
    }
}

// Visibility Manager for Headings
class VisibilityManager {
    constructor() {
        this.ensureHeadingsVisible();
        this.startPeriodicCheck();
    }

    ensureHeadingsVisible() {
        const headings = document.querySelectorAll('.visible-heading');
        headings.forEach(heading => {
            heading.style.display = 'block';
            heading.style.opacity = '1';
            heading.style.visibility = 'visible';
            heading.style.zIndex = '10';
            heading.style.position = 'relative';
        });
    }

    startPeriodicCheck() {
        // Check every 5 seconds to ensure headings remain visible
        setInterval(() => {
            this.ensureHeadingsVisible();
        }, 5000);
    }
}

// Advanced Background Animation Manager
class BackgroundAnimationManager {
    constructor() {
        this.initializeParticleSystem();
        this.initializeNeuralNetwork();
        this.initializeGeometricPatterns();
    }

    initializeParticleSystem() {
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach((particle, index) => {
            // Random colors from royal palette
            const colors = [
                'var(--royal-gold)',
                'var(--vibrant-emerald)',
                'var(--royal-maroon)',
                'var(--vibrant-cyan)',
                'var(--royal-burgundy)',
                'var(--vibrant-purple)',
                'var(--royal-brown)',
                'var(--vibrant-coral)'
            ];
            
            particle.style.background = colors[index % colors.length];
            particle.style.animationDelay = `${index * -2}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        });
    }

    initializeNeuralNetwork() {
        const nodes = document.querySelectorAll('.node');
        const connections = document.querySelectorAll('.connection');
        
        nodes.forEach((node, index) => {
            node.style.animationDelay = `${index * -1}s`;
        });
        
        connections.forEach((connection, index) => {
            connection.style.animationDelay = `${index * -2}s`;
        });
    }

    initializeGeometricPatterns() {
        const patterns = document.querySelectorAll('.pattern');
        patterns.forEach((pattern, index) => {
            pattern.style.animationDelay = `${index * -5}s`;
            pattern.style.animationDuration = `${20 + index * 5}s`;
        });
    }
}

// Main Application Class
class App {
    constructor() {
        this.initializeManagers();
        this.bindGlobalEvents();
    }

    initializeManagers() {
        // Initialize all managers
        this.themeManager = new ThemeManager();
        this.preloaderManager = new PreloaderManager();
        this.heroSliderManager = new HeroSliderManager();
        this.cursorManager = new CursorManager();
        this.scrollAnimationManager = new ScrollAnimationManager();
        this.headerManager = new HeaderManager();
        this.counterManager = new CounterManager();
        this.interactiveEffectsManager = new InteractiveEffectsManager();
        this.marqueeManager = new MarqueeManager();
        this.performanceMonitor = new PerformanceMonitor();
        this.visibilityManager = new VisibilityManager();
        this.backgroundAnimationManager = new BackgroundAnimationManager();
    }

    bindGlobalEvents() {
        // Window load event
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.visibilityManager.ensureHeadingsVisible();
        });

        // Window resize event
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Error handling
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
        });
    }

    handleResize() {
        // Handle responsive adjustments
        if (window.innerWidth <= 1024) {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            if (cursor) cursor.style.display = 'none';
            if (cursorFollower) cursorFollower.style.display = 'none';
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Additional utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Generate random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Animate number from start to end
    animateNumber(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const current = start + (end - start) * this.easeOutCubic(progress);
            
            element.textContent = Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    },

    // Easing function
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
};

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, utils };
}