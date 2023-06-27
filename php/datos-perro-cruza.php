<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_perro = $_POST['id_perro'];
    
    $insertar = "SELECT * FROM perros WHERE id_perro = '$id_perro' LIMIT 1";
    $resultado = mysqli_query($con,$insertar);

    if ($resultado){
        $perros = [];

        while($row = mysqli_fetch_assoc($resultado)){
            $perros[] = $row;
        }

        echo json_encode(array('exito' => true, 'perro' => $perros));
        
    }else{  
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }    

    
?>