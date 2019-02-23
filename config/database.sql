-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2018 at 03:27 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ckapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `title` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `id` int(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`title`, `body`, `id`, `date`, `user_id`) VALUES
('Learning A Web Devlopment In Hindi', 'JavaScript In Hindi', 1, '2018-12-23 14:01:24', 32);

-- --------------------------------------------------------

--
-- Table structure for table `userschema`
--

CREATE TABLE `userschema` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id` int(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userschema`
--

INSERT INTO `userschema` (`username`, `password`, `id`, `date`) VALUES
('Pardeepsaini7927@gmail.com', '$2a$10$Rswr53Lzhg/7S7dunzs2M.4gwFkwqk1h5MDLG.CueFVcgGJPpI4SW', 32, '2018-12-22 13:59:20'),
('Pardeepsaini54321@gmail.com', '$2a$10$ZyWdjJ2IWdUBYA6SczPNEenirmLvl7UMaELuVgouXGOHbVSkVRTSe', 33, '2018-12-22 17:59:49'),
('Pardeepsaini@gmail.com', '$2a$10$gHDuUl4pWG9joZEsOQo2HOEMB/J3ISmiprT6cu6mxJMlXUYqC3CQa', 34, '2018-12-22 19:00:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userschema`
--
ALTER TABLE `userschema`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userschema`
--
ALTER TABLE `userschema`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
