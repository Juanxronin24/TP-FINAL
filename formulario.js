const users = [
    { name: "Juan Pérez", email: "juan@example.com", password: "juan123" },
    { name: "Ana Gómez", email: "ana@example.com", password: "ana123" },
    { name: "Carlos Ruiz", email: "carlos@example.com", password: "carlos123" }
];

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario para validarlo

    // Limpiar mensajes de error anteriores
    clearErrors();

    // Obtener los valores de los campos
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();

    var valid = true;

    // Validación de nombre
    if (name === '') {
        showError('nameError', 'El nombre es obligatorio');
        valid = false;
    }

    // Validación de correo electrónico
    if (email === '') {
        showError('emailError', 'El correo electrónico es obligatorio');
        valid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'El correo electrónico no es válido');
        valid = false;
    }

    // Validación de contraseña
    if (password === '') {
        showError('passwordError', 'La contraseña es obligatoria');
        valid = false;
    }

    // Validación de confirmación de contraseña
    if (confirmPassword === '') {
        showError('confirmPasswordError', 'Debes confirmar la contraseña');
        valid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Las contraseñas no coinciden');
        valid = false;
    }

    // Verificar si el nombre y la contraseña coinciden con un usuario registrado
    if (valid) {
        if (checkExistingUser(name, password)) {
            document.getElementById('successMessage').textContent = '¡Registro exitoso! Bienvenido, ' + name + '!';
            document.getElementById('registerForm').reset(); // Limpiar el formulario
        } else {
            showError('nameError', 'El nombre de usuario o la contraseña no son válidos');
        }
    }
});

// Función para verificar si el usuario ya está registrado
function checkExistingUser(name, password) {
    // Buscar si el nombre y la contraseña coinciden con algún usuario registrado
    for (let user of users) {
        if (user.name === name && user.password === password) {
            return true; // Si el usuario y la contraseña coinciden, retorna true
        }
    }
    return false; // Si no se encuentra coincidencia, retorna false
}

// Función para mostrar el mensaje de error en un campo específico
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Función para limpiar los errores
function clearErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('successMessage').textContent = '';
}

// Función para validar el formato de un correo electrónico
function validateEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

