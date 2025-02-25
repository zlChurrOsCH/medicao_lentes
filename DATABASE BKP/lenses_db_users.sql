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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20) COLLATE utf8mb3_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `nome` varchar(40) COLLATE utf8mb3_unicode_ci NOT NULL,
  `sobrenome` varchar(40) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `nivel` int NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`usuario`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tsg','$2b$10$PUyr80Ygn1i1jcqdXMihOOTdok/LHXYBeNh7WA00YJQQCmea2aDqm','Leonardo','Nascimento',NULL,'2025-01-10 00:13:11','2025-01-10 02:25:30',NULL,25),(2,'leo','$2b$10$.NNhmnHRRpK1NGxXW4UQ6.VTdPMH/9VRcFcu0tEEhXwtnS.be4hEu','Cliente','embra',NULL,'2025-01-10 02:24:40','2025-01-10 02:25:42',NULL,1),(6,'00210141','$2b$10$GPfQNvZIZrUS46/NI54okOJ0/Q0bGHezxMB8tTd49yhvXtQRIAF5.','Leonardo','Nascimento','teste@gmail.com','2025-01-10 04:06:40','2025-01-10 04:06:40',NULL,1),(11,'00210142','$2b$10$h.2v3MdUwZLcCGn9c3JAg.BQ/vR.t2U4wbesA4vbi8DmEUsPcSYfm','Lucas','Santos','lucassantos@teste.com','2025-01-10 14:53:10','2025-01-10 14:53:10',NULL,1),(12,'00210143','$2b$10$tWW/r3DUPra2Ez.OKqabyuSvnKdl8LyORJWdYmFfTyC/W81RgVvVe','Embrapol','Sul','contato@embrapolsul.com.br','2025-01-10 17:23:51','2025-01-10 17:23:51',NULL,1),(13,'00210144','$2b$10$zlTYGRUFzpP7j0l7oiGOO./7OctCMTdVlH6IwPFuaW.n3gW8GoPji','Embrapol 2','Sul','contato@embrapol.com.br','2025-01-10 17:48:54','2025-01-10 17:48:54',NULL,1),(14,'00210145','$2b$10$ho7x3yB8U/1LaT.kYfG87OKxTHyZ1ukZ8mDICDxK101LADRv3JBSq','Leonardo','Embrapol','teste@gmail.com','2025-01-10 18:09:17','2025-01-10 18:09:17',NULL,1),(15,'00210146','$2b$10$Cr9O096auCN30EfF1PyBWujMwupm6e71n113PMFPV8T73cYVHarl6','Leonardo','Teste','teste2@teste.com','2025-01-27 10:57:59','2025-01-27 10:57:59',NULL,1),(18,'00210147','$2b$10$vGoOvJNrU93ekrWH5m32Iu7hXYikRfwDSojWLofu5Dy7SwOxvgw2W','Bruno','Embra','bruno.embra@email.com','2025-02-04 08:51:30','2025-02-04 08:51:30',NULL,1),(21,'00210161','$2b$10$beHDMTzpuD.Zj6SpUm3ot.ShU8DJRAnF9r0LLxRbueb8TJHAs8tFG','João','Silva','joao.silva@email.com','2025-02-04 09:28:50','2025-02-04 09:28:50',NULL,1),(22,'00210154','$2b$10$VEBcXbOkO6ud96k/xw8TuuBX1f4vV9DtV.iw29NR/O2.iYOZpHS22','Maria','Oliveira','maria.oliveira@email.com','2025-02-04 09:28:50','2025-02-04 09:28:50',NULL,1),(23,'00210160','$2b$10$XimIP1M3ZyBSCbslaEtjnu/NHIL.Anw6aLnFzvMjyT3k3dErUELle','Anderson','Silva','anderson.silva@email.com','2025-02-04 09:29:21','2025-02-04 09:29:21',NULL,1),(24,'00210155','$2b$10$7CMISd8ujwpd7tA4k6RYTeOcSBAmE0Jj218xNKl.HxWw7ljU/eoDG','Cristiane','Oliveira','cristiane.oliveira@email.com','2025-02-04 09:29:21','2025-02-04 09:29:21',NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-19 11:20:10
