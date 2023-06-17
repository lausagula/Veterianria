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
    $horario =  $_POST['horario'];;
    $servicio = $_POST['servicio'];
    $estado = 'Rechazado';

    if($inc){
        
        $consulta = "SELECT mail FROM clientes WHERE id_cliente = '$id_cliente'";
        $resultado = mysqli_query($inc,$consulta);

        $eliminarPendientes = "UPDATE turnos_pendientes SET estado = 0 WHERE id_turno = '$id_turno'";
        
        $result = mysqli_query($inc, $eliminarPendientes);

        $actualizar = "INSERT INTO turnos (id_turno, dia, servicio, horario, id_cliente, estado) VALUES ('$id_turno', '$dia', '$servicio', '$horario', '$id_cliente', '$estado')";
        $update = mysqli_query($inc, $actualizar);


        if ((!$resultado) ||  (!$update) || (!$eliminarPendientes)){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al cargar datos  ' . mysqli_error($inc)));
            exit;

        }else{
            $row = mysqli_fetch_assoc($resultado);
            $email = $row['mail'];
            echo json_encode(array('exito' => true, 'mensaje' => 'El turno fue rechazado correctamente'));
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