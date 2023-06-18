<?php 
    include ("conexion.php");

    $servicio =  $_POST['servicio'];
    $id_cliente = $_POST['idUsuario'];
    $fecha = $_POST['fecha'];
    $horario = $_POST['horario'];
    $id_perro = $_POST['selectPerros'];

    if ($servicio == 'castracion'){
        $consulta = "SELECT * FROM practicas WHERE id_perro = '$id_perro' AND tipo = '$servicio'";
        $resultado = mysqli_query($con,$consulta);

        if(mysqli_num_rows($resultado) > 0){
            echo json_encode(array('exito' => false, 'mensaje' => 'Ya se encuentra una castración realizada'));
        }

    }else{

        $sql = "INSERT INTO turnos_pendientes (dia, servicio, bloque_horario, id_cliente, id_perro) VALUES ('$fecha', '$servicio', '$horario', '$id_cliente', '$id_perro')";
        if (mysqli_query($con, $sql)) {
            echo json_encode(array('exito' => true, 'mensaje' => 'Insercion turno exitosa'));
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
    }
?>