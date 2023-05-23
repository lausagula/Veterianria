<?php 
    require 'conexion.php';

    $inc = include ("conexion.php");

    $id_turno = $_REQUEST['id_turno'];

    if($inc){
        $consulta = "SELECT * FROM turnos_pendientes WHERE (id_turno = '$id_turno')";
        $resultado = mysqli_query($con, $consulta);
        $fila = $resultado->fetch_assoc(); //obtengo fila.
        
        $dia = $fila['dia'];
        $servicio = $fila['servicio'];
        $horario = $fila['bloque_horario'];
        $id_cliente = $fila['id_cliente'];
        $id_turno = $fila['id_turno'];

        $consulta = "INSERT INTO turnos (dia, servicio, horario, id_cliente, id_turno) VALUES ('$dia', '$servicio', '$horario', '$id_cliente', '$id_turno')";
        $resultado = mysqli_query($con, $consulta);

        $consulta = "DELETE FROM turnos_pendientes WHERE id_turno = '$id_turno'";
        $resultado = mysqli_query($con, $consulta);
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }
?>