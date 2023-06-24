<?php 
    header('Content-Type: application/json');

    include ("conexion.php");


    $id_perro = $_POST['id_perro'];
    $servicio = $_POST['servicio'];
    $observacion = $_POST['observacion'];
    $fecha = date('Y-m-d');

    if($con){
        
        $insertar = "INSERT INTO practicas (tipo, dia, observacion, id_perro) VALUES ('$servicio', '$fecha', '$observacion', '$id_perro')";
        $query = mysqli_query($con,$insertar);
        if($query){
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        }else{        
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
        }
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Fallo en la conexion'));
    }
    
    
    

    

?>