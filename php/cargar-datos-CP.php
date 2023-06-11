<?php 

    header('Content-Type: application/json');

    include ("conexion.php");

    $nombre = $_POST['name'];
    $apellido = $_POST['lastName'];
    $email = $_POST['email'];
    $servicio = $_POST['service'];
    $lugar = $_POST['place'];
    $disponibilidad = 1;
    $nombreTabla = $servicio;


    function validarEspaciosVacios ($nombre,$apellido,$email,$servicio,$lugar){
        return ( (!empty($nombre)) && (!empty($apellido)) && (!empty($email)) && (!empty($servicio)) && (!empty($lugar)));
    }

    function buscarEmail($con,$email,$nombreTabla){
        $query = " SELECT * FROM $nombreTabla WHERE mail='$email' ";
        $result = mysqli_query($con, $query);
        return (mysqli_num_rows($result) > 0);
    }

    function insertarEnTabla($con,$nombre,$apellido,$email,$servicio,$lugar,$disponibilidad,$nombreTabla){
        $insertar = "INSERT INTO $nombreTabla (nombre,apellido,mail,servicio,zona,disponibilidad) VALUES ('$nombre','$apellido','$email','$servicio','$lugar','$disponibilidad')";
        $query = mysqli_query($con,$insertar);
    }

    if($con){
        if (validarEspaciosVacios ($nombre,$apellido,$email,$servicio,$lugar)){
            insertarEnTabla($con,$nombre,$apellido,$email,$servicio,$lugar,$disponibilidad,$nombreTabla,);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        }else{
            echo json_encode(array('exito' => false, 'mensaje' => 'El email ya se encuentra registrado'));
        }
    }else{  
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }


    
?>
