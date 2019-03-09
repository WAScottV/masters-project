CREATE TABLE `Response` (
  `ResponseId` bigint(20) NOT NULL,
  `Response` varchar(1000) NOT NULL,
  `Classifier` varchar(45) NOT NULL,
  `ResponseNum` int(11) NOT NULL,
  `Include` bit(1) NOT NULL,
  PRIMARY KEY (`ResponseId`,`ResponseNum`),
  CONSTRAINT `response_ibfk_1` FOREIGN KEY (`ResponseId`) REFERENCES `metadata` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
