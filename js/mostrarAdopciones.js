import {url} from './url.js';
var  contenedor = document.getElementById('contenedorDatos');


fetch (url+"/php/mostrar-adopciones.php")
.then(res => res.json())
.then(data  => {
    if(data.exito){
        data.data.forEach(datos => {
            var div = document.createElement('div');

            console.log(data.data.length);
            
            if (localStorage.getItem('email') != datos.mail){
                // Raza
                var razaTitulo = document.createElement('strong');
                razaTitulo.textContent = 'Raza: ';
                div.appendChild(razaTitulo);
                div.appendChild(document.createTextNode(datos.raza_perro));

                // Sexo
                var sexoTitulo = document.createElement('strong');
                sexoTitulo.textContent = 'Sexo: ';
                div.appendChild(document.createElement('br'));
                div.appendChild(sexoTitulo);
                div.appendChild(document.createTextNode(datos.sexo));

                // Edad
                var edadTitulo = document.createElement('strong');
                edadTitulo.textContent = 'Edad: ';
                div.appendChild(document.createElement('br'));
                div.appendChild(edadTitulo);
                console.log (datos.edad);
                div.appendChild(document.createTextNode(datos.edad));

                // Zona
                var zonaTitulo = document.createElement('strong');
                zonaTitulo.textContent = 'Zona: ';
                div.appendChild(document.createElement('br'));
                div.appendChild(zonaTitulo);
                div.appendChild(document.createTextNode(datos.zona));

                // Características
                var caracteristicasTitulo = document.createElement('strong');
                caracteristicasTitulo.textContent = 'Características: ';
                div.appendChild(document.createElement('br'));
                div.appendChild(caracteristicasTitulo);
                div.appendChild(document.createTextNode(datos.caracteristicas));

                // Comportamiento
                var comportamientoTitulo = document.createElement('strong');
                comportamientoTitulo.textContent = 'Comportamiento: ';
                div.appendChild(document.createElement('br'));
                div.appendChild(comportamientoTitulo);
                div.appendChild(document.createTextNode(datos.comportamiento));

                // Estado
                var estadoTitulo = document.createElement('strong');
                estadoTitulo.textContent = 'Estado: ';
                div.appendChild(document.createElement('br'));
                div.appendChild(estadoTitulo);
                console.log ("ver");
                console.log (datos.estado == 0);
                if (datos.estado == 0){
                    div.appendChild(document.createTextNode("Disponible para adopción"));
                }else{
                    div.appendChild(document.createTextNode("Adoptado"));
                }
                
                div.appendChild(document.createElement('br'));
                div.appendChild(document.createElement('br'));

                var button = document.createElement('button');
                button.textContent = 'Adoptar';
                button.setAttribute('data-email', datos.mail);

                document.getElementById('contenedorDatos').appendChild(div);
                var button = document.createElement('button');
                button.textContent = 'Adoptar';
                button.setAttribute('data-email', datos.mail);
                if (datos.estado == 1){
                    button.disabled = true;
                }
                document.getElementById('contenedorDatos').appendChild(button);
                document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
                document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
                

                button.addEventListener('click', function(event) {
                    var email = event.target.dataset.email;
                    window.location.href = (url+'/formAdopcion.html');
                    console.log('Email de contacto:', email);
                });
            }else if (data.data.length = 1){
                div.appendChild(document.createTextNode('No hay adopciones disponibles por el momento'));
                document.getElementById('contenedorDatos').appendChild(div);
            }
        });
    }else{
        div.appendChild(document.createTextNode('No hay adopciones disponibles por el momento'));
        document.getElementById('contenedorDatos').appendChild(div);
    }
    
})
.catch(error => console.error(error));

