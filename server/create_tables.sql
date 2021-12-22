CREATE DATABASE margerin;

CREATE TABLE IF NOT EXISTS public.product (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR (100) UNIQUE NOT NULL,
    product_description VARCHAR (255),
    product_image_path VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS public.material (
    material_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    material_name VARCHAR (100) NOT NULL,
    material_description VARCHAR (255),
    material_image_path VARCHAR (100)
);
    
CREATE TABLE IF NOT EXISTS public.supplier (
    supplier_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_name VARCHAR (100) NOT NULL,
    contact_name VARCHAR (100),
    phone VARCHAR (15),
    rating TINYINT,
);
    
CREATE TABLE IF NOT EXISTS public.product_has_ingredient (
    product_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    CONSTRAINT PK_product_ingredient PRIMARY KEY,
    (
        product_id,
        ingredient_id
    )
    FOREIGN KEY (product_id) REFERENCES product (product_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (ingredient_id),
    quantity 
);
    
CREATE TABLE IF NOT EXISTS public.unit (
    unit_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    unit VARCHAR (100) NOT NULL,
);

CREATE TABLE IF NOT EXISTS public.transaction (
    transaction_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_id integer NOT NULL,
    material_id integer NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES supplier (supplier_id),
    FOREIGN KEY (material_id) REFERENCES material (material_id),
    cost MONEY DEFAULT (0)

);