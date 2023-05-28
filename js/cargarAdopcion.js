import {url} from './url.js'
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}


formulario.addEventListener('submit', function(event) {

        let datos = new FormData (formulario);

        datos.append('id_cliente', localStorage.getItem('idUsuario'));
        
        var raza_perro = datos.get('raza_perro'); 
        var sexo = datos.get('sexo');
        var edad = datos.get('edad');
        var zona = datos.get('zona');
        var carcateristicas = datos.get('caracteristicas');
        var comportamiento = datos.get('comportamiento');
        var email = datos.get('email');
                

        event.preventDefault(); 
        fetch( (url+"/php/cargar-adopcion.php"),{  
            method: 'POST',
            body: datos
        })
        .then(response => response.json())
        .then(data => {
            console.log (data);
            if(data.exito){
                mostrarMensaje(elemento,data.mensaje);               
                formulario.reset();
                window.location.href = (url+'/index.html');
            }else{
                mostrarMensaje(elemento,data.mensaje);
            }
        })
        .catch(error => console.error(error));
});

