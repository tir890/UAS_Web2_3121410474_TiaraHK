-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2026 at 02:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uas_ereport`
--

-- --------------------------------------------------------

--
-- Table structure for table `pengaduan`
--

CREATE TABLE `pengaduan` (
  `id` int(11) NOT NULL,
  `nama_pelapor` varchar(100) NOT NULL,
  `email_pelapor` varchar(100) NOT NULL,
  `judul_laporan` varchar(255) NOT NULL,
  `kategori` varchar(50) NOT NULL DEFAULT 'Infrastruktur',
  `isi_laporan` text NOT NULL,
  `gambar_bukti` varchar(255) DEFAULT NULL,
  `tanggal_lapor` datetime DEFAULT current_timestamp(),
  `status` enum('Pending','Proses','Selesai') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengaduan`
--

INSERT INTO `pengaduan` (`id`, `nama_pelapor`, `email_pelapor`, `judul_laporan`, `kategori`, `isi_laporan`, `gambar_bukti`, `tanggal_lapor`, `status`) VALUES
(7, 'Rian Hidayat', 'rian.hidayat@gmail.com', 'Gangguan Kebisingan Akibat Balap Liar Setiap Akhir Pekan', 'Infrastruktur', 'Yth. Pihak Keamanan Kota, kami warga di sepanjang jalan Diponegoro merasa sangat terganggu dengan aksi sekelompok remaja yang rutin melakukan kegiatan balap liar setiap malam minggu mulai pukul 23.30 WIB sampai dini hari. Suara knalpot brong yang sangat bising membuat warga tidak bisa beristirahat dengan tenang. Selain itu, aksi menutup jalan secara sepihak juga membahayakan keselamatan pengguna jalan umum lainnya. Mohon segera ditindaklanjuti dengan patroli rutin.', NULL, '2026-06-19 13:22:01', 'Pending'),
(8, 'Siti Aminah', 'siti.aminah@Hotmail.com', 'Ketidaktepatan Sasaran Distribusi Pembagian Bansos Sembako RT 02', 'Infrastruktur', 'Saya perwakilan warga ingin mengadukan mengenai proses pembagian bantuan sosial (Bansos) paket sembako di wilayah Kelurahan Mekarsari, khususnya RT 02. Ditemukan beberapa kasus ketidaktepatan sasaran di mana warga yang tergolong mampu secara ekonomi justru mendapatkan bantuan, sedangkan ada 3 kepala keluarga lansia yang kondisi ekonominya sangat memprihatinkan malah terlewat dari daftar penerima bantuan. Mohon dilakukan validasi dan peninjauan data ulang secara transparan di tingkat kelurahan.', NULL, '2026-06-19 13:23:09', 'Pending'),
(15, 'Budi Hartono', 'budi.hartono@outlook.com', 'Lampu Penerangan Jalan Umum (PJU) Mati Total di Blok C3', 'Infrastruktur', 'Melaporkan bahwa fasilitas lampu penerangan jalan utama di Perumahan Asri Jaya Blok C3 sudah mati total selama hampir 2 minggu terakhir. Kondisi jalanan menjadi sangat gelap gulita saat malam hari. Hal ini memicu kekhawatiran warga akan meningkatnya potensi tindakan kriminal pencurian atau pembobolan rumah, serta kerawanan kecelakaan bagi kendaraan yang melintas. Mohon pihak terkait segera melakukan perbaikan bohlam atau instalasi kabelnya.', 'https://img.freepik.com/foto-gratis/sisi-taman-dengan-tribun-dan-proyektor-dengan-latar-belakang-langit-biru_140725-11124.jpg?semt=ais_hybrid&w=740&q=80', '2026-06-21 06:44:07', 'Proses'),
(16, 'Felisa Shafira', 'felisa.shafira@gmail.com', 'Jalan Rusak Parah dan Berlubang di Jalan Raya Sukamaju', 'Keamanan', 'Mohon segera diperbaiki fasilitas jalan di jl. Raya Sukamaju RT 03/RW 04. Kondisi aspal sudah mengelupas dan menyisakan lubang besar berdiameter 1 meter dengan kedalaman 15 cm. Hal ini sangat membahayakan para pengendara motor yang lewat, terutama saat malam hari dan kondisi hujan karena lubang tidak terlihat dan sering mengakibatkan kecelakaan tunggal.', 'https://img.freepik.com/foto-premium/lubang-berbahaya-di-permukaan-jalan-amerika-jalan-masuk-yang-rusak-sangat-membutuhkan-perbaikan_127089-33447.jpg', '2026-06-21 06:58:50', 'Selesai'),
(17, 'Dian Lestari', 'dian.lestari99@yahoo.com', 'Sampah Menumpuk di Bantaran Kali', 'Lingkungan', 'Selamat pagi petugas. Saya ingin melaporkan adanya tumpukan sampah liar yang semakin menggunung di area pinggir jembatan dekat Kali Ciliwung. Bau menyengat yang ditimbulkan sudah mulai mengganggu kenyamanan warga sekitar dan para pejalan kaki. Ditakutkan jika hujan deras turun, sampah tersebut akan hanyut dan menyumbat aliran sungai hingga memicu banjir bandang di wilayah pemukiman warga.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdtf-7GsfVrWvqdU5rGgv64IEB6j62AQArZQ&s', '2026-06-21 07:01:24', 'Selesai');

-- --------------------------------------------------------

--
-- Table structure for table `tanggapan`
--

CREATE TABLE `tanggapan` (
  `id` int(11) NOT NULL,
  `pengaduan_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `isi_tanggapan` text NOT NULL,
  `tanggal_tanggapan` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tanggapan`
--

INSERT INTO `tanggapan` (`id`, `pengaduan_id`, `user_id`, `isi_tanggapan`, `tanggal_tanggapan`) VALUES
(3, 15, 1, 'Akan segera kami proses', '2026-06-21 06:45:02'),
(4, 16, 1, 'Kami akan memperbaiki jalan mulai besok', '2026-06-21 07:02:36'),
(5, 17, 1, 'ini mah gampang merem juga selesai', '2026-06-21 07:02:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nama_lengkap`, `token`, `created_at`) VALUES
(1, 'admin', '$2y$10$893vMEx8K2.K6K1F1hNxe.e9HWhp/k2K7gZ.w.kF4M8tF7g8mXeqG', 'Admin Petugas Layanan', '24168edc952ea41106e56a54e3af962beda0b439417147876219b32d568d42d4', '2026-06-18 03:07:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pengaduan`
--
ALTER TABLE `pengaduan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tanggapan`
--
ALTER TABLE `tanggapan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengaduan_id` (`pengaduan_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pengaduan`
--
ALTER TABLE `pengaduan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tanggapan`
--
ALTER TABLE `tanggapan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tanggapan`
--
ALTER TABLE `tanggapan`
  ADD CONSTRAINT `tanggapan_ibfk_1` FOREIGN KEY (`pengaduan_id`) REFERENCES `pengaduan` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tanggapan_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
