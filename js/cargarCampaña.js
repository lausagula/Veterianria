import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

function validarFechas(fin){
    let fechaActual = new Date();

    if (fin < fechaActual){

        mostrarMensaje('Ingrese una fecha mayor a la fecha actual.');
        return false;
    }
    return true;
}


formulario.addEventListener('submit', function(event) {

        let datos = new FormData (formulario);
        
        var name = datos.get('name'); 
        var resumen = datos.get('resumen');
        var motivo = datos.get('motivo');

        var fin = datos.get('fin');
        var fechaFin = new Date(fin);

        event.preventDefault();

        if (validarFechas(fechaFin)){ 
            console.log('paso');
            fetch( (url+"/php/cargar-campaña.php"),{  
                method: 'POST',
                body: datos
            })
            .then(response => response.json())
            .then(data => {
                console.log (data);
                if(data.exito){
                    mostrarMensaje(data.mensaje);
                    window.location.href = (url + '/index.html');
                }else{
                    mostrarMensaje(data.mensaje);
                }
            })
            .catch(error => console.error(error));
        }
});

