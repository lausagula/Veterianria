<?php 

    header('Content-Type: application/json');

    $servername = "localhost";
    $username = "root"; 
    $password = "";
    $dbname = "veterinaria";
    $inc = new mysqli($servername, $username, $password, $dbname);
    



    $id_turno = $_POST['id_turno'];
    $id_cliente = $_POST['id_cliente'];
    $motivo = $_POST['motivo'];
    $dia = $_POST['dia'];
    //$horario = 'null';
    $servicio = $_POST['servicio'];
    $estado = 'RECHAZADO';

    if($inc){
        
        $consulta = "SELECT mail FROM clientes WHERE id_cliente = '$id_cliente'";
        $resultado = mysqli_query($inc,$consulta);

        $eliminar = "DELETE FROM turnos_pendientes WHERE id_turno = '$id_turno'";
        $result = mysqli_query($inc, $eliminar);

        $actualizar = "INSERT INTO turnos (id_turno, dia, servicio, horario, id_cliente, estado) VALUES ('$id_turno', '$dia', '$servicio', NULL, '$id_cliente', '$estado')";
        $update = mysqli_query($inc, $actualizar);


        if ((!$resultado) || (!$result) || (!$update)){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al cargar datos  ' . mysqli_error($inc)));
            exit;

        }else{
            $row = mysqli_fetch_assoc($resultado);
            $email = $row['mail'];
        }
        
    }else{
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
        exit;
    }


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
        $mail->addAddress($email, $motivo);

        $mail->isHTML(true);
        $mail->Subject = 'Aviso';
        $mail->Body = $motivo;
        $mail->CharSet = 'UTF-8';
        $mail->send();


        $response['exito'] = true;
        $response['mensaje'] = 'Correo enviado correctamente';
        
    } catch (Exception $e) {
        $response['exito'] = false;
        $response['mensaje'] = 'Hubo un error al enviar el correo';
    }


    echo json_encode($response);
    exit;


?>