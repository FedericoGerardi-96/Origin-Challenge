-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: origin
-- ------------------------------------------------------
-- Server version	8.0.32

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

--
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `exchange` varchar(255) NOT NULL,
  `mic_code` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (10,'ACRO','Acropolis Infrastructure Acquisition Corp.','USD','NYSE','XNYS','United States','Common Stock','2023-02-10 07:19:44','2023-02-10 07:19:44'),(12,'AAC.WT','Ares Acquisition Corporation Re','USD','NYSE','XNYS','United States','Common Stock','2023-02-10 08:00:58','2023-02-10 08:00:58'),(13,'AGM.PR.E','Federal Agricultural Mortgage Corporation','USD','NYSE','XNYS','United States','Preferred Stock','2023-02-10 08:01:07','2023-02-10 08:01:07'),(18,'AA','Alcoa Corp','USD','NYSE','XNYS','United States','Common Stock','2023-02-10 08:03:24','2023-02-10 08:03:24'),(19,'AAIC','Arlington Asset Investment Corp.','USD','NYSE','XNYS','United States','Common Stock','2023-02-10 08:05:46','2023-02-10 08:05:46'),(20,'AAM.PR.A','Apollo Global Management, Inc.','USD','NYSE','XNYS','United States','Common Stock','2023-02-10 20:26:37','2023-02-10 20:26:37'),(21,'AEM','Agnico Eagle Mines Ltd','USD','NYSE','XNYS','United States','Common Stock','2023-02-12 00:59:08','2023-02-12 00:59:08'),(25,'AAC.WT','Ares Acquisition Corporation Re','USD','NYSE','XNYS','United States','Common Stock','2023-02-12 19:38:46','2023-02-12 19:38:46'),(26,'AAC.WT','Ares Acquisition Corporation Re','USD','NYSE','XNYS','United States','Common Stock','2023-02-12 19:39:24','2023-02-12 19:39:24');
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-13 12:22:52
