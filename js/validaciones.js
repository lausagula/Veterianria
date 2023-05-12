function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}


function validarRegistro () {
    var emailUsuario = document.getElementById("email").value;
    var emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let elemento = document.querySelector(".mensaje-error");
    let pruebaEmail = "adrian.nicolais@gmail.com";

    if (!emailValido.test(emailUsuario)) {
        event.preventDefault();
        return mostrarMensaje(elemento, "El email es invalido. Ingrese nuevamente");
    }
    if (emailUsuario === pruebaEmail) {
        event.preventDefault();
        return mostrarMensaje(elemento, "El email ya se encuentra registrado");
    }
    return mostrarMensaje(elemento,"");
    //consultar en la BD si el email existe o no, si existe se muestra mensaje que el email ya esta registrado.
    //despues de estas validaciones van a la BD, con PHP.
}
