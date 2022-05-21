-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: covid_lore
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL DEFAULT 'ROLE_USER',
  KEY `fk1_idx` (`username`),
  CONSTRAINT `fk1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorities`
--

LOCK TABLES `authorities` WRITE;
/*!40000 ALTER TABLE `authorities` DISABLE KEYS */;
INSERT INTO `authorities` VALUES ('Fabiano','ROLE_USER'),('Anish','ROLE_USER'),('Alireza','ROLE_USER'),('Levon','ROLE_USER'),('Tal','ROLE_USER'),('Bob','ROLE_USER'),('Bruce','ROLE_USER'),('Tom','ROLE_USER'),('Harry','ROLE_USER'),('Ron','ROLE_USER'),('Portje','ROLE_USER'),('JohnyJosh','ROLE_USER'),('Magnus','ROLE_USER'),('qwertyGuy1234','ROLE_USER'),('QwertyGuy','ROLE_USER'),('CoolBob','ROLE_USER'),('Gendalf','ROLE_USER'),('Nikita','ROLE_USER'),('TestUser','ROLE_USER'),('TestUser2','ROLE_USER');
/*!40000 ALTER TABLE `authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_scores`
--

DROP TABLE IF EXISTS `comment_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_scores` (
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `score` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_scores_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_scores_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_scores`
--

LOCK TABLES `comment_scores` WRITE;
/*!40000 ALTER TABLE `comment_scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_date` date NOT NULL,
  `parent_comment_id` int DEFAULT NULL,
  `description` varchar(2000) NOT NULL,
  `childs` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  KEY `parent_comment_id` (`parent_comment_id`),
  CONSTRAINT `comments_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_3` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,2,'2022-05-14',NULL,'One day for my Mom ?',3),(2,1,3,'2022-05-14',1,'I\'m very sorry. My favorite aunt as well. Plus Bill - dear friend.',3),(3,1,4,'2022-05-14',2,'My condolences to all of you who lost a beloved family member or friend. I lost two of family, two friends.',0),(4,1,5,'2022-05-14',1,'I am so sorry for your loss.',1),(5,1,6,'2022-05-15',NULL,'I always thought it was a bit weird how the 1918 flu pandemic just \ndisappeared from stories of the early twenties, but I feel like I\'m watching it in real time.',0),(6,1,7,'2022-05-15',5,'I heard a TV commenter state \"It\'s because no one was exactly proud of their behavior\". Rings true.',1),(11,1,2,'2022-05-16',1,'Very Sorry for you',2),(12,1,2,'2022-05-16',2,'very sorry',0),(21,1,2,'2022-05-16',NULL,'To some extent, 1 million dead is hard to understand because it\'s hard for us to comprehend 330 million people total. On the other hand if you have a village of 330 people and 1 person dies, people will likely shrug their shoulders, mourn and move on.',1),(22,1,5,'2022-05-16',21,'I’ve been thinking of how people would have reacted if a city of a million people was completely destroyed by some cataclysm. If such a thing happened it would probably be more personally relatable to people than 1 million deaths over a huge span of time and distance, because you can put a name on the exact tragedy being discussed, it’s more comprehensible to our brains.',1),(23,1,6,'2022-05-16',22,'This is exactly it. And I’ve heard this analogy: if smoking killed at the same rate it does now from cancer and other diseases, but instead of that it kills through a chance of having your head blown violently off, people would likely have stopped smoking way sooner.\n\n',2),(24,1,2,'2022-05-16',23,'When I was 17-18 I worked with an old dude that had a hole in his throat and that was enough for me to know I needed to get my shit under control before I got older.\n\n',0),(25,1,4,'2022-05-16',23,'Illusion of control\n\n',1),(26,1,2,'2022-05-16',25,'Also over-estimation of dramatic consequences vs underestimation of boring consequences. Covid-19 symptoms, deadly as they can be, are mostly boring. No pulsing black spots, no bleeding from orifices, no agonising pain (well, not usually, and not until it’s well advanced).\n\nIf the next pandemic has some dramatic symptom, even if it’s actually less deadly, there will be more fear of it and more compliance with masks etc.',0),(27,1,2,'2022-05-16',26,'Covid-19 causes infertility and brain shrinkage. The problem is that these things are not visible\n\n',0),(28,1,7,'2022-05-16',NULL,'maybe',2),(29,1,2,'2022-05-16',28,'???',0),(30,2,2,'2022-05-16',NULL,'One of the studies says that of the 163 kids with cases of hepatitis, 75% were too young to be eligible for a vax, and of the remaining, “less than 5” had received a vaccine.',2),(31,2,3,'2022-05-16',30,'That\'s some pretty damning evidence, in my opinion....\n\nThe FDA hasn\'t approved a vaccine for under 5 and as these instances begin to creep up more, they are more and more complicit.\n\nDo we know if any of the \"less than 5\" that were vaccinated died?',0),(32,2,8,'2022-05-16',30,'It would be nice if they did that because if they find lower incidences in vaccinated kids, MAYBE they’ll finally consider approving a vaccine for the under 5s\n\n',1),(33,2,2,'2022-05-16',NULL,'I don’t have the source but I saw an article that said some of the cases that were reported were in Indonesia, where none of the children were vaccinated, therefore they didn’t think vaccines were the cause.',1),(34,2,2,'2022-05-16',32,'Precisely',0),(35,2,2,'2022-05-16',33,'Not looking for causation! I would never claim that vaccines would/could cause this kind of hepatitis. I am more looking to see if data exist that suggest vaccination has a protective effect on children.\n\n',0),(36,2,2,'2022-05-16',35,'I think the issue here is that the bulk of the children were too young to be vaccinated. And as we’ve already seen, the immune system for these young children work differently enough that the current vaccines at the expected doses weren’t really delivering the intended effect.\n\n',0),(37,3,2,'2022-05-16',NULL,'It makes plenty of money for some people and it’s already baked into the system.',1),(38,3,9,'2022-05-16',37,'I flew to the US from India a few months ago. I don’t think the maskless old man who i paid $3.50 to tickle my nose is feeding money back into the US economy',0),(39,3,2,'2022-05-16',NULL,'100%',0),(40,4,2,'2022-05-16',NULL,'I think the largest study reported that the incubation period for the original variant was 7.7 days, median.',0),(41,4,2,'2022-05-16',NULL,'5th paragraph of the article. 0.8 days between testing positive and onset of symptoms for non Delta variants. For delta it was 2 days between positive test and onset of symptoms. Extra day of shedding virus before feeling symptoms means much more spread of delta by pre-symptomatic people.\n\n',2),(42,4,2,'2022-05-16',NULL,'interesting',0),(43,4,10,'2022-05-16',NULL,'wow',0),(44,4,2,'2022-05-16',NULL,'very interesting',0),(45,4,6,'2022-05-16',41,'Theoretically yes, but I’m not sure “testing positive” and symptom onset are proportional?',0),(46,4,3,'2022-05-16',41,'maybe',0),(47,4,4,'2022-05-16',NULL,'Wasn’t the prodromal phase 4-10 days? Not just of testing positive, but after initial infection until symptom onset.\n\n',0),(48,4,2,'2022-05-16',NULL,'What is the specific testing that determines the variant?\n\n',0),(49,4,6,'2022-05-16',NULL,'Gene sequencing.\n\nA big chunk of positive tests in the US get sent to one of the labs that does genomic testing.',0),(50,4,2,'2022-05-16',NULL,'The normal tests can\'t differentiate. They have to send samples to a lab and have the genome sequenced to determine what variant it is. But there is most likely hardly anything but delta circulating at this point. It out competed all the other variants.\n\n',0),(51,4,2,'2022-05-16',NULL,'IIRC there are already multiplexing PCR tests for targets that differentiate between Delta and other variants, so it‘s still more effort but not sequencing.\n\n',0),(52,4,1,'2022-05-16',NULL,'I have not read about that. I\'ll check it out.\n\n',0),(53,5,2,'2022-05-16',NULL,'Amazing',0),(54,5,1,'2022-05-16',NULL,'agree',0),(94,8,2,'2022-05-16',NULL,'You could be correct but summer appears to be “covid season” for South Africa, just like the American south. Look at the charts and they had the start of their winter wave right now.\n\n',1),(95,8,2,'2022-05-16',94,'Yes, excessive heat drives many people indoors, with dry, cooled indoor air.',2),(96,8,1,'2022-05-16',95,'In contrast to the US few South Africans have air conditioning. Excessive heat would drive people outdoors to shaded areas rather than indoors.\n\n',1),(97,8,2,'2022-05-16',96,'And South Africa had lower rates of infection and mortality than the US. They also have a much younger population (Statista lists the median age in SA in 2015 as 26.5)\n\n',1),(98,8,3,'2022-05-16',97,'Exactly, only 6% of its population is over 65.\n\nWe have counties like Jefferson County next to Denver, CO where available ICUs are running low with close to 30% being 60+, a retirement community in comparison.',0),(99,8,2,'2022-05-16',95,'However being in the southern hemisphere, they experience summer and winter as opposite times from the Northern hemisphere.\n\n',0),(100,9,2,'2022-05-16',NULL,'I see only immunogenicity data, no effecacy data. What\'s going on?\n\n',3),(101,9,4,'2022-05-16',100,'The trial was set up when the pre-Delta variants were being suppressed by the vaccines. Efficacy against infection looked to take impractically long, so they didn\'t set it as a primary endpoint.\n\n',1),(102,9,2,'2022-05-16',101,'Very helpful, thank you.\n\nHere is the link with all primary and secondary endpoints: https://clinicaltrials.gov/ct2/show/NCT04816643',0),(103,9,2,'2022-05-16',100,'they have to have SOME data on asymptomatic infection, symptomatic infection, severe disease and hospitalization at this point. Just reporting out antibody titers doesn\'t really mean much, imo.\n\n',1),(104,9,4,'2022-05-16',103,'I have to imagine that they have a ton of data on infections…. What is the lag here to enter that. The US has been surging since late July\n\n',0),(105,9,2,'2022-05-16',100,'Sure some, but secondary endpoints don\'t determine if they\'re going to submit the trial for approval or not.\n\n',0),(106,9,2,'2022-05-16',NULL,'A news source reported that there wasn’t enough illnesses in the trial to determine efficacy. I believe the news source reported a doctor commenting on the release.\n\n',0),(107,1,2,'2022-05-20',11,'Yeah',0),(108,1,20,'2022-05-21',4,'Agree',0),(114,6,20,'2022-05-21',NULL,'Cool',1),(115,6,20,'2022-05-21',114,'Yep',0),(116,1,21,'2022-05-21',2,'I am also very sorry :(',1),(117,10,21,'2022-05-21',NULL,'TEST REPLY',0),(118,1,22,'2022-05-21',116,'yeah',0),(119,1,22,'2022-05-21',28,'wtf?',0),(120,11,22,'2022-05-21',NULL,'test reply',0),(121,1,23,'2022-05-21',11,'Agree :(',0),(122,12,23,'2022-05-21',NULL,'test reply',0);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `creator_id` int NOT NULL,
  `post_date` date NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(2000) NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `submitter_id` (`creator_id`),
  CONSTRAINT `posts_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'2022-05-14','Why 1 million dead from COVID is so hard for our brains to understand?','If we had a minute of silence for each person, we\'d be silent for 694 days'),(2,2,'2022-05-11','Why COVID is a key suspect in severe hepatitis cases in kids worldwide?','Are there data that examine the hepatitis cases breakdown between children vaccinated vs unvaccinated (for COVID)?'),(3,3,'2022-05-11','Airlines press U.S. to lift pre-departure testing requirements','I honestly feel like they literally forgot this rule even exists, because that is the only rational \nexplanation of what is legitimately non-sensical at this point. \nThen again I think its just pure incompetence at this point.'),(4,4,'2022-03-18','Delta’s rise is fuelled by rampant spread from people who feel fine','They report an incubation period of 5.8 days for Delta compared to over 6 for previous variants. \nIs this out of line with current consensus? \nI feel like I’ve been seeing a lot of ~4 day incubation assertions for Delta \nand thought the original variety was more like ~5.5 on average.\n\nEDIT: I am referring to the time between initial exposure/infection and becoming symptomatic. \nI believe this is the “incubation period.” I had seen reports of Delta being 4ish days, often even closer to 2 or 3. \nThis is saying 5.8 days.'),(5,5,'2022-02-11','Heavily mutated coronavirus variant puts scientists on alert','Researchers in South Africa are racing to track the concerning rise of a new variant of \nthe coronavirus that causes COVID-19. The variant harbours a large number of mutations found \nin other variants, including Delta, and it seems to be spreading quickly across South Africa.\n\nA top priority is to track the variant more closely as it spreads: it was first identified in Botswana \nthis month and has turned up in travellers to Hong Kong from South Africa. Scientists are also trying \nto understand the variant’s properties, such as whether it can evade immune responses triggered by vaccines \nand whether it causes more or less severe disease than other variants do.'),(6,1,'2022-05-16','Free COVID-19 tests US','I just ordered mine from the US Postal Service: UPS and it worked. I\'m posting this Tuesday, one day before the \"official\" site.'),(7,1,'2022-05-16','We won\'t how dangerous Omicron is for a long time','If it\'s spreading primarily because it isn\'t recognized by the large number of convalescent antibodies in South Africa, it doesn\'t need to go fast or have a ludicrously higher infectivity than Delta.\r\n\r\nThe old, what\'s known as \"wild type\" SARS-CoV-2 moved more subtly than Delta did, and that fooled people again and again. Longer incubation period, longer time to serious symptoms. I remember tracking that and all the questions of \"so where is it?\"'),(8,1,'2022-05-16','Omicron against the Delta variant','Could the overall downward trend in recent months be the result of seasonal changes? South Africa is in the Southern hemisphere, which means it\'s entering Summer months right now. If Omicron emerged in late September/early October, it might appear to be spreading slowly only because there\'s less crowding and more sunlight/UV during the Summer.\r\n\r\nAgainst this hostile environment (i.e., warmer season, younger population), if Omicron can still outcompete Delta in Gauteng, wouldn\'t it make more sense to estimate the transmission by comparing Omicron relative to Delta as opposed to the overall numbers, which could be suppressed by seasonal changes?\r\n\r\n'),(9,1,'2022-05-16','Pfizer and BioNTech Announce Positive Topline Results','NEW YORK AND MAINZ, Germany--(BUSINESS WIRE)-- Pfizer Inc. (NYSE: PFE) and BioNTech SE (Nasdaq: BNTX) today announced results from a Phase 2/3 trial showing a favorable safety profile and robust neutralizing antibody responses in children 5 to 11 years of age using a two-dose regimen of 10 µg administered 21 days apart, a smaller dose than the 30 µg dose used for people 12 and older. The antibody responses in the participants given 10 µg doses were comparable to those recorded in a previous Pfizer-BioNTech study in people 16 to 25 years of age immunized with 30 µg doses. The 10 µg dose was carefully selected as the preferred dose for safety, tolerability and immunogenicity in children 5 to 11 years of age. These are the first results from a pivotal trial of a COVID-19 vaccine in this age group.\r\n\r\n“Over the past nine months, hundreds of millions of people ages 12 and older from around the world have received our COVID-19 vaccine. We are eager to extend the protection afforded by the vaccine to this younger population, subject to regulatory authorization, especially as we track the spread of the Delta variant and the substantial threat it poses to children,” said Albert Bourla, Chairman and Chief Executive Officer, Pfizer. “Since July, pediatric cases of COVID-19 have risen by about 240 percent in the U.S. – underscoring the public health need for vaccination. These trial results provide a strong foundation for seeking authorization of our vaccine for children 5 to 11 years old, and we plan to submit them to the FDA and other regulators with urgency.”'),(10,21,'2022-05-21','TEST','TEST DESCRIPTION'),(11,22,'2022-05-21','TEST ABCD','TEST'),(12,23,'2022-05-21','12345','1234567');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_scores`
--

DROP TABLE IF EXISTS `post_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_scores` (
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `score` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_scores_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_scores_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_scores`
--

LOCK TABLES `post_scores` WRITE;
/*!40000 ALTER TABLE `post_scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `profile_image` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Fabiano','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,1),(2,'Anish','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,4),(3,'Alireza','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,3),(4,'Levon','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,2),(5,'Tal','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,6),(6,'Bob','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,1),(7,'Bruce','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,4),(8,'Tom','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,1),(9,'Harry','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,5),(10,'Ron','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,1),(14,'Portje','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,1),(15,'JohnyJosh','$2a$12$JjNwL.qpqGCp2TQBs/y5NeKbKv16zihUvLwOTBZTvj0l/pW4U6a8q',1,1),(16,'Magnus','$2a$10$XNN8FMWxkId6eoUSjQPrqupDZYRpRGTwLtR/LoNpJPzZGgzN7fJV6',1,5),(17,'qwertyGuy1234','$2a$10$3XyhY1gwVySGg.MntsGd0Oi4M1XK6sDnT4JXohACd7/8883kOzdku',1,5),(18,'QwertyGuy','$2a$10$LVdg1QUeoxbaDxNUhJVO9uyx/iyU3YlI6zoZB8BNz2MNUtwcjLoku',1,1),(19,'CoolBob','$2a$10$iFMaeBkpNXdiwq9h8ePj2OkPst5p53im4OpbNebFGk1nMErxbk/tm',1,4),(20,'Gendalf','$2a$10$XZu66ldQTGCuyS9l4FGFJe4VNEwdeeQ9bMHtXp7R4RViyKuVTK1iS',1,5),(21,'Nikita','$2a$10$b5AOsk96vRTsMxdSTmAd8O1CCX/MKlSuMpfOh8YyxVhwxPjLhoEKG',1,5),(22,'TestUser','$2a$10$gAvRWLArkB7VPI95AqojL.p3OUYqRWiOx.8GeyTMcgoPkIVDqZyLu',1,6),(23,'TestUser2','$2a$10$cdqyRIzpsHM3VnMd48clEeZq34FxVck2ra3eVXgIXEEoxa01CfJje',1,5);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'covid_lore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-22  0:01:58
