<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $name = $_POST['name'];
    $motivo = $_POST['motivo'];
    $resumen = $_POST['resumen'];
    $estado = true;


    if (($name != " ") && ($motivo != " ") && ($resumen != " ")){
        $insertar = "INSERT INTO campaña_donacion (nombre,motivo,resumen,estado) VALUES ('$name','$motivo','$resumen',$estado)";
        $query = mysqli_query($con,$insertar);
        if($query){
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        }else{  
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
        }
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error por campos vacios.'));
    }

    
?>

