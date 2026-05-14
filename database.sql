-- Script de creación de base de datos y registros iniciales
-- Use este script si prefiere no usar 'npm run db:setup'

CREATE DATABASE IF NOT EXISTS ifx_vms;
USE ifx_vms;

CREATE TABLE IF NOT EXISTS vms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    os ENUM('Windows', 'Linux', 'Ubuntu') NOT NULL,
    ramGb INT NOT NULL,
    cpuCores INT NOT NULL,
    diskGb INT NOT NULL,
    status ENUM('Running', 'Stopped', 'Creating') NOT NULL,
    createdAt DATETIME NOT NULL
);

-- Insertar 5 registros iniciales
INSERT INTO vms (id, name, os, ramGb, cpuCores, diskGb, status, createdAt) VALUES 
('1', 'Prod-Web-Server', 'Ubuntu', 16, 4, 100, 'Running', NOW()),
('2', 'Dev-DB-Ubuntu', 'Ubuntu', 8, 2, 50, 'Stopped', NOW()),
('3', 'Win-Legacy-App', 'Windows', 32, 8, 500, 'Running', NOW()),
('4', 'Linux-Batch-Worker', 'Linux', 4, 2, 20, 'Creating', NOW()),
('5', 'Ubuntu-Test-Bench', 'Ubuntu', 8, 4, 80, 'Running', NOW());
