import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./greenswap.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Database initialization
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(
      /*sql*/`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      green_points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Collection centers table
    db.run(
      /*sql*/`CREATE TABLE IF NOT EXISTS collection_centers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      phone TEXT,
      working_hours TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Waste categories table
    db.run(
      /*sql*/`CREATE TABLE IF NOT EXISTS waste_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      points_per_kg INTEGER NOT NULL,
      description TEXT,
      icon TEXT
    )`);

    // Recycling submissions table
    db.run(
      /*sql*/`CREATE TABLE IF NOT EXISTS recycling_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      waste_category_id INTEGER NOT NULL,
      weight_kg REAL NOT NULL,
      method TEXT NOT NULL, -- 'drop-off' or 'pickup'
      collection_center_id INTEGER,
      pickup_address TEXT,
      pickup_date DATE,
      status TEXT DEFAULT 'pending', -- pending, completed, cancelled
      points_earned INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (waste_category_id) REFERENCES waste_categories(id),
      FOREIGN KEY (collection_center_id) REFERENCES collection_centers(id)
    )`);

    // Products table (recyclable products shop)
    db.run(
      /*sql*/`CREATE TABLE IF NOT EXISTS products (
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
    db.run(
      /*sql*/`CREATE TABLE IF NOT EXISTS orders (
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

    // Insert sample data
    insertSampleData();
  });
}

function insertSampleData() {
  // Sample waste categories
  const categories = [
    ['Цаас', 50, 'Сонин, картон, цаасан савлагаа', '📄'],
    ['Хуванцар', 75, 'PET лонх, хуванцар сав', '♻️'],
    ['Шил', 60, 'Шилэн лонх, сав', '🍾'],
    ['Төмөр', 100, 'Төмөр лааз, хүрэл эд зүйлс', '🔩'],
    ['Электрон хог', 150, 'Утас, компьютер, цахилгаан хэрэгсэл', '💻'],
    ['Органик', 30, 'Хүнсний үлдэгдэл, ногоон хог', '🌿']
  ];

  categories.forEach(cat => {
    db.run(`INSERT OR IGNORE INTO waste_categories (name, points_per_kg, description, icon) 
            VALUES (?, ?, ?, ?)`, cat);
  });

  // Sample collection centers
  const centers = [
    ['Улаанбаатар Төв Цэг', 'Сүхбаатар дүүрэг, 1-р хороо', 47.9186, 106.9178, '976-11-123456', '09:00-18:00'],
    ['Баянзүрх Цэг', 'Баянзүрх дүүрэг, 5-р хороо', 47.9090, 106.9391, '976-11-234567', '08:00-17:00'],
    ['Чингэлтэй Цэг', 'Чингэлтэй дүүрэг, 3-р хороо', 47.9256, 106.9204, '976-11-345678', '09:00-18:00']
  ];

  centers.forEach(center => {
    db.run(`INSERT OR IGNORE INTO collection_centers (name, address, latitude, longitude, phone, working_hours) 
            VALUES (?, ?, ?, ?, ?, ?)`, center);
  });

  // Sample products
  const products = [
    ['Дахин боловсруулсан цаасан уут', 'Байгаль орчинд ээлтэй цаасан уут 10 ширхэг', 200, '🛍️', 100, 'Савлагаа'],
    ['Eco-friendly усны лонх', 'Дахин ашиглах боломжтой усны лонх', 500, '🍶', 50, 'Хэрэглээ'],
    ['Органик бордоо 5кг', 'Органик хог боловсруулсан бордоо', 800, '🌱', 30, 'Цэцэрлэг'],
    ['Дахин боловсруулсан самбар', 'Хуванцараас үйлдсэн самбар', 1500, '📋', 20, 'Хэрэгсэл']
  ];

  products.forEach(prod => {
    db.run(`INSERT OR IGNORE INTO products (name, description, price_points, image_url, stock, category) 
            VALUES (?, ?, ?, ?, ?, ?)`, prod);
  });
}

export default db;