<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    $tipo = $_POST['tipo'];

    if($inc){

        $consulta = "SELECT * FROM $tipo";
        $resultado = mysqli_query($con,$consulta);

        if (mysqli_num_rows($resultado) > 0){
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $dato[] = $row;
            }
            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'No hay ningún '. $tipo .' publicado'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }

?>