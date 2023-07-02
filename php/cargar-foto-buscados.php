<?php

    include ("conexion.php");

    if($con){

        $id = $_GET['id'];

        $consulta = "SELECT foto FROM buscados WHERE id_buscados = '$id'";
        $result = mysqli_query($con,$consulta);

        if(mysqli_num_rows($result) > 0){
            $imgDatos = $result->fetch_assoc();

            header("Content-type: image/jpg");
            echo $imgDatos['foto'];
        }else{
            echo mysqli_error($con);
        }

    }else{
        echo 'Error en la conexion';
    }

?>