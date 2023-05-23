<?php 
    require 'conexion.php';

    $email = $_POST['email'];
    echo "el email es $email";

    $sql = "SELECT id_cliente FROM clientes WHERE (mail = '$email')";
    $resultado = mysqli_query($con, $sql);
    $fila = $resultado->fetch_assoc(); //obtengo fila.
    
    $idCliente = $fila['id_cliente'];
    echo "el id es $idCliente";

    $fecha = $_POST['fecha'];
    $servicio =  $_POST['servicio'];
    $horario = $_POST['horario'];

    $sql = "INSERT INTO turnos_pendientes (dia, servicio, bloque_horario, id_cliente) VALUES ('$fecha', '$servicio', '$horario', '$idCliente')";
    if (mysqli_query($con, $sql)) {
        echo "Insercion turno exitosa";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($con);
    }
    header('Location: https://localhost/Veterinaria/index.html');
    exit;
?>