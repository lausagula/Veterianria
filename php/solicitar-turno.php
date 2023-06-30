<?php 

    header('Content-Type: application/json');


    include ("conexion.php");

    $servicio =  $_POST['servicio'];
    $id_cliente = $_POST['idUsuario'];
    $fecha = $_POST['fecha'];
    $horario = $_POST['horario'];
    $id_perro = $_POST['selectPerros'];

    $consulta = "SELECT nacimiento FROM perros WHERE id_perro = '$id_perro'";
    $query = mysqli_query($con,$consulta);

    $row = mysqli_fetch_assoc($query);
    $nacimiento = $row['nacimiento'];
    $actual = date('Y-m-d');

    $fecha_nacimiento = new DateTime($nacimiento);
    $fecha_actual = new DateTime($actual);

    $diferencia = $fecha_nacimiento->diff($fecha_actual);
    $total_meses = ($diferencia->y * 12) + $diferencia->m;



    if ($servicio == 'castracion'){

        $consulta = "SELECT * FROM practicas WHERE id_perro = '$id_perro' AND tipo = '$servicio'"; 
        $resultado = mysqli_query($con,$consulta);

        if(mysqli_num_rows($resultado) > 0){
            echo json_encode(array('exito' => false, 'mensaje' => 'Ya se encuentra una castración realizada')); 
            return;
        }

    }else if($servicio == 'vacuna-enfermedad'){
        if($total_meses < 2){
            echo json_encode(array('exito' => false, 'mensaje' => 'El perro debe ser mayor a 2 meses'));
            return;
        }else{
            // Busco si la ultima vacuna-enfermedad fue la dosis 1 o 2.
            // En caso de ser la una hay que verificar el tiempo entre las 2 dosis.
            // En caso de ser la 2 puede sacar turno en cualquier momento.

            $consulta = "SELECT * FROM practicas WHERE tipo = '$servicio' AND id_perro = '$id_perro' ORDER BY dia DESC LIMIT 1";
            $result = mysqli_query($con,$consulta);
            
            if(mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_assoc($result);
                if($row['dosis'] == 1){

                    $fecha_aplicacion = $row['dia'];
                    $aplicacion = new DateTime($fecha_aplicacion);
                    $diferencia_dosis = $aplicacion->diff($fecha_actual);
                    $cant_dias_dosis = $diferencia_dosis->days;

                    if (($total_meses < 4) && ($cant_dias_dosis < 21)){
                        echo json_encode(array('exito' => false, 'mensaje' => 'Para perros menores a 4 meses deben esperar al menos 21 dias entre las dosis.'. mysqli_error($con)));
                        return;
                    }else if(($total_meses > 4) && ($cant_dias_dosis < 365 )){
                        echo json_encode(array('exito' => false, 'mensaje' => 'Para perros mayores a 4 meses deben esperar al menos 1 año entre las dosis.'. mysqli_error($con)));
                        return;
                    }
                }else{
                    $fecha_aplicacion = $row['dia'];
                    $aplicacion = new DateTime($fecha_aplicacion);
                    $diferencia_dosis = $aplicacion->diff($fecha_actual);
                    $cant_dias_dosis = $diferencia_dosis->days;
                    if($cant_dias_dosis < 365 ){
                        echo json_encode(array('exito' => false, 'mensaje' => 'Para perros debe esperar al menos 1 año para recibir el refuerzo.'. mysqli_error($con)));
                        return;
                    }


                }
            }
        }
    }else if($servicio == 'vacuna-rabia'){
        if(($total_meses < 4)){
            echo json_encode(array('exito' => false, 'mensaje' => 'El perro debe ser mayor a 4 meses'));
            return;
        }else{

            $consulta = "SELECT * FROM practicas WHERE tipo = '$servicio' AND id_perro = '$id_perro' ORDER BY dia DESC LIMIT 1";
            $result = mysqli_query($con,$consulta);

            if(mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_assoc($result);
                if($row['dosis'] == 1){

                    $fecha_aplicacion = $row['dia'];
                    $aplicacion = new DateTime($fecha_aplicacion);
                    $diferencia_dosis = $aplicacion->diff($fecha_actual);
                    $cant_dias_dosis = $diferencia_dosis->days;

                    if (($cant_dias_dosis < 365)){
                        echo json_encode(array('exito' => false, 'mensaje' => 'Debe esperar al menos 1 año entre las dosis.'. mysqli_error($con)));
                        return;
                    }
                }else{
                    $fecha_aplicacion = $row['dia'];
                    $aplicacion = new DateTime($fecha_aplicacion);
                    $diferencia_dosis = $aplicacion->diff($fecha_actual);
                    $cant_dias_dosis = $diferencia_dosis->days;
                    if($cant_dias_dosis < 365 ){
                        echo json_encode(array('exito' => false, 'mensaje' => 'Para perros debe esperar al menos 1 año para recibir el refuerzo.'. mysqli_error($con)));
                        return;
                    }
                }
            }
        }    
    }
    
    

    $consultaTurnosPendientes = "SELECT * FROM turnos_pendientes WHERE id_perro = '$id_perro' AND servicio = '$servicio'";
    $consulta1 = mysqli_query($con,$consultaTurnosPendientes);

    if(mysqli_num_rows($consulta1) > 0){
        echo json_encode(array('exito' => false, 'mensaje' => 'Ya existe un turno pendiente para este servicio al mismo perro'. mysqli_error($con)));
        return;
    }

    $consultaTurnos = "SELECT * FROM turnos WHERE id_perro = '$id_perro' AND servicio = '$servicio'";
    $consulta2 = mysqli_query($con,$consultaTurnos);
    
    if(mysqli_num_rows($consulta2) > 0){
        echo json_encode(array('exito' => false, 'mensaje' => 'Ya existe un turno programado para este servicio al mismo perro'. mysqli_error($con)));
        return;
    }
    
    

    $sql = "INSERT INTO turnos_pendientes (dia, servicio, bloque_horario, id_cliente, id_perro) VALUES ('$fecha', '$servicio', '$horario', '$id_cliente', '$id_perro')";
    if (mysqli_query($con, $sql)) {
        echo json_encode(array('exito' => true, 'mensaje' => 'Insercion turno exitosa'. mysqli_error($con)));
    } else {
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al insertar turno: ' . mysqli_error($con)));
    }
    

    
?>