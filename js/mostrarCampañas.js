import {url} from './url.js';
var  contenedor = document.getElementById('contenedorDatos');

var datos = new FormData();                                 //  CONSULTAR CON
datos.append('es_adm',localStorage.getItem('loggedAdm'));   //    AYUDANTE


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
            div.appendChild(document.createTextNode(datos.resumen));

            // TOTAL
            var totalTitulo = document.createElement('strong');
            totalTitulo.textContent = 'Total: $';
            div.appendChild(document.createElement('br'));
            div.appendChild(totalTitulo);
            div.appendChild(document.createTextNode(datos.monto_acumulado));

            //ESTADO
            var estadoTitulo = document.createElement('strong');
            estadoTitulo.textContent = 'Estado: ';
            div.appendChild(document.createElement('br'));
            

            if ((localStorage.getItem('loggedAdm') === 'true') && (datos.estado === '0')){

                div.appendChild(estadoTitulo);
                div.appendChild(document.createTextNode('Inactiva'));  
                document.getElementById('contenedorDatos').appendChild(div);
                                              
                


            }else if ((localStorage.getItem('loggedAdm') === 'true') && (datos.estado === '1')){


                var eliminarCampaña = document.createElement('button');
                eliminarCampaña.className = 'botonDonar';
                eliminarCampaña.textContent = 'Eliminar';
                eliminarCampaña.setAttribute('idCampaña', datos.id_campaña);

                document.getElementById('contenedorDatos').appendChild(div);
                document.getElementById('contenedorDatos').appendChild(eliminarCampaña);
                
                eliminarCampaña.addEventListener('click', function(event){

                    localStorage.setItem('idCampaña',event.target.getAttribute('idCampaña'));

                    let datos = new FormData();
                    datos.append('idCampaña',localStorage.getItem('idCampaña'));
    
                    let respuesta = confirm("¿Estás seguro que desea eliminar la campaña " + localStorage.getItem('nomCampaña') + "?");
    
                    if (respuesta === true){
                        fetch( (url+"/php/eliminar-campaña.php"), {
                            method : 'POST' ,
                            body : datos
                        })
                        .then(res => res.json())
                        .then(data  => { 
                            console.log (data);
                            if (data.exito){
                                alert('Campaña eliminada');
                                window.location.href = (url+'/mostrarCampañasD.html'); 
                            }else{ 
                                alert('Error al eliminar la camapañ');
                            }
                        });
                    }
    
                });
                


            } else if((localStorage.getItem('loggedAdm') === 'false') && (datos.estado === '1')){
                console.log('3')
                var button = document.createElement('button');
                button.className = 'botonDonar';
                button.textContent = 'Donar';
                button.setAttribute('idCampaña', datos.id_campaña);
                button.setAttribute('nomCampaña', datos.nombre);
                button.setAttribute('motivoCampaña', datos.motivo);

                document.getElementById('contenedorDatos').appendChild(div);
                document.getElementById('contenedorDatos').appendChild(button);

                button.addEventListener('click', function(event) {
                    localStorage.setItem('idCampaña',event.target.getAttribute('idCampaña'));
                    localStorage.setItem('nomCampaña',event.target.getAttribute('nomCampaña'));
                    localStorage.setItem('motivoCampaña',event.target.getAttribute('motivoCampaña'));
            
                    window.location.href = (url+'/formPagoDonacion.html');  
                });
            };


            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));

            
        });
    }else{
        var div = document.createElement('div');    
        div.appendChild(document.createTextNode('No hay campañas disponibles por el momento'));
        document.getElementById('contenedorDatos').appendChild(div);
    }
    
})
.catch(error => console.error(error));

