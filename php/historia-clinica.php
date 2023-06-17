<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");
    $id_perro = $_POST['id_perro'];
    $practica = $_POST['practica'];
    $tipo = $_POST['libreta'];
    $mensaje = '';
    if($inc){

        $consulta = "SELECT * FROM $practica WHERE id_perro = $id_perro"  ;
        $resultado = mysqli_query($con,$consulta);

        if ($tipo == 'historia'){
            $mensaje = 'No tiene historia clínica';
        }else{
            $mensaje = 'La libreta sanitaria está vacía';
        }

        if (mysqli_num_rows($resultado) > 0){
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $dato[] = $row;
            }
            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  $mensaje));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }

?>