<?php 
    include ("conexion.php");

    $email = $_POST['email'];

    $sql = "SELECT id_cliente FROM clientes WHERE (mail = '$email')";
    $resultado = mysqli_query($con, $sql);
    $fila = $resultado->fetch_assoc(); //obtengo fila.
    
    $idCliente = $fila['id_cliente'];

    $fecha = $_POST['fecha'];
    $servicio =  $_POST['servicio'];
    $horario = $_POST['horario'];

    $sql = "INSERT INTO turnos_pendientes (dia, servicio, bloque_horario, id_cliente) VALUES ('$fecha', '$servicio', '$horario', '$idCliente')";
    if (mysqli_query($con, $sql)) {
        echo json_encode(array('exito' => true, 'mensaje' => 'Se registro turno correctamente'));
    } else {
        echo json_encode(array('exito' => false, 'mensaje' => 'Error en la consultas'));
    }
?>