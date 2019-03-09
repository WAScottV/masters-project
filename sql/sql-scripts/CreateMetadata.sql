CREATE TABLE `metadata` (
  `Id` bigint(10) NOT NULL,
  `UnitId` int(11) NOT NULL,
  `Tainted` varchar(15) NOT NULL,
  `Channel` varchar(45) NOT NULL,
  `Trust` int(11) NOT NULL,
  `WorkerId` int(11) NOT NULL,
  `CountryCode` varchar(3) NOT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Ip` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
