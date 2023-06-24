import {url} from './url.js';
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");
var fechaActual = new Date ();

function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

function necesitaSegundaDosis(datos){
    if(((datos.get('servicio') == 'vacuna-rabia') || (datos.get('servicio') == 'vacuna-enfermedad')) && (datos.get('dosis') == 1)){
            return true;
    }
    return false;
}

function turnoSiguienteDosis(){
    let datosNuevo = new FormData ();
    datosNuevo.append('id_cliente',localStorage.getItem('id_cliente'));
    datosNuevo.append('id_perro',localStorage.getItem('id_perro'));
    datosNuevo.append('servicio',localStorage.getItem('servicioCliente'));
    datosNuevo.append('horario',localStorage.getItem('horario'));
   
    fetch( (url+"/php/turnoAutomatico.php"),{  
        method: 'POST',
        body: datosNuevo
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.exito){
            mostrarMensaje(data.mensaje);     
        }else{
            mostrarMensaje(data.mensaje);
            alert(data.mensaje);
        }
    })
    .catch(error => console.error(error));
}

function enviarDatos (datos){
    fetch((url+"/php/registrar-consulta.php"),{
        method: 'POST',
        body: datos
    })
    .then(response => response.json())       
    .then(data => {
        if(data.exito){
            mostrarMensaje(data.mensaje);
            if(necesitaSegundaDosis(datos)){
                turnoSiguienteDosis();
            }
            window.location.href = (url + '/index.html');
            alert('Consulta almacenada.' + data.mensaje);
        }else{
            mostrarMensaje(data.mensaje);
        }
    })
    .catch(error => console.error(error));
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    let datos = new FormData (formulario);
    datos.append('id_perro',localStorage.getItem('id_perro'));
    enviarDatos(datos);
});




