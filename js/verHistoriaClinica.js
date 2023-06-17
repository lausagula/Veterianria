import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');
var datos = new FormData();
var divVacunacion = document.querySelector('.vacunaciones');
var divDesparasitacion = document.querySelector('.desparasitaciones');
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log ("ida" + id);
datos.append ('id_perro',id);
// hayVacunacion modificar espara que si hay vacunas y no desparasitacion , no muestre que la libreta esta vacia 
var hayVacunacion = false;

function mostrarPracticas(tipoPractica, tituloPractica, atributosPractica, divInsertar, detalleId) {
    datos.append('practica', tipoPractica);
    datos.append('libreta', 'historia');

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
                    var div = document.createElement('div');
                    hayVacunacion = true; 
                    atributosPractica.forEach(atributo => {
                        var atributoTitulo = document.createElement('strong');
                        atributoTitulo.textContent = atributo.label + ': ';
                        div.appendChild(document.createElement('br'));
                        div.appendChild(atributoTitulo);
                        if (atributo.label == 'Aplicación de Vacuna tipo'){
                            div.appendChild(document.createTextNode(datos[atributo.nombre]+ ' ' + (datos[atributo.nombre] == 'A' ? '(Enfermedades)' : '(Contra Rabia)')));
                        }else{
                            div.appendChild(document.createTextNode(datos[atributo.nombre]));
                        }
                        
                    });

                    div.appendChild(document.createElement('br'));
                    div.appendChild(document.createElement('br'));

                    document.getElementById('contenedorDatos').appendChild(div);
                    divInsertar.appendChild(div);

                    var botonVerDetalle = document.createElement('button');
                    botonVerDetalle.textContent = 'Ver detalle practica';

                    div.appendChild(document.createElement('br'));
                    div.appendChild(botonVerDetalle);

                    div.appendChild(document.createElement('br'));
                    div.appendChild(document.createElement('br'));

                    botonVerDetalle.addEventListener('click', function () {
                        console.log('Se muestra detalle de esa practica');
                        localStorage.setItem('jsonData', JSON.stringify(data));
                        window.location.href = (url + '/verDetallePractica.html?id=' + datos[detalleId] + '&fun=' + (tipoPractica === 'practicavacunacion' ? 1 : 2));
                    });
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

var atributosVacunacion =  [{
    label: 'Aplicación de Vacuna tipo',
    nombre: 'tipo_vacuna'
}];

var atributosDesparasitacion =  [{
    label: 'Fecha de la práctica',
    nombre: 'fecha_practica'
}];


mostrarPracticas('practicadesparasitacion', 'Desparasitaciones', atributosDesparasitacion, divDesparasitacion, 'id_desparasitacion');
mostrarPracticas('practicavacunacion', 'Vacunaciones', atributosVacunacion, divVacunacion, 'id_vacuna');
