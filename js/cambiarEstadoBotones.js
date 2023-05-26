var registroCP = document.querySelector('option[value="form-RegistroCP.html"]');
var registroAdopcion = document.querySelector('option[value="cargarAdopcion.html"]');
var verUsuarios = document.querySelector('.ver-usuarios');
var registroPerro = document.querySelector('.registrar-perro');
var registrarButton = document.querySelector('.registrar-menu');
var ocultarContacto = document.querySelector('.ocultar-con');
var ocultarNosotros = document.querySelector('.ocultar-nos');
var solicitarTurno = document.querySelector('.solicitar-turno');
var listarTurnos = document.querySelector('.lsitar-turnos');

if (localStorage.getItem('loggedIn') === 'true') {
    var elements = document.querySelectorAll('.stateSing');
    var elementsCS = document.querySelector('#logOut');
    elementsCS.style.display = 'flex';
    
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    
    ocultarContacto.style.display = 'none';
    ocultarNosotros.style.display = 'none';
    
    if (localStorage.getItem('loggedAdm') === 'true') {    

        listarTurnos.style.display = 'none';

        if (registrarButton === null){
            registroPerro.style.display = 'flex';
            verUsuarios.style.display = 'flex';     
            
        }else{
          registrarButton.style.display = 'flex';
          registroPerro.style.display = 'flex';
          verUsuarios.style.display = 'flex';
        }
    }else{
        registroCP.style.display = 'none';
        verUsuarios.style.display = 'none';
        registroPerro.style.display = 'none';
        solicitarTurno.style.display = 'flex';
        listarTurnos.style.display = 'flex';
    }

}else{
    var elements = document.querySelectorAll('.stateSing');  
    var elementsCS = document.querySelector('#logOut');
    var registrarButton = document.querySelector('.registrar-menu');
    elementsCS.style.display = 'none'
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'flex';
    } 
    
    registrarButton.style.display = 'none';
    registroCP.style.display = 'none';
    registroAdopcion.style.display = 'none';
    verUsuarios.style.display = 'none';
    registroPerro.style.display = 'none';
    ocultarContacto.style.display = 'none';
    ocultarNosotros.style.display = 'none';
    solicitarTurno.style.display = 'none';
    listarTurnos.style.display = 'none';
}