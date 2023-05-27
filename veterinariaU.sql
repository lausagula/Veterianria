-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2023 a las 02:14:59
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria`
--
CREATE DATABASE IF NOT EXISTS `veterinaria` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `veterinaria`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perdidos`  ----> ENCONTRADOS que BUSCAN a su dueño

DROP TABLE IF EXISTS `perdidos`;
CREATE TABLE `perdidos` (
  `raza_perro` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `edad` int NOT NULL,
  `zona` varchar(255) NOT NULL,
  `caracteristicas` varchar(255) NOT NULL,
  `comportamiento` varchar(255) NOT NULL,
  `estado`TINYINT(1) NOT NULL,
`mail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `buscados`   ----> El DUEÑO BUSCA a su perro perdido
--

DROP TABLE IF EXISTS `buscados`;
CREATE TABLE `buscados` (
  `raza_perro` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `edad` int NOT NULL,
  `zona` varchar(255) NOT NULL,
  `caracteristicas` varchar(255) NOT NULL,
  `comportamiento` varchar(255) NOT NULL,
  `estado`TINYINT(1) NOT NULL,
  `mail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id_cliente` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,  
  `mail` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `telefono` int NOT NULL,
  `descuentos` TINYINT(1) DEFAULT 0,
  `es_administrador` TINYINT(1) DEFAULT 0 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- En `es_administrador` el numero 1 corresponde a los ADMINISTRADORES
--
-- --------------------------------------------------------
--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`nombre`,`apellido`,`mail`,`contraseña`,`telefono`,`descuentos`,`es_administrador`) VALUES
('Pedro','Veterinaria','pedro@gmail.com', 'Admin1234',1234567, 0, 1),
('Lucia','Veterinaria','lucia@gmail.com', 'Admin1234',1234567, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adopciones`
--

DROP TABLE IF EXISTS `adopciones`;
CREATE TABLE `adopciones` (
  `raza_perro` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `edad` int NOT NULL,
  `zona` varchar(255) NOT NULL,
  `caracteristicas` varchar(255) NOT NULL,
  `comportamiento` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `estado`TINYINT(1) NOT NULL DEFAULT 0,
  `id_cliente`int,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuidadores`
--

DROP TABLE IF EXISTS `cuidador`;
CREATE TABLE `cuidador` (
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `servicio` varchar(255) NOT NULL,
  `zona` varchar(255) NOT NULL,
  `disponibilidad` TINYINT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paseadores`
--

DROP TABLE IF EXISTS `paseador`;
CREATE TABLE `paseador` (
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `servicio` varchar(255) NOT NULL,
  `zona` varchar(255) NOT NULL,
  `disponibilidad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perros`
--

DROP TABLE IF EXISTS `perros`;
CREATE TABLE `perros` (
  `nombre` varchar(255) NOT NULL,
  `raza` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `nacimiento` date NOT NULL,
  `observaciones` varchar(255),
  `foto` longblob,
  `disponibilidad_cruza` TINYINT(1)  NOT NULL,
  `id_cliente`int,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `campaña_donacion`
--

DROP TABLE IF EXISTS `campaña_donacion`;
CREATE TABLE `campaña_donacion` (
  `id_campaña`int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `resumen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `donacion_realizadas`
--

DROP TABLE IF EXISTS `donacion_realizadas`;
CREATE TABLE `donacion_realizadas` (
  `id_campaña`int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `fecha_limite` date NOT NULL,
  `monto` int NOT NULL,
  `id_cliente`int NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `turnos`
--

DROP TABLE IF EXISTS `turnos`;
CREATE TABLE `turnos` (
  `dia` int(255) NOT NULL,
  `servicio` varchar(255) NOT NULL,
  `horario` varchar(255) NOT NULL,
  `id_cliente`int,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `turnos pendientes`
--

DROP TABLE IF EXISTS `turnos_pendientes`;
CREATE TABLE `turnos_pendientes` (
  `dia` int(255) NOT NULL,
  `servicio` varchar(255) NOT NULL,
  `bloque_horario` varchar(255) NOT NULL,
  `id_cliente`int,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


