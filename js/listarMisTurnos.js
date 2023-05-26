import {url} from './url.js'
var contenedor = document.getElementById('contenedorDatos');
var datos = new FormData();
var idUrl = new URL(window.location.href);
var idCliente = idUrl.searchParams.get("id");
console.log(idCliente);

fetch ((url+"/php/listarMisTurnos.php?id="+idCliente),{
    method: 'POST',
    body: datos
})
.then(res => res.json())
.then(data  => {
    if(data.exito){
        data.data.forEach(datos => {
            var div = document.createElement('div');  
            var form = document.createElement('form');

            // fecha
            var fechaTitulo = document.createElement('strong');
            fechaTitulo.textContent = 'Fecha: ';
            div.appendChild(fechaTitulo);
            div.appendChild(document.createTextNode(datos.dia));

            // servicio
            var servicioTitulo = document.createElement('strong');
            servicioTitulo.textContent = 'Servicio: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(servicioTitulo);
            div.appendChild(document.createTextNode(datos.servicio));

            // horario
            var horarioTitulo = document.createElement('strong');
            horarioTitulo.textContent = 'Email: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(horarioTitulo);
            div.appendChild(document.createTextNode(datos.horario));    

            //id cliente
            var idInputCliente = document.createElement('input');
            idInputCliente.setAttribute("id", "id_cliente");
            idInputCliente.setAttribute("type", "hidden");
            idInputCliente.setAttribute("value", idCliente);
            form.appendChild(idInputCliente);
            div.appendChild(document.createElement('br'));
            
            //id turno
            var idInputTurno = document.createElement('input');
            idInputTurno.setAttribute("id", "id_turno");
            idInputTurno.setAttribute("type", "hidden");
            idInputTurno.setAttribute("value", datos.id_turno);
            form.appendChild(idInputTurno);
            div.appendChild(document.createElement('br'));

            //boton cancelar turno
            var buttonCancelar = document.createElement('input');
            buttonCancelar.setAttribute("type", "submit");
            buttonCancelar.setAttribute("value", "Cancelar turno");
            form.appendChild(buttonCancelar);

            //ponemos todo
            div.appendChild(form);
            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));

            buttonAceptar.addEventListener('click', function(event) {
                window.location.href = (url+'/php/cancelarTurno.php');
                console.log("cancelado js");
            });
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