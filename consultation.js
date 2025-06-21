// Consultation Form JavaScript

// Initialize consultation page functionality
function initializeConsultationPage() {
    initializeFormAnimations();
    initializeFormValidation();
    initializeFormSubmission();
    initializeMobileMenu();
    initializeScrollEffects();
}

// Form animations
function initializeFormAnimations() {
    const animateElements = document.querySelectorAll(`
        .consultation-hero-content,
        .form-sidebar,
        .form-main,
        .form-section
    `);

    animateElements.forEach((element, index) => {
        element.classList.add('consultation-animate-in');
        element.classList.add(`consultation-stagger-${Math.min(index + 1, 5)}`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Form validation
function initializeFormValidation() {
    const form = document.getElementById('consultationForm');
    const inputs = form.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        clearFieldError(e);

        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        return true;
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorElement.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            ${message}
        `;
        field.parentNode.appendChild(errorElement);
    }

    function clearFieldError(e) {
        const field = e.target;
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Form submission
function initializeFormSubmission() {
    const form = document.getElementById('consultationForm');
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all required fields
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const event = { target: field };
            if (!validateField(event)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Scroll to first error
            const firstError = form.querySelector('.field-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Handle multiple checkbox values
            const challenges = formData.getAll('challenges');
            data.challenges = challenges;

            console.log('Form submitted:', data);

            // Show success modal
            showSuccessModal();

            // Reset form
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage('Something went wrong. Please try again.');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Schedule My Free Consultation';
            submitBtn.disabled = false;
        }
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        return true;
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
        `;
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    function showErrorMessage(message) {
        // Create temporary error notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #ef4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            z-index: 10001;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
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
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.consultation-hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Enhanced form interactions
function initializeFormInteractions() {
    // Auto-resize textarea
    const textareas = document.querySelectorAll('.form-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Form progress indicator
    const form = document.getElementById('consultationForm');
    const sections = form.querySelectorAll('.form-section');
    let completedSections = 0;

    function updateProgress() {
        const totalSections = sections.length;
        const progressPercentage = (completedSections / totalSections) * 100;
        
        // Update progress bar if it exists
        const progressBar = document.querySelector('.form-progress-bar');
        if (progressBar) {
            progressBar.style.width = progressPercentage + '%';
        }
    }

    // Check section completion
    sections.forEach((section, index) => {
        const inputs = section.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                const sectionInputs = section.querySelectorAll('input[required], select[required]');
                const filledInputs = Array.from(sectionInputs).filter(inp => inp.value.trim() !== '');
                
                if (filledInputs.length === sectionInputs.length) {
                    if (!section.classList.contains('completed')) {
                        section.classList.add('completed');
                        completedSections++;
                        updateProgress();
                    }
                } else {
                    if (section.classList.contains('completed')) {
                        section.classList.remove('completed');
                        completedSections--;
                        updateProgress();
                    }
                }
            });
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeConsultationPage();
    initializeFormInteractions();
});

// Handle page visibility for form persistence
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        // Save form data to localStorage
        const form = document.getElementById('consultationForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem('consultationFormData', JSON.stringify(data));
    }
});

// Restore form data on page load
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('consultationFormData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            const form = document.getElementById('consultationForm');
            
            Object.entries(data).forEach(([key, value]) => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'radio' || field.type === 'checkbox') {
                        const specificField = form.querySelector(`[name="${key}"][value="${value}"]`);
                        if (specificField) {
                            specificField.checked = true;
                        }
                    } else {
                        field.value = value;
                    }
                }
            });
        } catch (error) {
            console.error('Error restoring form data:', error);
        }
    }
});

// Clear saved data on successful submission
function clearSavedFormData() {
    localStorage.removeItem('consultationFormData');
}

// Export functions for global access
window.closeModal = closeModal;
window.clearSavedFormData = clearSavedFormData;