import {url} from './url.js';
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

    

var form = new FormData();
form.append('idUsuario',localStorage.getItem('idUsuario'));

fetch((url+"/php/listar-perros.php"), {  
    method : 'POST' ,
    body : form
})
.then(res => res.json())
.then(data  => { 

    if (data.exito){
        const perros = data.perros; 

        const selectPerros = document.getElementById('perros');

        // Generar opciones del select
        perros.forEach(perro => {
            const option = document.createElement('option');
            option.value = perro.id_perro;
            option.textContent = perro.nombre;
            selectPerros.appendChild(option);
        });

    }else{ 
        mostrarMensaje(data.mensaje);
    }
});

