<?php

    header('Content-Type: application/json');

    include ("conexion.php");

    $id_cliente = $_POST['id_cliente'];
    $es_adm = $_POST['es_adm'];


    if($con){

        if($es_adm = true){
            $consulta = "SELECT * FROM donacion_realizadas";
        }else{
            $consulta = "SELECT * FROM donacion_realizadas WHERE id_cliente = '$id_cliente'";
        };

        $resultado = mysqli_query($con,$consulta);

        if (mysqli_num_rows($resultado) > 0){
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $dato[] = $row;
            }
            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' => 'No realizo ninguna donacion'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }

?>