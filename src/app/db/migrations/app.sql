DROP TABLE IF EXISTS `preferences`;


CREATE TABLE `preferences`
(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(50) NOT NULL UNIQUE,
    `label` VARCHAR(150) NOT NULL,
    `value` VARCHAR(250),
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);



ALTER TABLE `preferences` 
ADD CONSTRAINT `FK_preference_createdBy` FOREIGN KEY(`createdBy`) REFERENCES `auths`(`id`),
ADD CONSTRAINT `FK_preference_updatedBy` FOREIGN KEY(`updatedBy`) REFERENCES `auths`(`id`);