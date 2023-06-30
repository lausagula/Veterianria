import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');

var datos = new FormData();
datos.append('id_cliente',localStorage.getItem('idUsuario'));


fetch ((url+"/php/mostrarInformacionPerros.php") ,{
    method: 'POST',
    body: datos
})
.then(res => res.json())
.then(data  => {
    console.log (data); 
    if(data.exito){
        data.data.forEach(datos => {

        var div = document.createElement('div');        
        // Nombre
        var nombreTitulo = document.createElement('strong');
        nombreTitulo.textContent = 'Nombre: ';
        div.appendChild(nombreTitulo);
        div.appendChild(document.createTextNode(datos.nombre));

        // Fecha Nacimiento
        var fechaNacimientoTitulo = document.createElement('strong');
        fechaNacimientoTitulo.textContent = 'Fecha Nacimiento: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(fechaNacimientoTitulo);
        div.appendChild(document.createTextNode(datos.nacimiento));

        // Raza
        var razaTitulo = document.createElement('strong');
        razaTitulo.textContent = 'Raza: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(razaTitulo);
        div.appendChild(document.createTextNode(datos.raza));

        // Sexo
        var sexoTitulo = document.createElement('strong');
        sexoTitulo.textContent = 'Raza: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(sexoTitulo);
        div.appendChild(document.createTextNode(datos.sexo));

        // Color
        var colorTitulo = document.createElement('strong');
        colorTitulo.textContent = 'Color: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(colorTitulo);
        div.appendChild(document.createTextNode(datos.color));

        // Disponibilidad Cruza
        var disponibilidad = document.createElement('strong');
        disponibilidad.textContent = 'Disponiblidad para cruza: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(disponibilidad);
        if (datos.disponibilidad_cruza == 1){
            div.appendChild(document.createTextNode("Disponible"));
        }else{
            div.appendChild(document.createTextNode("No Disponible"));
        }

        // Foto        
        div.appendChild(document.createElement('br'));
        var img = document.createElement('img');
        img.src = url + '/php/cargar-foto.php?id=' + datos.id_perro;
        img.width = 200;
        div.appendChild(img);
       

        if (localStorage.getItem('loggedAdm') === 'true'){
            
            
            // Boton Registrar Consulta Urgencia
            var botonRegistrarConsulta = document.createElement('button');
            botonRegistrarConsulta.textContent = 'Registrar Urgencia';

            botonRegistrarConsulta.addEventListener('click', function () {
                console.log('Se hizo clic en el botón de registrar Consulta');
                localStorage.setItem('id_perro',datos.id_perro);
                //localStorage.setItem('emailTitulo',datos.mail );
                sessionStorage.setItem('fecha_nacimiento', datos.nacimiento);
                window.location.href = (url+'/formRegistarUrgencia.html?id=' + datos.id_perro);
            });

             // Agregar el botón al contenedor
            div.appendChild(document.createElement('br'));
            div.appendChild(botonRegistrarConsulta);
        }

        var botonHistoriaClinica = document.createElement('button');
        botonHistoriaClinica.textContent = 'Historia Clinica';

        var botonLibretaVacunacion = document.createElement('button');
        botonLibretaVacunacion.textContent = 'Libreta Sanitaria';

        // Agregar el botón al contenedor
        div.appendChild(document.createElement('br'));
        div.appendChild(botonHistoriaClinica);

        // Agregar el botón al contenedor
        div.appendChild(document.createElement('br'));
        div.appendChild(botonLibretaVacunacion);

        // Agregar boton disponibilidad para cruza

        var botonCruza = document.createElement('button');
        botonCruza.textContent = 'Cambiar disponibilida para cruza';
                
        div.appendChild(document.createElement('br'));
        div.appendChild(botonCruza);
    
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));

        document.getElementById('contenedorDatos').appendChild(div);
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
               
        

        botonHistoriaClinica.addEventListener('click', function () {
            console.log('Se hizo clic en el botón de ver historia clinica');
            localStorage.setItem('id_perro',datos.id_perro);
            window.location.href = (url+'/historiaClinica.html?id=' + datos.id_perro);
        });
        botonLibretaVacunacion.addEventListener('click', function () {
            console.log('Se hizo clic en el botón de ver libreta de vacunacion');
            //localStorage.setItem('emailTitulo',datos.mail );
            localStorage.setItem('id_perro',datos.id_perro);
            window.location.href = (url+'/libretaVacunacion.html?id='+datos.id_perro);
        });

        botonCruza.addEventListener('click', function(){

            if (datos.disponibilidad_cruza == 1){
                var formD = new FormData();
                formD.append('id_perro',datos.id_perro);
                formD.append('disponibilidad',datos.disponibilidad_cruza);
                fetch (( url+"/php/cambiarEstadoCruza.php"),{   
                    method: 'POST',
                    body: formD
                })
                .then(res => res.json())
                .then(data  => {
                    if(data.exito){
                        window.location.href = (url+'/mostrarInformacionPerro.html');
                        alert(data.mensaje);
                    }else{
                        alert(data.mensaje);
                    }
                })
            }else{
                localStorage.setItem('id_perro',datos.id_perro);
                localStorage.setItem('nombre_perro',datos.nombre);
                localStorage.setItem('disponibilidad',datos.disponibilidad_cruza);
                window.location.href = (url+'/formServicioCruza.html');
            }
            
            

        });


        });
    }else{
        console.log("No hay ningun perro registrado");
        var p = document.createElement('p');
        p.textContent = data.mensaje;
        contenedor.appendChild(p);
    }
    
})
.catch(error => console.error(error));