import {url} from './url.js';
var  formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");



function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function verificarCantidadCaracteres(numero, cant){
    var numTxt = numero.toString();
    return numTxt.length != cant;

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
            mostrarMensaje(elemento,data.mensaje);
            window.alert('Se realizo el pago exitosamente');           
            //window.location.href = (url+'/index.html');
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
    datos.append('motivoCamapaña', localStorage.getItem('motivoCampaña'));
    datos.append('email', localStorage.getItem('email'));


    let mensaje ="";

    
    
    let nombre = datos.get('name');
    let numeroTarjeta = datos.get('numero');
    let fechaActual = new Date();
    let fecha = datos.get('date');
    let fechaTarjeta = new Date(fecha);
    let codigo = datos.get('codigo');
    let monto = datos.get('monto');

    if(nombre === " "){
        
        mensaje = 'Complete el campo nombre';
    }else if((numeroTarjeta === " ") || (verificarCantidadCaracteres(numeroTarjeta, 16))){
        
        mensaje = 'Ingrese un numero de tarjeta valido';
    }else if((fecha === " ") || (fechaTarjeta.getTime() < fechaActual.getTime())){
        
        mensaje = 'Ingrese una fecha valida';
    }else if((codigo === " ") || verificarCantidadCaracteres(codigo,3)){
        
        mensaje = 'Ingrese un codigo de seguridad valido';
    }else if(monto <= 0){
        mensaje = 'Ingrese un monto valido';
    }else{
        enviarDatos(datos);
        return mostrarMensaje(elemento,mensaje);
    };
    
    
})