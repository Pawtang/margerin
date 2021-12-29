INSERT INTO supplier (supplier_name, contact_name, supplier_phone, supplier_rating)
VALUES('Restaurant Depot', 'Teddy', '5555837463', '4'),
      ('Toys R Us', 'Johnny', '84775778382', '5');


INSERT INTO product (product_name, product_description, product_image_path)
VALUES('Rio Verde', 'A mild, earthy, spiced blend of fermented jalapenos, garlic, ginger and serranos. A very versatile flavor.', ''),
      ('Hot Like Me', 'A bright, fiery sauce with a forward, peppery fruitiness and a unique fermented flavor.', ''),
      ('Mango Bolero', 'A bold, sweet heat - a simple marriage of fermented mangos and habaneros. Excellent on proteins.', ''),
      ('Hullabalooberry', 'A bold, sweet heat - a simple marriage of fermented mangos and habaneros. Excellent on proteins.', ''),
      ('M1 Abrams Tank', 'The M1 Abrams is a third-generation American main battle tank designed by Chrysler Defense (now General Dynamics Land Systems)[9] and named for General Creighton Abrams.', ''), 
      ('B-52 Bomber', 'The Boeing B-52 Stratofortress is an American long-range, subsonic, jet-powered strategic bomber. The B-52 was designed and built by Boeing, which has continued to provide support and upgrades. ', ''),
      ('Lagunitas Stereohopic IPA', 'An experimental series focusing on two hops at a time. Taste what happens when the almighty Citra hop synthesizes with New Zealand''s newest star, the mouth-smackingly stellar Nectaron.', ''),
      ('Ben Dibuz', 'I am a mechanical engineer studying web development, python, data analytics, algorithms and data visualization in my free time, working to pivot into a role where I can apply more of these skills. You can learn more about me on my LinkedIn page. You can read some of my overly-earnest writing on my Wordpress, Follow the Yarn.', ''),
      ('iPhone 13', 'Our most advanced dual‑camera system ever.', ''),
      ('Two Front Teeth', 'Literally just two teeth', ''),
      ('Special Keyboard', 'I was clearly a bit tipsy when I wrote these and I still am now', ''),
      ('Glow in the Dark Anus', 'Its like your regular asshole, but it glows in the dark', ''),
      ('Expensive Doormat', 'Tired of cheap ass door mats? Buy this expensive one.', '');
      


INSERT INTO material (material_name, material_description, material_image_path)
VALUES('Scrap Metal', '', ''), 
      ('Hops', '', ''),
      ('Aluminum', '', ''),
      ('Silicon', '', ''),
      ('Water', '', ''),
      ('Enamel', '', ''),
      ('Keratin', '', ''),
      ('Anus', '', '');

INSERT INTO unit (unit_name, unit_type)
VALUES('mm', 'length'),
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
