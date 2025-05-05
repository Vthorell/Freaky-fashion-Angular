import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 8080;

const db = new Database('./db/products.db', {
  verbose: console.log,
});

const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

// CORS-inställningar
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "OPTIONS"],
}));

// Lägg detta under dina andra app.use, typiskt efter cors:
app.use('/assets/images', express.static(path.join(__dirname, 'client/src/assets/images')));


// Hjälpfunktion för att skapa slug från produktnamn
const generateSlug = (name) => {
  return name
    .toLowerCase() // Gör om till små bokstäver
    .replace(/\s+/g, '-') // Ersätt alla mellanslag med bindestreck
    .replace(/[^a-z0-9åäö\-]+/g, '') // Ta bort alla icke-alfanumeriska tecken förutom bindestreck
    .replace(/(^-|-$)/g, ''); // Ta bort eventuella bindestreck i början och slutet
};

// Hämtar alla produkter
app.get('/api/products', (req, res) => {
  const select = db.prepare(`
    SELECT id,
           name,
           description,
           image_url,
           slug,
           price,
           brand,
           sku
      FROM products
  `);
  
  const products = select.all();

  res.json(products);
});

// Lägg till en ny produkt
app.post('/api/products', (req, res) => {
  const { name, description, image_url, brand, sku, price } = req.body;

  if (!name || !description || !image_url || !brand || !sku || !price) {
    return res.status(400).json({ error: "Alla fält måste fyllas i" });
  }

  // Generera slug baserat på produktens namn
  const slug = generateSlug(name);

  try {
    const insert = db.prepare(`
      INSERT INTO products (name, description, image_url, brand, sku, price, slug)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(name, description, image_url, brand, sku, price, slug);

    const newProduct = {
      id: result.lastInsertRowid,
      name,
      description,
      image_url,
      brand,
      sku,
      price,
      slug
    };

    res.status(201).json(newProduct); // Skicka tillbaka den nyinlagda produkten som svar
  } catch (error) {
    console.error("Fel vid tillägg av produkt:", error);  // Logga felet
    res.status(500).json({ error: "Något gick fel på servern" });
  }
});

app.get('/api/products/search', (req, res) => {
    const searchTerm = req.query.term;
    
    if (!searchTerm) {
      return res.status(400).json({ error: "Sökterm krävs" });
    }
    
    try {
        const select = db.prepare(`
            SELECT id, name, description, image_url, slug, price, brand, sku
            FROM products
            WHERE LOWER(name) LIKE LOWER(?) 
               OR LOWER(description) LIKE LOWER(?) 
               OR LOWER(brand) LIKE LOWER(?)
          `);          
      
      const searchPattern = `%${searchTerm}%`;
      const products = select.all(searchPattern, searchPattern, searchPattern);
      
      res.json(products);
    } catch (error) {
      console.error("Fel vid sökning av produkter:", error);
      res.status(500).json({ error: "Något gick fel på servern" });
    }
  });

// Hämtar en produkt baserat på slug
app.get('/api/products/:slug', (req, res) => {
    const { slug } = req.params;
  
    const select = db.prepare(`
      SELECT id,
             name,
             description,
             image_url,
             slug,
             price,
             brand,
             sku
        FROM products
       WHERE slug = ?
    `);
  
    const product = select.get(slug);  // Hämta en enskild produkt baserat på slug
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produkt inte hittad' });
    }
  });

  // Hämtar 3 slumpmässiga produkter som inte är samma som slug
app.get('/api/products/:slug/related', (req, res) => {
  const { slug } = req.params;

  const select = db.prepare(`
    SELECT id, name, description, image_url, slug, price, brand, sku
    FROM products
    WHERE slug != ?
    ORDER BY RANDOM()
    LIMIT 3
  `);

  try {
    const related = select.all(slug);
    res.json(related);
  } catch (error) {
    console.error('Fel vid hämtning av relaterade produkter:', error);
    res.status(500).json({ error: 'Serverfel vid relaterade produkter' });
  }
});


app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});
