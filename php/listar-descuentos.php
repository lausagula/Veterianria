<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_cliente = $_POST['idUsuario'];
    
    $insertar = "SELECT * FROM donacion_realizadas WHERE id_cliente = '$id_cliente' AND tiene_descuento = 1";
    $resultado = mysqli_query($con,$insertar);

    if ($resultado){
        $descuentos = [];

        while($row = mysqli_fetch_assoc($resultado)){
            $descuentos[] = $row;
        }

        echo json_encode(array('exito' => true, 'descuentos' => $descuentos));
        
    }else{  
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }    

    
?>