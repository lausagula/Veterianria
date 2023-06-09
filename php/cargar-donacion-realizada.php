<?php 

    header('Content-Type: application/json');

    include ("conexion.php");



    $email = $_POST['email'];
    $id_campaña = $_POST['idCampaña'];
    $name = $_POST['nomCampaña'];
    $motivo = $_POST['motivoCampaña'];
    $fecha = date('Y-m-d'); 
    $monto = $_POST['monto'];
    $tiene_descuento = true;    
    
    

    if ($con){
        if ($email !== 'null'){

            $consulta = "SELECT id_cliente, descuentos FROM clientes WHERE mail = '$email'";
            $resultado = mysqli_query($con,$consulta);
            $row = mysqli_fetch_assoc($resultado);
            $id_cliente = $row['id_cliente'];
            $descuentos_realizadoss = $row['descuentos'];
            $descuentos_realizados = $descuentos_realizadoss + 1;

            $actualizar = "UPDATE clientes SET descuentos = '$descuentos_realizados' WHERE id_cliente = '$id_cliente'";
            $query_actualizar = mysqli_query($con,$actualizar);

            if(!$resultado){
                echo json_encode(array('exito' => false, 'mensaje' => 'Error al realizar la consulta:  ' . mysqli_error($con)));
            }elseif(!$query_actualizar){
                echo json_encode(array('exito' => false, 'mensaje' => 'Error al actualizar la informacion:   ' . mysqli_error($con)));
            }

            $insertar = "INSERT INTO donacion_realizadas (id_campaña,nombre,motivo,fecha,monto,tiene_descuento,id_cliente) VALUES ('$id_campaña','$name','$motivo','$fecha','$monto', '$tiene_descuento','$id_cliente')";
           
        }else{
            $tiene_descuento = 0; //COMENTARIO: no me tomaba el valor 'false' para el boolean pero si el 0.
            $insertar = "INSERT INTO donacion_realizadas (id_campaña,nombre,motivo,fecha,monto,tiene_descuento) VALUES ('$id_campaña','$name','$motivo','$fecha','$monto', '$tiene_descuento')";
        }

        
        $query = mysqli_query($con,$insertar);
        
        if(!$query){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al almacenar la informacion:  ' . mysqli_error($con)));
        }else{
            echo json_encode(array('exito' => true, 'mensaje' => 'El registro se hizo correctamente'));
        }
        
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexion'));
    }

    
?>

