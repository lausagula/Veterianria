import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");
const telefonoValido = /^[1-9]\d{9,10}$/;
const emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
};


function enviarMail(datos){
    fetch((url + "/enviarEmailBP.php"), {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        console.log (data);
        if (data.exito) {
            alert(data.mensaje);
            localStorage.removeItem('razaPerro');
            localStorage.removeItem('tipoServicio');
            localStorage.removeItem('mailAviso');
            window.location.href = (url + '/index.html');
            
        } else {
            alert(data.mensaje);
        }
    })
    .catch(error => console.error(error));
}; 


formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    var datos = new FormData(formulario);
    datos.append('raza',localStorage.getItem('razaPerro'));
    datos.append('tipoServicio',localStorage.getItem('tipoServicio'));
    datos.append('mailAviso',localStorage.getItem('mailAviso'));
    let nombre = datos.get('name');
    let telefono = datos.get('telefono');
    let resumen = datos.get('resumen');
    let mail = datos.get('email');


    if (nombre.trim() === "") {
        event.preventDefault();
        return mostrarMensaje("Complete el campo Nombre completo");
    }
    if((mail === " ") || (!emailValido.test(mail))){
        event.preventDefault();
        return mostrarMensaje("Complete el campo email");
    }
    if (resumen === " ") {
        event.preventDefault();
        return mostrarMensaje("Complete el campo Sobre ti");
    };
    if ((telefono === " ") || (!telefonoValido.test(telefono))) {
        event.preventDefault();
        return mostrarMensaje("Ingrese un telefono valido");
    };

    enviarMail(datos);
   
});
