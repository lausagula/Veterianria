<?php

    header('Content-Type: application/json');

    $inc = include ("conexion.php");

    $actual = date('Y-m-d'); 


    if($inc){

        $actualizar = "UPDATE campaña_donacion SET estado = 0 WHERE fin < '$actual'";
        $result = mysqli_query($con, $actualizar);
        if (!$result){
            echo json_encode(array('exito' => false, 'mensaje' => 'Error en la eliminacion'));
        }else{
            //$consulta = "SELECT * FROM campaña_donacion";
            //$resultado = mysqli_query($con,$consulta);

            $consultaCampañas = "SELECT c.*, COALESCE(SUM(d.monto), 0) AS monto_acumulado
                            FROM campaña_donacion c
                            LEFT JOIN donacion_realizadas d ON c.id_campaña = d.id_campaña
                            GROUP BY c.id_campaña";

            $resultadoCampañas = mysqli_query($con, $consultaCampañas);



            if (mysqli_num_rows($resultadoCampañas) > 0) {
                $dato = array();
                while ($row = mysqli_fetch_assoc($resultadoCampañas)) {
                    $dato[] = $row;
                }
                echo json_encode(array('exito' => true, 'data' => $dato ,'mensaje' => 'Se realizo la consulta con exito'));
            } else {
                echo json_encode(array('exito' => false, 'mensaje' => 'No se encontraron datos disponibles'));
            }
        }
    }else{
            echo json_encode(array('exito' => false, 'mensaje' => 'Error de conexión'));
    }
    
?>