<?php

    header('Content-Type: application/json');

    include ("conexion.php");




$name = $_POST["name"];
$email = $_POST["email"];
$emailDueño = $_POST["emailDueño"];
$telefono = $_POST["telefono"];
$resumen = $_POST["resumen"];
$raza = $_POST["raza"];

$body = "Asunto: adopcion del " . $raza . "<br>Nombre: " . $name . "<br>Correo: " . $email . "<br>Telefono: " . $telefono . "<br>Resumen: " . $resumen;


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
    $mail->addAddress($emailDueño, $name);

    $mail->isHTML(true);
    $mail->Subject = 'Aviso';
    $mail->Body = $body;
    $mail->CharSet = 'UTF-8';
    $mail->send();

    $response['exito'] = true;
    $response['mensaje'] = 'Correo enviado correctamente';
    
} catch (Exception $e) {
    $response['exito'] = false;
    $response['error'] = $mail->ErrorInfo;
    $response['mensaje'] = 'Hubo un error al enviar el correo';
}


echo json_encode($response);
exit;
?>
