-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2024 a las 13:28:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_reclamo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_reclamo`
--

CREATE TABLE `estados_reclamo` (
  `id_estado_reclamo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `estados_reclamo`
--

INSERT INTO `estados_reclamo` (`id_estado_reclamo`, `descripcion`, `activo`) VALUES
(1, 'Pendiente', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficinas`
--

CREATE TABLE `oficinas` (
  `id_oficina` int(11) NOT NULL,
  `nombre_oficina` varchar(256) NOT NULL,
  `id_tipo_reclamo` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `oficinas`
--

INSERT INTO `oficinas` (`id_oficina`, `nombre_oficina`, `id_tipo_reclamo`, `activo`) VALUES
(2, 'taller', 1, 1),
(3, 'repuestos', 1, 1),
(4, 'administracion', 1, 1),
(5, 'presupuestos', 1, 1),
(6, 'venta directa', 1, 1),
(7, 'planes de ahorro', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos`
--

CREATE TABLE `reclamos` (
  `id_reclamo` int(11) NOT NULL,
  `asunto` varchar(256) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_finalizado` datetime DEFAULT NULL,
  `fecha_cancelado` datetime DEFAULT NULL,
  `id_estado_reclamo` int(11) NOT NULL,
  `id_tipo_reclamo` int(11) NOT NULL,
  `id_usuario_creador` int(11) NOT NULL,
  `id_usuario_finalizador` int(11) DEFAULT NULL,
  `id_oficina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `reclamos`
--

INSERT INTO `reclamos` (`id_reclamo`, `asunto`, `descripcion`, `fecha_creado`, `fecha_finalizado`, `fecha_cancelado`, `id_estado_reclamo`, `id_tipo_reclamo`, `id_usuario_creador`, `id_usuario_finalizador`, `id_oficina`) VALUES
(1, 'Problema con el motor', 'El motor hace un ruido extraño al arrancar.', '2024-11-02 20:54:52', NULL, NULL, 1, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_reclamo`
--

CREATE TABLE `tipos_reclamo` (
  `id_tipo_reclamo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_usuario`
--

CREATE TABLE `tipos_usuario` (
  `id_tipo_usuario` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipos_usuario`
--

INSERT INTO `tipos_usuario` (`id_tipo_usuario`, `descripcion`, `activo`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Cliente', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `correo_electronico` varchar(256) NOT NULL,
  `contrasenia` varchar(256) NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `correo_electronico`, `contrasenia`, `id_tipo_usuario`, `activo`) VALUES
(1, 'Juan', 'Pérez', 'juan@example.com', 'password123', 1, 1),
(2, 'antonio', 'tiny', 'agostini_anto@yahoo.com.ar', '$2a$10$Mzb75HrhURMumqbxOvO8FuOSfWOZg6UVAdYhXfGxLK2kP4elAl40q', 3, 1),
(3, 'elizabet del valle', 'lizarraga', 'estudiolizarraga@yahoo.com.ar', '$2a$10$o335nzZBbW7cewmcOgPO8ew2xq19pWF2nuRH3AzmjOOd/Aid9Uc0.', 2, 1),
(4, 'martin', 'tofi', 'lolo@yahoo.com', '$2a$10$pTRd1KB99vby2TcJtEAq8eRxIvTPQzYHHK1qnpEeKvNOWFynLHfdC', 2, 1),
(5, 'paco', 'tizi', 'paco@yahoo.com.ar', '$2a$10$fnil4m7dBG4C2K/wbDP/4.7H98cYaFbFnsfEiW9ofgb5fE0M5L3tO', 3, 1),
(6, 'Juan', 'Pérez', 'juan@example.com', 'password123', 1, 1),
(7, 'empleado', 'emp', 'empleo@yahoo.com', '$2a$10$dpDKE5u./1mSefkjraZIw.rjsx4ntIfUkx6J6GJW5erOPpQz.JSH.', 2, 1),
(8, 'cliente', 'cient', 'cliente@yahoo.com.ar', '$2a$10$yNq9y5WN1PESX4l0lwlJf.17VXmFqsk8s6esDn6BkA7AnLmlNzFmK', 3, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados_reclamo`
--
ALTER TABLE `estados_reclamo`
  ADD PRIMARY KEY (`id_estado_reclamo`);

--
-- Indices de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`id_oficina`),
  ADD KEY `id_tipo_reclamo` (`id_tipo_reclamo`);

--
-- Indices de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD PRIMARY KEY (`id_reclamo`),
  ADD KEY `id_estado_reclamo` (`id_estado_reclamo`),
  ADD KEY `id_tipo_reclamo` (`id_tipo_reclamo`),
  ADD KEY `id_usuario_creador` (`id_usuario_creador`),
  ADD KEY `id_usuario_finalizador` (`id_usuario_finalizador`);

--
-- Indices de la tabla `tipos_reclamo`
--
ALTER TABLE `tipos_reclamo`
  ADD PRIMARY KEY (`id_tipo_reclamo`);

--
-- Indices de la tabla `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados_reclamo`
--
ALTER TABLE `estados_reclamo`
  MODIFY `id_estado_reclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `id_oficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  MODIFY `id_reclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipos_reclamo`
--
ALTER TABLE `tipos_reclamo`
  MODIFY `id_tipo_reclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  MODIFY `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD CONSTRAINT `reclamos_ibfk_1` FOREIGN KEY (`id_estado_reclamo`) REFERENCES `estados_reclamo` (`id_estado_reclamo`),
  ADD CONSTRAINT `reclamos_ibfk_3` FOREIGN KEY (`id_usuario_creador`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `reclamos_ibfk_4` FOREIGN KEY (`id_usuario_finalizador`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
