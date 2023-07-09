<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $id_perro = $_POST['id_perro'];
    $servicio = $_POST['servicio'];
    $observacion = $_POST['observacion'];

    // En dosis y Peso , puse lo del null porque en consultaGeneral,castracion y urgencia no tienen esos campos.
    $dosis = isset($_POST['dosis']) ? $_POST['dosis'] : null;
    $peso = isset($_POST['peso']) ? $_POST['peso'] : null;
    //$peso = $_POST['peso'];
    //$dosis = $_POST['dosis'];
    //$fecha = $_POST['fechaT'];
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    $fecha = date('Y-m-d');

    if($con){

        if($servicio == 'castracion'){
            $actualizar = "UPDATE perros SET disponibilidad_cruza = 0 WHERE id_perro = '$id_perro' AND disponibilidad_cruza = 1";
            $resultado = mysqli_query($con,$actualizar);
        }

        if ((isset($observacion)) && (isset($dosis))){
            $insertar = "INSERT INTO practicas (tipo, dosis, peso, dia, observacion, id_perro) VALUES ('$servicio', '$dosis', '$peso', '$fecha', '$observacion', '$id_perro')";
            $query = mysqli_query($con,$insertar);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        }else if((isset($observacion)) && (!isset($dosis))){
            $insertar = "INSERT INTO practicas (tipo, peso, dia, observacion, id_perro) VALUES ('$servicio', '$peso', '$fecha', '$observacion', '$id_perro')";
            $query = mysqli_query($con,$insertar);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente '));
        }else if((!isset($observacion)) && (isset($dosis))){
            $insertar = "INSERT INTO practicas (tipo, dosis, peso, dia, id_perro) VALUES ('$servicio', '$dosis', '$peso', '$fecha', '$id_perro')";
            $query = mysqli_query($con,$insertar);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente '));
        }else{        
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
        }
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Fallo en la conexion'));
    }
    
    
    

    
?>