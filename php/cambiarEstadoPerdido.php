<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    if($con){

        $id_perdidos = $_POST['id_perdidos'];

        $actualizar = "UPDATE perdidos SET estado = 1 WHERE id_perdidos = '$id_perdidos'";
        $resultado = mysqli_query($con,$actualizar);
        if($resultado){
            echo json_encode(array('exito' => true, 'mensaje' => 'El cambio de estado se realizo con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'Fallo en la consulta' . mysqli_error($con)));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión' . mysqli_error($con)));
    }

?>