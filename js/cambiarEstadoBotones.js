var registroCP = document.querySelector('option[value="form-RegistroCP.html"]');
var registroAdopcion = document.querySelector('option[value="cargarAdopcion.html"]');
var cargarCampaña = document.querySelector('option[value="formCampaniaDonacion.html"]');
var mostrarCampaña = document.querySelector('option[value="mostrarCampañasD.html"]');
var mostrarDonaciones = document.querySelector('option[value="mostrarDonaciones.html"]');
var turnosDelDia = document.querySelector('option[value="turnosDelDia.html"]');
var listarTurnosPendientes = document.querySelector('option[value="listar-turnos.html"]');
var listarMisTurnos = document.querySelector('option[value="listar-mis-turnos.html"]');
var perfilUsuario = document.querySelector('option[value="miPerfil.html"]');
var verUsuarios = document.querySelector('.ver-usuarios');
var registrarButton = document.querySelector('.registrar-menu');
var registrarUsuario = document.querySelector('.registrar-usuario');
var ocultarContacto = document.querySelector('.ocultar-con');
var ocultarNosotros = document.querySelector('.ocultar-nos');
var solicitarTurno = document.querySelector('.solicitar-turno');





if (localStorage.getItem('loggedIn') == 'true') {
    var elements = document.querySelectorAll('.stateSing');
    var elementsCS = document.querySelector('#logOut');
    var elementsBV = document.querySelector('#bienvenida');
    elementsCS.style.display = 'flex';
    elementsBV.style.display = 'flex';
    
    
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }


    listarMisTurnos.style.display = 'none';
    ocultarContacto.style.display = 'none';
    ocultarNosotros.style.display = 'none';
    mostrarCampaña.style.display = 'flex';

    solicitarTurno.style.display = 'none';
    perfilUsuario.style.display = 'none';
    turnosDelDia.style.display = 'none';

    if (localStorage.getItem('loggedAdm') == 'true') {    

        listarTurnosPendientes.style.display = 'flex';        
        cargarCampaña.style.display = 'flex';
        listarMisTurnos.style.display = 'none';
        turnosDelDia.style.display = 'flex';
        if (registrarButton === null){
            verUsuarios.style.display = 'flex'; 
        }else{
          registrarButton.style.display = 'flex';
          verUsuarios.style.display = 'flex';   
        }

    }else{
        turnosDelDia.style.display = 'none';
        registroCP.style.display = 'none';
        verUsuarios.style.display = 'none';
        solicitarTurno.style.display = 'flex';
        listarTurnosPendientes.style.display = 'none';
        listarMisTurnos.style.display = 'flex';
        mostrarDonaciones.style.display = 'flex';
        cargarCampaña.style.display = 'none';
        perfilUsuario.style.display = 'flex';
        
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
    listarTurnosPendientes.style.display = 'none';
    mostrarCampaña.style.display = 'flex';
    mostrarDonaciones.style.display = 'none';
    turnosDelDia.style.display = 'none';
    listarMisTurnos.style.display = 'none';
    perfilUsuario.style.display = 'none';
}