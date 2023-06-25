<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_cliente = $_POST['id_cliente'];
    $monto = $_POST['monto'];
    
    $actualizar = "UPDATE donacion_realizadas SET tiene_descuento = 0 WHERE id_cliente = '$id_cliente' AND monto = '$monto' AND tiene_descuento = 1 LIMIT 1";
    $resultado = mysqli_query($con,$actualizar);

    if ($resultado){
        echo json_encode(array('exito' => true, 'mensaje' => 'Descuento realizado'));        
    }else{  
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }    

    
?>