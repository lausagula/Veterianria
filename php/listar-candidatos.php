<?php

    include('conexion.php');

    if ($con){
        $sexo = $_POST['sexo'];
        $id_perro = $_POST['id_perro'];
        $raza = $_POST['raza'];
        $id_cliente = $_POST['id_cliente'];

        $consulta = "SELECT id_perro, nombre, raza, color, nacimiento, observaciones, id_cliente 
        FROM perros 
        WHERE id_perro != '$id_perro' AND id_cliente != '$id_cliente' AND sexo != '$sexo' AND raza = '$raza' AND disponibilidad_cruza = 1";

        $resultado = mysqli_query($con,$consulta);


        if($resultado){
            if(mysqli_num_rows($resultado) > 0){
                $dato = array();

                while ($row = $resultado->fetch_assoc()){
                    $id_cliente = $row['id_cliente'];

                    $consultaMail = "SELECT mail FROM clientes WHERE id_cliente = '$id_cliente'";
                    $result = mysqli_query($con,$consultaMail);
                    $fila = mysqli_fetch_assoc($result);

                    $row['contacto'] = $fila['mail'];
                    $dato[] = $row;
                }
                echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
            }else{
                echo json_encode(array('exito' => false, 'mensaje' => 'No perros disponibles para la cruza por el momento'));
            }

        }else{
            echo json_encode(array('exito' => false, 'mensaje' => 'Error con la solicitud.'));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Fallo con la conexion'));
    }

?>