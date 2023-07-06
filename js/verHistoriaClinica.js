import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');
var datos = new FormData();
var divVacunacion = document.querySelector('.vacunaciones');
var divDesparasitacion = document.querySelector('.desparasitaciones');
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

console.log ("ida" + id);
datos.append ('id_perro',id);





function imprimirPractica(elemento, clase,idPractica) {
    var div = document.createElement('div');
    var fechaTitulo = document.createElement('strong');
    fechaTitulo.textContent = 'Fecha de la práctica: ';
    div.appendChild(fechaTitulo);
    div.appendChild(document.createTextNode(elemento.dia));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    
    var element = document.querySelector(clase);
    element.appendChild(div);

    var botonVerDetalle = document.createElement('button');
    botonVerDetalle.textContent = 'Ver detalle practica';

    div.appendChild(document.createElement('br'));
    div.appendChild(botonVerDetalle);
    
    

    botonVerDetalle.addEventListener('click', function () {
        console.log('Se muestra detalle de esa practica');
        console.log (elemento);
        localStorage.setItem('jsonData', JSON.stringify(elemento));
        window.location.href = (url + '/verDetallePractica.html?id=' + idPractica);
    });
    
    return div;
  }
  
  function obtenerHistorialClinico() {
    fetch((url + "/php/historia-clinica.php"), {
        method: 'POST',
        body: datos
      })
      .then(res => res.json())
      .then(data => {
        if (data.exito) {
          data.data.forEach(element => {
            console.log(element.tipo);
            switch (element.tipo) {
              case "castracion":
                imprimirPractica(element, '.castracion',3);
                console.log("Imprimie castracion");
                break;
              case "vacuna-enfermedad":
                imprimirPractica(element, '.vacunacion-e',1);
                console.log("Imprime Vacuna Enfermedades");
                break;
              case "vacuna-rabia":
                imprimirPractica(element, '.vacunacion-r',1);
                console.log("Imprime Vacuna Rabia");
                break;
              case "desparacitacion":
                imprimirPractica(element, '.desparasitacion',2);
                console.log("Imprime Desparasitacion");
                break;
              case "consulta-general":
                imprimirPractica(element, '.consulta-general',3);
                console.log("Imprime Vacuna Rabia");
                break;
              case "urgencia":
                imprimirPractica(element, '.urgencia',3);
                console.log("Imprime consulta general o urgencia");
                break;
            }
          });
  
        } else {
          alert("No tiene historia clínica");
        }
  
      })
      .catch(error => console.error(error));
  }
  
  obtenerHistorialClinico();