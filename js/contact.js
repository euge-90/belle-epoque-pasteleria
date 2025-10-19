/**
 * BELLE ÉPOQUE - Contact Form Validation
 * Validación y manejo de formularios de contacto
 */

class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;

        this.init();
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    init() {
        this.attachEventListeners();
        this.createValidationMessages();
    }

    // ============================================
    // CREAR MENSAJES DE VALIDACIÓN
    // ============================================
    createValidationMessages() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.display = 'none';
            input.parentNode.appendChild(errorDiv);
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    attachEventListeners() {
        // Validación en tiempo real
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });

        // Submit del formulario
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // ============================================
    // VALIDACIÓN DE CAMPOS
    // ============================================
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let errorMessage = '';

        // Campo requerido
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        }

        // Validación de email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
        }

        // Validación de teléfono
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un teléfono válido';
            }
        }

        // Validación de nombre
        if (name === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
            }
        }

        // Validación de mensaje
        if (name === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
            }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }

        return isValid;
    }

    // ============================================
    // MOSTRAR ERROR
    // ============================================
    showError(field, message) {
        field.classList.add('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    // ============================================
    // LIMPIAR ERROR
    // ============================================
    clearError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    // ============================================
    // VALIDAR TODO EL FORMULARIO
    // ============================================
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // ============================================
    // MANEJAR SUBMIT
    // ============================================
    async handleSubmit(e) {
        e.preventDefault();

        // Validar formulario
        if (!this.validateForm()) {
            if (window.BelleEpoque && window.BelleEpoque.showToast) {
                window.BelleEpoque.showToast('Por favor, completa todos los campos correctamente', 'error');
            }
            return;
        }

        // Deshabilitar botón de submit
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            // Obtener datos del formulario
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Simular envío (en producción usarías Formspree o similar)
            await this.sendForm(data);

            // Mostrar mensaje de éxito
            this.showSuccessMessage();

            // Limpiar formulario
            this.form.reset();

            if (window.BelleEpoque && window.BelleEpoque.showToast) {
                window.BelleEpoque.showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            }

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            if (window.BelleEpoque && window.BelleEpoque.showToast) {
                window.BelleEpoque.showToast('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            }
        } finally {
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    // ============================================
    // ENVIAR FORMULARIO
    // ============================================
    async sendForm(data) {
        // Simular envío con delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Formulario enviado:', data);
                resolve(true);
            }, 1500);
        });

        // En producción, usarías algo como:
        /*
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al enviar formulario');
        }

        return response.json();
        */
    }

    // ============================================
    // MOSTRAR MENSAJE DE ÉXITO
    // ============================================
    showSuccessMessage() {
        // Crear mensaje de éxito si no existe
        let successMsg = this.form.querySelector('.success-message');

        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>¡Mensaje enviado con éxito!</h3>
                <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
            `;
            this.form.appendChild(successMsg);
        }

        successMsg.style.display = 'block';

        // Ocultar después de 5 segundos
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// NEWSLETTER FORM
// ============================================
class NewsletterForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const emailInput = this.form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (window.BelleEpoque && window.BelleEpoque.showToast) {
                window.BelleEpoque.showToast('Por favor, ingresa un email válido', 'error');
            }
            return;
        }

        // Guardar en localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        }

        // Mostrar mensaje
        if (window.BelleEpoque && window.BelleEpoque.showToast) {
            window.BelleEpoque.showToast('¡Gracias por suscribirte! Recibirás nuestras novedades.', 'success');
        }

        // Limpiar formulario
        this.form.reset();

        // Cerrar modal si existe
        const modal = this.form.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar formulario de contacto
    new ContactForm('contact-form');

    // Inicializar formulario de newsletter
    new NewsletterForm('newsletter-form');
});

console.log('📧 Sistema de formularios inicializado');
