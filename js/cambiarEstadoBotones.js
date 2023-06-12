var registroCP = document.querySelector('option[value="form-RegistroCP.html"]');
var registroAdopcion = document.querySelector('option[value="cargarAdopcion.html"]');
var cargarCampaña = document.querySelector('option[value="formCampaniaDonacion.html"]');
var mostrarCampaña = document.querySelector('option[value="mostrarCampañasD.html"]');
var turnosDelDia = document.querySelector('option[value="turnosDelDia.html"]');
var verUsuarios = document.querySelector('.ver-usuarios');
var registrarButton = document.querySelector('.registrar-menu');
var registrarUsuario = document.querySelector('.registrar-usuario');
var ocultarContacto = document.querySelector('.ocultar-con');
var ocultarNosotros = document.querySelector('.ocultar-nos');
var solicitarTurno = document.querySelector('.solicitar-turno');
var listarTurnos = document.querySelector('.listar-turnos');




if (localStorage.getItem('loggedIn') === 'true') {
    var elements = document.querySelectorAll('.stateSing');
    var elementsCS = document.querySelector('#logOut');
    var elementsBV = document.querySelector('#bienvenida');
    elementsCS.style.display = 'flex';
    elementsBV.style.display = 'flex';
    
    
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    
    
    ocultarContacto.style.display = 'none';
    ocultarNosotros.style.display = 'none';
    mostrarCampaña.style.display = 'flex';

    
    
    if (localStorage.getItem('loggedAdm') === 'true') {    
        

        listarTurnos.style.display = 'none';        
        cargarCampaña.style.display = 'flex';
        
        if (registrarButton === null){
            verUsuarios.style.display = 'flex';     
                
            
        }else{
          registrarButton.style.display = 'flex';
          verUsuarios.style.display = 'flex';
          
          
        }
    }else{
        registroCP.style.display = 'none';
        verUsuarios.style.display = 'none';
        solicitarTurno.style.display = 'flex';
        listarTurnos.style.display = 'flex';
        cargarCampaña.style.display = 'none';
        turnosDelDia.style.display = 'none';
    }

}else{
    var elements = document.querySelectorAll('.stateSing');  
    var elementsCS = document.querySelector('#logOut');
    var elementsBV = document.querySelector('#bienvenida');
    var registrarButton = document.querySelector('.registrar-menu');
    elementsCS.style.display = 'none'
    elementsBV.style.display = 'none'
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'flex';
    } 
    
    registrarButton.style.display = 'none';
    registroCP.style.display = 'none';
    cargarCampaña.style.display = 'none';
    registroAdopcion.style.display = 'none';
    verUsuarios.style.display = 'none';
    ocultarContacto.style.display = 'none';
    ocultarNosotros.style.display = 'none';
    solicitarTurno.style.display = 'none';
    listarTurnos.style.display = 'none';
    mostrarCampaña.style.display = 'none';
    turnosDelDia.style.display = 'none';
}