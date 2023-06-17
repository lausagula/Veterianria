
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let ejecutarFuncion = urlParams.get('fun');



function detallePracticaVacunacion(){
    var jsonDataString = localStorage.getItem('jsonData');

    // Analizar la cadena en un objeto JSON
    var jsonData = JSON.parse(jsonDataString);

    var arregloDatos = jsonData.data;

    // Puedes acceder a los datos del objeto JSON

    arregloDatos.forEach(function(element) {
        if (element.id_vacuna == id){
            // data.data.forEach(datos => {
             var div = document.createElement('div');        
         
             // Vacunacion
             var vacunaTitulo = document.createElement('strong');
             vacunaTitulo.textContent = 'Aplicacion de Vacuna tipo: ';
             div.appendChild(document.createElement('br'));
             div.appendChild(vacunaTitulo);
             div.appendChild(document.createTextNode(element.tipo_vacuna + ' ' + (element.tipo_vacuna == 'A' ? '(Enfermedades)' : '(Contra Rabia)')));
 
             // fecha
             var fechaTitulo = document.createElement('strong');
             fechaTitulo.textContent = 'Fecha de la practica: ';
             div.appendChild(document.createElement('br'));
             div.appendChild(fechaTitulo);
             div.appendChild(document.createTextNode(element.fecha_practica));
 
             // Dosis
             var dosisTitulo = document.createElement('strong');
             dosisTitulo.textContent = 'Numero de la dosis: ';
             div.appendChild(document.createElement('br'));
             div.appendChild(dosisTitulo);
             div.appendChild(document.createTextNode(element.dosis));
     
            
             div.appendChild(document.createElement('br'));
             div.appendChild(document.createElement('br'));
     
             document.getElementById('contenedorDatos').appendChild(div);
        }
        
    });
   
}

function detallePracticaDes(){
    var jsonDataString = localStorage.getItem('jsonData');

    // Analizar la cadena en un objeto JSON
    var jsonData = JSON.parse(jsonDataString);

    var arregloDatos = jsonData.data;

    // Puedes acceder a los datos del objeto JSON

    arregloDatos.forEach(function(element) {
        if (element.id_desparasitacion == id){
            // data.data.forEach(datos => {
             var div = document.createElement('div');        

              // fecha
              var fechaTitulo = document.createElement('strong');
              fechaTitulo.textContent = 'Fecha de la practica: ';
              div.appendChild(document.createElement('br'));
              div.appendChild(fechaTitulo);
              div.appendChild(document.createTextNode(element.fecha_practica));
         
             // cantidad de dosis
             var dosisTitulo = document.createElement('strong');
             dosisTitulo.textContent = 'Cantidad de dosis aplicada: ';
             div.appendChild(document.createElement('br'));
             div.appendChild(dosisTitulo);
             div.appendChild(document.createTextNode(element.canti_dosis));
       
             div.appendChild(document.createElement('br'));
             div.appendChild(document.createElement('br'));
     
             document.getElementById('contenedorDatos').appendChild(div);
        }
        
    });
   
}


if (ejecutarFuncion == 1){
    detallePracticaVacunacion();
}else{
    detallePracticaDes();
}

