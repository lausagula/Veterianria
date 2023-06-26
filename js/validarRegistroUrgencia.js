import {url} from './url.js';
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");
var fechaActual = new Date ();

function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

function descuentos(id_cliente,monto){

    let datosNuevo = new FormData ();
    datosNuevo.append('id_cliente',localStorage.getItem('idUsuario'));
    datosNuevo.append('monto', monto);

    if(monto != null){
        fetch((url+"/php/reducir-descuento.php"),{
            method: 'POST',
            body: datosNuevo
        })
        .then(response => response.json())       
        .then(data => {
            if(data.exito){
                console.log(data.mensaje);
            }else{
                mostrarMensaje(data.mensaje);
                alert(data.mensaje);
            }
        })
        .catch(error => console.error(error));
    }
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
            descuentos(localStorage.getItem('id_cliente'), datos.get('descuento'));
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




