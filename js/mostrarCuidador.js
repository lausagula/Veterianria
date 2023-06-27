import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');


var datos = new FormData();
datos.append('tipo','cuidador');

fetch (( url+"/php/mostrarCuidador.php"),{
    method: 'POST',
    body: datos   
})
.then(res => res.json())
.then(data  => {
    console.log (data); 
    if(data.exito){
        data.data.forEach(datos => {
            var div = document.createElement('div');        
        // nombre
        var nombreTitulo = document.createElement('strong');
        nombreTitulo.textContent = 'Nombre: ';
        div.appendChild(nombreTitulo);
        div.appendChild(document.createTextNode(datos.nombre));

        // Apellido
        var apellidoTitulo = document.createElement('strong');
        apellidoTitulo.textContent = 'Apellido: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(apellidoTitulo);
        div.appendChild(document.createTextNode(datos.apellido));

        // Zona
        var zonaTitulo = document.createElement('strong');
        zonaTitulo.textContent = 'Zona: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(zonaTitulo);
        div.appendChild(document.createTextNode(datos.zona));

        // Disponibilidad
        var disTitulo = document.createElement('strong');
        disTitulo.textContent = 'Disponibilidad: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(disTitulo);
        console.log ("ver");
        console.log (datos.estado == 0);
        if (datos.disponibilidad == 1){
            div.appendChild(document.createTextNode("Disponible"));
        }else{
            div.appendChild(document.createTextNode("No Disponible"));
        }
        
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));

        var button = document.createElement('button');
        button.textContent = 'Contactar';
        button.setAttribute('data-email', datos.mail);

        document.getElementById('contenedorDatos').appendChild(div);
        var button = document.createElement('button');
        button.textContent = 'Contactar';
        button.setAttribute('data-email', datos.mail);
        document.getElementById('contenedorDatos').appendChild(button);

        if (localStorage.getItem('loggedAdm') === 'true'){
            var buttonEstado = document.createElement('button');
            buttonEstado.textContent = 'Cambiar estado';
            buttonEstado.setAttribute('data-id_cuidador', datos.id_cuidador);
            document.getElementById('contenedorDatos').appendChild(buttonEstado);

            buttonEstado.addEventListener('click', function(event) {
                var formD = new FormData();
                var id_cuidador = event.target.dataset.id_cuidador;
                formD.append('id_cuidador',id_cuidador);
                formD.append('tipo','cuidador');
                fetch (( url+"/php/cambiarEstadoC.php"),{
                    method: 'POST',
                    body: formD   
                })
                .then(res => res.json())
                .then(data  => {
                    if(data.exito){
                        window.location.href = (url+'/mostrarCuidador.html');
                        alert('Estado actualizado');
                    }else{
                        consola.log('hubo un error');
                    }
                })
            })         

            
        }

        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
        

        button.addEventListener('click', function(event) {
            var email = event.target.dataset.email;
            window.location.href = (url+'/formCuidador.html');
            console.log('Email de contacto:', email);
          });            
        });
    }else{
        console.log("No hay cuidador");
        var p = document.createElement('p');
        p.textContent = data.mensaje;
        contenedor.appendChild(p);
    }
    
})
.catch(error => console.error(error));

