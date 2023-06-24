<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");
    $id_cliente = $_GET['id'];

    if($inc){

        $consulta = "SELECT * FROM turnos WHERE (id_cliente = '$id_cliente')";
        $resultado = mysqli_query($con, $consulta);

        if (mysqli_num_rows($resultado) > 0){            
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $id_perro = $row['id_perro'];

                $consulta_nombre = "SELECT nombre FROM perros WHERE id_perro = '$id_perro' AND id_cliente = '$id_cliente'";
                $query = mysqli_query($con,$consulta_nombre);
                $fila = mysqli_fetch_assoc($query);
                $row['nombre_perro'] = $fila['nombre'];

                $dato[] = $row;
            }
            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' =>  'No tenés turnos pendientes.'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }

?>