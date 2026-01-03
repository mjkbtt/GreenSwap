import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(
  join(__dirname, '..', 'greenswap.db'),
  (err) => {
    if (err) {
      console.error('❌ Database холболт амжилтгүй:', err);
    } else {
      console.log('✅ SQLite database-д холбогдлоо');
      initializeDatabase();
    }
  }
);

function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      green_points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Collection centers table
    db.run(`CREATE TABLE IF NOT EXISTS collection_centers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      district TEXT,
      location TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      phone TEXT,
      working_hours TEXT,
      type TEXT,
      total_collected_kg INTEGER DEFAULT 0,
      active_users INTEGER DEFAULT 0,
      rating REAL DEFAULT 5.0,
      price_per_kg REAL DEFAULT 50,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Waste categories table
    db.run(`CREATE TABLE IF NOT EXISTS waste_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      points_per_kg INTEGER NOT NULL,
      description TEXT,
      icon TEXT
    )`);

    // Recycling submissions table
    db.run(`CREATE TABLE IF NOT EXISTS recycling_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      waste_category_id INTEGER NOT NULL,
      weight_kg REAL NOT NULL,
      method TEXT NOT NULL,
      collection_center_id INTEGER,
      pickup_address TEXT,
      pickup_date DATE,
      status TEXT DEFAULT 'pending',
      points_earned INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (waste_category_id) REFERENCES waste_categories(id),
      FOREIGN KEY (collection_center_id) REFERENCES collection_centers(id)
    )`);

    // Products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price_points INTEGER NOT NULL,
      image_url TEXT,
      stock INTEGER DEFAULT 0,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      total_points INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`);

    // Sample data оруулах
    insertSampleData();
  });
}

function insertSampleData() {
  // Waste categories
  const categories = [
    ['Цаас', 50, 'Сонин, картон, цаасан савлагаа', '📄'],
    ['Хуванцар', 75, 'PET лонх, хуванцар сав', '♻️'],
    ['Шил', 60, 'Шилэн лонх, сав', '🍾'],
    ['Төмөр', 100, 'Төмөр лааз, хүрэл эд зүйлс', '🔩'],
    ['Электрон хог', 150, 'Утас, компьютер, цахилгаан хэрэгсэл', '💻'],
    ['Органик', 30, 'Хүнсний үлдэгдэл, ногоон хог', '🌿']
  ];

  const insertCategory = db.prepare(
    `INSERT OR IGNORE INTO waste_categories (name, points_per_kg, description, icon) 
     VALUES (?, ?, ?, ?)`
  );

  categories.forEach(cat => insertCategory.run(cat));
  insertCategory.finalize();

  // Collection centers
  const centers = [
    [
      'Улаанбаатар Төв Цэг',
      'Сүхбаатар дүүрэг, 1-р хороо',
      'СБД',
      'Сүхбаатар дүүргийн төв',
      47.9186,
      106.9178,
      '976-11-123456',
      '09:00-18:00',
      'Plastic,Paper,Metal',
      5000,
      120,
      4.8,
      50
    ],
    [
      'Баянзүрх Цэг',
      'Баянзүрх дүүрэг, 5-р хороо',
      'БЗД',
      'Баянзүрх дүүргийн төв',
      47.9090,
      106.9391,
      '976-11-234567',
      '08:00-17:00',
      'Plastic,Paper',
      3000,
      80,
      4.5,
      45
    ],
    [
      'Чингэлтэй Цэг',
      'Чингэлтэй дүүрэг, 3-р хороо',
      'ЧД',
      'Чингэлтэй дүүргийн төв',
      47.9256,
      106.9204,
      '976-11-345678',
      '09:00-18:00',
      'Plastic,Paper,Metal,Glass',
      7000,
      150,
      4.9,
      55
    ],
    [
      'Хан-Уул Цэг',
      'Хан-Уул дүүрэг, 2-р хороо',
      'ХУД',
      'Хан-Уул дүүргийн төв',
      47.8925,
      106.9536,
      '976-11-456789',
      '09:00-17:00',
      'Plastic,Glass',
      2500,
      60,
      4.3,
      48
    ],
    [
      'Сонгинохайрхан Цэг',
      'Сонгинохайрхан дүүрэг, 4-р хороо',
      'СХД',
      'Сонгинохайрхан дүүргийн төв',
      47.9142,
      106.8551,
      '976-11-567890',
      '08:30-18:30',
      'Plastic,Paper,Metal',
      4200,
      95,
      4.6,
      52
    ]
  ];

  const insertCenter = db.prepare(
    `INSERT OR IGNORE INTO collection_centers 
     (name, address, district, location, latitude, longitude, phone, working_hours, type, 
      total_collected_kg, active_users, rating, price_per_kg) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  centers.forEach(center => insertCenter.run(center));
  insertCenter.finalize();

  // Products
  const products = [
    ['Дахин боловсруулсан цаасан уут', 'Байгаль орчинд ээлтэй цаасан уут 10 ширхэг', 200, '🛍️', 100, 'Савлагаа'],
    ['Eco-friendly усны лонх', 'Дахин ашиглах боломжтой усны лонх', 500, '🍶', 50, 'Хэрэглээ'],
    ['Органик бордоо 5кг', 'Органик хог боловсруулсан бордоо', 800, '🌱', 30, 'Цэцэрлэг'],
    ['Дахин боловсруулсан самбар', 'Хуванцараас үйлдсэн самбар', 1500, '📋', 20, 'Хэрэгсэл']
  ];

  const insertProduct = db.prepare(
    `INSERT OR IGNORE INTO products (name, description, price_points, image_url, stock, category) 
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  products.forEach(prod => insertProduct.run(prod));
  insertProduct.finalize();

  console.log('✅ Sample data амжилттай орууллаа');
}

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('❌ Database хаахад алдаа:', err.message);
    } else {
      console.log('✅ Database холболт хаагдлаа');
    }
    process.exit(0);
  });
});

export default db;