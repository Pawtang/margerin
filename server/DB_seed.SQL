INSERT INTO supplier (supplier_name, contact_name, supplier_phone, supplier_rating)
VALUES('Restaurant Depot', 'Teddy', '5555837463', '4'),
      ('Toys R Us', 'Johnny', '84775778382', '5'),
      ('Military Surplus', 'Johnny', '84775778382', '5'),
      ('Cat Toys Inc', 'Johnny', '84775778382', '5'),
      ('Steel and Aluminum Company', 'Johnny', '84775778382', '5'),
      ('Small Ball Co.', 'Johnny', '84775778382', '5'),
      ('Gidgets, Widgets, and More', 'Johnny', '84775778382', '5');


INSERT INTO product (product_name, product_description, product_image_path, yield)
VALUES('Rio Verde', 'A mild, earthy, spiced blend of fermented jalapenos, garlic, ginger and serranos. A very versatile flavor.', '', '120'),
      ('Hot Like Me', 'A bright, fiery sauce with a forward, peppery fruitiness and a unique fermented flavor.', '', '90'),
      ('Mango Bolero', 'A bold, sweet heat - a simple marriage of fermented mangos and habaneros. Excellent on proteins.', '', '130'),
      ('Hullabalooberry', 'A bold, sweet heat - a simple marriage of fermented mangos and habaneros. Excellent on proteins.', '', '100');
      


INSERT INTO material (material_name, material_description, material_image_path)
VALUES('Habanero Peppers', '', ''), 
      ('Mango', '', ''),
      ('Blueberries', '', ''),
      ('Jalapeno Peppers', '', ''),
      ('Serrano Peppers', ' ', ''),
      ('Arbol Peppers', '', ''),
      ('Ancho Peppers', '', ''), 
      ('Pulla Peppers', '', ''),
      ('Guajillo Peppers', '', ''),
      ('Fresno Peppers', '', ''),
      ('Carrots', '', ''),
      ('Garlic', '', ''),
      ('Ginger', '', ''),
      ('Vinegar', '', ''),
      ('Black Pepper', '', ''),
      ('Allspice', '', ''),
      ('Mustard Seed', '', ''),
      ('Coriander', '', ''),
      ('One Step Sanitizer', '', ''),
      ('Cheesecloth', '', ''),
      ('Label Printing', '', ''),
      ('Gloves', '', ''),
      ('Prep Table', '', ''),
      ('Moritas', '', ''),
      ('Sugar', '', ''),
      ('Salt', '', ''),
      ('Cumin', '', ''),
      ('Catering Kitchen Time', '', ''),
      ('Xanthan Gum', '', '')
      ON CONFLICT DO NOTHING;


INSERT INTO unit (unit_name, unit_type)
VALUES('each', 'each'),
      ('mm', 'length'),
      ('cm', 'length'),
      ('m', 'length'),
      ('in', 'length'),
      ('ft', 'length'),
      ('mi', 'length'),
      ('mm2', 'area'),
      ('cm2', 'area'),
      ('km2', 'area'),
      ('in2', 'area'),
      ('ft2', 'area'),
      ('mg', 'mass'),
      ('g', 'mass'),
      ('kg', 'mass'),
      ('oz', 'mass'),
      ('lb', 'mass'),
      ('mm3', 'volume'),
      ('cm3', 'volume'),
      ('ml', 'volume'),
      ('l', 'volume'),
      ('kl', 'volume'),
      ('m3', 'volume'),
      ('km3', 'volume'),
      ('tsp', 'volume'),
      ('Tbs', 'volume'),
      ('in3', 'volume'),
      ('fl-oz', 'volume'),
      ('cup', 'volume'),
      ('pnt', 'volume'),
      ('qt', 'volume'),
      ('gal', 'volume'),
      ('ft3', 'volume'),
      ('yd3', 'volume'),
      ('ns', 'time'),
      ('ms', 'time'),
      ('s', 'time'),
      ('min', 'time'),
      ('h', 'time'),
      ('d', 'time'),
      ('week', 'time'),
      ('month', 'time'),
      ('year', 'time');

INSERT INTO product_has_material (product_id, material_id, unit_id, quantity)
VALUES('81', '5', '24', '5');
      ('53', '1', '5', '25');

INSERT INTO transaction (supplier_id, material_id, unit_id, cost, quantity)
VALUES('2', '2', '2', '4.30', '3');
