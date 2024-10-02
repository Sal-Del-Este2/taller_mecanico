$(document).ready(function() {
//barra superior
let data = [];

// Cargar data.json
$.getJSON('data.json', function(response) {
    data = response;
});

// Manejar la entrada del usuario en el campo de búsqueda
$('#searchInput').on('input', function() {
    const query = $(this).val().toLowerCase();
    const suggestions = data.filter(item => item.nombre.toLowerCase().includes(query));
    showSuggestions(suggestions);
});

// Mostrar sugerencias
function showSuggestions(suggestions) {
    const suggestionsContainer = $('#suggestions');
    suggestionsContainer.empty();
    suggestions.forEach(suggestion => {
        const suggestionItem = $('<div class="suggestion-item"></div>').text(suggestion.nombre);
        suggestionItem.on('click', function() {
            navigateTo(suggestion.url);
        });
        suggestionsContainer.append(suggestionItem);
    });
}



//inicio de sesión
    $('#inicioSesionForm').on('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        
        // Obtener valores de los campos
        var usuario = $('#usuario').val();
        var contrasena = $('#password').val(); // Cambio aquí para coincidir con el ID del campo de contraseña
        var errorDiv = $('#error');
        
        // Reiniciar mensajes de error
        errorDiv.html('');

        // Obtener usuarios del localStorage
        var usuariosLocalStorage = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscar usuario en el localStorage
        var usuarioEncontradoLocalStorage = usuariosLocalStorage.find(function(user) {
            return user.nombre === usuario && user.password === contrasena;
        });

        if (usuarioEncontradoLocalStorage) {
            redirigirUsuario(usuarioEncontradoLocalStorage.nombre);
        } else {
            // Leer lista de usuarios desde el archivo JSON
            $.getJSON('usuarios.json', function(data) {
                // Verificar credenciales ingresadas por el usuario
                var usuarioEncontradoJson = data.find(function(user) {
                    return user.nombre === usuario && user.password === contrasena;
                });

                if (usuarioEncontradoJson) {
                    redirigirUsuario(usuarioEncontradoJson.nombre);
                } else {
                    errorDiv.append('<p>Usuario o contraseña incorrectos.</p>');
                }
            }).fail(function() {
                errorDiv.append('<p>Error al cargar usuarios.</p>');
            });
        }
    });

    function redirigirUsuario(nombreUsuario) {
        // Redirigir a la página correspondiente según el usuario
        if (nombreUsuario === 'esteban') {
            window.location.href = "esteban.html";
        } else if (nombreUsuario === 'nicolas') {
            window.location.href = 'nicolas.html';
        } else if (nombreUsuario === 'juan') {
            window.location.href = 'juan.html';
        } else {
            // Si el usuario no es Esteban, Nicolas o Juan, redirigir al index.html
            window.location.href = 'index.html';
        }
    }
//busqueda
    $('#searchForm').on('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const query = $('#searchInput').val().toLowerCase();

        // Simulación de una solicitud a una API usando fetch con busqueda.json
        $.getJSON('busqueda.json', function(data) {
            // Buscar la entrada correspondiente al nombre ingresado
            const result = data.find(item => item.nombre.toLowerCase() === query);
            if (result) {
                window.location.href = result.url;
            } else {
                alert("No se encontraron resultados");
            }
        }).fail(function() {
            console.error("Error al realizar la búsqueda");
            alert("Ocurrió un error al realizar la búsqueda");
        });
    });

//carrusel
    $.getJSON('carrusel.json', function(data) {
        let indicators = '';
        let slides = '';

        data.forEach((item, index) => {
            const active = index === 0 ? 'active' : '';
            indicators += `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${active}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
            slides += `
                <div class="carousel-item ${active}">
                    <a href="${item.url}"><img src="${item.imagen}" class="d-block w-100" alt="Imagen del último trabajo ${index + 1}"></a>
                    <div class="carousel-caption d-none d-md-block">
                        <h2 class="txt-amarillo">${item.titulo}</h2>
                        <h5 class="txt-amarillo">${item.descripcion}</h5>
                    </div>
                </div>
            `;
        });

        $('#carouselIndicators').html(indicators);
        $('#carouselInner').html(slides);
    });
});

function navigateTo(url) {
    window.location.href = url;
}