<?php

    header('Content-Type: application/json');
    include ("conexion.php");

    if ($con->connect_error){
        die("La conexion fallo: " .$cnn->connect_error);
    }

    $email = $_POST['email'];
    $contraseña = $_POST['password']; 

    $sql = "SELECT * FROM clientes WHERE (mail = '$email') AND (contrasenia = '$contraseña')";
    $resultado = $con->query($sql);

    if ($resultado->num_rows > 0){
        $row = mysqli_fetch_assoc($resultado);
        $es_administrador=$row['es_administrador'];
        echo json_encode(array('exito' => true,'es_administrador' => $es_administrador, 'mensaje' => 'Se registró correctamente'));
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Mail o contraseña no son validos.'));
    }

?>