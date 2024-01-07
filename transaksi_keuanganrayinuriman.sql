-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2024 at 04:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2204036_rayinuriman_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_keuanganrayinuriman`
--

CREATE TABLE `transaksi_keuanganrayinuriman` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `amount` bigint(20) NOT NULL,
  `status` enum('debit','kredit') NOT NULL,
  `receiver` varchar(50) NOT NULL,
  `jk` enum('L','P') NOT NULL,
  `no_telp` varchar(13) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi_keuanganrayinuriman`
--

INSERT INTO `transaksi_keuanganrayinuriman` (`id`, `date`, `description`, `amount`, `status`, `receiver`, `jk`, `no_telp`, `address`) VALUES
(1, '2024-01-01', 'Biaya sewa gedung', 1100000, 'debit', 'Asep Building', 'L', '081112223334', 'Jl.Gegerkalong Happy No.24'),
(2, '2024-01-01', 'Biaya Bintang Tamu', 1200000, 'debit', 'Kanaia Asa', 'P', '082556458244', 'Jl.Gatot Subroto No.99'),
(3, '2023-12-21', 'Biaya cathering', 400000, 'kredit', 'Rendy Raos', 'L', '081539888777', 'Jl.Sukajadi No.44'),
(4, '2023-11-17', 'Biaya pesta kembang api', 350000, 'kredit', 'Dadang Gunshop', 'L', '85894762165', 'Jl.Sariwangi No.254'),
(5, '2024-01-15', 'Biaya sewa panggung', 750000, 'debit', 'Shannon Leontyne', 'P', '82458497555', 'Jl.Pesantren No.248');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaksi_keuanganrayinuriman`
--
ALTER TABLE `transaksi_keuanganrayinuriman`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaksi_keuanganrayinuriman`
--
ALTER TABLE `transaksi_keuanganrayinuriman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
