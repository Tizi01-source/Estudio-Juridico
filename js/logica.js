
// EFECTO DEL MENÚ AL HACER SCROLL
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // Cambia a negro sólido
    } else {
        navbar.classList.remove('scrolled'); // Vuelve a transparente
    }
});

// LÓGICA PARA ENVIAR WHATSAPP
function enviarWhatsApp() {
    // Capturamos los valores de los inputs
    const nombre = document.getElementById('wa-nombre').value;
    const mensaje = document.getElementById('wa-mensaje').value;

    // Validamos que no envíen vacío
    if (!nombre || !mensaje) {
        alert("Por favor, complete su nombre y mensaje.");
        return;
    }

    // Número del estudio (incluir código de país, sin el +, por ej: 5491122334455 para Argentina)
    const numeroTelefono = "5491122614440"; // REEMPLAZAR POR EL REAL

    // Armamos el texto
    const textoFinal = `Hola, mi nombre es ${nombre}. Quería realizar la siguiente consulta: ${mensaje}`;

    // Codificamos el texto para que los espacios y saltos de línea funcionen en la URL
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(textoFinal)}`;

    // Abrimos WhatsApp en una pestaña nueva
    window.open(urlWhatsApp, '_blank');
}

// LÓGICA PARA ENVIAR EMAIL
async function enviarEmail() {
    // Capturamos los valores
    const nombre = document.getElementById('mail-nombre').value;
    const dni = document.getElementById('mail-dni').value;
    const correo = document.getElementById('mail-correo').value.trim();
    const telefono = document.getElementById('mail-telefono').value.trim();
    const mensaje = document.getElementById('mail-mensaje').value;

    // Validamos
    if (!nombre || !dni || !correo || !mensaje) {
        alert("Por favor, completá todos los campos obligatorios antes de enviar.");
        return;
    }

    // Endpoint de Formspree
    const formspreeUrl = "https://formspree.io/f/mkjnwgag"

    // Estructura de los datos + Asunto dinámico
    const datos = {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        email: correo,
        mensaje: mensaje,
        _subject: `CONSULTA DE ${nombre.toUpperCase()} DNI ${dni}`
    };

    try {
        const respuesta = await fetch(formspreeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            Swal.fire({
                title: '¡Consulta enviada!',
                text: 'Nos comunicaremos a la brevedad.',
                icon: 'success',
                confirmButtonColor: '#C5A869'
            });

            // Limpiamos los campos
            document.getElementById('mail-nombre').value = '';
            document.getElementById('mail-dni').value = '';
            document.getElementById('mail-mensaje').value = '';
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al enviar el correo. Por favor, intente vía WhatsApp.',
                icon: 'error',
                confirmButtonColor: '#C5A869'
            });
        }
    } catch (error) {
        alert("Error de conexión. Por favor, intente nuevamente.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const logoBtn = document.getElementById('logo-btn');
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const btnCerrar = document.getElementById('btn-cerrar');

    // Al tocar la crucecita, el panel se vuelve a esconder
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            navbar.classList.remove('abierto');
        });
    }

    // Al tocar el logo, abrimos o cerramos el menú
    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.toggle('abierto');
            }
        });
    }

    // Al tocar cualquier enlace, cerramos el menú automáticamente
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('abierto');
            }
        });
    });

    // Efecto Scrolled: Oscurecer barra y achicar logo en PC
    window.addEventListener('scroll', () => {
        // Solo aplica si estamos en PC (más de 768px de ancho)
        if (window.innerWidth > 768) {
            if (window.scrollY > 50) {
                if (navbar) navbar.classList.add('scrolled');
                if (logoBtn) logoBtn.classList.add('logo-achicado');
            } else {
                if (navbar) navbar.classList.remove('scrolled');
                if (logoBtn) logoBtn.classList.remove('logo-achicado');
            }
        }
    });

});


