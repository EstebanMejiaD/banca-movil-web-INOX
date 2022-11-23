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

---alter table user
ALTER TABLE users add codigo int(6) null
after balance;



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


ALTER TABLE transaccion add fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
after monto;

ALTER TABLE transaccion
    ADD PRIMARY KEY (idTransaccion);

ALTER TABLE transaccion
    MODIFY idTransaccion INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE transaccion;   


-- mensage TABLE
CREATE TABLE mensaje(
    idMensaje INT(11) NOT NULL,
    id_enviaMensaje INT(11) NOT NULL,
    id_revibeMensaje INT(11) NOT NULL,
    monto INT(15) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mensaje VARCHAR(200) NOT NULL,
    emailRecibeMensaje VARCHAR(200) NOT NULL,
    emailEnviaMensaje VARCHAR(200) NOT NULL,
    CONSTRAINT fk_userEM FOREIGN KEY (id_enviaMensaje) REFERENCES users(id),
    CONSTRAINT fk_userRM FOREIGN KEY (id_revibeMensaje) REFERENCES users(id)
);

ALTER TABLE mensaje
    ADD PRIMARY KEY (idMensaje);

ALTER TABLE mensaje
    MODIFY idMensaje INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE mensaje;   



CREATE TABLE retirar(
    idretiro INT(11) NOT NULL,
    id_retira INT(11) NOT NULL,
    monto INT(15) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    emailRetira VARCHAR(200) NOT NULL,
    codigoRetiro INT(6) NOT NULL,
    CONSTRAINT fk_userRetira FOREIGN KEY (id_retira) REFERENCES users(id)
);


ALTER TABLE retirar
    ADD PRIMARY KEY (idretiro);

ALTER TABLE retirar
    MODIFY idretiro INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;



CREATE TABLE c_favoritos(
    idFavoritos INT(11) NOT NULL,
    imagen INT(15) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) DEFAULT 0.00,
    porcentaje DECIMAL(10,2) DEFAULT 0.00
);

ALTER TABLE c_favoritos
    ADD PRIMARY KEY (idFavoritos);

INSERT INTO `c_favoritos` (`idFavoritos`, `imagen`, `nombre`, `precio`, `porcentaje`) VALUES
(1, '1.png', 'Bitcoin', '19323.2', '-3.2%'),
(2, '2.png', 'Euro', '0.96', '+1.2%'),
(3, '3.png', 'Lithcoin', '2.43', '-5.3%'),
(4, '4.png', 'Solana', '699.92', '+3.5%');

CREATE TABLE listfav(
    idListFavoritos INT(11) NOT NULL,
    imagen INT(15) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) DEFAULT 0.00,
    porcentaje DECIMAL(10,2) DEFAULT 0.00,
    id_lisUser INT(11) NOT NULL,
    CONSTRAINT fk_userlf FOREIGN KEY (id_lisUser) REFERENCES users(id)
);

ALTER TABLE listfav
    ADD PRIMARY KEY (idListFavoritos);

    ALTER TABLE listfav
    MODIFY idListFavoritos INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;