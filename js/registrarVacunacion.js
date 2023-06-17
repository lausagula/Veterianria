import {url} from './url.js';
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");
var fechaActual = new Date ();

function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

function convertirFecha(fecha){
    
    let partesFecha = fecha.split('-');
    let anio = parseInt(partesFecha[0]);
    let mes = parseInt(partesFecha[1] - 1);
    let dia = parseInt(partesFecha[2]);
    console.log (anio);
    console.log (mes);
    console.log (dia);
    return new Date (anio,mes,dia); 
}

function ConfigurarHoras (fecha){
    fecha.setHours(0, 0, 0, 0);
    return fecha;
}

function verificarEntreMeses (fechaNacimiento){

    let verificarMenorCuatroMeses = new Date(fechaNacimiento);
    let verificarMayorDosMeses = new Date(fechaNacimiento);
    
    fechaActual =  ConfigurarHoras(fechaActual);
    verificarMenorCuatroMeses = ConfigurarHoras(verificarMenorCuatroMeses);
    verificarMayorDosMeses = ConfigurarHoras(verificarMayorDosMeses);

    verificarMenorCuatroMeses.setMonth(fechaNacimiento.getMonth() + 4);
    verificarMayorDosMeses.setMonth(fechaNacimiento.getMonth() + 2);

    return ((verificarMayorDosMeses < fechaActual) && (fechaActual < verificarMenorCuatroMeses))
}

function verificarMasDeCuatroMeses (fechaNacimiento){

    let verificarMayorCuatro = new Date(fechaNacimiento);
    
    fechaActual =  ConfigurarHoras(fechaActual);
    verificarMayorCuatro =  ConfigurarHoras(verificarMayorCuatro);

    verificarMayorCuatro.setMonth(fechaNacimiento.getMonth() + 4);
    
    return (verificarMayorCuatro < fechaActual);
}

function turnoSiguienteDosis(fechaSegundaDosis){
    let datosNuevo = new FormData ();
    datosNuevo.append('email',localStorage.getItem('emailTitulo'));
    datosNuevo.append('fecha',fechaSegundaDosis.toISOString());
    datosNuevo.append('servicio','aplicacion vacuna');
    datosNuevo.append('horario','Mañana');
   
    fetch( (url+"/php/solicitarNuevoTurno.php"),{  
        method: 'POST',
        body: datosNuevo
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.exito){
            mostrarMensaje(data.mensaje);
            window.location.href = (url + '/index.html');          
        }else{
            mostrarMensaje(data.mensaje);
        }
    })
    .catch(error => console.error(error));
}

function enviarDatos (datos){
    fetch((url+"/php/registrar-vacunacion.php"),{
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        if(data.exito){
            mostrarMensaje(data.mensaje);          
        }else{
            mostrarMensaje(data.mensaje);
        }
    })
    .catch(error => console.error(error));
}

function verificarVacunaEnfermedades (datos,fechaNacimientoFormulario){    
    let fechaNacimiento = convertirFecha(fechaNacimientoFormulario);
    let fechaSegundaDosis = new Date ();

    if (verificarEntreMeses(fechaNacimiento)){
        mostrarMensaje("Consulta registrada correctamente");
        enviarDatos (datos);
        if (datos.get('dosis') == 1){
            fechaSegundaDosis.setDate(fechaSegundaDosis.getDate() + 21);
            turnoSiguienteDosis(fechaSegundaDosis);
        }else{
            window.location.href = (url + '/index.html');
        }
        return ; 
    }

    if (verificarMasDeCuatroMeses(fechaNacimiento)){
        
        mostrarMensaje("Consulta registrada correctamente");
        enviarDatos (datos);
        if (datos.get('dosis') == 1){
            fechaSegundaDosis.setFullYear (fechaSegundaDosis.getFullYear() + 1);
            turnoSiguienteDosis(fechaSegundaDosis);
        }else{
            window.location.href = (url + '/index.html');
        }
        return;
    }

    mostrarMensaje("El perro debe tener más de 2 meses para ser vacunado");
    
}

function verificarVacunaRabia (datos,fechaNacimientoFormulario){
    
    let fechaNacimiento = convertirFecha(fechaNacimientoFormulario);
    let fechaSegundaDosis = new Date ();

    if (verificarMasDeCuatroMeses(fechaNacimiento)){
        mostrarMensaje("Se le da la primera dosis y dentro de 1 año la segunda dosis");
        enviarDatos (datos);
        if (datos.get('dosis') == 1){
            fechaSegundaDosis.setFullYear (fechaSegundaDosis.getFullYear() + 1);
            turnoSiguienteDosis(fechaSegundaDosis);
        }else{
            window.location.href = (url + '/index.html');
        }
        return;
    }

    mostrarMensaje("El perro debe tener mas de 4 meses de edad para vacunarse");
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    let fechaNacimientoFormulario = sessionStorage.getItem('fecha_nacimiento');
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    let datos = new FormData (formulario);
    let tipoVacuna = datos.get ('tipovacuna')
    datos.append('id_perro',id);


    if (tipoVacuna == 'A'){
        verificarVacunaEnfermedades (datos,fechaNacimientoFormulario);
    }else{
        verificarVacunaRabia (datos,fechaNacimientoFormulario);
    }
  
  //  verificar (datos);

});




