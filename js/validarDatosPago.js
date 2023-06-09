import {url} from './url.js';
var  formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");



function mostrarMensaje (mensaje){
    elemento.innerHTML = mensaje;
}

function verificarCantidadCaracteres(numero, cant){
    var numTxt = numero.toString();
    return numTxt.length != cant;

}

function verificarFecha(mes,año){
    if((mes === " ") || año === " "){
        return false;
    }else{
        let fechaA = new Date();
        if((mes > 12) || (año < fechaA.getFullYear)){
            return false;
        }
    }
    return true;
}

function enviarDatos(datos){
    fetch( (url+"/php/cargar-donacion-realizada.php"), {             
        method : 'POST' ,
        body : datos
    })
    .then(res => res.json())
    .then(data  => { 
        console.log (data);
        if (data.exito){
            mostrarMensaje(data.mensaje);
            window.location.href = (url+'/index.html');
            window.alert('Se realizo el pago exitosamente');
        }else{ 
            mostrarMensaje(elemento,data.mensaje);
        }
    });
}



formulario.addEventListener('submit' , function(e){
    e.preventDefault();

    let datos = new FormData (formulario);
    datos.append('idCampaña', localStorage.getItem('idCampaña'));
    datos.append('nomCampaña', localStorage.getItem('nomCampaña'));
    datos.append('motivoCampaña', localStorage.getItem('motivoCampaña'));

    if ((localStorage.getItem('email')=== null) || (localStorage.getItem('email') === undefined)){
        datos.append('email', null);
    }else{
        datos.append('email', localStorage.getItem('email'));
    }
    
    
    let nombre = datos.get('name');
    let numeroTarjeta = datos.get('numero');
    let fechaActual = new Date();

    let mes = datos.get('mes');
    let año = datos.get('año');
    let fechaTarjeta = new Date(año,mes-1);


    let codigo = datos.get('codigo');

    if(nombre === " "){
        mostrarMensaje ('Complete el campo nombre');
    }else if((numeroTarjeta === " ") || (verificarCantidadCaracteres(numeroTarjeta, 16))){
        mostrarMensaje ('Ingrese un numero de tarjeta valido');
    }else if((verificarFecha(mes,año)) || (fechaTarjeta.getTime() < fechaActual.getTime())){
        mostrarMensaje ('Ingrese una fecha valida');
    }else if((codigo === " ") || verificarCantidadCaracteres(codigo,3)){
        mostrarMensaje ('Ingrese un codigo de seguridad valido');
    }else{
        enviarDatos(datos);
        return;
    };
      
})