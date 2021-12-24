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
    phone VARCHAR (15),
    rating INT
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
    FOREIGN KEY (supplier_id) REFERENCES supplier (supplier_id),
    FOREIGN KEY (material_id) REFERENCES material (material_id),
    cost MONEY DEFAULT (0)
);
    
CREATE TABLE IF NOT EXISTS product_has_material (
    product_id INT NOT NULL,
    material_id INT NOT NULL,
    unit_id INT NOT NULL,
    CONSTRAINT PK_product_ingredient PRIMARY KEY
    (
        product_id,
        material_id
    ),
    FOREIGN KEY (product_id) REFERENCES product (product_id),
    FOREIGN KEY (material_id) REFERENCES material (material_id),
    FOREIGN KEY (unit_id) REFERENCES unit (unit_id),
    quantity INT
);
    
