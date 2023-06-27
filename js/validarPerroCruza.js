import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

function validarFechas(fecha){
    let fechaActual = new Date();
    let unMesAntes = new Date();
    let fechaC = new Date(fecha);

    unMesAntes.setMonth(unMesAntes.getMonth() - 1);    

    if (fechaC.getTime() > fechaActual.getTime() || fechaC.getTime() > unMesAntes.getTime()){
        mostrarMensaje('Ingrese una fecha mayor a la fecha actual.');
        return false;
    }
    return true;
}


formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    let datos = new FormData (formulario);
    datos.append('id_perro',localStorage.getItem('id_perro'));
    datos.append('disponibilidad',localStorage.getItem('disponibilidad'));
    var fechaCelo = datos.get('fechaCelo');
    

    if (validarFechas(fechaCelo)){ 
        console.log('paso');
        fetch( (url+"/php/cambiarEstadoCruza.php"),{
            method: 'POST',
            body: datos
        })
        .then(response => response.json())
        .then(data => {
            if(data.exito){
                alert(data.mensaje);
                window.location.href = (url + '/mostrarInformacionPerro.html');
            }else{
                alert(data.mensaje);
                window.location.href = (url + '/mostrarInformacionPerro.html');
            }
        })
        .catch(error => console.error(error));
    }
    
    
});

