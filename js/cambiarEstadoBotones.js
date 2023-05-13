if (localStorage.getItem('loggedIn') === 'true') {
    var elements = document.querySelectorAll('.stateSing');
    var elementsCS = document.querySelector('#logOut');
    elementsCS.style.display = 'flex'
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}else{
    var elements = document.querySelectorAll('.stateSing');
    var elementsCS = document.querySelector('#logOut');
    elementsCS.style.display = 'none'
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'flex';
    }
}