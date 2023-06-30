import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    let datos = new FormData (formulario);
    datos.append('id_perro',localStorage.getItem('id_perro'));
    datos.append('disponibilidad',localStorage.getItem('disponibilidad'));
    
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
    
    
    
});

