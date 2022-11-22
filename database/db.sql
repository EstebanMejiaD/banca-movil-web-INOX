/*
Aquí se estará escribiendo toda la sintaxis de MySQL es decir, vamos a crear las tablas y todo-
el comportamiento de la base de datos. 
*/

CREATE DATABASE database_bank;

USE database_bank;


-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    cedula INT(15) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(60) NOT NULL,
    balance DECIMAL(14.2) DEFAULT 100.3
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;    

-- TRANSACCIONS TABLE
CREATE TABLE transaccion(
    idTransaccion INT(11) NOT NULL,
    id_envia INT(11) NOT NULL,
    id_revibe INT(11) NOT NULL,
    monto INT(15) NOT NULL,
    fecha DATE NOT NULL,
    mensaje VARCHAR(200) NOT NULL,
    emailRecibe VARCHAR(200) NOT NULL,
    emailEnvia VARCHAR(200) NOT NULL,
    CONSTRAINT fk_userE FOREIGN KEY (id_envia) REFERENCES users(id),
    CONSTRAINT fk_userR FOREIGN KEY (id_revibe) REFERENCES users(id)
);

ALTER TABLE transaccion
    ADD PRIMARY KEY (idTransaccion);

ALTER TABLE transaccion
    MODIFY idTransaccion INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE transaccion;   
