import {url} from './url.js';
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");
var fechaActual = new Date ();

function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

function enviarDatos (datos){
    fetch((url+"/php/registrar-urgencia.php"),{ 
        method: 'POST',
        body: datos
    })
    .then(response => response.json())       
    .then(data => {
        if(data.exito){
            mostrarMensaje(data.mensaje);
            alert(data.mensaje);
            localStorage.removeItem('id_perro');
            window.location.href = (url + '/mostrarInformacionPerro.html');
        }else{
            mostrarMensaje(data.mensaje);
            alert(data.mensaje);
        }
    })
    .catch(error => console.error(error));
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    let datos = new FormData (formulario);
    datos.append('id_perro',localStorage.getItem('id_perro'));
    let obs = datos.get('observacion');
    if (obs === " "){
        alert('El campo de observaciones no puede estar vacio.');
    }else{
        enviarDatos(datos);
    }
});




