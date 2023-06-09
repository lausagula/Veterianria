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

    if (formatoHora.test(horaTexto)){
        if((hora < 8) || (hora > 19)){
            alert('Ingrese un horario valido.');
            return false;
        }else{
            if((bloque == "Mañana") && (hora > 12)){
                alert('Horario invalido para turno mañana');
                return false;
            }else if((bloque == "Tarde") && (hora < 13)){
                alert('Horario invalido para turno tarde');
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

            // id_turno
            var idTitulo = document.createElement('strong');
            idTitulo.textContent = 'ID turno: ';
            div.appendChild(idTitulo);
            div.appendChild(document.createTextNode(datos.id_turno));
            
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
            buttonAceptar.setAttribute('data-servicio', datos.servicio);
            buttonAceptar.setAttribute('data-id_cliente', datos.id_cliente);

            form.appendChild(buttonAceptar);

            //boton rechazar
            var buttonRechazar = document.createElement('input');
            buttonRechazar.setAttribute("type", "submit");
            buttonRechazar.setAttribute('data-dia', datos.dia);
            buttonRechazar.setAttribute("value", "Rechazar");
            buttonRechazar.setAttribute('data-id_turno', datos.id_turno);
            buttonRechazar.setAttribute('data-servicio', datos.servicio);
            buttonRechazar.setAttribute('data-id_cliente', datos.id_cliente);
            form.appendChild(buttonRechazar);

            //ponemos todo
            div.appendChild(form);
            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));

            //listeners
            buttonAceptar.addEventListener('click', function(event) {
                event.preventDefault();

                if (asignarHorario(datos.bloque_horario)){
                    var horario = fecha.getHours() + ":" + fecha.getMinutes();
                    var fromD = new FormData();
                    fromD.append('id_turno',event.target.dataset.id_turno);
                    fromD.append('dia',event.target.dataset.dia);
                    fromD.append('servicio',event.target.dataset.servicio);
                    fromD.append('id_cliente',event.target.dataset.id_cliente);
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

                    console.log("aceptado js");
                }

            });        
            buttonRechazar.addEventListener('click', function(event) {
                event.preventDefault();
                var motivo = prompt('Motivo:');
                if ((motivo != "") && (motivo.trim() != "")){
                    var from = new FormData();
                    from.append('id_turno',event.target.dataset.id_turno);
                    from.append('dia',event.target.dataset.dia);
                    from.append('servicio',event.target.dataset.servicio);
                    from.append('id_cliente',event.target.dataset.id_cliente);
                    from.append('motivo',motivo);

                    fetch((url + "/rechazarTurno.php"), {
                        method : 'POST' ,
                        body : from
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

                }else{
                    alert('Motivo vacio. Ingrese informacion');
                }
                console.log('rechazado js');
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



