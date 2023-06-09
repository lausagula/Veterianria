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
        echo '<script language="javascript">alert("Pedido de turno enviado");window.location.href="http://localhost:8080/v/Veterinaria/index.html";</script>';
        //--------------------------------------------------------------------------------------------^^ MODIFICAR URL ^^----------------
        echo "Insercion turno exitosa";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($con);
    }
?>