-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2023 at 05:00 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bus_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `from` text NOT NULL,
  `to` text NOT NULL,
  `ticket_price` int(11) NOT NULL,
  `day` text NOT NULL,
  `time1` text NOT NULL,
  `max_travelers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `from`, `to`, `ticket_price`, `day`, `time1`, `max_travelers`) VALUES
(2, 'cairo', 'aswan', 200, '22-6-2020', '3:00', 100),
(3, 'alex', 'aswan', 100, '22-6-2020', '3:00', 33),
(35, 'Matrouh', 'Cairo', 100, '22-6-2020', '11:00:00', 100),
(36, 'cccccccc', 'ccccccccc', 100, '22-6-2020', '3:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `des_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `des_name`) VALUES
(4, 'cairo'),
(10, 'ccc');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `from` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL,
  `ticket_price` int(11) NOT NULL,
  `day` date NOT NULL,
  `time` time NOT NULL,
  `max_travelers` int(11) NOT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `from`, `to`, `ticket_price`, `day`, `time`, `max_travelers`, `status`, `user_id`) VALUES
(9, 'cairo', 'Matrouh', 0, '2023-04-04', '01:00:00', 0, 'accepted', 4);

-- --------------------------------------------------------

--
-- Table structure for table `search`
--

CREATE TABLE `search` (
  `id` int(12) NOT NULL,
  `searchTerm` varchar(255) NOT NULL,
  `user_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0-->user\r\n1-->admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `status`, `token`, `role`) VALUES
(4, 'Nour Yasser', 'nour@gmail.com', '12345678910', 115444444, 'in-active', '', 0),
(17, 'Mariam Hossam', 'nouranAdminnnnnnnnnnnnnnnnnnn@gmail.commmm', '$2b$10$2k6yP7VsURHzZ32JEmg9BOaCmH6PAyFiE7Fp2UWY/gsWPmNisMIPu', 2147483647, 'active', 'c599eec3951662b7c47f93028993a7bb', 0),
(18, 'Mariam Hossam', 'Mariam Adminnnnnnnnnnnnnnnnnnn@gmail.commmmMariam', '$2b$10$Uck/dwJm2ftGBchaTlIKmuFSjHkDCTBp1Y7UrnihPFsKy8sx3hCyS', 2147483647, 'active', '2fa167dfcabf2ce4557444b0b4d2dacc', 0),
(19, 'Nour Yasser Mostafa', 'nourYasserrrMostafa@gmail.com', '$2b$10$jXgmJCzKL3BYO3zORmZwX.ielDoddI7i46PXdvV64rs85ZIv2M4i.', 115444444, 'in-active', '8e2ce625440cd2de687232763c5ccfcb', 0),
(23, 'Nourannnnnnnnn', 'AAAAAAAAAdmmmmmmmmin2@gmail.com', '$2b$10$LIetLJkRq9SXMwTbFVjqjO8W0yj7bDr6Q2hUjAM.gWTrAGmUiocR2', 1123456666, 'active', '3f13a91572c4e6eb2afe678f2c56e448', 0),
(24, 'Nourannnnnnnnn', 'AAAAAAAAAdmmmmmmmmin2@gmail.com', '$2b$10$uP//uFUqj2S0av2MWjThWuX2x6Ghec5XB98Jtw5dHTOHXlyDP3a6a', 1123456666, 'active', '5128cce71be05116153370e9c90f8b33', 0),
(25, 'Nourrrrannnnnnnnn', 'AAAAAAAAAAAAAdmmmmmmmmin2@gmail.com', '$2b$10$zo8q8E6Hof4dZVcOjy9dr.6KPsDQCkMUbLx29ekw9fDnMKcj9tYky', 1123456666, 'active', '05a352f480a5b7fcfeee85291ef016a3', 0),
(27, 'Nourrrrannnnnnnnn', 'NNNN@gmail.com', '$2b$10$OJEAqIFn2L3hbE4rYa25Ee45CyXNoBm33DXKE5EJDyEDzxR2uNg9.', 1123456666, 'active', 'e14883cb85a7bbd488dba5cfa8041fdf', 0),
(28, 'yousef222255887', 'yousef1234@gmail.com', '$2b$10$OmC2mjFGUWWp7Z/4A3MLpO6oVLgrqUfFFfLtHdGAnziYlTHEV/Ofe', 155561615, 'active', '03ed5e8abf47a362c035591eeb697328', 0),
(29, 'yousef222255887', 'yousef12345678@gmail.com', '$2b$10$SKB7rTwOQPqOm3i4hk6LtuwsJDs2jfIR7ClPhzgjl2.irIrj7A12y', 155561615, 'active', '010d73a7a451b2809d8b0fec6adc049d', 0),
(30, 'yousef222255887', 'yousef12345678@gmail.com', '$2b$10$HJJxERkWTuFwiEB2W3lCnesCE.aB7L5OG/wnmwSGZkTk67VcZxiQ2', 155561615, 'active', '8b5a8d009558624814fb25d84972db08', 0),
(32, 'Admin22222', 'Admin@gmail.com', '$2b$10$ThilmMGwaRsI5WDV0lDUmekWv.olHLm4Lho9htxZtPCrEKiT0TURO', 155561615, 'active', 'f16423ce0ffd25530c7deb9262736972', 1),
(33, 'NouranYasser', 'Nouranyasser366@gmail.com', '$2b$10$p9MKaX0fz3JqZYm51n5AEu3zxL3/9NHU7CvQO3Hu.LkLgme30iqdS', 2147483647, 'Active', '0574a6592527c8586712c4e0d66fe1d0', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
