import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}


function enviarDatos(datos){

    fetch( (url+"/php/registrarPerroPerdido.php"),{
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        if(data.exito){
            alert(data.mensaje);
            window.location.href = (url + '/index.html');
        }else{
            alert(data.mensaje);
        }
    })
    .catch(error => console.error(error));

}

formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    let datos = new FormData (formulario);

    if (localStorage.getItem('loggedAdm') === 'false'){
        datos.append('id_cliente', localStorage.getItem('idUsuario'));
    }else{
        datos.append('id_cliente', 1);
    }
    

    let fechaActual = new Date();
    let fechaPerdido = new Date(datos.get('fecha'));

    if(datos.get('zona').trim() == ""){
        mostrarMensaje('El campo zona necesita ser completado');
    }else if(fechaPerdido > fechaActual){
        mostrarMensaje('La fecha ingresada debe ser menor a la fecha actual');
    }else if(datos.get('caracteristicas').trim() == ""){
        mostrarMensaje('El campo caracteristicas necesita ser completado');
    }else if(datos.get('comportamiento').trim() == ""){
        mostrarMensaje('El campo comportamiento necesita ser completado');
    }else{
        enviarDatos(datos);
    }
    
    
});

