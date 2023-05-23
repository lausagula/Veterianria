import {url} from './url.js'
const validarCaracteresEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
var  formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");

function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function validarEmail(valor){
    if ((valor.length === 0) || (!validarCaracteresEmail.test(valor))){
        mostrarMensaje (elemento,"El mail no es valido");
        return false;
    }
    return true;
}

function verificarEspacios(nombre,apellido,servicio,lugar,email){
    return (nombre.trim().length === 0)||(apellido.trim().length === 0)||(servicio.trim().length === 0)||(lugar.trim().length === 0)||(email.trim().length === 0);
}

function enviarDatos(datos){
    fetch( (url+"/php/cargar-datos-CP.php"), {
        method : 'POST' ,
        body : datos
    })
    .then(res => res.json())
    .then(data  => { 
        console.log (data);
        if (data.exito){
            mostrarMensaje(elemento,data.mensaje);
            formulario.reset();
        }else{ 
            mostrarMensaje(elemento,data.mensaje);
        }
    });
}

formulario.addEventListener('submit' , function(e){
    e.preventDefault

    let datos = new FormData (formulario);
    let nombre = datos.get('name');
    let apellido = datos.get('lastName');
    let email = datos.get('email');
    let servicio = datos.get('service');
    let lugar = datos.get('place');

    console.log (validarEmail(email));

    if (verificarEspacios(nombre,apellido,servicio,lugar,email)) {
        event.preventDefault();
        return mostrarMensaje(elemento,"Complete todos los campos");
    }

    if (!validarEmail(email)){
        event.preventDefault();
        return;
    }
    
    e.preventDefault();
    enviarDatos(datos);
    return mostrarMensaje(elemento,"");
})

