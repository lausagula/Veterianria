import {url as urlNuevo} from './url.js'


// Función para obtener el idCliente y actualizar los enlaces

function actualizarOpciones(idCliente) {
    console.log ("idcliente en opciones: " + idCliente);
   
    // Obtener el select y las opciones
    const selectMenu = document.getElementById('select-menu');
    const opciones = selectMenu.querySelectorAll('.option-select-menu');
  
    // Crear un nuevo fragmento de documento
    const fragmento = document.createDocumentFragment();
  
    // Recorrer cada opción y crear una nueva opción actualizada
    opciones.forEach(opcion => {
      const nuevaOpcion = document.createElement('option');
      nuevaOpcion.className = opcion.className;
      nuevaOpcion.value = `${opcion.value}?id=${idCliente}`;
      nuevaOpcion.textContent = opcion.textContent;
      fragmento.appendChild(nuevaOpcion);
    });
  
    // Limpiar las opciones existentes
    selectMenu.innerHTML = '';
  
    // Agregar las nuevas opciones al select
    selectMenu.appendChild(fragmento);
  }

function ObtenerId() {
   var emailUsuario = localStorage.getItem("email");
    var datos = new FormData();
    datos.append('email', emailUsuario);
  
    fetch((urlNuevo+'/php/obtenerId.php'), {
      method: 'POST',
      body: datos
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var idCliente = data.idCliente;
        console.log("IdCliente nuevo otra vez: " + idCliente);
        actualizarOpciones(idCliente);
      })
      .catch(error => {
        console.log('Error al obtener el idCliente:', error);
      });
}


  
ObtenerId();