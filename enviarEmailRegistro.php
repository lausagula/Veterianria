<?php

    header('Content-Type: application/json');

    include ("./php/conexion.php");




$name = $_POST["name"];
$lastName = $_POST["lastName"];
$email = $_POST["email"];
$phone = $_POST["phone"];


$query = " SELECT contraseña FROM clientes WHERE mail='$email' ";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);

if ($row !== null) {
    $contraseña = $row['contraseña'];
} else {
    $contraseña = '';
}

if ($result) {
    $response = array('exito' => true, 'mensaje' => 'Se registró correctamente', 'clave' => $contraseña);
} else {
    $response = array('exito' => false, 'mensaje' => 'Error al procesar la solicitud',  'clave' => 'null');
}

$body = "Nombre: " . $name . "<br>Apellido: " . $lastName . "<br>Correo: " . $email . "<br>Telefono: " . $phone . "<br>Contraseña: " . $contraseña;
$concatenar = $name . ' ' . $lastName;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'veterinariaohmydoglp@gmail.com';
    $mail->Password = 'mxopfoywiaeheqrk';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('veterinariaohmydoglp@gmail.com', 'Veterinaria - Oh My Dog!');
    $mail->addAddress($email, $concatenar);

    $mail->isHTML(true);
    $mail->Subject = 'Aviso';
    $mail->Body = $body;
    $mail->CharSet = 'UTF-8';
    $mail->send();

    $response['mensaje'] = 'Correo enviado correctamente';
} catch (Exception $e) {
    $response['exito'] = false;
    $response['mensaje'] = 'Hubo un error al enviar el correo';
}


echo json_encode($response);
exit;
?>
