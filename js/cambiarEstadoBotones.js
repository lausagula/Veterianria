var registroCP = document.querySelector('option[value="form-RegistroCP.html"]');
var registroAdopcion = document.querySelector('option[value="cargarAdopcion.html"]');


if (localStorage.getItem('loggedIn') === 'true') {
    var elements = document.querySelectorAll('.stateSing');
    var elementsCS = document.querySelector('#logOut');
    elementsCS.style.display = 'flex';
    
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }

    if (localStorage.getItem('loggedAdm') === 'true') {
        var registrarButton = document.querySelector('.registrar-menu');
        registrarButton.style.display = 'flex';
    }else{
        registroCP.style.display = 'none';
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
}