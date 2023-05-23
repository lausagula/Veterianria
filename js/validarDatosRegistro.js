import {url} from './url.js'
const emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const telefonoValido = /^[1-9]\d{9,10}$/;
var  formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");



function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function enviarDatos(datos) {
    return new Promise((resolve, reject) => {
      fetch(url + "/php/sign-up-datos.php", {
        method: 'POST',
        body: datos
      })
        .then(res => res.json())
        .then(data => {
          if (data.exito) {
            mostrarMensaje(elemento, data.mensaje);
            resolve(); // Resuelve la promesa cuando la operación esté completa
          } else {
            mostrarMensaje(elemento, data.mensaje);
            reject(new Error("Error al enviar datos")); // Rechaza la promesa en caso de error
          }
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }


function enviarMail (datos){
    fetch((url + "/enviarEmailRegistro.php"), {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        console.log (data);
        if (data.exito) {
            mostrarMensaje(elemento, data.mensaje);
            window.location.href = (url + '/sign-up.html');
            formulario.reset ();
        } else {
            mostrarMensaje(elemento, data.mensaje);
        }
    })
    .catch(error => console.error(error));
}


formulario.addEventListener('submit' , function(e){
    e.preventDefault

    let datos = new FormData (formulario);
    let emailUsuario = datos.get('email');
    let telefonoUsuario = datos.get('phone');
    event.preventDefault();

    if (!emailValido.test(emailUsuario))  {        
        event.preventDefault();
        return mostrarMensaje(elemento, "El email es invalido. Ingrese nuevamente");
    }

    if(!telefonoValido.test(telefonoUsuario)){
        event.preventDefault();
        return mostrarMensaje(elemento, "El telefono es invalido. Ingrese nuevamente");
    }

    event.preventDefault();
    
    enviarDatos(datos)
        .then(() => enviarMail(datos))
        .catch(error => console.error(error));

    return mostrarMensaje(elemento,"");
})



   