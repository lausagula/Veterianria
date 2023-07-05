import {url} from './url.js'
var  contenedor = document.getElementById('contenedorDatos');


var datos = new FormData();
datos.append('fechaT',localStorage.getItem('fechaT'));

fetch (( url+"/php/mostrar-turnos-dia.php"),{ 
    method: 'POST',
    body: datos   
})
.then(res => res.json())
.then(data  => {
    console.log (data); 
    if(data.exito){
        data.data.forEach(datos => {
            var div = document.createElement('div');  

        // nombre
        var nombreTitulo = document.createElement('strong');
        nombreTitulo.textContent = 'Nombre del dueño: ';           
        div.appendChild(nombreTitulo);
        div.appendChild(document.createTextNode(datos.nombre));

        // nombre perro
        var nomPerroTitulo = document.createElement('strong');
        nomPerroTitulo.textContent = 'Nombre del perro: ';           
        div.appendChild(document.createElement('br'));           
        div.appendChild(nomPerroTitulo);
        div.appendChild(document.createTextNode(datos.nombre_perro));

        // servicio
        var servicioTitulo = document.createElement('strong');
        servicioTitulo.textContent = 'Servicio: ';
        div.appendChild(document.createElement('br'));           
        div.appendChild(servicioTitulo);
        div.appendChild(document.createTextNode(datos.servicio));

        // horario
        var horarioTitulo = document.createElement('strong');
        horarioTitulo.textContent = 'Horario: ';
        div.appendChild(document.createElement('br'));           
        div.appendChild(horarioTitulo);
        div.appendChild(document.createTextNode(datos.horario));

        // estado
        var estadoTitulo = document.createElement('strong');
        estadoTitulo.textContent = 'Estado: ';
        div.appendChild(document.createElement('br'));           
        div.appendChild(estadoTitulo);
        div.appendChild(document.createTextNode(datos.estado));

        
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));

        
        if (datos.estado === "Aceptado"){

            var buttonAtender = document.createElement('button');
            buttonAtender.textContent = 'Atender';   
            buttonAtender.setAttribute('data-id_turno', datos.id_turno);
            buttonAtender.setAttribute('data-id_cliente', datos.id_cliente);
            buttonAtender.setAttribute('data-servicio', datos.servicio);
            buttonAtender.setAttribute('data-id_perro', datos.id_perro);
            buttonAtender.setAttribute('data-horario', datos.horario);
            
            var buttonCancelar = document.createElement('button');
            buttonCancelar.textContent = 'Cancelar';
            buttonCancelar.setAttribute('data-id_turno', datos.id_turno);

            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(buttonAtender);
            document.getElementById('contenedorDatos').appendChild(buttonCancelar);

            buttonAtender.addEventListener('click', function(event) {
                var formD = new FormData();
                var id_turno = event.target.dataset.id_turno;
                var id_cliente = event.target.dataset.id_cliente;
                var servicio = event.target.dataset.servicio;
                var id_perro = event.target.dataset.id_perro;
                var horario = event.target.dataset.horario;
                formD.append('id_turno',id_turno);
                formD.append('id_cliente',id_cliente);
                localStorage.setItem('id_cliente', id_cliente);
                localStorage.setItem('servicioCliente', servicio);
                localStorage.setItem('id_perro', id_perro);
                localStorage.setItem('horario', horario);

                window.location.href = (url+'/registroConsulta.html');

                fetch (( url+"/php/cambiarEstadoConsulta.php"),{
                    method: 'POST',
                    body: formD   
                })
                .then(res => res.json())
                .then(data  => {
                    if(data.exito){
                        console.log('Turno atendido');
                    }else{
                        consola.log('hubo un error');
                    }
                })
                
            })
            
            
            buttonCancelar.addEventListener('click', function(event) {
                var formD = new FormData();
                var id_turno = event.target.dataset.id_turno;
                formD.append('id_turno',id_turno);
                fetch (( url+"/php/cancelarTurno.php"),{
                    method: 'POST',
                    body: formD   
                })
                .then(res => res.json())                   //------MODIFICAR-------
                .then(data  => {
                    if(data.exito){
                        window.location.href = (url+'/mostrarTurnosDia.html');
                        alert('Turno cancelado');
                    }else{
                        consola.log('hubo un error');
                    }
                })
            })
        }else{
            document.getElementById('contenedorDatos').appendChild(div);
        }
            
        

        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
        document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
        
        });
    }else{
        console.log("No hay turnos");
        var p = document.createElement('p');
        p.textContent = data.mensaje;           //------MODIFICAR-------
        contenedor.appendChild(p);
    }
})
.catch(error => console.error(error));

