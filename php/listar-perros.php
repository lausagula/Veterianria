<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_cliente = $_POST['idUsuario'];
    
    $insertar = "SELECT * FROM perros WHERE id_cliente = '$id_cliente' ";
    $resultado = mysqli_query($con,$insertar);

    if ($resultado){
        $perros = [];

        while($row = mysqli_fetch_assoc($resultado)){
            $perros[] = $row;
        }

        echo json_encode(array('exito' => true, 'perros' => $perros , 'mensaje' => $id_cliente));
        
    }else{  
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }    

    
?>