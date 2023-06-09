<?php 


    $inc = include ("conexion.php");

    $id_turno = $_REQUEST['id_turno'];
    $estado = 'Cancelado';

if($inc){

    $actualizar = "UPDATE turnos SET estado = '$estado' WHERE id_turno = '$id_turno'";
    $update = mysqli_query($con, $actualizar);

    if ((!$update)){
        echo json_encode(array('exito' => false, 'mensaje' => 'Error en cancelar el turno'));
    }else{ 
        echo json_encode(array('exito' => true, 'mensaje' => 'Se cancelo el turno'));
    }
   
}else{
    echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
}
?>