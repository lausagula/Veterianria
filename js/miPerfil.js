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

            var botonRegistrar = document.createElement('button');
            botonRegistrar.textContent = 'Registrar Perro';

            var buttonVerPerros = document.createElement('button');
            buttonVerPerros.textContent = 'Informacion de los Perros';

            var buttonDonaciones = document.createElement('button');
            buttonDonaciones.textContent = 'Ver donaciones';

            div.appendChild(document.createElement('br'));
            div.appendChild(botonRegistrar);
    
            div.appendChild(document.createElement('br'));
            div.appendChild(buttonVerPerros);

            div.appendChild(document.createElement('br'));
            div.appendChild(buttonDonaciones);
            
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createElement('br'));
    
            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
    
            buttonDonaciones.addEventListener('click', function(event) {
                console.log('Mostrar donaciones realizadas');
                window.location.href = (url+'/mostrarDonaciones.html');
            });

            buttonVerPerros.addEventListener('click', function(event) {
                console.log('Mostrar Informacion de perros');
                window.location.href = (url+'/mostrarInformacionPerro.html');
            });

            botonRegistrar.addEventListener('click', function () {
                console.log('Se hizo clic en el botón');
                localStorage.setItem('emailTitulo',datos.mail );
                window.location.href = (url+'/registrar-perro.html');
            });
            
        });
    }else{
        div.appendChild(document.createTextNode('No hay usuarios registrados por el momento'));
        document.getElementById('contenedorDatos').appendChild(div);
    }
    
})
.catch(error => console.error(error));

