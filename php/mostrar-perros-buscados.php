<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    if($con){

        $consulta = "SELECT id_buscados, nombre, raza_perro, sexo, fecha, edad, zona, caracteristicas, comportamiento, estado, mail, id_cliente FROM buscados";
        $resultado = mysqli_query($con,$consulta);

        if (mysqli_num_rows($resultado) > 0){
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $dato[] = $row;
            }
            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'No hay perros buscados publicado'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }

?>