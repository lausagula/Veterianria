import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');
var divVacunacion = document.querySelector('.vacunaciones');
var divDesparasitacion = document.querySelector('.desparasitaciones');
var datos = new FormData();
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log ("ida" + id);
datos.append ('id_perro',id);
// hayVacunacion modificar espara que si hay vacunas y no desparasitacion , no muestre que la libreta esta vacia 
var hayVacunacion = false;


function mostrarPracticas(tipoPractica, tituloPractica, atributosPractica,divInsertar) {
    datos.append('practica', tipoPractica);
    datos.append('libreta', 'libreta');

    let h2 = document.createElement('h2');
    h2.textContent = tituloPractica;
    divInsertar.appendChild(h2);

    fetch((url + "/php/historia-clinica.php"), {
            method: 'POST',
            body: datos
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.exito) {
                data.data.forEach(datos => {
                    hayVacunacion = true; 
                    var div = document.createElement('div');

                    atributosPractica.forEach(atributo => {
                        var atributoTitulo = document.createElement('strong');
                        atributoTitulo.textContent = atributo.label + ': ';
                        div.appendChild(document.createElement('br'));
                        div.appendChild(atributoTitulo);
                        if (atributo.label == 'Aplicación de Vacuna tipo'){
                            div.appendChild(document.createTextNode(datos[atributo.nombre] + ' ' + (datos[atributo.nombre] == 'A' ? '(Enfermedades)' : '(Contra Rabia)')));
                        }else{
                            div.appendChild(document.createTextNode(datos[atributo.nombre]));
                        }
                    });

                    div.appendChild(document.createElement('br'));
                    div.appendChild(document.createElement('br'));

                    document.getElementById('contenedorDatos').appendChild(div);
                    divInsertar.appendChild(div);
                });

            } else {
                if (!hayVacunacion){
                    console.log("No hay prácticas cargadas");
                    var p = document.createElement('p');
                    p.textContent = data.mensaje;
                    contenedor.appendChild(p);
                }
            }

        })
        .catch(error => console.error(error));
}
console.log('A' == 'A' ? 'Enfermedades' : 'Contra Rabia');

var atributosVacunacion =  [{
    label: 'Aplicación de Vacuna tipo',
    nombre: 'tipo_vacuna'
}, {
    label: 'Fecha de la práctica',
    nombre: 'fecha_practica'
}, {
    label: 'Número de dosis',
    nombre: 'dosis'
}];

var atributosDesparasitacion =  [{
    label: 'Fecha de la práctica',
    nombre: 'fecha_practica'
}, {
    label: 'Cantidad de dosis aplicada',
    nombre: 'canti_dosis'
}];



// Llamada a la función para mostrar las desparasitaciones
mostrarPracticas('practicadesparasitacion', 'Desparasitaciones',atributosDesparasitacion,divDesparasitacion);
// Llamada a la función para mostrar las vacunaciones
mostrarPracticas('practicavacunacion', 'Vacunaciones',atributosVacunacion,divVacunacion);



