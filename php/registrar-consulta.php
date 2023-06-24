<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_perro = $_POST['id_perro'];
    $servicio = $_POST['servicio'];
    $observacion = $_POST['observacion'];
    $dosis = $_POST['dosis'];
    $fecha = date('Y-m-d');

    if($con){
        if ((isset($observacion)) && (isset($dosis))){
            $insertar = "INSERT INTO practicas (tipo, dosis, dia, observacion, id_perro) VALUES ('$servicio', '$dosis', '$fecha', '$observacion', '$id_perro')";
            $query = mysqli_query($con,$insertar);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        }else if((isset($observacion)) && (!isset($dosis))){
            $insertar = "INSERT INTO practicas (tipo, dia, observacion, id_perro) VALUES ('$servicio', '$fecha', '$observacion', '$id_perro')";
            $query = mysqli_query($con,$insertar);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        }else if((!isset($observacion)) && (isset($dosis))){
            $insertar = "INSERT INTO practicas (tipo, dosis, dia, id_perro) VALUES ('$servicio', '$dosis', '$fecha', '$id_perro')";
            $query = mysqli_query($con,$insertar);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        }else{        
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
        }
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Fallo en la conexion'));
    }
    
    
    

    
?>