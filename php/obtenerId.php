<?php
    header('Content-Type: application/json');
    include("conexion.php");

    $email = $_POST['email'];

    if ($con) {
        $consulta = "SELECT * FROM clientes WHERE mail = '$email'";
        $resultado = mysqli_query($con, $consulta);

        if (mysqli_num_rows($resultado) > 0) {
            $row = $resultado->fetch_assoc();
            $idCliente = $row['id_cliente'];
            echo json_encode(array('exito' => true, 'idCliente' => $idCliente));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' => 'No se encontraron datos disponibles'));
        }
    } else {
        echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }
?>