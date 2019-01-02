-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2019 at 09:15 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `createddate` date DEFAULT NULL,
  `modifieddate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `fname`, `lname`, `contact`, `email`, `status`, `createddate`, `modifieddate`) VALUES
(1, 'nice', 'nice', 'Amit', 'gupta', '1234567890', 'amit@gmail.com', 'E', '2018-04-25', '2018-04-25');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `createddate` date DEFAULT NULL,
  `modifieddate` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fname`, `lname`, `contact`, `email`, `createddate`, `modifieddate`, `status`) VALUES
(1, 'Amit', 'Gupta', '1234567890', 'amit@gmail.com', '2018-04-26', '2018-04-26', 'E'),
(2, 'Amit', 'Gupta', '1234567888', 'amit@gmail.com', '2018-04-26', '2018-04-26', 'E'),
(3, 'Amit', 'Gupta', '123456789', 'amit@gmail.com', '2018-04-26', '2018-04-26', 'E');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `salarystatus` varchar(45) DEFAULT NULL,
  `createddate` date DEFAULT NULL,
  `modifieddate` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fname`, `lname`, `contact`, `email`, `salary`, `salarystatus`, `createddate`, `modifieddate`, `status`) VALUES
(1, 'Jack', 'Dawson', '1234567890', 'jack@gmail.com', 20000, 'paid', '2018-04-25', '2018-04-25', 'E'),
(2, 'Ryu', 'Jedi', '123456789', 'ryu@gmail.com', 10000, 'paid', '2018-04-25', '2018-04-25', 'E'),
(3, 'Ken', 'Shinobi', '1234567899', 'ken@gmail.com', 15000, 'paid', '2018-04-25', '2018-04-25', 'E'),
(4, 'Iori', 'Yagami', '12345678', 'iori@gmail.com', 35000, 'paid', '2018-04-25', '2018-04-25', 'E'),
(5, 'Kyo', 'Kusanagi', '1122334455', 'kyo@gmail.com', 30000, 'paid', '2018-04-25', '2018-04-25', 'E');

-- --------------------------------------------------------

--
-- Table structure for table `empsalary`
--

CREATE TABLE `empsalary` (
  `salid` int(11) NOT NULL,
  `empid` int(11) DEFAULT NULL,
  `salarystatus` varchar(45) DEFAULT NULL,
  `datecreated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inid` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `qty` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `createddate` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inid`, `name`, `qty`, `price`, `category`, `brand`, `createddate`, `status`) VALUES
(1, 'Needlee', '113', '202', 'aaa', 'aaa', '2018-04-25', 'E'),
(2, 'Sewing Machine', '4', '2000', 'bb', 'cc', '2018-04-25', 'E'),
(3, 'aa', '1', '11', '', '0', '2019-01-03', 'R'),
(4, 'bb', '1', '1', '', '0', '2019-01-03', 'R'),
(5, 'cc', '11', '11', '', '0', '2019-01-03', 'R'),
(6, 'dd', '4', '4', '', '', '2019-01-03', 'R'),
(7, 'ee', '5', '5', '', '', '2019-01-03', 'R'),
(8, 'F', '6', '6', '', '', '2019-01-03', 'R'),
(9, 'G', '7', '7', '', '', '2019-01-03', 'R'),
(10, 'H', '8', '8', '', '', '2019-01-03', 'R'),
(11, 'yy', '6', '6', 'yy', 'yy', '2019-01-03', 'R');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itid` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itid`, `name`, `status`, `price`, `createddate`) VALUES
(1, 'Shirt', 'E', 450, '2018-04-25 12:39:14'),
(2, 'Pant', 'E', 600, '2018-04-25 12:39:38'),
(3, 'Jeans Pant', 'R', 1000, '2018-04-25 12:40:02'),
(4, 'Jeans Shirt', 'E', 800, '2018-04-25 13:50:28'),
(5, 'asd', 'E', 123, '2018-05-05 00:15:28');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `oid` int(11) NOT NULL,
  `cid` int(11) DEFAULT NULL,
  `empid` int(11) DEFAULT NULL,
  `deliverydate` date DEFAULT NULL,
  `measurements` blob,
  `items` varchar(45) DEFAULT NULL,
  `createddate` date DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `paid` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`oid`, `cid`, `empid`, `deliverydate`, `measurements`, `items`, `createddate`, `amount`, `paid`, `balance`, `status`) VALUES
(1, 1, 4, '2018-04-27', NULL, '1', '2018-04-26', 450, 200, 250, 'P'),
(2, 1, 4, '2018-04-26', NULL, '4', '2018-04-26', 800, 222, 578, 'P'),
(3, 1, NULL, '2018-04-28', NULL, '4', '2018-04-26', 800, 222, 578, 'N'),
(4, 1, NULL, '2018-04-26', NULL, '2', '2018-04-26', 600, 222, 378, 'N'),
(5, 1, NULL, '2018-05-05', NULL, '1', '2018-05-05', 450, 122, 328, 'N');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `tid` int(11) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `details` varchar(45) DEFAULT NULL,
  `typeid` int(11) DEFAULT NULL,
  `transname` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empsalary`
--
ALTER TABLE `empsalary`
  ADD PRIMARY KEY (`salid`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`oid`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`tid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `empsalary`
--
ALTER TABLE `empsalary`
  MODIFY `salid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
