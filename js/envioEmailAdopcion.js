import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");
const telefonoValido = /^[1-9]\d{9,10}$/;

function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
};


function enviarMail(datos){
    fetch((url + "/enviarEmailAdopcion.php"), {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        console.log (data);
        if (data.exito) {
            mostrarMensaje(elemento, data.mensaje);
            localStorage.removeItem('emailAdopcion');
            localStorage.removeItem('razaPerro');
            window.location.href = (url + '/verAdopciones.html');
            
        } else {
            mostrarMensaje(elemento, data.mensaje);
        }
    })
    .catch(error => console.error(error));
}; 


formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    var datos = new FormData(formulario); 
    datos.append('emailDueño',localStorage.getItem('emailAdopcion'));
    datos.append('raza',localStorage.getItem('razaPerro'));
    let nombre = datos.get('name');
    let telefono = datos.get('telefono');
    let resumen = datos.get('resumen');

    if (nombre === " ") {
        event.preventDefault();
        return mostrarMensaje(elemento, "Complete el campo Nombre completo");
    };
    if (resumen === " ") {
        event.preventDefault();
        return mostrarMensaje(elemento, "Complete el campo Sobre ti");
    };
    if ((telefono === " ") || (!telefonoValido.test(telefono))) {
        event.preventDefault();
        return mostrarMensaje(elemento, "Ingrese un telefono valido");
    };
    
    enviarMail(datos);
   
});
