import {url} from './url.js';    

var form = new FormData();
form.append('idUsuario',localStorage.getItem('id_cliente'));
console.log (localStorage.getItem('idUsuario'));
fetch((url+"/php/listar-descuentos.php"), {  
    method : 'POST' ,
    body : form
})
.then(res => res.json())
.then(data  => { 
    console.log (data);
    if (data.exito){
        const descuentos = data.descuentos; 

        const selectDescuentos = document.getElementById('desc');

        // Generar opciones del select
        descuentos.forEach(descuento => {
            const option = document.createElement('option');
            option.value = descuento.monto;
            option.textContent = descuento.monto * 0.20;
            selectDescuentos.appendChild(option);
        });

    }
});

