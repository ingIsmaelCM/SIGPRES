/* FIXED: Add code to loans, changed deadline for term, move rate and grace from loans to conditions */

SET foreign_key_checks = 0;


CREATE TABLE `images`(
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`path` VARCHAR(150) NOT NULL,
`caption` VARCHAR(150) NOT NULL,
`imageableType` VARCHAR(150) NOT NULL,
`imageableId` INT NOT NULL,
`size` DECIMAL(10,2),
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

CREATE TABLE `documents`(
`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`path` VARCHAR(150) NOT NULL,
`title` VARCHAR(150) NOT NULL,
`documentableType` VARCHAR(150) NOT NULL,
`documentableId` INT NOT NULL,
`size` DECIMAL(10,2) NOT NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
`deletedAt` TIMESTAMP
);

CREATE TABLE `preferences`
(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(50) NOT NULL UNIQUE,
    `label` VARCHAR(150) NOT NULL,
    `value` LONGTEXT,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `infos`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `dni` VARCHAR(18) NOT NULL UNIQUE COMMENT 'Cédula, Pasaporte u otro',
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(75) UNIQUE,
    `birthdate` DATE ,
    `address` VARCHAR(125),
    `gender` ENUM('Masculino','Femenino', 'Ninguno') NOT NULL DEFAULT 'Ninguno',
     `country` NVARCHAR(50) NOT NULL DEFAULT 'República Dominicana',
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);

CREATE TABLE `clients`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(10),
    `name` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `clienttype` ENUM('Persona', 'Negocio') NOT NULL DEFAULT 'Persona',
    `infoId` INT,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);

CREATE TABLE `socials`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `instagram` VARCHAR(50),
    `facebook` VARCHAR(50),
    `whatsapp` VARCHAR(50),
    `clientId` INT NOT NULL,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);

CREATE TABLE `lawyers`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `exequatur` VARCHAR(20),
    `infoId` INT,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `contacts`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `infoId` INT,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);

CREATE TABLE `client_contacts`(
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `clientId` INT NOT NULL,
      `contactId` INT NOT NULL,
      `createdBy` INT NOT NULL,
      `updatedBy` INT NOT NULL,
      `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
      `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
      `deletedAt` TIMESTAMP
);


CREATE TABLE `jobs`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `startAt` DATE NOT NULL,
    `endAt` DATE,
    `status` ENUM('Actual', 'Anterior') NOT NULL DEFAULT 'Actual',
    `salary` DECIMAL(10,2) NOT NULL,
    `position` VARCHAR(50) NOT NULL,
    `company` VARCHAR(75) NOT NULL,
    `infoId` INT,
    `clientId` INT NOT NULL,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `wallets`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `balance` DECIMAL(10,2),
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `expenses`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `amount` DECIMAL(10,2) NOT NULL,
    `date` DATE NOT NULL,
    `concepto` VARCHAR(125) NOT NULL,
    `walletId` INT NOT NULL,
    `lawyerId` INT,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);

CREATE TABLE `loans`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
     `code` VARCHAR(10),
    `amount` DECIMAL(10,2) NOT NULL,
    `balance` DECIMAL(10,2) NOT NULL,
    `startAt` DATE NOT NULL,
    `endAt` DATE NOT NULL,
     `nextPaymentAt` DATE,
    `term` INT NOT NULL COMMENT 'Cantidad de cuotas',
    `status` ENUM('Pendiente', 'Aprobado','Rechazado') NOT NULL DEFAULT 'Pendiente',
    `period` VARCHAR(50) NOT NULL,
    `clientId` INT NOT NULL,
    `walletId` INT NOT NULL,
    `lawyerId` INT,
    `guarantorId` INT,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `conditions`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `initTerm` INT NOT NULL DEFAULT 0 COMMENT 'Días de recargo inicial',
    `initRateMora` DECIMAL(4,2) NOT NULL COMMENT 'Tasa de recargo inicial',
    `finalRateMora` DECIMAL(4,2) NOT NULL COMMENT 'Tasa de recargo final',
    `grace` INT NOT NULL DEFAULT 0 COMMENT 'Días de gracia antes de mora',
    `rate` DECIMAL(4,2) NOT NULL COMMENT 'Tasa de interés',
    `loanId` INT NOT NULL,
    `clientId` INT NOT NULL,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `payments`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `amount` DECIMAL(10,2) NOT NULL,
    `capital` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `interest` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `balanceBefore` DECIMAL(10,2) NOT NULL,
    `balanceAfter` DECIMAL(10,2) NOT NULL,
    `dueAt` DATE NOT NULL,
    `payedAt` DATE NOT NULL,
    `note` VARCHAR(75),
    `walletId` INT NOT NULL,
    `loanId` INT NOT NULL,
    `clientId` INT NOT NULL,
    `lawyerId` INT,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `amortizations`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `date` DATE NOT NULL,
    `cuota` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `capital` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `interest` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `balance` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `status` ENUM('Pendiente','Pagado', 'Cancelado') NOT NULL DEFAULT 'Pendiente', 
    `loanId` INT NOT NULL,
    `clientId` INT NOT NULL,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);


CREATE TABLE `moras`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `initAmount` DECIMAL(10,2) NOT NULL,
    `lateAmount` DECIMAL (10,2) NOT NULL DEFAULT 0,
    `status` ENUM('Cobrada', 'Perdonada') NOT NULL,
    `dueAt` DATE NOT NULL,
    `closedAt` DATE NOT NULL,
    `loanId` INT NOT NULL,
    `clientId` INT NOT NULL,
    `paymentId` INT NOT NULL,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `deletedAt` TIMESTAMP
);

ALTER TABLE `clients` ADD CONSTRAINT `FK_clients_infos` FOREIGN KEY (`infoId`) REFERENCES `infos` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `lawyers` ADD CONSTRAINT `FK_lawyers_infos` FOREIGN KEY (`infoId`) REFERENCES `infos` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `contacts` ADD CONSTRAINT `FK_contacts_infos` FOREIGN KEY (`infoId`) REFERENCES `infos` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `client_contacts` ADD CONSTRAINT `FK_client_contacts_client` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `client_contacts` ADD CONSTRAINT `FK_client_contacts_contact` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `jobs` ADD CONSTRAINT `FK_jobs_clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `jobs` ADD CONSTRAINT `FK_jobs_wallets` FOREIGN KEY (`infoId`) REFERENCES `wallets` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `expenses` ADD CONSTRAINT `FK_expenses_wallets` FOREIGN KEY (`walletId`) REFERENCES `wallets` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `expenses` ADD CONSTRAINT `FK_expenses_lawyers` FOREIGN KEY (`lawyerId`) REFERENCES `lawyers` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `loans` ADD CONSTRAINT `FK_loans_clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `loans` ADD CONSTRAINT `FK_loans_wallets` FOREIGN KEY (`walletId`) REFERENCES `wallets` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `loans` ADD CONSTRAINT `FK_loans_lawyers` FOREIGN KEY (`lawyerId`) REFERENCES `lawyers` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `loans` ADD CONSTRAINT `FK_loans_guarantor` FOREIGN KEY (`guarantorId`) REFERENCES `contacts` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `conditions` ADD CONSTRAINT `FK_conditions_loans` FOREIGN KEY (`loanId`) REFERENCES `loans` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `conditions` ADD CONSTRAINT `FK_conditions_clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `amortizations` ADD CONSTRAINT `FK_amortizations_loans` FOREIGN KEY (`loanId`) REFERENCES `loans` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `amortizations` ADD CONSTRAINT `FK_amortizations_clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `payments` ADD CONSTRAINT `FK_payments_wallets` FOREIGN KEY (`walletId`) REFERENCES `wallets` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `payments` ADD CONSTRAINT `FK_payments_loans` FOREIGN KEY (`loanId`) REFERENCES `loans` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `payments` ADD CONSTRAINT `FK_payments_clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `payments` ADD CONSTRAINT `FK_payments_lawyers` FOREIGN KEY (`lawyerId`) REFERENCES `lawyers` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `moras` ADD CONSTRAINT `FK_moras_loans` FOREIGN KEY (`loanId`) REFERENCES `loans` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `moras` ADD CONSTRAINT `FK_moras_clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `moras` ADD CONSTRAINT `FK_moras_payments` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `socials` ADD CONSTRAINT `FK_clients_socials` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;


CREATE INDEX idx_images_imageableId ON images (imageableId);
CREATE INDEX idx_images_imageableType ON images (imageableType);

CREATE INDEX idx_documents_documentableId ON documents (documentableId);
CREATE INDEX idx_documents_documentableType ON documents (documentableType);

CREATE INDEX idx_clients_infoId ON clients (infoId);
CREATE INDEX idx_clients_code ON clients (code);
CREATE INDEX idx_clients_name ON clients (name);
CREATE INDEX idx_clients_lastname ON clients (lastname);

CREATE INDEX idx_lawyers_infoId ON lawyers (infoId);

CREATE INDEX idx_contacts_infoId ON contacts (infoId);

CREATE INDEX idx_contacts_clientId ON client_contacts (clientId);
CREATE INDEX idx_contacts_contactId ON client_contacts (contactId);

CREATE INDEX idx_jobs_clientId ON jobs (clientId);
CREATE INDEX idx_jobs_infoId ON jobs (infoId);

CREATE INDEX idx_expenses_walletId ON expenses (walletId);
CREATE INDEX idx_expenses_lawyerId ON expenses (lawyerId);

CREATE INDEX idx_loans_clientId ON loans (clientId);
CREATE INDEX idx_loans_lawyerId ON loans (lawyerId);
CREATE INDEX idx_loans_guarantorId ON loans (guarantorId);

CREATE INDEX idx_conditions_loanId ON conditions (loanId);
CREATE INDEX idx_conditions_clientId ON conditions (clientId);

CREATE INDEX idx_amortizations_loanId ON amortizations (loanId);
CREATE INDEX idx_amortizations_clientId ON amortizations (clientId);

CREATE INDEX idx_payments_walletId ON payments (walletId);
CREATE INDEX idx_payments_loanId ON payments (loanId);
CREATE INDEX idx_payments_clientId ON payments (clientId);
CREATE INDEX idx_payments_lawyerId ON payments (lawyerId);

CREATE INDEX idx_moras_loanId ON moras (loanId);
CREATE INDEX idx_moras_clientId ON moras (clientId);
CREATE INDEX idx_moras_paymentId ON moras (paymentId);


DELIMITER //
CREATE TRIGGER IF NOT EXISTS add_code_to_client BEFORE INSERT ON clients FOR EACH ROW BEGIN SET NEW.code = LPAD((SELECT IFNULL(MAX(id), 0) + 1 FROM clients), 5, '0'); END;
//
CREATE TRIGGER IF NOT EXISTS add_code_to_loan BEFORE INSERT ON loans FOR EACH ROW BEGIN SET NEW.code = LPAD((SELECT IFNULL(MAX(id), 0) + 1 FROM loans), 5, '0'); END;
//

DELIMITER ;


TRUNCATE TABLE `preferences`;
INSERT INTO `preferences` (`key`, label, createdBy, updatedBy, value) VALUES 
('initTerm', 'Días de Mora Inicial', 1,1, NULL),
('initRateMora', 'Tasa de Mora Inicial', 1,1, NULL),
('finalRateMora','Tasa de Mora Resto de Días',1,1, NULL),
('loanRate','Tasa de Interés de Préstamos',1,1, NULL),
('loanterm','Plazo de Pago de Préstamos',1,1, NULL),
('loanGrace','Días de Gracia de Pago',1,1, NULL),
('loanPeriodArray','Períodos de Pagos',1,1, '[{"key":"Diario","value":"diario"},{"key":"Semanal","value":"semanal"},{"key":"Quincenal","value":"quincenal"},{"key":"Mensual","value":"mensual"}]' ),
('loanPeriod','Forma de Pago Predeterminada',1,1, NULL),
('capitalCompany','Capital de Trabajo',1,1, 0),
('cargePerSaldo','Cargo Por Saldo Adelantado',1,1, 0), 
('percenToChargePerSaldo','Porcentaje de Préstamo Cargable',1,1, 0),
('companyData','Detalles del negocio',1,1, '{"name":"SIGPRES","longName":"Sistema Integrado Para la Gestión de Préstamos","address":"Located at Word Wide Web","phone":"(809) 000-0000","email":"info@atriontechsd.com","logo":"https://res.cloudinary.com/atriontechsd/image/upload/v1708904993/logo_long_oraqpj.png","rnc":"000-00000-0"}');


TRUNCATE TABLE `wallets`;

INSERT INTO `wallets` (name, balance, createdBy, updatedBy) VALUES
('Efectivo', 0, 1, 1);

SET foreign_key_checks = 1;