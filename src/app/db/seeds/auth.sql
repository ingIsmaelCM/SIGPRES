TRUNCATE TABLE `roles`;
TRUNCATE TABLE `permissions`;
TRUNCATE TABLE `auths`;
TRUNCATE TABLE `tenants`;
TRUNCATE TABLE `auth_tenants`;
TRUNCATE TABLE `model_permissions`;

INSERT INTO `roles` (name) VALUES
('Superadmin'), ('Admin');


INSERT INTO `permissions` (name) VALUES
('Crear Rol'),
('Asignar Permiso a Rol'),
('Crear Permisos'),
('Asignar Rol a Usuario'),
('Asignar Permiso a Usuario'),
('Obtener Firma Cloudinary'),
('Verificar Usuario'),
('Crear Base de Datos'),
('Asignar Base de Datos'),
('Obtener Base de Datos'),
('Crear Inquilinos'),
('Ver Inquilinos'),
('Modificar Inquilinos'),
('Ver Imágenes'),
('Crear Imágenes'),
('Eliminar Imágenes'),
('Guardar Preferencia'),
('Obtener Preferencia'),
('Crear Clientes'),
('Ver Clientes'),
('Editar Clientes'),
('Eliminar Clientes'),
('Crear Préstamos'),
('Editar Préstamos'),
('Eliminar Préstamos'),
('Ver Préstamos'),
('Aprobar Préstamos'),
('Rechazar Préstamos'),
('Crear Contactos'),
('Asignar Contactos'),
('Ver Contactos'),
('Editar Contactos'),
('Eliminar Contactos'),
('Crear Datos Laborales'),
('Editar Datos Laborales'),
('Eliminar Datos Laborales'),
('Ver Datos Laborales'),
('Crear Documentos de Clientes'),
('Ver Documentos de Clientes'),
('Editar Documentos de Clientes'),
('Eliminar Documentos de Clientes'),
('Ver Reportes de Clientes'),
('Enviar Mensajes'),
('Crear Amortizaciones'),
('Ver Amortizaciones'),
('Editar Amortizaciones'),
('Eliminar Amortizaciones'),
('Crear Abogados'),
('Ver Abogados'),
('Editar Abogados'),
('Eliminar Abogados'),
('Asignar Abogado a Préstamos'),
('Asignar Abogado a Pagos'),
('Generar Contrato'),
('Asignar Condiciones de Morosidad'),
('Reestructurar Préstamos'),
('Registrar Garantías'),
('Ver Reportes de Préstamos'),
('Crear Pagos'),
('Ver Pagos'),
('Editar Pagos'),
('Eliminar Pagos'),
('Ver Reportes de Pagos'),
('Personalizar Pagos'),
('Establecer Honorarios de Abogado'),
('Crear Gastos'),
('Ver Gastos'),
('Editar Gastos'),
('Eliminar Gastos'),
('Ver Reportes de Gastos'),
('Crear Métodos de Pago'),
('Ver Métodos de Pago'),
('Editar Métodos de Pago'),
('Eliminar Métodos de Pago');

INSERT INTO `auths` (email, password, username, name, lastname, verifiedAt)
VALUES
('developer@ismaelcm.dev','$2a$10$uR9yGrtV2MJLZwbjOpA49eZRHoRp5j/tN8kZ4gQY57pAwzeyMSYau', 'icontreras','Ismael','Contreras', '2024-01-01 12:00:01'),
('user1@example.com', '$2a$10$sOhAGjEUAIGVSVffACk3POMbIzkDorKX3imNeCFndiJQMCx7elimK', 'user1', "User","One", '2024-01-01 12:00:01');

INSERT INTO `tenants` (name, `key`) VALUES ('Base de Datos Administrador','sigpres_main_tenant');

INSERT INTO `auth_roles` (authId, roleId) VALUES (1,1);

INSERT INTO `model_permissions` (permissionId, modelId, modelType) VALUES (1,1, 'auth'),(2,1, 'auth');