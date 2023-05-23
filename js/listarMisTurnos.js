var contenedor = document.getElementById('contenedorDatos');
var datos = new FormData();

url = "https://localhost/Veterinaria";


fetch ((url+"/php/listarMisTurnos.php"),{
    method: 'POST',
    body: datos
})
.then(res => res.json())
.then(data  => {
    if(data.exito){
        data.data.forEach(datos => {
            var div = document.createElement('div');  
            var form = document.createElement('form');

            // nombre
            var fechaTitulo = document.createElement('strong');
            fechaTitulo.textContent = 'Fecha: ';
            div.appendChild(fechaTitulo);
            div.appendChild(document.createTextNode(datos.dia));

            // Apellido
            var servicioTitulo = document.createElement('strong');
            servicioTitulo.textContent = 'Servicio: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(servicioTitulo);
            div.appendChild(document.createTextNode(datos.servicio));

            // Email
            var horarioTitulo = document.createElement('strong');
            horarioTitulo.textContent = 'Email: ';
            div.appendChild(document.createElement('br'));
            div.appendChild(horarioTitulo);
            div.appendChild(document.createTextNode(datos.bloque_horario));    
            
            //id
            var id = document.createElement('input');
            id.setAttribute("id", "id_turno");
            id.setAttribute("type", "text");
            id.setAttribute("value", datos.id_turno);
            form.appendChild(id);
            div.appendChild(document.createElement('br'));

            //ponemos todo
            div.appendChild(form);
            document.getElementById('contenedorDatos').appendChild(div);
            document.getElementById('contenedorDatos').appendChild(document.createElement('hr'));
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