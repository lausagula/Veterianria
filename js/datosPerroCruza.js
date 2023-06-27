import {url} from './url.js';
var elemento = document.querySelector(".mensaje-error");


function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

    

var form = new FormData();
form.append('id_perro',localStorage.getItem('id_perro'));

fetch((url+"/php/datos-perro-cruza.php"), {
    method : 'POST' ,
    body : form
})
.then(res => res.json())
.then(data  => { 
    if (data.exito){
        const raza = document.getElementById('raza_perro');
        const color = document.getElementById('color_perro');
        const fechaPerro = document.getElementById('fecha_perro');
        const sexoPerro = document.getElementById('sexo_perro');
        

        data.perro.forEach(datos => {
            
            

            raza.textContent = datos.raza;
            raza.value = datos.raza;
            color.textContent = datos.color;
            color.value = datos.color;

            fechaPerro.textContent = datos.nacimiento;
            fechaPerro.value = datos.nacimiento;

            sexoPerro.textContent = datos.sexo;
            sexoPerro.value = datos.sexo;


            if (datos.sexo == 'macho'){
                const span = document.getElementById('span_celo');
                const input = document.getElementById('fecha_celo');
                span.setAttribute('contenteditable', 'false');
                span.hidden = true;
                input.disabled = true;
                input.hidden = true;
            }
        });        

    }else{ 
        mostrarMensaje(data.mensaje);
    }
});
