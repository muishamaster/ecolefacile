/* ========================================
   ECOLEFACILE.CD - SCRIPTS PRINCIPAUX
   ======================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialiser toutes les fonctions
    initMobileMenu();
    initFilters();
    initFormValidation();
    initStepNavigation();
    initSmoothScroll();
    initPhoneFormat();
    initPasswordStrength();
    initAnimation();
    
});

/* ----------------------------------------
   MENU MOBILE
   ---------------------------------------- */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Changer l'icône
        const icon = this.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

/* ----------------------------------------
   FILTRES
   ---------------------------------------- */
function initFilters() {
    // Filtres par boutons
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons du même groupe
            const parent = this.parentElement;
            parent.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Ici vous pouvez ajouter la logique de filtrage
            const filterValue = this.textContent.trim();
            console.log('Filtre sélectionné:', filterValue);
            
            // Simulation de filtrage (à remplacer par votre logique)
            filterSchools(filterValue);
        });
    });
    
    // Filtres par selects
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filtre changé:', this.value);
            // Ici vous pouvez ajouter la logique de filtrage
            filterSchools(this.value);
        });
    });
}

function filterSchools(filterValue) {
    // Cette fonction sera implémentée selon vos besoins
    // Elle pourrait masquer/afficher des éléments, faire des appels API, etc.
    console.log('Filtrage des écoles par:', filterValue);
}

/* ----------------------------------------
   VALIDATION DE FORMULAIRES
   ---------------------------------------- */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Si le formulaire est valide
                console.log('Formulaire valide, envoi en cours...');
                
                // Simuler l'envoi
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                        // Rediriger ou afficher un message de succès
                        if (this.id === 'inscription-form') {
                            window.location.href = 'confirmation.html';
                        } else {
                            alert('Formulaire envoyé avec succès !');
                        }
                    }, 1500);
                }
            }
        });
    });
    
    // Validation en temps réel
    const inputs = document.querySelectorAll('.form-input[required], .form-select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    let isValid = true;
    let errorMessage = '';
    
    // Réinitialiser l'état d'erreur
    field.classList.remove('error');
    if (errorElement) errorElement.style.display = 'none';
    
    // Vérifier si le champ est vide
    if (!field.value.trim()) {
        isValid = false;
        errorMessage = 'Ce champ est requis';
    }
    
    // Validations spécifiques
    else if (field.type === 'email' && !isValidEmail(field.value)) {
        isValid = false;
        errorMessage = 'Adresse email invalide';
    }
    else if (field.type === 'tel' && !isValidPhone(field.value)) {
        isValid = false;
        errorMessage = 'Numéro de téléphone invalide';
    }
    else if (field.id === 'password' && !isStrongPassword(field.value)) {
        isValid = false;
        errorMessage = 'Mot de passe trop faible';
    }
    else if (field.id === 'confirmPassword') {
        const password = document.getElementById('password')?.value;
        if (password && field.value !== password) {
            isValid = false;
            errorMessage = 'Les mots de passe ne correspondent pas';
        }
    }
    
    // Afficher l'erreur si nécessaire
    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    }
    
    return isValid;
}

/* ----------------------------------------
   NAVIGATION DES ÉTAPES (inscription)
   ---------------------------------------- */
function initStepNavigation() {
    // Vérifier si nous sommes sur la page d'inscription
    const stepContents = {
        step1: document.getElementById('step1-content'),
        step2: document.getElementById('step2-content'),
        step3: document.getElementById('step3-content')
    };
    
    if (!stepContents.step1) return;
    
    // Rendre les fonctions disponibles globalement
    window.nextStep = function() {
        const currentStep = getCurrentStep();
        
        if (currentStep < 3) {
            // Valider l'étape actuelle avant de passer à la suivante
            if (currentStep === 1 && !validateStep1()) {
                return;
            }
            
            // Masquer l'étape actuelle
            document.getElementById(`step${currentStep}-content`).style.display = 'none';
            document.getElementById(`step${currentStep}`).classList.remove('active');
            document.getElementById(`step${currentStep}`).classList.add('completed');
            
            // Afficher l'étape suivante
            const nextStep = currentStep + 1;
            document.getElementById(`step${nextStep}-content`).style.display = 'block';
            document.getElementById(`step${nextStep}`).classList.add('active');
            
            // Mettre à jour le titre
            updateStepTitle(nextStep);
        }
    };
    
    window.prevStep = function() {
        const currentStep = getCurrentStep();
        
        if (currentStep > 1) {
            // Masquer l'étape actuelle
            document.getElementById(`step${currentStep}-content`).style.display = 'none';
            document.getElementById(`step${currentStep}`).classList.remove('active');
            
            // Afficher l'étape précédente
            const prevStep = currentStep - 1;
            document.getElementById(`step${prevStep}-content`).style.display = 'block';
            document.getElementById(`step${prevStep}`).classList.add('active');
            
            // Retirer le statut completed de l'étape suivante si nécessaire
            if (currentStep === 2) {
                document.getElementById('step2').classList.remove('completed');
            }
            
            // Mettre à jour le titre
            updateStepTitle(prevStep);
        }
    };
    
    function getCurrentStep() {
        for (let i = 1; i <= 3; i++) {
            if (document.getElementById(`step${i}-content`).style.display !== 'none') {
                return i;
            }
        }
        return 1;
    }
    
    function updateStepTitle(step) {
        const titles = {
            1: 'Informations personnelles',
            2: 'Documents requis',
            3: 'Confirmation et paiement'
        };
        
        const titleElement = document.getElementById('step-title');
        if (titleElement) {
            titleElement.textContent = titles[step];
        }
    }
    
    function validateStep1() {
        // Valider les champs de l'étape 1
        const requiredFields = ['childName', 'childFirstname', 'parentName', 'parentPhone'];
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
}

/* ----------------------------------------
   RÉCUPÉRER LES PARAMÈTRES D'URL
   ---------------------------------------- */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/* ----------------------------------------
   FORMATAGE DU TÉLÉPHONE
   ---------------------------------------- */
function initPhoneFormat() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length >= 9) {
                // Formater pour la RDC: 81 234 5678
                if (value.startsWith('243')) {
                    value = value.substring(3);
                }
                value = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
                this.value = value;
            }
        });
        
        // Empêcher les caractères non numériques
        input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char)) {
                e.preventDefault();
            }
        });
    });
}

/* ----------------------------------------
   VALIDATION DES EMAILS
   ---------------------------------------- */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ----------------------------------------
   VALIDATION DES TÉLÉPHONES
   ---------------------------------------- */
function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 9;
}

/* ----------------------------------------
   FORCE DU MOT DE PASSE
   ---------------------------------------- */
function initPasswordStrength() {
    const passwordInput = document.getElementById('password');
    
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthMeter = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        if (!strengthMeter || !strengthText) return;
        
        let strength = 0;
        let color = '';
        let text = '';
        
        // Vérifier les critères
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        // Mettre à jour les indicateurs
        updateRequirement('length', hasLength);
        updateRequirement('uppercase', hasUppercase);
        updateRequirement('lowercase', hasLowercase);
        updateRequirement('number', hasNumber);
        updateRequirement('special', hasSpecial);
        
        // Calculer la force
        const criteria = [hasLength, hasUppercase, hasLowercase, hasNumber, hasSpecial];
        strength = criteria.filter(Boolean).length * 20;
        
        // Déterminer la couleur et le texte
        if (strength <= 20) {
            color = '#DC2626';
            text = 'Très faible';
        } else if (strength <= 40) {
            color = '#F59E0B';
            text = 'Faible';
        } else if (strength <= 60) {
            color = '#FBBF24';
            text = 'Moyen';
        } else if (strength <= 80) {
            color = '#10B981';
            text = 'Fort';
        } else {
            color = '#047857';
            text = 'Très fort';
        }
        
        // Mettre à jour l'affichage
        strengthMeter.style.width = strength + '%';
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    });
    
    function updateRequirement(id, isValid) {
        const element = document.getElementById('req-' + id);
        if (element) {
            if (isValid) {
                element.classList.add('valid');
                element.querySelector('i').className = 'fas fa-check-circle';
            } else {
                element.classList.remove('valid');
                element.querySelector('i').className = 'fas fa-circle';
            }
        }
    }
}

function isStrongPassword(password) {
    if (!password) return false;
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasLength && hasUppercase && hasLowercase && (hasNumber || hasSpecial);
}

/* ----------------------------------------
   SMOOTH SCROLL
   ---------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ----------------------------------------
   ANIMATIONS AU SCROLL
   ---------------------------------------- */
function initAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.school-card, .step-card, .school-item').forEach(el => {
        observer.observe(el);
    });
}

/* ----------------------------------------
   CHARGEMENT DES DONNÉES D'ÉCOLES (si nécessaire)
   ---------------------------------------- */
function loadSchools(commune = 'all', niveau = 'all') {
    // Cette fonction pourrait charger les écoles depuis une API
    // ou depuis un fichier JSON local
    console.log('Chargement des écoles pour:', commune, niveau);
    
    // Exemple de données
    const schools = [
        { name: 'Complexe Scolaire Les Aigles', commune: 'Gombe', niveau: 'secondaire', frais: 350 },
        { name: 'École Belge de Kinshasa', commune: 'Kintambo', niveau: 'primaire', frais: 500 },
        // ...
    ];
    
    return schools;
}

/* ----------------------------------------
   INITIALISATION DE LA PAGE D'INSCRIPTION
   ---------------------------------------- */
function initInscriptionPage() {
    const ecoleId = getUrlParameter('ecole');
    if (ecoleId) {
        // Charger les détails de l'école
        const ecoleDetails = {
            'les-aigles': { nom: 'Complexe Scolaire Les Aigles', frais: 350 },
            'belge': { nom: 'École Belge de Kinshasa', frais: 500 },
            'kabambare': { nom: 'Lycée Kabambare', frais: 150 }
        };
        
        if (ecoleDetails[ecoleId]) {
            // Mettre à jour le résumé
            const schoolNameElement = document.getElementById('summary-school');
            const feesElement = document.getElementById('summary-fees');
            
            if (schoolNameElement) {
                schoolNameElement.textContent = ecoleDetails[ecoleId].nom;
            }
            if (feesElement) {
                feesElement.textContent = ecoleDetails[ecoleId].frais + '$';
            }
        }
    }
}

/* ----------------------------------------
   IMPRESSION DE LA PAGE DE CONFIRMATION
   ---------------------------------------- */
function printConfirmation() {
    window.print();
}

// Rendre les fonctions globales disponibles
window.printConfirmation = printConfirmation;