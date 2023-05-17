<?php 

    header('Content-Type: application/json');

    include ("conexion.php");


    $name = $_POST['name'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $admin = $_POST['admin'];

    function generarContraseña($cantidad){
        $clave = "";
        $caracteres = "1234567890abcdefghijklmnopqrstuvwxyz";
        $max = strlen($caracteres)-1;
        for($i = 0; $i < $cantidad; $i++){
            $clave .= substr($caracteres, mt_rand(0,$max), 1);
        }
        return $clave;
    }


    if ((!empty($name)) && (!empty($lastName)) && (!empty($phone))){
        $contraseña =  generarContraseña(6);        
        $insertar = "INSERT INTO clientes (nombre,apellido,mail,contraseña,telefono,es_administrador) VALUES ('$name','$lastName','$email','$contraseña','$phone','$admin')";
        $query = mysqli_query($con,$insertar);
        echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
    }else{  
     echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }


    
?>


