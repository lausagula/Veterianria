import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');
var datos = new FormData();
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

console.log ("ida" + id);
datos.append ('id_perro',id);


function imprimirPractica(elemento, clase) {
    var div = document.createElement('div');
    var practicaTitulo = document.createElement('strong');
    practicaTitulo.textContent = 'Fecha de la práctica: ';
    div.appendChild(practicaTitulo);
    div.appendChild(document.createTextNode(elemento.tipo));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    var fechaTitulo = document.createElement('strong');
    fechaTitulo.textContent = 'Fecha de la práctica: ';
    div.appendChild(fechaTitulo);
    div.appendChild(document.createTextNode(elemento.dia));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    var dosisTitulo = document.createElement('strong');
    dosisTitulo.textContent = 'Dosis: ';
    div.appendChild(dosisTitulo);
    div.appendChild(document.createTextNode(elemento.dosis));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    
    var element = document.querySelector(clase);
    element.appendChild(div);
    
    return div;
  }
  
  function obtenerLibretaSanitaria() {
    fetch((url + "/php/historia-clinica.php"), {
        method: 'POST',
        body: datos
      })
      .then(res => res.json())
      .then(data => {
        if (data.exito) {
            let contador = 0; // es para saber si la libreta esta vacia o no, no me quedo otra opcion de hacerlo asi.
          data.data.forEach(element => {
            
            console.log(element.tipo);
            
            switch (element.tipo) {
              case "vacuna-enfermedad":
                imprimirPractica(element, '.vacunaciones');
                contador ++;
                console.log("Imprime Vacuna Enfermedades");
                break;
              case "vacuna-rabia":
                imprimirPractica(element, '.vacunaciones');
                contador ++;
                console.log("Imprime Vacuna Rabia");
                break;
              case "desparacitacion":
                imprimirPractica(element, '.desparasitacion');
                contador ++;
                console.log("Imprime Desparasitacion");
                break;
            }

          });
          if(contador == 0){
            alert("La libreta sanitaria esta vacia.");
          }
        } else {
          
        }
  
      })
      .catch(error => console.error(error));
  }
  
  obtenerLibretaSanitaria();