-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: oasispractice-chrisspam1126-ece5.a.aivencloud.com    Database: mydatabase
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'ae632027-cad2-11ee-9303-86cef409921c:1-64';

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `donation_id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(255) NOT NULL DEFAULT 'Default',
  `quantity` int NOT NULL DEFAULT '0',
  `completed` tinyint(1) DEFAULT '0',
  `donator_id` int DEFAULT '0',
  PRIMARY KEY (`donation_id`),
  KEY `donator_id` (`donator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donators`
--

DROP TABLE IF EXISTS `donators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donators` (
  `donator_id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL DEFAULT 'Default',
  `phone_number` varchar(45) DEFAULT NULL,
  `donations_history` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`donator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `families`
--

DROP TABLE IF EXISTS `families`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `families` (
  `family_id` int NOT NULL,
  `head_of_household` varchar(45) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `family_members` varchar(255) DEFAULT NULL,
  `good_neighbor` tinyint(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`family_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `families_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `good_neighbors`
--

DROP TABLE IF EXISTS `good_neighbors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `good_neighbors` (
  `host_family_id` int NOT NULL,
  `refugee_family_id` int NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `church_they_attend` varchar(255) DEFAULT NULL,
  `donator_id` int DEFAULT NULL,
  PRIMARY KEY (`host_family_id`),
  KEY `refugee_family_id` (`refugee_family_id`),
  KEY `donator_id` (`donator_id`),
  CONSTRAINT `good_neighbors_ibfk_1` FOREIGN KEY (`refugee_family_id`) REFERENCES `families` (`family_id`),
  CONSTRAINT `good_neighbors_ibfk_2` FOREIGN KEY (`donator_id`) REFERENCES `donators` (`donator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `note_id` int NOT NULL,
  `refugee_id` int NOT NULL,
  `date` date DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  KEY `refugee_id` (`refugee_id`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`refugee_id`) REFERENCES `refugees` (`refugee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `refugees`
--

DROP TABLE IF EXISTS `refugees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refugees` (
  `refugee_id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `country_of_origin` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `date_of_arrival_to_us` date DEFAULT NULL,
  `date_of_joining_oasis` date DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `family_id` int DEFAULT NULL,
  PRIMARY KEY (`refugee_id`),
  KEY `family_id` (`family_id`),
  CONSTRAINT `refugees_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `families` (`family_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `request_id` int NOT NULL,
  `refugee_id` int NOT NULL,
  `date` date DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `family_id` int DEFAULT NULL,
  `fulfilled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `refugee_id` (`refugee_id`),
  KEY `family_id` (`family_id`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`refugee_id`) REFERENCES `refugees` (`refugee_id`),
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`family_id`) REFERENCES `families` (`family_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27 14:15:00
