// Fonction pour afficher/masquer le mot de passe
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

// Fonction pour valider l'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour valider le nom d'utilisateur
function validateUsername(username) {
    // Le nom d'utilisateur doit contenir entre 3 et 20 caractères alphanumériques et underscores
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

// Fonction pour valider l'identifiant (email ou nom d'utilisateur)
function validateIdentifier(identifier) {
    if (!identifier || identifier.trim() === '') {
        return {
            isValid: false,
            message: 'L\'identifiant est requis'
        };
    }

    const trimmedIdentifier = identifier.trim();

    // Vérifier si c'est un email
    if (validateEmail(trimmedIdentifier)) {
        return {
            isValid: true,
            message: 'Email valide',
            type: 'email'
        };
    }

    // Vérifier si c'est un nom d'utilisateur valide
    if (validateUsername(trimmedIdentifier)) {
        return {
            isValid: true,
            message: 'Nom d\'utilisateur valide',
            type: 'username'
        };
    }

    // Si ce n'est ni un email ni un nom d'utilisateur valide
    return {
        isValid: false,
        message: 'Veuillez entrer un email valide (ex: user@example.com) ou un nom d\'utilisateur (3-20 caractères alphanumériques)'
    };
}

// Fonction pour valider le mot de passe
function validatePassword(password) {
    if (!password || password.trim() === '') {
        return {
            isValid: false,
            message: 'Le mot de passe est requis'
        };
    }

    const trimmedPassword = password.trim();

    // Vérifier la longueur minimale
    if (trimmedPassword.length < 6) {
        return {
            isValid: false,
            message: 'Le mot de passe doit contenir au moins 6 caractères'
        };
    }

    // Vérifier la longueur maximale
    if (trimmedPassword.length > 50) {
        return {
            isValid: false,
            message: 'Le mot de passe ne peut pas dépasser 50 caractères'
        };
    }

    // Vérifier qu'il contient au moins une lettre
    if (!/[a-zA-Z]/.test(trimmedPassword)) {
        return {
            isValid: false,
            message: 'Le mot de passe doit contenir au moins une lettre'
        };
    }

    // Vérifier qu'il contient au moins un chiffre
    if (!/[0-9]/.test(trimmedPassword)) {
        return {
            isValid: false,
            message: 'Le mot de passe doit contenir au moins un chiffre'
        };
    }

    return {
        isValid: true,
        message: 'Mot de passe valide'
    };
}

// Fonction pour afficher un message d'erreur
function showError(inputElement, message) {
    // Supprimer les anciens messages d'erreur
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Supprimer la classe d'erreur
    inputElement.classList.remove('error');

    // Créer et afficher le nouveau message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    inputElement.parentElement.appendChild(errorDiv);
    inputElement.classList.add('error');
}

// Fonction pour supprimer les messages d'erreur
function clearError(inputElement) {
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    inputElement.classList.remove('error');
}

// Fonction pour afficher un message de succès
function showSuccess(inputElement) {
    clearError(inputElement);
    inputElement.classList.add('success');
}

// Fonction principale de validation du formulaire
function validateForm(identifier, password) {
    let isValid = true;

    // Valider l'identifiant
    const identifierValidation = validateIdentifier(identifier);
    const identifierInput = document.getElementById('email');
    
    if (!identifierValidation.isValid) {
        showError(identifierInput, identifierValidation.message);
        isValid = false;
    } else {
        showSuccess(identifierInput);
    }

    // Valider le mot de passe
    const passwordValidation = validatePassword(password);
    const passwordInput = document.getElementById('password');
    
    if (!passwordValidation.isValid) {
        showError(passwordInput, passwordValidation.message);
        isValid = false;
    } else {
        showSuccess(passwordInput);
    }

    return isValid;
}

// Fonction de gestion de la connexion
function handleLogin(event) {
    event.preventDefault();
    
    const identifier = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Valider le formulaire
    if (!validateForm(identifier, password)) {
        console.log('Validation échouée');
        return;
    }

    // Si la validation réussit, procéder à la connexion
    console.log('Tentative de connexion:', {
        identifier: identifier,
        remember: remember
    });

    // Ici vous pouvez ajouter votre logique de connexion (appel API, etc.)
    // Exemple :
    // try {
    //     const response = await fetch('/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             identifier: identifier,
    //             password: password,
    //             remember: remember
    //         })
    //     });
    //     
    //     if (response.ok) {
    //         const data = await response.json();
    //         // Gérer la réponse de connexion réussie
    //         window.location.href = '/dashboard';
    //     } else {
    //         // Gérer les erreurs de connexion
    //         alert('Identifiant ou mot de passe incorrect');
    //     }
    // } catch (error) {
    //     console.error('Erreur lors de la connexion:', error);
    //     alert('Une erreur est survenue. Veuillez réessayer.');
    // }

    // Pour l'instant, afficher un message de succès
    alert('Connexion réussie !\n\nIdentifiant: ' + identifier + '\nSe souvenir: ' + (remember ? 'Oui' : 'Non'));
    
    // Vous pouvez rediriger vers une autre page ici
    // window.location.href = '/dashboard';
}

// Ajouter des écouteurs d'événements pour la validation en temps réel
document.addEventListener('DOMContentLoaded', function() {
    const identifierInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Validation de l'identifiant lors de la saisie
    identifierInput.addEventListener('blur', function() {
        const identifier = this.value;
        if (identifier.trim() !== '') {
            const validation = validateIdentifier(identifier);
            if (!validation.isValid) {
                showError(this, validation.message);
            } else {
                showSuccess(this);
            }
        } else {
            clearError(this);
        }
    });

    // Validation du mot de passe lors de la saisie
    passwordInput.addEventListener('blur', function() {
        const password = this.value;
        if (password.trim() !== '') {
            const validation = validatePassword(password);
            if (!validation.isValid) {
                showError(this, validation.message);
            } else {
                showSuccess(this);
            }
        } else {
            clearError(this);
        }
    });

    // Supprimer les erreurs lors de la saisie
    identifierInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });
});

