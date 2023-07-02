<?php 

    header('Content-Type: application/json');

    include ("conexion.php");

    if($con){
        $id_cliente = $_POST['id_cliente'];
        $mail = $_POST['email'];
        $raza = $_POST['raza'];
        $zona = $_POST['zona'];
        $fecha = $_POST['fecha'];
        $sexo = $_POST['sexo'];
        $caracteristicas = $_POST['caracteristicas'];
        $comportamiento = $_POST['comportamiento'];
        $estado = 0;

        $image = $_FILES['foto']['tmp_name'];
        $imageContenido = addslashes(file_get_contents($image));

        
        $insertar = "INSERT INTO perdidos (raza_perro, sexo, fecha, zona, caracteristicas, comportamiento, foto, estado, mail, id_cliente) 
                    VALUES ('$raza', '$sexo', '$fecha', '$zona', '$caracteristicas', '$comportamiento', '$imageContenido', '$estado', '$mail', '$id_cliente')";
        $resultado = mysqli_query($con,$insertar);

        if ($resultado){
            echo json_encode(array('exito' => true, 'mensaje' => 'Perro perdido registrado'));        
        }else{  
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud' . mysqli_error($con)));
        }    
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Fallo en la conexion'));
    }
    
?>