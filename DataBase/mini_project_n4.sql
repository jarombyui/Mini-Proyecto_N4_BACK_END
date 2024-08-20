-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-08-2024 a las 03:10:53
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
-- Base de datos: `mini_project_n4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `biography`, `phone`, `email`, `password`, `photo`) VALUES
(1, 'Patricio Star', 'I was born in Crustacio cascarudo', '+1298988888', 'syduhum@mailinator.com', '$2b$10$ONoywaOeu6Z.OiJLbguH4O/eYgGgdXKd6yPkLbhDdtG8P77sHnVee', '1724115112701-1.jpg'),
(2, 'Gary Smell', 'I am an ocean animal', '+569842156', 'zetugedyg@mailinator.com', '$2b$10$nLFPNgzFGxa6L8tyZdQsA.WEeJMEoAX4AeMrUvb3etpdGVTH.n4Pi', '1724115389281-2.jpg'),
(3, 'Señor Cangrejo', 'Soy muy trabajador', '+1 (463) 621-3743', 'zojyvax@mailinator.com', '$2b$10$ZjpEkwV.HM7opkHtahN2be3KVH1iKKN2m9nBmxDhsj7btp9NG44.6', '1724115479976-3.jpg'),
(4, 'Jarom Campos', 'I was born in Buenos Aires', '+51 947726382', 'jaromc@gmail.com', '$2b$10$sC9P0lmA2O3ZRrmYnh0Ln.9SXEM0ey54HVj1haQHjIJPJTavFWN2O', '1724116222937-cv_picture.jpeg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
