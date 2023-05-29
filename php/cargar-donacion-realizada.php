<?php 

    header('Content-Type: application/json');

    include ("conexion.php");



    $email = $_POST['email'];
    $id_campaña = $_POST['idCampaña'];
    $name = $_POST['nomCampaña'];
    $motivo = $_POST['motivoCampaña'];
    $fecha = date('Y-m-d');
    $monto = $_POST['monto'];


    if ($con){
        $consulta = "SELECT id_cliente FROM clientes WHERE mail = '$email'";
        $resultado = mysqli_query($con,$consulta);
        $row = mysqli_fetch_assoc($resultado);
        $id_cliente = $row['id_cliente'];
        $descuentos_realizados = $row['descuentos'];
        $descuentos_realizados++;

        $actualizar = "UPDATE clientes SET descuentos = '$descuentos_realizados' WHERE id_cliente = '$id_cliente'";
        $query_actualizar = mysqli_query($con,$actualizar);

        $insertar = "INSERT INTO donacion_realizadas (id_campaña,nombre,motivo,fecha,monto,id_cliente) VALUES ('$id_campaña','$name','$motivo','$fecha','$monto','$id_cliente')";
        $query = mysqli_query($con,$insertar);
        
        if(!$query){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al almacenar la informacion:  ' . mysqli_error($con)));
        }elseif(!$resultado){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al realizar la consulta:  ' . mysqli_error($con)));
        }elseif(!$query_actualizar){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al actualizar la informacion:   ' . mysqli_error($con)));
        }else{
            echo json_encode(array('exito' => true, 'mensaje' => 'El registro se hizo correctament'));
        }
        
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexion'));
    }

    
?>

