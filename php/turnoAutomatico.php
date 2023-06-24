<?php 
    include ("conexion.php");


    $id_cliente = $_POST['id_cliente'];
    $id_perro = $_POST['id_perro'];
    $servicio =  $_POST['servicio'];

    $fecha = date('Y-m-d');
    
    if ($servicio == 'vacuna-rabia'){
        $fecha_proxima = date('Y-m-d', strtotime('+1 year', strtotime($fecha)));

        //En caso que el dia sea Domingo se le suma 1 para que sea Lunes
        if (date('N', strtotime($fecha_proxima)) == 7){ 
            $fecha_proxima = date('Y-m-d', strtotime('+1 day', strtotime($fecha_proxima)));
        }
    }else{
        $consulta = "SELECT nacimiento FROM perros WHERE id_perro = '$id_perro'";
        $resultado = mysqli_query($con,$consulta);

        $row = mysqli_fetch_assoc($resultado);
        $nacimiento = $row['nacimiento'];

        $fecha_nacimiento = new DateTime($nacimiento);
        $fecha_actual = new DateTime($fecha);

        $diferencia = $fecha_nacimiento->diff($fecha_actual);
        $total_meses = ($diferencia->y * 12) + $diferencia->m;

        if ($total_meses < 4){
            $fecha_proxima = date('Y-m-d', strtotime('+21 days', strtotime($fecha)));
        }else{
            $fecha_proxima = date('Y-m-d', strtotime('+1 year', strtotime($fecha)));
        }
        if(date('N', strtotime($fecha_proxima)) == 7){
            $fecha_proxima = date('Y-m-d', strtotime('+1 day',strtotime($fecha_proxima)));
        }
    }

    
    $horario = $_POST['horario'];
    $hora = date('H:i', strtotime($horario));

    if ($hora < '13:00'){
        $bloque_horario = 'Mañana';
    }else{
        $bloque_horario = 'Tarde';

        //En caso de que el dia sea Sabado hace la reservacion para la mañana.
        if (date('N', strtotime($fecha_proxima)) === 6){
            $bloque_horario = 'Mañana';
        }
    }
    
    if($con){

        $insertar = "INSERT INTO turnos_pendientes (dia, servicio, bloque_horario, id_cliente, id_perro) VALUES ('$fecha_proxima', '$servicio', '$bloque_horario', '$id_cliente', '$id_perro')";
        $query = mysqli_query($con,$insertar);
        if($query){
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registro el nuevo turno con exito.')); 
        }else{
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud.')); 
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexion')); 
    }


?>