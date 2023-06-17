<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");
    $id_cliente = $_POST['id_cliente'];


    if($inc){

        $consulta = "SELECT * FROM perros WHERE id_cliente=$id_cliente"  ;
        $resultado = mysqli_query($con,$consulta);

        if (mysqli_num_rows($resultado) > 0){
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $dato[] = $row;
            }
            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'No hay ningun perro registrado.'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }

?>