<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    $id_perro = $_POST['id_perro'];
    $disponibilidad = $_POST['disponibilidad'];
    $castracion = 'castracion';

    if($inc){

        if ($disponibilidad != 1){
            $consulta = "SELECT * FROM practicas WHERE id_perro = '$id_perro' AND tipo = '$castracion'";
            $query = mysqli_query($con,$consulta);
            if(mysqli_num_rows($query) > 0){
                echo json_encode(array('exito' => false, 'mensaje' =>  'Error en la solicitud, el perro se encuentra castrado.'));
                return;
            }
        }

        
        $actualizar = "UPDATE perros SET disponibilidad_cruza = (CASE WHEN disponibilidad_cruza = 1 THEN 0 ELSE 1 END) WHERE id_perro = '$id_perro'";
        $resultado = mysqli_query($con,$actualizar);
        if($resultado){
            echo json_encode(array('exito' => true, 'mensaje' => 'Se realizo el cambio con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'Error en la consulta. ' . mysqli_error($con)));
        }
        

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión' . mysqli_error($con)));
    }

?>