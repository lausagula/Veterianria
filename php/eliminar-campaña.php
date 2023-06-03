<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_campaña = $_POST['idCampaña'];
    $estado = '0';
               

    if ($con){
        $eliminar = "UPDATE campaña_donacion SET estado = '$estado' WHERE id_campaña = '$id_campaña'";
        $resultado = mysqli_query($con,$eliminar);
        
        if(!$resultado){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al realizar la consulta:  ' . mysqli_error($con)));
        }else{
            echo json_encode(array('exito' => true, 'mensaje' => 'Operación exitosa'));
        }
        
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexion'));
    }

    
?>

