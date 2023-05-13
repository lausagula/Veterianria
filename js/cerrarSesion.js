
document.getElementById('logOut')
    .addEventListener("click", function(event){
        localStorage.setItem('loggedIn', 'false');
    });


var script = document.createElement('script');
script.src = 'js/cambiarEstadoBotones.js';
document.head.appendChild(script);

