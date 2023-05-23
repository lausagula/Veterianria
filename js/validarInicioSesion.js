
const validarCaracteresEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const validarCaracteresContraseña = /^[A-Z][a-z]+[0-9]+/;
var formulario = document.getElementById('formulario');
var elemento = document.querySelector(".mensaje-error");
var url = 'http://localhost:8080/Veterinaria'


function mostrarMensaje (elemento,mensaje){
    elemento.innerHTML = mensaje;
}


function validarEmail(valor){
    if ((valor.length === 0) || (!validarCaracteresEmail.test(valor))){
        mostrarMensaje (elemento,"Mail o contraseña no son validos");
        return false;
    }
    return true;
}

function validarContraseña(valor){
    if ((valor.length < 3) || (valor === "")){    
        mostrarMensaje (elemento,"Mail o contraseña no son validos");
        return false;
    }
    return true;

}



formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        let datos = new FormData (formulario);
        
        var email = datos.get('email'); 
        var pass = datos.get('password');
        localStorage.setItem('email', email);
        console.log(localStorage.getItem("email"));

        console.log (email);
        console.log (pass);
                

        if (!validarEmail(email)) {
            event.preventDefault();
            return;
        }

        if (!validarContraseña(pass)){
            event.preventDefault();   
            return;        
        }
        fetch((url+"/php/sign-in.php"),{
            method: 'POST',
            body: datos
        })
        .then(response => response.json())
        .then(data => {
            if(data.exito){
                console.log (data);
                mostrarMensaje(elemento,data.mensaje);               
                if (data.es_administrador == 1){
                    const es_administrador = data.$id_cliente;
                    localStorage.setItem('loggedAdm','true');
                    
                }else{
                    localStorage.setItem('loggedAdm','false');
                }
                window.location.href = (url+'/index.html');
                localStorage.setItem('loggedIn', 'true');
            }else{
                mostrarMensaje(elemento,data.mensaje);
            }
        })
        .catch(error => console.error(error));
});