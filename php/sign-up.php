<?php 

    header('Content-Type: application/json');

    include ("conexion.php");

    $email = $_POST['email'];

    function buscarEmail($con,$email){
        $query = " SELECT * FROM clientes WHERE mail='$email' ";
        $result = mysqli_query($con, $query);
        return (mysqli_num_rows($result) > 0);
    }

    function generarContraseña($cantidad){
        $clave = "";
        $caracteres = "1234567890abcdefghijklmnopqrstuvwxyz";
        $max = strlen($caracteres)-1;
        for($i = 0; $i < $cantidad; $i++){
            $clave .= substr($caracteres, mt_rand(0,$max), 1);
        }
        return $clave;
    }


    if (!empty($email)){
        $resultado =  buscarEmail($con,$email);
        $contraseña =  generarContraseña(6);
        if (!$resultado) {
            $insertar = "INSERT INTO clientes (mail,contraseña) VALUES ('$email','$contraseña')";
            $query = mysqli_query($con,$insertar);
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' => 'El email ya se encuentra registrado'));
         }
    } else{  
     echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }


    
?>


