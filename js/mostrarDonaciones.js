import {url} from './url.js';
var  contenedor = document.getElementById('contenedorDatos');

var datos = new FormData();
datos.append('id_cliente',localStorage.getItem('idUsuario'));

fetch ((url+"/php/mostrar_donaciones.php"),{ 
    method: 'POST',
    body: datos
})
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

            // FECHA
            var fechaTitulo = document.createElement('strong');
            fechaTitulo.textContent = 'Fecha: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(fechaTitulo);
            div.appendChild(document.createTextNode(datos.fecha));

            // MOTIVO
            var motivoTitulo = document.createElement('strong');
            motivoTitulo.textContent = 'Motivo: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(motivoTitulo);
            div.appendChild(document.createTextNode(datos.motivo));
            
            // MONTO
            var montoTitulo = document.createElement('strong');
            montoTitulo.textContent = 'Monto: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(montoTitulo);
            div.appendChild(document.createTextNode(datos.monto));
            
            div.appendChild(document.createElement('br'));


            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
            

        });
    }else{
       var p = document.createElement('p');
        p.textContent = data.mensaje;
        contenedor.appendChild(p);
    }
    
})
.catch(error => console.error(error));

