<?php 

    header('Content-Type: application/json');

    include ("conexion.php");

    $mail= $_POST['mail'];
    $name = $_POST['name'];
    $raza = $_POST['raza'];
    $color = $_POST['color'];
    $nacimiento = $_POST['nacimiento'];
    $observacion = $_POST['observaciones'];
    //$foto = $_POST['foto'];
    $disponibilidad_cruza = $_POST['disponibilidad_cruza'];


    $id_cliente_query = "SELECT id_cliente FROM clientes WHERE mail='$mail'";
    $resultado = mysqli_query($con, $id_cliente_query);

    if ($resultado && mysqli_num_rows($resultado) > 0) {
        $fila = mysqli_fetch_assoc($resultado);
        $id_cliente = $fila['id_cliente'];

        if (empty($_FILES['foto']['tmp_name'])) {
            $insertar = "INSERT INTO perros (nombre, raza, color, nacimiento, observaciones, disponibilidad_cruza, id_cliente) VALUES ('$name', '$raza', '$color', '$nacimiento', '$observacion', '$disponibilidad_cruza', '$id_cliente')";
        } else {
            $foto = $_FILES['foto']['name'];
            $insertar = "INSERT INTO perros (nombre, raza, color, nacimiento, observaciones, foto, disponibilidad_cruza, id_cliente) VALUES ('$name', '$raza', '$color', '$nacimiento', '$observacion', '$foto', '$disponibilidad_cruza', '$id_cliente')"; 
        }

        $query = mysqli_query($con, $insertar);

        if ($query) {
            echo json_encode(array('exito' => true, 'mensaje' => 'Se registró correctamente'));
        } else {            
            echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
        }
    } else {
        echo json_encode(array('exito' => false, 'mensaje' => 'No se encontró el cliente con el correo especificado'));
    }


    
?>

