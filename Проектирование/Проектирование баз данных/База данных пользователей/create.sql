CREATE TABLE `donors` (
  `donor_id` int NOT NULL AUTO_INCREMENT,
  `donor_email` varchar(255) DEFAULT NULL,
  `donor_phone` varchar(10) DEFAULT NULL,
  `donor_password` varchar(255) NOT NULL,
  `donor_blood_type` varchar(3) DEFAULT NULL COMMENT 'После подтверждения пользователя сотрудниками станции, пользователь не может изменять это поле',
  `donor_address` varchar(255) DEFAULT NULL COMMENT 'В настоящее время не используется',
  `donor_is_verified` tinyint NOT NULL DEFAULT '0' COMMENT 'Изменяется только сотрудниками станции',
  PRIMARY KEY (`donor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='List of donors registered on the website';
