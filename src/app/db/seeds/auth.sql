TRUNCATE TABLE `roles`;
TRUNCATE TABLE `permissions`;
TRUNCATE TABLE `auths`;
TRUNCATE TABLE `tenants`;
TRUNCATE TABLE `auth_tenants`;

INSERT INTO `roles` (name) VALUES
('Superadmin'), ('Admin');

INSERT INTO `permissions`(name) VALUES
('Asignar Permiso a Usuario'),
('Asignar Permiso a Rol'),
('Obtener Firma Cloudinary'),
('Crear Rol'), 
('Crear Permisos'),
('Asignar Rol a Usuario'),
('Verificar Usuario'),
('Crear Base de Datos'),
('Asignar Base de Datos'),
('Crear Imágenes'),
('Ver Imágenes'),
('Eliminar Imágenes'),
('Guardar Preferencia'),
('Obtener Preferencia'),
('Crear Inquilinos'),
('Ver Inquilinos'),
('Modificar Inquilinos')
;

INSERT INTO `auths` (email, password, username, name, lastname, verifiedAt)
VALUES
('admin@atriontechsd.com','$2a$10$uR9yGrtV2MJLZwbjOpA49eZRHoRp5j/tN8kZ4gQY57pAwzeyMSYau', 'icontreras','Ismael','Contreras', '2024-01-01 12:00:01'),
('user1@example.com', '$2a$10$sOhAGjEUAIGVSVffACk3POMbIzkDorKX3imNeCFndiJQMCx7elimK', 'user1', "User","One", '2024-01-01 12:00:01');

INSERT INTO `tenants` (name, `key`) VALUES ('Base de Datos Administrador','sigpres_main_tenant');

INSERT INTO `auth_roles` (authId, roleId) VALUES (1,1);

INSERT INTO `model_permissions` (permissionId, modelId, modelType) VALUES (1,1, 'auth'),(2,1, 'auth');