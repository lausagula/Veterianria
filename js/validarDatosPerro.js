import {url} from './url.js'
var  formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function enviarDatos(datos){
    fetch( (url+"/php/cargar-perro.php"), { 
        method : 'POST' ,
        body : datos
    })
    .then(res => res.json())
    .then(data  => { 
        console.log (data);
        if (data.exito){
            mostrarMensaje(elemento,data.mensaje);
            var urlCLiente = new URL(window.location.href);
           // var idCliente = urlCLiente.searchParams.get("id");
            //console.log(idCliente+" validar perro");
            //window.location.href = (url+'/index.html?id='+idCliente);
            window.location.href = (url+'/index.html');
        }else{ 
            mostrarMensaje(elemento,data.mensaje);
        }
    });
}

formulario.addEventListener('submit' , function(e){
    e.preventDefault

    let datos = new FormData (formulario);
    let fechaNac = datos.get('nacimiento');
    let fechaNacimiento = new Date(fechaNac);
    var fechaActual = new Date();

    if (fechaNacimiento.getTime() > fechaActual.getTime())  {    
        event.preventDefault();
        return mostrarMensaje(elemento, "Fecha de nacimiento invalido. Ingrese nuevamente");
    }

    event.preventDefault();
    enviarDatos(datos);
    return mostrarMensaje(elemento,"");
})
