<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    if($con){

        $id_buscados = $_POST['id_buscados'];

        $actualizar = "UPDATE buscados SET estado = 1 WHERE id_buscados = '$id_buscados'";
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