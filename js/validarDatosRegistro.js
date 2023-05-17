const emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
var  formulario = document.getElementById('formulario');
var url = 'http://localhost/Veterinaria'
var elemento = document.querySelector(".mensaje-error");



function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function enviarDatos(datos){
    fetch( (url+"/php/sign-up-datos.php"), { 
        method : 'POST' ,
        body : datos
    })
    .then(res => res.json())
    .then(data  => { 
        if (data.exito){
            mostrarMensaje(elemento,data.mensaje);
            window.location.href = (url+'/index.html');
        }else{ 
            mostrarMensaje(elemento,data.mensaje);
        }
    });
}



formulario.addEventListener('submit' , function(e){
    e.preventDefault

    let datos = new FormData (formulario);
    let emailUsuario = datos.get('email');
    let telefonoUsuario = datos.get('phone');


    if (!emailValido.test(emailUsuario))  {         //validar telefono
        event.preventDefault();
        return mostrarMensaje(elemento, "El email es invalido. Ingrese nuevamente");
    }
    event.preventDefault();
    enviarDatos(datos);
    return mostrarMensaje(elemento,"");
})
