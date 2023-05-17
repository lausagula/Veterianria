const emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
var  formulario = document.getElementById('formulario');
var url = 'http://localhost:8080/vet/Veterinaria'
var elemento = document.querySelector(".mensaje-error");



function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}

function enviarDatos(datos){
    fetch( (url+"/php/sign-up.php"), {
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


    if (!emailValido.test(emailUsuario)) {
        event.preventDefault();
        return mostrarMensaje(elemento, "El email es invalido. Ingrese nuevamente");
    }
    event.preventDefault();
    enviarDatos(datos);
    return mostrarMensaje(elemento,"");
})