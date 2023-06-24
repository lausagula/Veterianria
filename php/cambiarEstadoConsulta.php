<?php 


    $inc = include ("conexion.php");

    $id_turno = $_POST['id_turno'];
    $id_cliente = $_POST['id_cliente'];
    $estado = 'Atendido';

if($inc){

    $actualizar = "UPDATE turnos SET estado = '$estado' WHERE id_turno = '$id_turno'";
    $update = mysqli_query($con, $actualizar);

    if ((!$update)){
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al atender el turno'));
    }else{ 
        echo json_encode(array('exito' => true, 'mensaje' => 'Se atendio el turno'));
    }
   
}else{
    echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
}
?>