
const validarCaracteresEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const validarCaracteresContraseña = /^[A-Z][a-z]+[0-9]+/;

function validarEmail(valor){
    if ((valor.length === 0) || (!validarCaracteresEmail.test(valor))){
        alert("Email invalido.");
        return false;
    }
    return true;
}

function validarContraseña(valor){
    if ((valor.length < 8) || (!validarCaracteresContraseña.test(valor))){    
        alert("Contraseña invalida.");
        return false;
    }
    return true;

}

document.getElementById("submit")
    .addEventListener("click", function(event){
        var email = document.getElementById("log-in-email").value; 
        var pass = document.getElementById("log-in-password").value;
        if (!validarEmail(email)) {
            event.preventDefault();
            return;
        }

        if (!validarContraseña(pass)){
            event.preventDefault();   
            return;        
        }
        
        //Validacion de la DB 


        
})