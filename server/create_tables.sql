CREATE DATABASE db;

CREATE TABLE IF NOT EXISTS public.product (
    product_id serial PRIMARY KEY NOT NULL,
    product_name VARCHAR (100) UNIQUE NOT NULL,
    cost MONEY DEFAULT 0,
);

CREATE TABLE IF NOT EXISTS public.ingredient (
    ingredient_id INT PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    ingredient_name VARCHAR (100) NOT NULL,
    unit VARCHAR (50) NOT NULL,
    cost_per_unit MONEY DEFAULT 0,
    FOREIGN KEY (supplier) REFERENCES db.supplier (supplier_id)
);
    
CREATE TABLE IF NOT EXISTS public.supplier (
    supplier_id INT PRIMARY KEY IDENTITY (1, 1),
    supplier_name VARCHAR (100) NOT NULL,
    contact_name VARCHAR (100),
    phone VARCHAR (15),
    rating TINYINT,
);
    
CREATE TABLE IF NOT EXISTS public.product_has_ingredient (
    product_id INT NOT NULL
    ingredient_id INT NOT NULL
    CONSTRAINT PK_product_ingredient PRIMARY KEY
    (
        product_id,
        ingredient_id
    )
    FOREIGN KEY (product_id) REFERENCES product (product_id)
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (ingredient_id)
    quantity 
);
    
CREATE TABLE IF NOT EXISTS public.unit (
    unit_id INT PRIMARY KEY IDENTITY (1, 1),
    unit VARCHAR (100) NOT NULL,
);