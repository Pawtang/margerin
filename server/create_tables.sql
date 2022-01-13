CREATE DATABASE margerin;

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

-- 1/11/21 Add support for batching and yield counts
ALTER TABLE product_has_material ADD is_per_unit BOOLEAN;
ALTER TABLE product ADD yield INTEGER;