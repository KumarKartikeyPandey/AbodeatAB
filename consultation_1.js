// Enhanced Consultation Form JavaScript with Premium Features

// Initialize consultation page functionality
function initializeConsultationPage() {
    initializeFormAnimations();
    initializeFormValidation();
    initializeFormSubmission();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeAdvancedInteractions();
    initializeFormPersistence();
}

// Advanced form animations with stagger effects
function initializeFormAnimations() {
    const animateElements = document.querySelectorAll(`
        .consultation-hero-content,
        .form-sidebar,
        .form-main,
        .form-section,
        .expectation-item,
        .trust-item,
        .benefit-item
    `);

    animateElements.forEach((element, index) => {
        element.classList.add('consultation-animate-in');
        element.classList.add(`consultation-stagger-${Math.min(index % 5 + 1, 5)}`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add ripple effect to interactive elements
                if (entry.target.classList.contains('benefit-item') || 
                    entry.target.classList.contains('trust-item')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            entry.target.style.transform = '';
                        }, 200);
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Animate form elements on focus
    const formElements = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
            this.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.2)';
        });
        
        element.addEventListener('blur', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Enhanced form validation with real-time feedback
function initializeFormValidation() {
    const form = document.getElementById('consultationForm');
    const inputs = form.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
        input.addEventListener('keyup', debounce(validateField, 500));
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

        // Email validation with enhanced regex
        if (field.type === 'email') {
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation with international support
        if (field.type === 'tel') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
                showFieldError(field, 'Please enter a valid phone number (minimum 10 digits)');
                return false;
            }
        }

        // Name validation
        if (field.name === 'firstName' || field.name === 'lastName') {
            const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
            if (!nameRegex.test(value) || value.length < 2) {
                showFieldError(field, 'Please enter a valid name (letters only, minimum 2 characters)');
                return false;
            }
        }

        // Hotel name validation
        if (field.name === 'hotelName') {
            if (value.length < 3) {
                showFieldError(field, 'Hotel name must be at least 3 characters long');
                return false;
            }
        }

        // Show success indicator
        showFieldSuccess(field);
        return true;
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
        field.style.background = 'rgba(239, 68, 68, 0.05)';
        
        // Remove existing messages
        const existingError = field.parentNode.querySelector('.field-error');
        const existingSuccess = field.parentNode.querySelector('.field-success');
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();

        // Add error message with animation
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            font-weight: 600;
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
        
        // Animate in
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }

    function showFieldSuccess(field) {
        field.style.borderColor = '#10b981';
        field.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
        field.style.background = 'rgba(16, 185, 129, 0.05)';
        
        // Remove existing messages
        const existingError = field.parentNode.querySelector('.field-error');
        const existingSuccess = field.parentNode.querySelector('.field-success');
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();

        // Add success indicator
        const successElement = document.createElement('div');
        successElement.className = 'field-success';
        successElement.style.cssText = `
            color: #10b981;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            font-weight: 600;
        `;
        successElement.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
            Looks good!
        `;
        field.parentNode.appendChild(successElement);
        
        // Animate in
        setTimeout(() => {
            successElement.style.opacity = '1';
            successElement.style.transform = 'translateY(0)';
        }, 10);
    }

    function clearFieldError(e) {
        const field = e.target;
        field.style.borderColor = '';
        field.style.boxShadow = '';
        field.style.background = '';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        const successElement = field.parentNode.querySelector('.field-success');
        if (errorElement) errorElement.remove();
        if (successElement) successElement.remove();
    }

    // Debounce function for performance
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
}

// Enhanced form submission with progress tracking
function initializeFormSubmission() {
    const form = document.getElementById('consultationForm');
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all required fields
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        let firstErrorField = null;

        requiredFields.forEach(field => {
            const event = { target: field };
            if (!validateField(event)) {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });

        if (!isValid) {
            // Scroll to first error with smooth animation
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add shake animation to form
                form.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    form.style.animation = '';
                }, 500);
            }
            
            showNotification('Please fix the errors above before submitting.', 'error');
            return;
        }

        // Show loading state with enhanced animation
        submitBtn.classList.add('loading');
        btnText.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Add progress bar
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--royal-gold), var(--vibrant-emerald));
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 0 0 1.5rem 1.5rem;
        `;
        submitBtn.appendChild(progressBar);

        try {
            // Simulate form submission with progress updates
            const steps = [
                { progress: 25, text: 'Validating information...' },
                { progress: 50, text: 'Checking availability...' },
                { progress: 75, text: 'Scheduling consultation...' },
                { progress: 100, text: 'Finalizing request...' }
            ];

            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, 800));
                progressBar.style.width = step.progress + '%';
                btnText.textContent = step.text;
            }

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Handle multiple checkbox values
            const challenges = formData.getAll('challenges');
            data.challenges = challenges;

            console.log('Form submitted:', data);

            // Show success animation
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            btnText.textContent = 'Success!';
            
            // Confetti effect
            createConfetti();

            // Show success modal after delay
            setTimeout(() => {
                showSuccessModal();
                clearSavedFormData();
            }, 1000);

            // Reset form
            form.reset();
            
            // Clear all field states
            const allFields = form.querySelectorAll('.form-input, .form-select, .form-textarea');
            allFields.forEach(field => {
                field.style.borderColor = '';
                field.style.boxShadow = '';
                field.style.background = '';
                const messages = field.parentNode.querySelectorAll('.field-error, .field-success');
                messages.forEach(msg => msg.remove());
            });

        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button state after delay
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                btnText.textContent = 'Schedule My Free Consultation';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                progressBar.remove();
            }, 2000);
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
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        if (field.type === 'tel') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
                showFieldError(field, 'Please enter a valid phone number');
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
            font-weight: 600;
        `;
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 1rem;
            z-index: 10001;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    function createConfetti() {
        const colors = ['#D4AF37', '#50C878', '#FF6B6B', '#9B59B6', '#00BCD4'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                z-index: 10000;
                pointer-events: none;
                border-radius: 50%;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
}

// Success modal with enhanced animations
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add celebration animation to success icon
    const successIcon = modal.querySelector('.success-icon');
    successIcon.style.animation = 'pulse 1s ease-in-out infinite';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Enhanced mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Add body scroll lock
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Enhanced scroll effects with parallax
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Header background effect
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Parallax effect for hero background
        const heroBackground = document.querySelector('.consultation-hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        // Floating animation for form elements
        const floatingElements = document.querySelectorAll('.benefit-item, .expectation-item, .trust-item');
        floatingElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const offset = (scrollY - element.offsetTop) * 0.1;
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    });
}

// Advanced form interactions
function initializeAdvancedInteractions() {
    // Auto-resize textarea with smooth animation
    const textareas = document.querySelectorAll('.form-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });

        // Add typing indicator
        textarea.addEventListener('input', debounce(function() {
            const indicator = this.parentNode.querySelector('.typing-indicator');
            if (indicator) indicator.remove();

            if (this.value.length > 0) {
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'typing-indicator';
                typingIndicator.style.cssText = `
                    color: var(--royal-blue);
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                typingIndicator.textContent = `${this.value.length} characters`;
                this.parentNode.appendChild(typingIndicator);
                
                setTimeout(() => {
                    typingIndicator.style.opacity = '1';
                }, 10);
            }
        }, 300));
    });

    // Enhanced radio and checkbox interactions
    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(212, 175, 55, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: 50%;
                top: 50%;
                margin-left: -50px;
                margin-top: -50px;
            `;
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Form progress tracking
    const form = document.getElementById('consultationForm');
    const sections = form.querySelectorAll('.form-section');
    let completedSections = 0;

    function updateProgress() {
        const totalSections = sections.length;
        const progressPercentage = (completedSections / totalSections) * 100;
        
        // Create or update progress indicator
        let progressIndicator = document.querySelector('.form-progress');
        if (!progressIndicator) {
            progressIndicator = document.createElement('div');
            progressIndicator.className = 'form-progress';
            progressIndicator.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${progressPercentage}%;
                height: 3px;
                background: var(--gradient-royal);
                z-index: 1001;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressIndicator);
        } else {
            progressIndicator.style.width = progressPercentage + '%';
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
                        
                        // Add completion animation
                        section.style.background = 'rgba(16, 185, 129, 0.05)';
                        setTimeout(() => {
                            section.style.background = '';
                        }, 1000);
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
}

// Form persistence functionality
function initializeFormPersistence() {
    const form = document.getElementById('consultationForm');
    const formElements = form.querySelectorAll('input, select, textarea');

    // Save form data on input
    formElements.forEach(element => {
        element.addEventListener('input', debounce(() => {
            saveFormData();
        }, 500));
    });

    // Load saved data on page load
    loadFormData();

    function saveFormData() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Handle checkboxes
        const challenges = formData.getAll('challenges');
        data.challenges = challenges;
        
        localStorage.setItem('consultationFormData', JSON.stringify(data));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('consultationFormData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                Object.entries(data).forEach(([key, value]) => {
                    if (key === 'challenges' && Array.isArray(value)) {
                        value.forEach(challenge => {
                            const checkbox = form.querySelector(`[name="challenges"][value="${challenge}"]`);
                            if (checkbox) checkbox.checked = true;
                        });
                    } else {
                        const field = form.querySelector(`[name="${key}"]`);
                        if (field) {
                            if (field.type === 'radio') {
                                const specificField = form.querySelector(`[name="${key}"][value="${value}"]`);
                                if (specificField) specificField.checked = true;
                            } else {
                                field.value = value;
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error loading form data:', error);
            }
        }
    }

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
}

// Clear saved data on successful submission
function clearSavedFormData() {
    localStorage.removeItem('consultationFormData');
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

// Handle page visibility for form persistence
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        const form = document.getElementById('consultationForm');
        if (form) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const challenges = formData.getAll('challenges');
            data.challenges = challenges;
            localStorage.setItem('consultationFormData', JSON.stringify(data));
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeConsultationPage();
});

// Export functions for global access
window.closeModal = closeModal;
window.clearSavedFormData = clearSavedFormData;