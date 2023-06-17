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

        // Color
        var colorTitulo = document.createElement('strong');
        colorTitulo.textContent = 'Color: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(colorTitulo);
        div.appendChild(document.createTextNode(datos.color));

       

        if (localStorage.getItem('loggedAdm') === 'true'){
            
            
            // Boton Registrar Consulta
            var botonRegistrarConsulta = document.createElement('button');
            botonRegistrarConsulta.textContent = 'Registrar Consulta';

            botonRegistrarConsulta.addEventListener('click', function () {
                console.log('Se hizo clic en el botón de registrar Consulta');
                //localStorage.setItem('emailTitulo',datos.mail );
                sessionStorage.setItem('fecha_nacimiento', datos.nacimiento);
                window.location.href = (url+'/formRegistarConsulta.html?id=' + datos.id_perro);
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

    
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));

        document.getElementById('contenedorDatos').appendChild(div);
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
               
        

        botonHistoriaClinica.addEventListener('click', function () {
            console.log('Se hizo clic en el botón de ver historia clinica');
            window.location.href = (url+'/historiaClinica.html?id=' + datos.id_perro);
        });
        botonLibretaVacunacion.addEventListener('click', function () {
            console.log('Se hizo clic en el botón de ver libreta de vacunacion');
            //localStorage.setItem('emailTitulo',datos.mail );
            window.location.href = (url+'/libretaVacunacion.html?id='+datos.id_perro);
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