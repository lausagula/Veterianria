import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');

var datos = new FormData();

datos.append('id_perro',localStorage.getItem('cruzaIdPerro'));
datos.append('sexo',localStorage.getItem('cruzaSexo'));
datos.append('raza',localStorage.getItem('cruzaRaza'));
datos.append('id_cliente',localStorage.getItem('cruzaIdCliente'));

// localStorage.removeItem('cruzaIdPerro');
// localStorage.removeItem('cruzaSexo');
// localStorage.removeItem('cruzaRaza');
// localStorage.removeItem('cruzaIdCliente');

fetch ((url+"/php/listar-candidatos.php") ,{  
    method: 'POST',
    body: datos
})
.then(res => res.json())
.then(data  => {
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

        // Color
        var colorTitulo = document.createElement('strong');
        colorTitulo.textContent = 'Color: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(colorTitulo);
        div.appendChild(document.createTextNode(datos.color));

        // Observaciones
        var observacion = document.createElement('strong');
        observacion.textContent = 'Disponiblidad para cruza: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(observacion);
        div.appendChild(document.createTextNode(datos.observaciones));

        // Contacto
        var contacto = document.createElement('strong');
        contacto.textContent = 'Disponiblidad para cruza: ';
        div.appendChild(document.createElement('br'));
        div.appendChild(contacto);
        div.appendChild(document.createTextNode(datos.contacto));

        // Foto        
        div.appendChild(document.createElement('br'));
        var img = document.createElement('img');
        img.src = url + '/php/cargar-foto.php?id=' + datos.id_perro; // modificar ????
        img.width = 200;
        div.appendChild(img);

    
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));

        document.getElementById('contenedorDatos').appendChild(div);
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));

        });
    }else{
        console.log("No hay ningun perro disponible para la cruza");
        var p = document.createElement('p');
        p.textContent = data.mensaje;
        contenedor.appendChild(p);
    }
    
})
.catch(error => console.error(error));