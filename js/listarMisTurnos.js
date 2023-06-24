import {url} from './url.js'
var contenedor = document.getElementById('contenedorDatos');
var datos = new FormData();
var idUrl = new URL(window.location.href);
var idCliente = idUrl.searchParams.get("id");
console.log(idCliente);


// Lo puse asi porque me tiraba error con los botones
var idCli = localStorage.getItem('idUsuario');


fetch ((url+"/php/listarMisTurnos.php?id="+idCli),{
    method: 'POST',
    body: datos
})
.then(res => res.json())
.then(data  => {
    console.log (data);
    if(data.exito){
        data.data.forEach(datos => {
            var div = document.createElement('div');  
            var form = document.createElement('form');

            // nombre perro
            var nomPerroTitulo = document.createElement('strong');
            nomPerroTitulo.textContent = 'Perro: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(nomPerroTitulo);
            div.appendChild(document.createTextNode(datos.nombre_perro));

            // fecha
            var fechaTitulo = document.createElement('strong');
            fechaTitulo.textContent = 'Fecha: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(fechaTitulo);
            div.appendChild(document.createTextNode(datos.dia));

            // servicio
            var servicioTitulo = document.createElement('strong');
            servicioTitulo.textContent = 'Servicio: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(servicioTitulo);
            div.appendChild(document.createTextNode(datos.servicio));

            if ((datos.estado == 'Aceptado')||((datos.estado == 'Cancelado'))){
                // Horario
                var horarioTitulo = document.createElement('strong');
                horarioTitulo.textContent = 'Horario: ';
                div.appendChild(document.createElement('br'));
                div.appendChild(horarioTitulo);
                div.appendChild(document.createTextNode(datos.horario));
              }
    
             // Estado
             var estadoTitulo = document.createElement('strong');
             estadoTitulo.textContent = 'Estado: ';
             div.appendChild(document.createElement('br'));
             div.appendChild(estadoTitulo);
             div.appendChild(document.createTextNode(datos.estado));

             //id cliente
            var idInputCliente = document.createElement('input');
            idInputCliente.setAttribute("id", "id_cliente");
             idInputCliente.setAttribute("type", "hidden");
            idInputCliente.setAttribute("value", idCli);
            form.appendChild(idInputCliente);
             div.appendChild(document.createElement('br'));
    
            //id turno
            var idInputTurno = document.createElement('input');
            idInputTurno.setAttribute("id", "id_turno");
            idInputTurno.setAttribute("type", "hidden");
            idInputTurno.setAttribute("value", datos.id_turno);
            form.appendChild(idInputTurno);
            div.appendChild(document.createElement('br'));

  
            if ((datos.estado == 'Aceptado')){
             //boton cancelar turno
             var buttonCancelar = document.createElement('input');
             buttonCancelar.setAttribute("type", "submit");
             buttonCancelar.setAttribute("value", "Cancelar turno");
             form.appendChild(buttonCancelar);
            }

            //ponemos todo
            div.appendChild(form);
            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));

            if ((datos.estado == 'Aceptado')){
              buttonCancelar.addEventListener('click', function(event) {
                var from = new FormData();
                from.append('id_turno',datos.id_turno);
                
                let respuesta = confirm("¿Estás seguro que desea cancelar el turno");
    
                event.preventDefault();

                if (respuesta === true){
                    fetch((url + "/php/cancelarTurno.php"), {
                        method : 'POST' ,
                        body : from
                    })
                    .then(res => res.json())
                    .then(data  => { 
                        console.log (data);
                        if (data.exito){
                            location.reload();
                        }else{ 
                            alert(data.mensaje);
                        }
                    });
                }
               
            });
        }
        });
        console.log(data);
    }else{
        console.log("No tenes turnos pedidos.");
        var p = document.createElement('p');
        p.textContent = data.mensaje;
        contenedor.appendChild(p);
    }
    
})
.catch(error => console.error(error));