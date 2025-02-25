-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lenses_db
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `medicoes_historico`
--

DROP TABLE IF EXISTS `medicoes_historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicoes_historico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `medicao_id` int NOT NULL,
  `lente_a_maior_old` decimal(10,2) DEFAULT NULL,
  `lente_a_x_eps_old` decimal(10,2) DEFAULT NULL,
  `lente_a_y_eps_old` decimal(10,2) DEFAULT NULL,
  `lente_a_x_cliente_old` decimal(10,2) DEFAULT NULL,
  `lente_a_y_cliente_old` decimal(10,2) DEFAULT NULL,
  `lente_b_menor_old` decimal(10,2) DEFAULT NULL,
  `lente_b_x_eps_old` decimal(10,2) DEFAULT NULL,
  `lente_b_y_eps_old` decimal(10,2) DEFAULT NULL,
  `lente_b_x_cliente_old` decimal(10,2) DEFAULT NULL,
  `lente_b_y_cliente_old` decimal(10,2) DEFAULT NULL,
  `tolerancia_old` decimal(10,2) DEFAULT NULL,
  `armacao_old` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `atualizado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicoes_historico`
--

LOCK TABLES `medicoes_historico` WRITE;
/*!40000 ALTER TABLE `medicoes_historico` DISABLE KEYS */;
INSERT INTO `medicoes_historico` VALUES (1,3,46.00,0.00,0.00,88.00,99.00,36.00,0.00,0.00,22.00,33.00,0.50,'1','2025-01-16 11:55:45'),(2,3,45.00,88.00,99.00,84.00,99.00,36.00,22.00,33.00,76.00,86.00,0.50,'1','2025-01-16 11:55:45'),(3,3,45.00,88.00,99.00,84.00,99.00,36.00,22.00,33.00,76.00,86.00,0.70,'1','2025-01-18 12:55:04'),(4,5,25.00,31.00,20.00,81.00,50.00,15.00,11.00,10.00,71.00,50.00,0.50,'1','2025-01-10 20:23:51'),(5,5,25.00,25.00,20.00,81.00,50.00,15.00,11.00,10.00,71.00,50.00,0.50,'1','2025-01-27 16:20:11'),(6,8,46.00,88.00,66.00,0.00,0.00,35.00,66.00,66.00,0.00,0.00,0.40,'2','2025-01-27 16:57:25'),(7,3,45.00,88.00,99.00,84.00,99.00,36.00,22.00,33.00,76.00,86.00,0.50,'1','2025-01-18 12:55:55'),(8,3,45.00,88.00,99.00,0.00,0.00,36.00,22.00,33.00,0.00,0.00,0.50,'1','2025-02-04 17:22:04'),(9,3,45.00,88.00,99.00,88.00,99.00,36.00,22.00,33.00,22.00,33.00,0.50,'1','2025-02-04 17:25:18'),(10,3,45.00,88.00,99.00,88.00,99.00,36.00,22.00,33.00,22.00,33.00,0.50,'1','2025-02-11 13:54:22'),(11,3,45.00,88.00,99.00,88.00,99.00,36.00,22.00,33.00,22.00,32.00,0.50,'1','2025-02-11 13:54:29');
/*!40000 ALTER TABLE `medicoes_historico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-19 11:20:08
