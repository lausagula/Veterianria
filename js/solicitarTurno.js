import {url} from './url.js';

var  formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function validarFecha(datos) {
    var fechaInput = datos.get('fecha');
    var fechaSeleccionada = new Date(fechaInput);
    fechaSeleccionada.setMinutes(fechaSeleccionada.getMinutes() + fechaSeleccionada.getTimezoneOffset());
    var fechaActual = new Date();
    
    if (fechaSeleccionada < fechaActual) {
        alert("La fecha seleccionada debe ser mayor a la fecha actual.");
        return false;
    }else if(fechaSeleccionada.getDay() === 0){
        alert("Los dias domingo la veterinaria permanece cerrada.");
        return false;
    }else if((fechaSeleccionada.getDay() === 6) && (datos.get('horario') === 'Tarde')){
        alert("Los dias Sabado la veterinaria solo atiendo por la mañana.");
        return false;
    }

    return true;
}



function enviarDatos(datos){
    fetch((url+"/php/solicitar-turno.php"), { 
        method : 'POST' ,
        body : datos
    })
    .then(res => {
        console.log(res);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Error en la solicitud");
        }
    })
    .then(data  => { 
        if (data.exito){
            mostrarMensaje(elemento,data.mensaje);
            alert(data.mensaje);
            window.location.href = (url+'/index.html');
        }else{ 
            mostrarMensaje(elemento,data.mensaje);
            alert(data.mensaje);
        }
    })

}

formulario.addEventListener('submit' , function(e){
    e.preventDefault();
    
    let datos = new FormData (formulario);
    datos.append('idUsuario', localStorage.getItem('idUsuario'));
    let emailUsuario = datos.get('email');

    if (validarFecha(datos)){
        e.preventDefault();
        enviarDatos(datos);
    }
    
    return mostrarMensaje(elemento,"");
})
