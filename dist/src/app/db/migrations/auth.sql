
DROP TABLE IF EXISTS `auth_roles`;
DROP TABLE IF EXISTS `auth_tenants`;
DROP TABLE IF EXISTS `auths`;
DROP TABLE IF EXISTS `tenants`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `model_permissions`;


CREATE TABLE `auths` (
`id` VARCHAR(70) PRIMARY KEY DEFAULT (UUID()),
`email` VARCHAR(100) NOT NULL UNIQUE,
`username`  VARCHAR(45) NOT NULL UNIQUE,
`name` VARCHAR(50) NOT NULL,
`lastname` VARCHAR(70) NOT NULL,
`password` VARCHAR(255) NOT NULL,
`lastlogin` TIMESTAMP,
`status` INT NOT NULL DEFAULT 0,
`sessionId` TEXT,
`infoId` VARCHAR(70),
`verifiedAt` TIMESTAMP,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP);

CREATE TABLE `tenants` (
`id` VARCHAR(70) PRIMARY KEY DEFAULT (UUID()),
`name` VARCHAR(100) NOT NULL,
`key` VARCHAR(100) NOT NULL UNIQUE,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP);


CREATE TABLE `auth_tenants` (
`id` VARCHAR(70) PRIMARY KEY DEFAULT (UUID()),
`authId` VARCHAR(70) NOT NULL,
`tenantId` VARCHAR(70) NOT NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP);

CREATE TABLE `roles`(
`id` VARCHAR(70) PRIMARY KEY DEFAULT (UUID()),
`name` VARCHAR(500) NOT NULL UNIQUE,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

CREATE TABLE `permissions`(
`id` VARCHAR(70) PRIMARY KEY DEFAULT (UUID()),
`name` VARCHAR(500) NOT NULL UNIQUE,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

CREATE TABLE `auth_roles`(
`id` VARCHAR(70) PRIMARY KEY DEFAULT (UUID()),
`authId` VARCHAR(70) NOT NULL,
`roleId` VARCHAR(70) NOT NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

CREATE TABLE `model_permissions`(
`id` VARCHAR(70) PRIMARY KEY DEFAULT (UUID()),
`permissionId` VARCHAR(70) NOT NULL,
`modelId` VARCHAR(70) NOT NULL,
`modelType` VARCHAR(50) NOT NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

ALTER TABLE `auth_roles` ADD CONSTRAINT `FK_roles_role` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`),
ADD CONSTRAINT `FK_roles_auth` FOREIGN KEY (`authId`) REFERENCES `auths`(`id`);

ALTER TABLE `auth_tenants`ADD CONSTRAINT `FK_tenants_auth` FOREIGN KEY (`authId`) REFERENCES `auths`(`id`),
ADD CONSTRAINT `FK_tenants_tenant` FOREIGN KEY (`tenantId`) REFERENCES `tenants`(`id`);

ALTER TABLE `model_permissions`
 ADD UNIQUE `idx_uniques_permissions` (`modelId`, `modelType`, `permissionId`) USING BTREE;

ALTER TABLE `model_permissions` ADD CONSTRAINT `FK_model_permissions_permission` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`);

CREATE TRIGGER IF NOT EXISTS insert_auth_tenants_trigger AFTER INSERT ON tenants FOR EACH ROW BEGIN INSERT INTO auth_tenants (authId, tenantId) VALUES (1, NEW.id); END;
