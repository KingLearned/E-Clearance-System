-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2023 at 03:18 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_clearance`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(3) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `designation` varchar(25) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `status` varchar(10) NOT NULL,
  `photo` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `username`, `password`, `designation`, `fullname`, `email`, `status`, `photo`) VALUES
(4, 'admin', '12345', 'Admin', 'Administrator', 'Admin@gmail.com', 'Active', 'uploads/default.jpg'),
(6, 'MrJohn', '12345', 'Super Admin', 'John Mmadu', 'john@gmail.com', 'Active', 'uploads/default.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `fee`
--

CREATE TABLE `fee` (
  `ID` int(3) NOT NULL,
  `session` varchar(9) NOT NULL,
  `faculty` varchar(255) NOT NULL,
  `dept` varchar(40) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fee`
--

INSERT INTO `fee` (`ID`, `session`, `faculty`, `dept`, `amount`) VALUES
(70, '2021/2022', 'College Of Engineering and Engineering Technology', 'Civil Engineering', 150000),
(71, '2021/2022', 'College Of Engineering and Engineering Technology', 'Chemical Engineering', 150000),
(73, '2021/2022', 'College Of Engineering and Engineering Technology', 'Computer Engineering', 150000),
(74, '2021/2022', 'College Of Physical and Applied Science', 'Computer Science', 100000),
(76, '2021/2022', 'College Of Education', 'Computer Science Education', 100000),
(78, '2021/2022', 'College Of Engineering and Engineering Technology', 'Electrical and Elecronic Engineering', 180000),
(80, '2021/2022', 'College Of Engineering and Engineering Technology', 'Mechanical Engineering', 200000);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `ID` int(4) NOT NULL,
  `feeID` varchar(25) NOT NULL,
  `studentID` varchar(25) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `matric_no` varchar(255) NOT NULL,
  `amount` int(25) NOT NULL,
  `datepaid` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`ID`, `feeID`, `studentID`, `fullname`, `matric_no`, `amount`, `datepaid`) VALUES
(70, 'D904EB1FDDE7', '44', 'Nelson Uwakwe C', 'MOUAU/COMPED/18/104499', 10000, '2023-01-13 12:49:54'),
(71, 'E2F08201340F', '44', 'Nelson Uwakwe C', 'MOUAU/COMPED/18/104499', 60000, '2023-01-13 13:21:38'),
(72, '1B90EEA5FC89', '44', 'Nelson Uwakwe C', 'MOUAU/COMPED/18/104499', 30000, '2023-01-13 13:29:27'),
(73, '783F7E61FED0', '27', 'Ugwunna Michael', 'MOUAU/CMP/17/98982', 100000, '2023-01-13 13:55:52'),
(74, 'E31F8B058B09', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 100000, '2023-01-13 14:49:22'),
(75, '6370BBBDA460', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 25000, '2023-01-13 14:49:47'),
(76, '7EEFF238B89D', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 25000, '2023-01-13 14:49:56'),
(77, 'D39FDE21DBAA', '45', 'John Mmadu', 'MOUAU/CMP/15/101515', 70000, '2023-01-17 14:57:42'),
(78, '64BE3FB03486', '45', 'John Mmadu', 'MOUAU/CMP/15/101515', 70000, '2023-01-17 14:59:18'),
(79, 'A0B960AC8A4A', '45', 'John Mmadu', 'MOUAU/CMP/15/101515', 10000, '2023-01-17 14:59:36'),
(80, 'E2CFEA5BE09C', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 15000, '2023-02-17 21:23:03'),
(81, '1085373B50AB', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 15000, '2023-02-17 21:23:29'),
(82, 'DE3458AC678F', '46', 'Heney Jude', 'MOUAU/CMP/15/101515', 50000, '2023-02-17 22:51:27'),
(83, 'BF542D3E61C5', '46', 'Heney Jude', 'MOUAU/CMP/15/101515', 130000, '2023-02-17 23:28:40'),
(84, 'B5780F24E944', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 15, '2023-02-18 11:41:06'),
(85, 'C90DDF16E852', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 4999, '2023-02-18 11:45:19'),
(86, '179F54B64CE9', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 5986, '2023-02-19 03:04:20'),
(87, '38A1AC512B26', '42', 'Kelvin George', 'MOUAU/EEE/15/101512', 9000, '2023-02-19 03:14:52');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `ID` int(3) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `matric_no` varchar(255) NOT NULL,
  `password` varchar(15) NOT NULL,
  `session` varchar(10) NOT NULL,
  `faculty` varchar(255) NOT NULL,
  `dept` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `photo` varchar(400) NOT NULL,
  `is_hostel_approved` int(3) NOT NULL,
  `is_sport_approved` int(3) NOT NULL,
  `is_stud_affairs_approved` int(3) NOT NULL,
  `is_fee_approved` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`ID`, `fullname`, `matric_no`, `password`, `session`, `faculty`, `dept`, `phone`, `photo`, `is_hostel_approved`, `is_sport_approved`, `is_stud_affairs_approved`, `is_fee_approved`) VALUES
(27, 'Ugwunna Michael', 'MOUAU/CMP/17/98982', '12345', '2020/2021', 'College Of Physical and Applied Science', 'Computer Science', '07036548792', 'uploads/avatar_nick.png', 1, 1, 1, 1),
(42, 'Kelvin George', 'MOUAU/EEE/15/101512', '12345', '2021/2022', 'College Of Engineering and Engineering Technology', 'Mechanical Engineering', '07040722170', 'uploads/default.jpg', 1, 1, 1, 1),
(46, 'Heney Jude', 'MOUAU/CMP/15/101515', '12345', '2021/2022', 'College Of Engineering and Engineering Technology', 'Electrical and Elecronic Engineering', '09165327892', 'uploads/default.jpg', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblsession`
--

CREATE TABLE `tblsession` (
  `ID` int(3) NOT NULL,
  `session` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblsession`
--

INSERT INTO `tblsession` (`ID`, `session`) VALUES
(1, '2020/2021'),
(2, '2021/2022');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `fee`
--
ALTER TABLE `fee`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `dept` (`dept`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `matric_no` (`matric_no`);

--
-- Indexes for table `tblsession`
--
ALTER TABLE `tblsession`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `fee`
--
ALTER TABLE `fee`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `tblsession`
--
ALTER TABLE `tblsession`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
