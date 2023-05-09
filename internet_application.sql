-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2023 at 03:24 AM
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
-- Database: `internet_application`
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
(2, 'cairo', 'aswan', 200, '22-6-2023', '3:00', 100),
(3, 'alex', 'aswan', 100, '22-6-2023', '3:00:00', 200),
(35, 'Matrouh', 'Cairo', 100, '23-6-2023', '11:00:00', 100),
(39, 'cairo', 'matrouh', 500, '22-6-2023', '11:00:00', 200),
(40, 'Alex', 'Luxor', 500, '22-6-2023', '12:00:00', 200),
(41, 'cairo', 'Luxor', 500, '23-6-2023', '11:00:00', 200),
(42, 'Port Said', 'Alex', 400, '5-6-2023', '10:00:00', 100),
(43, 'Luxor', 'Port Said', 500, '3-7-2023', '5:00:00', 200);

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
(11, 'matrouh'),
(13, 'aswan'),
(14, 'Alex');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `from` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL,
  `ticket_price` int(11) NOT NULL,
  `day` varchar(255) NOT NULL,
  `time1` time NOT NULL,
  `max_travelers` int(11) NOT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `from`, `to`, `ticket_price`, `day`, `time1`, `max_travelers`, `status`, `user_id`) VALUES
(38, 'cairo', 'aswan', 200, '22-6-2023', '03:00:00', 100, 'pending', 33),
(39, 'Alex', 'Luxor', 500, '22-6-2023', '12:00:00', 200, 'declined', 33),
(49, 'cairo', 'matrouh', 500, '22-6-2023', '11:00:00', 200, 'accepted', 38),
(50, 'cairo', 'aswan', 200, '22-6-2023', '03:00:00', 100, 'accepted', 38),
(51, 'Matrouh', 'Cairo', 100, '23-6-2023', '11:00:00', 100, 'declined', 38),
(52, 'Matrouh', 'Cairo', 100, '23-6-2023', '11:00:00', 100, 'pending', 38),
(53, 'cairo', 'Luxor', 500, '23-6-2023', '11:00:00', 200, 'declined', 38),
(54, 'Port Said', 'Alex', 400, '5-6-2023', '10:00:00', 100, 'accepted', 38),
(55, 'Port Said', 'Alex', 400, '5-6-2023', '10:00:00', 100, 'pending', 33);

-- --------------------------------------------------------

--
-- Table structure for table `search`
--

CREATE TABLE `search` (
  `id` int(12) NOT NULL,
  `searchTerm` varchar(255) NOT NULL,
  `user_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `search`
--

INSERT INTO `search` (`id`, `searchTerm`, `user_id`) VALUES
(1, 'cairo', 33),
(2, 'Matrouh', 33),
(18, 'undefined', 33),
(19, 'cairo', 38),
(20, 'cairo', 38),
(21, 'cairo', 38),
(22, 'cairo', 38),
(23, 'cairo', 38),
(24, 'port said', 38),
(25, 'port said', 38);

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
(19, 'Nour Yasser Mostafa', 'nourYasserrrMostafa@gmail.com', '$2b$10$jXgmJCzKL3BYO3zORmZwX.ielDoddI7i46PXdvV64rs85ZIv2M4i.', 115444444, 'in-active', '8e2ce625440cd2de687232763c5ccfcb', 0),
(32, 'Admin22222', 'Admin@gmail.com', '$2b$10$ThilmMGwaRsI5WDV0lDUmekWv.olHLm4Lho9htxZtPCrEKiT0TURO', 155561615, 'active', 'f16423ce0ffd25530c7deb9262736972', 1),
(33, 'NouranYasser', 'Nouranyasser366@gmail.com', '$2b$10$p9MKaX0fz3JqZYm51n5AEu3zxL3/9NHU7CvQO3Hu.LkLgme30iqdS', 2147483647, 'Active', '0574a6592527c8586712c4e0d66fe1d0', 0),
(35, 'Nouran12Yasser123', 'Nouranyasser333333@gmail.com', '$2b$10$z9afn9RPlxpssvUR1PNwAuuCsq5kik4ByC9mMDO5NsroQTfdiXq/W', 112345678, NULL, '389b43202e16208a7b51697ba03a5e98', 0),
(36, 'NouranYasser', 'Nouranyasserrrrrrrrrrr@gmail.com', '$2b$10$jOdhC5/IJN3MoMIRuUCWAup0UOViCEzdzrg/IQesfFpBphDb5WUJ.', 1156666666, NULL, '81810169aec59178f41f6d2558e2d9ef', 0),
(37, 'Mariam Hossam', 'nouranyasser@gmail.com', '$2b$10$lRza.ZMTr/xj8Q2Zk8eW9OIRtgYUZGC8AX2Eos4CsqNYDCq5Y3mP2', 1156666666, NULL, '8b3bb3f4f8788f6dec0ffe4e273a7ea1', 0),
(38, 'Mariam Hossam', 'MariamHossam@gmail.com', '$2b$10$rZ.mK84sWsfPhs.eBFUvKOXxMI4hf5xGZB0AHSn2y55qRGVq0HKiC', 2147483647, NULL, 'ca6196825b4122a5a001b687744005f1', 0),
(39, 'MennaAshraf', 'MennaAshraf@gmail.com', '$2b$10$/x6.D9/Ydubrj8ZBmodfGeOO.Q9vmJip3lPtD4FKHGX.BOuERDjAG', 1123456789, NULL, '6298e64fef5352603a89348a54df050f', 0);

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
-- Indexes for table `search`
--
ALTER TABLE `search`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `search`
--
ALTER TABLE `search`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
