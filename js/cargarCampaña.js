import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}


formulario.addEventListener('submit', function(event) {

        let datos = new FormData (formulario);
        
        var name = datos.get('name'); 
        var resumen = datos.get('resumen');
        var motivo = datos.get('motivo');
    

        event.preventDefault(); 
        fetch( (url+"/php/cargar-campaña.php"),{  
            method: 'POST',
            body: datos
        })
        .then(response => response.json())
        .then(data => {
            console.log (data);
            if(data.exito){
                mostrarMensaje(elemento,data.mensaje);
                window.location.href = (url + '/index.html');
            }else{
                mostrarMensaje(elemento,data.mensaje);
            }
        })
        .catch(error => console.error(error));
});

