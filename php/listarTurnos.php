<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    if($inc){

        $consulta = "SELECT * FROM turnos_pendientes t inner join perros p where t.id_perro = p.id_perro;";
        $resultado = mysqli_query($con, $consulta);

        if (mysqli_num_rows($resultado) > 0){
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $dato[] = $row;
            }
            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'No hay turnos pendientes'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }

?>