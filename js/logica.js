
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
    const numeroTelefono = "5491100000000"; // REEMPLAZAR POR EL REAL

    // Armamos el texto
    const textoFinal = `Hola, mi nombre es ${nombre}. Quería realizar la siguiente consulta: ${mensaje}`;

    // Codificamos el texto para que los espacios y saltos de línea funcionen en la URL
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(textoFinal)}`;

    // Abrimos WhatsApp en una pestaña nueva
    window.open(urlWhatsApp, '_blank');
}

// LÓGICA PARA ENVIAR EMAIL (Con DNI en el Asunto)
function enviarEmail() {
    // Capturamos los valores
    const nombre = document.getElementById('mail-nombre').value;
    const dni = document.getElementById('mail-dni').value;
    const mensaje = document.getElementById('mail-mensaje').value;

    // Validamos
    if (!nombre || !dni || !mensaje) {
        alert("Por favor, complete todos los campos para enviar el email.");
        return;
    }

    // Mail del estudio
    const mailEstudio = "contacto@costantiniasociados.com.ar"; // REEMPLAZAR POR EL REAL

    // Armamos el asunto dinámico
    const asunto = `CONSULTA DE "${nombre.toUpperCase()}" DNI ${dni}`;

    // Armamos el link 'mailto'
    // Ejecutamos el enlace (abre la app de mail predeterminada del usuario)
    window.location.href = `mailto:${mailEstudio}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
}