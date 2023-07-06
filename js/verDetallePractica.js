
let urlParams = new URLSearchParams(window.location.search);
let idPractica = urlParams.get('id');
let ejecutarFuncion = urlParams.get('fun');



function detallePracticaVacunacion(){
    var jsonDataString = localStorage.getItem('jsonData');

    // Analizar la cadena en un objeto JSON
    var jsonData = JSON.parse(jsonDataString);
    console.log (jsonData);
    //var arregloDatos = jsonData.data;

    // Puedes acceder a los datos del objeto JSON
    console.log ("Todo ok hasta aca");
    
    
   
    // data.data.forEach(datos => {
    var div = document.createElement('div');        
         
    // Vacunacion
    var vacunaTitulo = document.createElement('strong');
    vacunaTitulo.textContent = 'Aplicacion de Vacuna tipo: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(vacunaTitulo);
    div.appendChild(document.createTextNode((jsonData.tipo == 'vacuna-enfermedad' ? 'Vacuna Enfermedad' : 'Vacuna Contra Rabia')));
 
    // fecha
    var fechaTitulo = document.createElement('strong');
    fechaTitulo.textContent = 'Fecha de la practica: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(fechaTitulo);
    div.appendChild(document.createTextNode(jsonData.dia));
 
    // Dosis
    var dosisTitulo = document.createElement('strong');
    dosisTitulo.textContent = 'Numero de la dosis: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(dosisTitulo);
    div.appendChild(document.createTextNode(jsonData.dosis));
     
            
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
     
    document.getElementById('contenedorDatos').appendChild(div);
        
   
   
}

function detallePracticaDes(){
    var jsonDataString = localStorage.getItem('jsonData');

    // Analizar la cadena en un objeto JSON
    var jsonData = JSON.parse(jsonDataString);

    var div = document.createElement('div');  

     // Vacunacion
    var practicaTitulo = document.createElement('strong');
    practicaTitulo.textContent = 'Practica: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(practicaTitulo);
    div.appendChild(document.createTextNode("Desparasitacion"));
    
    // fecha
    var fechaTitulo = document.createElement('strong');
    fechaTitulo.textContent = 'Fecha de la practica: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(fechaTitulo);
    div.appendChild(document.createTextNode(jsonData.dia));
         
    // cantidad de dosis
    var dosisTitulo = document.createElement('strong');
    dosisTitulo.textContent = 'Cantidad de dosis aplicada: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(dosisTitulo);
    div.appendChild(document.createTextNode(jsonData.dosis));

       
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
     
    document.getElementById('contenedorDatos').appendChild(div);

}

function detallePracticaConsulta(){
    var jsonDataString = localStorage.getItem('jsonData');

    // Analizar la cadena en un objeto JSON
    var jsonData = JSON.parse(jsonDataString);

    var div = document.createElement('div');
    
    // Tipo practica
    var practicaTitulo = document.createElement('strong');
    practicaTitulo.textContent = 'Practica: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(practicaTitulo);
    div.appendChild(document.createTextNode(jsonData.tipo));

    // fecha
    var fechaTitulo = document.createElement('strong');
    fechaTitulo.textContent = 'Fecha de la practica: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(fechaTitulo);
    div.appendChild(document.createTextNode(jsonData.dia));
         
    // Observasiones 
    var observacionTitulo = document.createElement('strong');
    observacionTitulo.textContent = 'Observaciones: ';
    div.appendChild(document.createElement('br'));
    div.appendChild(observacionTitulo);
    div.appendChild(document.createTextNode(jsonData.observacion));
       
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
     
    document.getElementById('contenedorDatos').appendChild(div);
   
}

console.log (idPractica);
switch (idPractica){
    case "1":
        detallePracticaVacunacion();
        break;
    case "2":
        detallePracticaDes();
        break;
    default:
        detallePracticaConsulta();
        break;
}
    


