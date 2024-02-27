CREATE TABLE `volunteers` (
  `volunteer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `family_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
  PRIMARY KEY (`volunteer_id`),
  KEY `family_id` (`family_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `volunteers_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `families` (`family`)
  CONSTRAINT `volunteers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `refugees` (
  `refugee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `country_of_origin` varchar(45) DEFAULT NULL,
  `date_of_arrival_to_us` date DEFAULT NULL,
  `date_of_joining_oasis` date DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `family_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
  PRIMARY KEY (`refugee_id`),
  KEY `family_id` (`family_id`),
  KEY `user_id` (`user_id`),

  CONSTRAINT `refugees_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `families` (`family_id`)
  CONSTRAINT `refugees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*head of household is technially a foreign key but it references either volunteer of refugee id so we cant cement it*/
CREATE TABLE `Families` (
  `family_id` int NOT NULL AUTO_INCREMENT,
  `head_of_household_id` int DEFAULT NULL,
  `head_of_household` varchar(45) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `is_refugee` bool DEFAULT false,
  `is_good_neighbor` bool DEFAULT false,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`family_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `families_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `refugee_id` int NOT NULL,
  `family_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `fulfilled` tinyint(1) DEFAULT 0,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `refugee_id` (`refugee_id`),
  KEY `family_id` (`family_id`),  
  KEY `user_id` (`user_id`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`refugee_id`) REFERENCES `refugees` (`refugee_id`),
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`family_id`) REFERENCES `families` (`family_id`)
  CONSTRAINT `requests_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `donations` (
  `donation_id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(255) NOT NULL DEFAULT 'Default',
  `quantity` int NOT NULL DEFAULT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  `giving_family` int DEFAULT NULL,
  `giving_volunteer` int DEFAULT NULL,
  `recieving_family` int DEFAULT NULL,
  `recieving_refugee` int DEFAULT NULL,
  `user_id` int DEFAULT NULL

  PRIMARY KEY (`donation_id`),
  KEY `giving_family` (`giving_family`)
  KEY `giving_volunteer` (`giving_volunteer`)
  KEY `recieving_family` (`recieving_family`)
  KEY `recieving_refugee` (`recieving_refugee`)
  KEY `user_id` (`user_id`)

  CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`giving_family`) REFERENCES `families` (`family_id`)
  CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`giving_volunteer`) REFERENCES `volunteers` (`volunteer_id`)
  CONSTRAINT `donations_ibfk_3` FOREIGN KEY (`recieving_family`) REFERENCES `families` (`family_id`)
  CONSTRAINT `donations_ibfk_4` FOREIGN KEY (`recieving_refugee`) REFERENCES `refugees` (`refugee_id`)
  CONSTRAINT `donations_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `good_neighbors` (
  `neighbor_id` int NOT NULL AUTO_INCREMENT,
  `host_family_id` int NOT NULL,
  `refugee_family_id` int NOT NULL,
  `match_date` date DEFAULT NULL
  
  PRIMARY KEY (`neighbor_id`),
  KEY `host_family_id` (`host_family_id`),
  KEY `refugee_family_id` (`refugee_family_id`),
  CONSTRAINT `good_neighbors_ibfk_1` FOREIGN KEY (`host_family_id`) REFERENCES `families` (`family_id`),
  CONSTRAINT `good_neighbors_ibfk_2` FOREIGN KEY (`refugee_family_id`) REFERENCES `families` (`family_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `notes` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `refugee_id` int NOT NULL,
  `user_id` int NOT NULL
  `date` date DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  
  PRIMARY KEY (`note_id`),
  KEY `refugee_id` (`refugee_id`),
  KEY `user_id` (`user_id`)
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`refugee_id`) REFERENCES `refugees` (`refugee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,

  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

