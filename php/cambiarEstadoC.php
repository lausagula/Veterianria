<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    $id_cuidador = $_POST['id_cuidador'];
    $tipo = $_POST['tipo'];

    if($inc){

        $actualizar = "UPDATE $tipo SET disponibilidad = (CASE WHEN disponibilidad = 1 THEN 0 ELSE 1 END) WHERE id_cuidador = '$id_cuidador'";
        $resultado = mysqli_query($con,$actualizar);
        if($resultado){
            echo json_encode(array('exito' => true, 'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'No hay ningún '. $tipo .' publicado'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión' . mysqli_error($con)));
    }

?>