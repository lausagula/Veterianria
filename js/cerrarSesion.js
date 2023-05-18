
document.getElementById('logOut')
    .addEventListener("click", function(event){
        localStorage.setItem('loggedIn', 'false');
        localStorage.setItem('loggedAdm', 'false');
    });


var script = document.createElement('script');
script.src = 'js/cambiarEstadoBotones.js';
document.head.appendChild(script);

