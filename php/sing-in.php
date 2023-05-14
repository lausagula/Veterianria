<?php

include 'conexion.php';

if ($conn->connect_error){
    die("La conexion fallo: " .$conn->connect_error);
}

$email = $_POST['email'];
$contraseña = $_POST['password']; 

$sql = "SELECT * FROM usuario WHERE email = $email AND contraseña = $contraseña";

$resultado = $conn->query($sql);

if ($resultado->num_rows > 0){
    echo "Inicio de sesion exitoso";
}else{
    echo "Email o contraseña incorrecto";
}

?>