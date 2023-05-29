import {url} from './url.js';
var  contenedor = document.getElementById('contenedorDatos');


fetch (url+"/php/mostrar-campañas.php")
.then(res => res.json())
.then(data  => {
    if(data.exito){
        data.data.forEach(datos => {    
            var div = document.createElement('div');            
            
            // NOMBRE
            var nombreTitulo = document.createElement('strong');
            nombreTitulo.textContent = 'Nombre: ';
            div.appendChild(nombreTitulo);
            div.appendChild(document.createTextNode(datos.nombre));

            // MOTIVO
            var motivoTitulo = document.createElement('strong');
            motivoTitulo.textContent = 'Motivo: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(motivoTitulo);
            div.appendChild(document.createTextNode(datos.motivo));

            // RESUMEN
            var resumenTitulo = document.createElement('strong');
            resumenTitulo.textContent = 'Resumen: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(resumenTitulo);
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createTextNode(datos.resumen));

            
            
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createElement('br'));

            var button = document.createElement('button');
            button.textContent = 'Donar';
            button.setAttribute('idCampaña', datos.id_campaña);
            button.setAttribute('nomCampaña', datos.nombre);
            button.setAttribute('motivoCampaña', datos.motivo);

            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(button);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
            

            button.addEventListener('click', function(event) {
                localStorage.setItem('idCampaña',event.target.getAttribute('idCampaña'));
                localStorage.setItem('nomCampaña',event.target.getAttribute('nomCampaña'));
                localStorage.setItem('motivoCampaña',event.target.getAttribute('motivoCampaña'));
        
                window.location.href = (url+'/formPagoDonacion.html');  
            });
            
        });
    }else{
        div.appendChild(document.createTextNode('No hay campañas disponibles por el momento'));
        document.getElementById('contenedorDatos').appendChild(div);
    }
    
})
.catch(error => console.error(error));

