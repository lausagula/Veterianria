var contenedor = document.getElementById('contenedorDatos');
var datos = new FormData();
var formatoHora = /^([01]\d|2[0-3]):([0-5]\d)$/;

import {url} from './url.js'

var fecha;

function asignarHorario(bloque) {
    var horaTexto = prompt("Ingresa la hora exacta del turno (HH:MM)", "");
    // Formatear el texto ingresado en un objeto Date
    var partesHora = horaTexto.split(":"); // Dividir el texto en partes separadas por ":"
    var hora = parseInt(partesHora[0]); // Obtener la hora como número entero
    var minutos = parseInt(partesHora[1]); // Obtener los minutos como número entero

    // Modificar despues lo del horario vacio
    if ((horaTexto == "")&&(horaTexto.trim() == "")){
        alert('El horario no puede estar vacio.');
    }else if (formatoHora.test(horaTexto)){
        //Modificar cuando es menor a 8 de la mañana y cuando es mayor a 20
        if((hora < 8) || (hora > 20)){
            alert('Ingrese un horario valido.');
            return false;
        }else{
            // Bloque horario Mañana (8 - 13),Bloque horario Tarde (15 - 20)
            if((bloque == "Mañana") && (hora > 13)){
                alert('Seleccione un horario dentro del rango (08:00 - 13:00 hs)');
                return false;
            }else if((bloque == "Tarde") && (hora < 15)){
                alert('Seleccione un horario dentro del rango (15:00 - 20:00 hs)');
                return false;
            }
    
        fecha = new Date();
        fecha.setHours(hora);
        fecha.setMinutes(minutos);

        return true;
        };
    }else{
        alert('Ingrese un horario valido.');
    }

    
    
}



fetch ((url+"/php/listarTurnos.php"),{
    method: 'POST',
    body: datos
})
.then(res => res.json())
.then(data  => {
    if(data.exito){
        data.data.forEach(datos => {
            var div = document.createElement('div');  
            var form = document.createElement('form');

            // turno para el perro
            var nombrePerroTitulo = document.createElement('strong');
            nombrePerroTitulo.textContent = 'Nombre del perro: ';
            div.appendChild(nombrePerroTitulo);
            div.appendChild(document.createTextNode(datos.nombre));

            
            // Fecha
            var fechaTitulo = document.createElement('strong');
            fechaTitulo.textContent = 'Fecha: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(fechaTitulo);
            div.appendChild(document.createTextNode(datos.dia));

            // Servicio
            var servicioTitulo = document.createElement('strong');
            servicioTitulo.textContent = 'Servicio: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(servicioTitulo);
            div.appendChild(document.createTextNode(datos.servicio));

            // Bloque horario
            var horarioTitulo = document.createElement('strong');
            horarioTitulo.textContent = 'Bloque Horario: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(horarioTitulo);
            div.appendChild(document.createTextNode(datos.bloque_horario));    
            
            div.appendChild(document.createElement('br'));

            //boton aceptar
            var buttonAceptar = document.createElement('input');
            buttonAceptar.setAttribute("type", "submit");
            buttonAceptar.setAttribute("value", "Aceptar");
            buttonAceptar.setAttribute('data-id_turno', datos.id_turno);
            buttonAceptar.setAttribute('data-dia', datos.dia);
            buttonAceptar.setAttribute('data-bloque', datos.bloque_horario);
            buttonAceptar.setAttribute('data-servicio', datos.servicio);
            buttonAceptar.setAttribute('data-id_cliente', datos.id_cliente);
            buttonAceptar.setAttribute('data-id_perro', datos.id_perro);

            form.appendChild(buttonAceptar);

            //boton rechazar
            var buttonRechazar = document.createElement('input');
            buttonRechazar.setAttribute("type", "submit");
            buttonRechazar.setAttribute('data-dia', datos.dia);
            buttonRechazar.setAttribute("value", "Rechazar");
            buttonRechazar.setAttribute('data-id_turno', datos.id_turno);
            buttonRechazar.setAttribute('data-servicio', datos.servicio);
            buttonRechazar.setAttribute('data-id_cliente', datos.id_cliente);
            buttonRechazar.setAttribute('data-id_perro', datos.id_perro);

            form.appendChild(buttonRechazar);

            //ponemos todo
            div.appendChild(form);
            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));

            //listeners
            buttonAceptar.addEventListener('click', function(event) {
                event.preventDefault();
                var bloque = event.target.dataset.bloque;
                if (asignarHorario(bloque)){
                    var horario = fecha.getHours() + ":" + fecha.getMinutes();
                    var fromD = new FormData();
                    fromD.append('id_turno',event.target.dataset.id_turno);
                    fromD.append('dia',event.target.dataset.dia);
                    fromD.append('servicio',event.target.dataset.servicio);
                    fromD.append('id_cliente',event.target.dataset.id_cliente);
                    fromD.append('id_perro',event.target.dataset.id_perro);
                    fromD.append('horario',horario);
                    

                    fetch( (url+"/php/aceptarTurno.php"), {
                        method : 'POST' ,
                        body : fromD
                    })
                    .then(res => res.json())
                    .then(data  => { 
                        console.log (data);
                        if (data.exito){
                            alert(data.mensaje);
                            window.location.href = (url+'/listar-turnos.html'); 
                        }else{ 
                            alert(data.mensaje);
                        }
                    });

                    console.log("aceptado jsa");
                }

            });        
            buttonRechazar.addEventListener('click', function(event) {
                event.preventDefault();
                let seRechazo = false;
                var motivo = prompt('Motivo:');
                if ((motivo != "") && (motivo.trim() != "")){
                    seRechazo = true;
                    var from = new FormData();
                    from.append('id_turno',event.target.dataset.id_turno);
                    from.append('dia',event.target.dataset.dia);
                    from.append('servicio',event.target.dataset.servicio);
                    from.append('id_cliente',event.target.dataset.id_cliente);
                    from.append('id_perro',event.target.dataset.id_perro);
                    from.append('motivo',motivo);
                    from.append('horario',0);

                    fetch((url + "/rechazarTurno.php"), {
                        method : 'POST' ,
                        body : from
                    })
                    .then(res => res.text())
                    .then(data  => { 
                        console.log (data);
                        if (data.exito){
                            alert(data.mensaje);
                            window.location.href = (url+'/listar-turnos.html'); 
                        }else{ 
                            alert(data.mensaje);
                        }
                    });

                }else{
                    alert('El motivo no puede estar vacio.');
                }
                //Arreglar esta parte despues
                if (seRechazo){
                    window.location.href = (url+'/listar-turnos.html'); 
                    alert("El turno fue rechazado correctamente");
                }
            }); 
        });
        console.log(data);
    }else{
        console.log("No hay turnos pendientes.");
        var p = document.createElement('p');
        p.textContent = data.mensaje;
        contenedor.appendChild(p);
    }
    
})
.catch(error => console.error(error));



