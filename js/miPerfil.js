import {url} from './url.js';
var  contenedor = document.getElementById('contenedorDatos');

var datos = new FormData();
datos.append('id_cliente',localStorage.getItem('idUsuario'));

fetch ((url+"/php/mi-perfil.php"),{ 
    method: 'POST',
    body: datos
})
.then(res => res.json())
.then(data  => {
    var div = document.createElement('div');            
    if(data.exito){
        data.data.forEach(datos => {    
            
            
            // NOMBRE
            var nombreTitulo = document.createElement('strong');
            nombreTitulo.textContent = 'Nombre: ';
            div.appendChild(nombreTitulo);
            div.appendChild(document.createTextNode(datos.nombre));

            // APELLIDO
            var apellidoTitulo = document.createElement('strong');
            apellidoTitulo.textContent = 'Apellido: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(apellidoTitulo);
            div.appendChild(document.createTextNode(datos.apellido));

            // EMAIL
            var emailTitulo = document.createElement('strong');
            emailTitulo.textContent = 'Email: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(emailTitulo);
            div.appendChild(document.createTextNode(datos.mail));
            
            // TELEFONO
            var telefonoTitulo = document.createElement('strong');
            telefonoTitulo.textContent = 'Telefono: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(telefonoTitulo);
            div.appendChild(document.createTextNode(datos.telefono));

            // DESCUENTOS
            var descuentoTitulo = document.createElement('strong');
            descuentoTitulo.textContent = 'Descuentos: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(descuentoTitulo);
            div.appendChild(document.createTextNode(datos.descuentos));
            
            
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createElement('br'));

            var button = document.createElement('button');
            button.textContent = 'Ver donaciones';

            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(button);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
            

            button.addEventListener('click', function(event) {
                console.log('Mostrar donaciones realizadas');
                window.location.href = (url+'/mostrarDonaciones.html');
            });
            
        });
    }else{
        div.appendChild(document.createTextNode('No hay usuarios registrados por el momento'));
        document.getElementById('contenedorDatos').appendChild(div);
    }
    
})
.catch(error => console.error(error));

