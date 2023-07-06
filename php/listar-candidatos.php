<?php

    include('conexion.php');

    if ($con){
        $sexo = $_POST['sexo'];
        $id_perro = $_POST['id_perro'];
        $raza = $_POST['raza'];
        $id_cliente = $_POST['id_cliente'];

        $consulta = "SELECT p.id_perro, p.nombre, p.raza, p.color, p.nacimiento, p.observaciones, p.id_cliente, c.telefono, c.mail
        FROM perros p
        INNER JOIN clientes c ON p.id_cliente = c.id_cliente
        WHERE p.id_perro != '$id_perro' AND p.id_cliente != '$id_cliente' AND p.sexo != '$sexo' AND p.raza = '$raza' AND p.disponibilidad_cruza = 1";

        $resultado = mysqli_query($con,$consulta);


        if($resultado){
            if(mysqli_num_rows($resultado) > 0){
                $dato = array();

                while ($row = $resultado->fetch_assoc()){
                    // $id_cliente = $row['id_cliente'];

                    // $consultaMail = "SELECT mail FROM clientes WHERE id_cliente = '$id_cliente'";
                    // $result = mysqli_query($con,$consultaMail);
                    // $fila = mysqli_fetch_assoc($result);

                    // $row['contacto'] = $fila['mail'];
                    $dato[] = $row;
                }
                echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
            }else{
                echo json_encode(array('exito' => false, 'mensaje' => 'No perros disponibles para la cruza por el momento'));
            }

        }else{
            echo json_encode(array('exito' => false, 'mensaje' => 'Error con la solicitud.' . mysqli_error($con)));
        }

    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Fallo con la conexion'));
    }

?>