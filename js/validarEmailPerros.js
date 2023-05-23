import {url} from './url.js'
const emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
var  formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");




function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function enviarDatos(datos){
    fetch( (url+"/php/verificar-email-perros.php"), {              //modificar !!!!!!!!!!!
        method : 'POST' ,
        body : datos
    })
    .then(res => res.json())
    .then(data  => { 
        if (data.exito){
            mostrarMensaje(elemento,data.mensaje);
            window.location.href = (url+'/registrar-perro.html');
        }else{ 
            mostrarMensaje(elemento,data.mensaje);
        }
    });
}

formulario.addEventListener('submit' , function(e){
    e.preventDefault

    let datos = new FormData (formulario);
    let emailUsuario = datos.get('email');

    if (!emailValido.test(emailUsuario)) {
        event.preventDefault();
        return mostrarMensaje(elemento, "El email es invalido. Ingrese nuevamente");
    }
    event.preventDefault();
    localStorage.setItem('emailRegistroPerro',emailUsuario);
    enviarDatos(datos);
    return mostrarMensaje(elemento,"");
})
