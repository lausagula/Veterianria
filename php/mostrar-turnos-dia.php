<?php 

    header('Content-Type: application/json');

    include ("conexion.php");

    $fecha_Turno = $_POST['fechaT'];   

    if ($con){

        $consulta = "SELECT t.*, c.nombre FROM turnos t JOIN clientes c ON t.id_cliente = c.id_cliente WHERE t.dia = '$fecha_Turno'";
        $resultado = mysqli_query($con,$consulta);

        if (mysqli_num_rows($resultado) > 0){
            $dato = array();
            while ($row = $resultado->fetch_assoc()) {
                $id_perro = $row['id_perro'];
                $consulta_nombre = "SELECT nombre FROM perros WHERE id_perro = '$id_perro'";
                $query = mysqli_query($con,$consulta_nombre);
                $fila = mysqli_fetch_assoc($query);
                $row['nombre_perro'] = $fila['nombre'];                
                $dato[] = $row;
            }

            echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' => 'No se encontraron turnos'));
        }
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexion'));
    }

    
?>

