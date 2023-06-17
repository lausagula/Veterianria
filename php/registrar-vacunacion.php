<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_perro = $_POST['id_perro'];
    $tipo_vacuna = $_POST['tipovacuna'];
    $dosis = $_POST['dosis'];
    $fecha_practica =$_POST['fechavacuna'];
    
    $insertar = "INSERT INTO practicaVacunacion (id_perro,fecha_practica,dosis,tipo_vacuna) VALUES ('$id_perro','$fecha_practica','$dosis', '$tipo_vacuna')";
    $query = mysqli_query($con,$insertar);
    if($query){
        echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
    }else{  
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }
    

    
?>