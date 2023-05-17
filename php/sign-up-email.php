<?php 

    header('Content-Type: application/json');

    include ("conexion.php");

    $email = $_POST['email'];

    function buscarEmail($con,$email){
        $query = " SELECT * FROM clientes WHERE mail='$email' ";
        $result = mysqli_query($con, $query);
        return (mysqli_num_rows($result) > 0);
    }


    if (!empty($email)){
        $resultado =  buscarEmail($con,$email);
        if (!$resultado) {
            echo json_encode(array('exito' => true, 'mensaje' => 'El email esta libre para ser registrado'));
        } else {
            echo json_encode(array('exito' => false, 'mensaje' => 'El email ya se encuentra registrado'));
         }
    } else{  
     echo json_encode(array('exito' => false, 'mensaje' => 'Error al procesar la solicitud'));
    }


    
?>


