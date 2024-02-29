
DROP TABLE IF EXISTS `auth_roles`;
DROP TABLE IF EXISTS `auth_tenants`;
DROP TABLE IF EXISTS `auths`;
DROP TABLE IF EXISTS `tenants`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `model_permissions`;


CREATE TABLE `auths` (
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`email` VARCHAR(100) NOT NULL UNIQUE,
`username`  VARCHAR(45) NOT NULL UNIQUE,
`name` VARCHAR(50) NOT NULL,
`lastname` VARCHAR(70) NOT NULL,
`password` VARCHAR(255) NOT NULL,
`lastlogin` TIMESTAMP,
`status` INT NOT NULL DEFAULT 0,
`sessionId` TEXT,
`verifiedAt` TIMESTAMP,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP);

CREATE TABLE `tenants` (
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`name` VARCHAR(100) NOT NULL,
`key` VARCHAR(100) NOT NULL UNIQUE,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP);


CREATE TABLE `auth_tenants` (
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`authId` INT NOT NULL,
`tenantId` INT NOT NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP);

CREATE TABLE `roles`(
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`name` VARCHAR(500) NOT NULL UNIQUE
);

CREATE TABLE `permissions`(
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`name` VARCHAR(500) NOT NULL UNIQUE,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

CREATE TABLE `auth_roles`(
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`authId` INT NOT NULL,
`roleId` INT NOT NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

CREATE TABLE `model_permissions`(
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`permissionId` INT NOT NULL,
`modelId` INT NOT NULL,
`modelType` VARCHAR(50) NOT NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

ALTER TABLE `auth_roles` ADD CONSTRAINT `FK_roles_role` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`),
ADD CONSTRAINT `FK_roles_auth` FOREIGN KEY (`authId`) REFERENCES `auths`(`id`);

ALTER TABLE `auth_tenants`ADD CONSTRAINT `FK_tenants_auth` FOREIGN KEY (`authId`) REFERENCES `auths`(`id`),
ADD CONSTRAINT `FK_tenants_tenant` FOREIGN KEY (`tenantId`) REFERENCES `tenants`(`id`)
;

ALTER TABLE `model_permissions` ADD CONSTRAINT `FK_model_permissions_permission` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`);

DELIMITER //
CREATE TRIGGER IF NOT EXISTS insert_auth_tenants_trigger
AFTER INSERT ON tenants FOR EACH ROW BEGIN INSERT INTO auth_tenants (authId, tenantId) VALUES (1, NEW.id); END;
//
DELIMITER ;