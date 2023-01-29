CREATE DATABASE margerin;

\c margerin

CREATE TABLE IF NOT EXISTS product (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR (100) UNIQUE NOT NULL,
    product_description VARCHAR,
    product_image_path VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS material (
    material_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    material_name VARCHAR (100) UNIQUE NOT NULL,
    material_description VARCHAR,
    material_image_path VARCHAR (100)
);
    
CREATE TABLE IF NOT EXISTS supplier (
    supplier_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_name VARCHAR (100) NOT NULL,
    contact_name VARCHAR (100),
    supplier_phone VARCHAR (15),
    supplier_rating INT
);

CREATE TABLE IF NOT EXISTS unit (
    unit_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    unit_name VARCHAR(10),
    unit_type VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS transaction (
    transaction_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_id integer NOT NULL,
    material_id integer NOT NULL,
    unit_id INT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES supplier (supplier_id),
    FOREIGN KEY (material_id) REFERENCES material (material_id),
    FOREIGN KEY (unit_id) REFERENCES unit (unit_id),
    cost MONEY DEFAULT (0),
    quantity INT,
    transaction_date date DEFAULT CURRENT_DATE
);
    
CREATE TABLE IF NOT EXISTS product_has_material (
    product_id INT NOT NULL,
    material_id INT NOT NULL,
    unit_id INT NOT NULL,
    CONSTRAINT PK_product_ingredient PRIMARY KEY
    (
        product_id,
        material_id,
        unit_id --Need to be able to add materials with multiple unit types. This is how average will be calc back end for material.
    ),
    FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE, 
    FOREIGN KEY (material_id) REFERENCES material (material_id),
    FOREIGN KEY (unit_id) REFERENCES unit (unit_id),
    quantity INT
);
    
    
    -- Alterations

    -- 1/8/21 instantiate serial key instead of wide natural key for easier manipulation of records on front end
ALTER TABLE product_has_material 
    DROP CONSTRAINT PK_product_ingredient,
    ADD phm_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ADD CONSTRAINT material_uniqueness UNIQUE (product_id, material_id, unit_id)
;

-- 1/11/22 Add support for batching and yield counts
ALTER TABLE product_has_material ADD is_per_unit BOOLEAN;
ALTER TABLE product ADD yield INTEGER;
-- 1/12/22 Add product sales cost
ALTER TABLE product ADD price MONEY;
--1/15/22
ALTER TABLE product ALTER COLUMN price TYPE decimal(12,2);
ALTER TABLE product ALTER COLUMN price SET DEFAULT 0;
ALTER TABLE product ALTER COLUMN yield SET DEFAULT 1;
-- 1/22/22 need to support fractional quantities and supplier name uniqueness
ALTER TABLE transaction ALTER COLUMN quantity TYPE decimal(12,3);
ALTER TABLE product_has_material ALTER COLUMN quantity TYPE decimal(12,3);
ALTER TABLE supplier ADD CONSTRAINT name_uniqueness UNIQUE (supplier_name);
-- 1/31/22 no reason to use money type, it confuses the front end
ALTER TABLE transaction ALTER COLUMN cost TYPE decimal(12,2);

--2/12/22 Create users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(200) UNIQUE NOT NULL,
    hash VARCHAR(200) NOT NULL
);
-- 2/18/22
ALTER TABLE product ADD CONSTRAINT name_uniqueness UNIQUE (supplier_name);
--3/8/2022

ALTER TABLE product ADD userID INT;
ALTER TABLE product_has_material ADD userID INT;
ALTER TABLE supplier ADD userID INT;
ALTER TABLE material ADD userID INT;
ALTER TABLE transaction ADD userID INT;

--4/7/22
CREATE TABLE IF NOT EXISTS web_sessions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userid INTEGER,
    FOREIGN KEY (userid) REFERENCES users (id),
    token VARCHAR(200) UNIQUE NOT NULL
);
--4/15/22
ALTER TABLE users ADD username VARCHAR(200);

--11/22/22
ALTER TABLE product DROP CONSTRAINT product_product_name_key;

ALTER TABLE product ADD CONSTRAINT product_uniqueness_by_id UNIQUE (product_name, userid);