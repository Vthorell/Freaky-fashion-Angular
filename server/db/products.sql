CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,  -- Ny SKU-kolumn (unik för varje produkt)
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE NOT NULL,
    brand TEXT NOT NULL
);


INSERT INTO products (name, sku, price, description, image_url, slug, brand) VALUES
('Svart T-shirt', 'TSH-001', 199, 'En klassisk svart t-shirt i mjuk bomull.', '/images/svarttshirt.jpg', 'svart-tshirt', 'Nike'),
('Vit T-shirt', 'TSH-002', 179, 'En stilren vit t-shirt perfekt för alla tillfällen.', '/images/vittshirt.jpg', 'vit-tshirt', 'Adidas'),
('Röd T-shirt', 'TSH-003', 189, 'En snygg röd t-shirt med bekväm passform.', '/images/rödtshirt.jpg', 'rod-tshirt', 'Puma'),
('Blå T-shirt', 'TSH-004', 209, 'Sportig blå t-shirt i funktionsmaterial.', '/images/blåtshirt.jpg', 'bla-tshirt', 'Under Armour'),
('Grön T-shirt', 'TSH-005', 199, 'Ekologisk grön t-shirt av hög kvalitet.', '/images/gröntshirt.jpg', 'gron-tshirt', 'Reebok'),
('Gul T-shirt', 'TSH-006', 169, 'Ljusgul t-shirt som ger energi och glädje.', '/images/gultshirt.jpg', 'gul-tshirt', 'Champion'),
('Grå T-shirt', 'TSH-007', 189, 'Mjuk och bekväm grå t-shirt.', '/images/gråtshirt.jpg', 'gra-tshirt', 'H&M'),
('Brun T-shirt', 'TSH-008', 219, 'Trendig brun t-shirt för en unik stil.', '/images/bruntshirt.jpg', 'brun-tshirt', 'Zara');
