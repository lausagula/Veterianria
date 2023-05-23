<?php 
    require 'conexion.php';

    $inc = include ("conexion.php");

    $id_turno = $_REQUEST['id_turno'];

    if($inc){
        $consulta = "DELETE FROM turnos_pendientes WHERE id_turno = '$id_turno'";
        $resultado = mysqli_query($con, $consulta);
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }
?>