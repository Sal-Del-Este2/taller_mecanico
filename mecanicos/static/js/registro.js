$(document).ready(function() {
    $('#registroForm').on('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        
        // Obtener valores de los campos
        var nombre = $('#nombre').val();
        var correo = $('#correo').val();
        var password = $('#password').val();
        var check = $('#exampleCheck1').is(':checked');
        var errorDiv = $('#error');
        
        // Reiniciar mensajes de error
        errorDiv.html('');
        
        // Validaciones básicas
        var isValid = true;

        if (nombre === '') {
            errorDiv.append('<p>El nombre es obligatorio.</p>');
            isValid = false;
        }
        
        if (correo === '') {
            errorDiv.append('<p>El correo es obligatorio.</p>');
            isValid = false;
        }

        if (password === '') {
            errorDiv.append('<p>La contraseña es obligatoria.</p>');
            isValid = false;
        }
        
        if (!check) {
            errorDiv.append('<p>Debes aceptar los términos y condiciones.</p>');
            isValid = false;
        }
        
        // Verificar si el correo ya está registrado
        var usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].correo === correo) {
                errorDiv.append('<p>El correo ingresado ya está registrado.</p>');
                isValid = false;
                break;
            }
        }
        
        // Si todas las validaciones pasan, guardar usuario en usuario.json
        if (isValid) {
            // Crear objeto de usuario
            var usuario = {
                nombre: nombre,
                correo: correo,
                password: password
            };

            // Agregar nuevo usuario al arreglo de usuarios
            usuarios.push(usuario);

            // Guardar el arreglo de usuarios actualizado en localStorage
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

            // Crear un Blob (objeto binario largo) que contiene el arreglo de usuarios como JSON
            var blob = new Blob([JSON.stringify(usuarios)], { type: 'application/json' });

            // Limpiar la URL del objeto Blob
            URL.revokeObjectURL(url);
        }
    });
});