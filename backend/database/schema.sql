-- Users table (updated with authentication)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  location TEXT,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
  green_points INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- Waste Collection Centers table
CREATE TABLE IF NOT EXISTS centers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  description TEXT,
  password TEXT NOT NULL,
  operating_hours TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'suspended')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME
);

-- Categories for recyclable items
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT
);

-- Recyclable items
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  condition TEXT CHECK(condition IN ('excellent', 'good', 'fair', 'poor')),
  weight REAL,
  location TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'available' CHECK(status IN ('available', 'pending', 'collected', 'cancelled')),
  points_earned INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  collected_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Pickup requests
CREATE TABLE IF NOT EXISTS pickup_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  center_id INTEGER,
  pickup_address TEXT NOT NULL,
  pickup_date DATE,
  pickup_time TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'completed', 'cancelled')),
  notes TEXT,
  driver_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  accepted_at DATETIME,
  completed_at DATETIME,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (center_id) REFERENCES centers(id) ON DELETE SET NULL
);

-- Transactions (GreenPoints history)
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  item_id INTEGER,
  points INTEGER NOT NULL,
  type TEXT CHECK(type IN ('earned', 'spent', 'bonus', 'penalty')),
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE SET NULL
);

-- Rewards/Products (Eco shop items)
CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  category TEXT,
  is_available BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reward redemptions
CREATE TABLE IF NOT EXISTS redemptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  reward_id INTEGER NOT NULL,
  points_spent INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'delivered', 'cancelled')),
  delivery_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  delivered_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reward_id) REFERENCES rewards(id)
);

-- Insert default categories
INSERT OR IGNORE INTO categories (id, name, description, icon) VALUES 
  (1, 'Хуванцар', 'Лонх, саваа, уут', '♻️'),
  (2, 'Цаас', 'Хуурай цаас, картон', '📄'),
  (3, 'Шил', 'Шилэн лонх, саваа', '🍾'),
  (4, 'Төмөр', 'Лааз, хүдэр, төмөр эд зүйлс', '🔧'),
  (5, 'Органик', 'Хүнсний үлдэгдэл, ногооны хаягдал', '🌱'),
  (6, 'Электроник', 'Компьютер, утас, гар утас', '💻'),
  (7, 'Тавилга', 'Ширээ, сандал, шүүгээ', '🪑'),
  (8, 'Хувцас', 'Хуучин хувцас, гутал', '👕');

-- Insert sample approved center
INSERT OR IGNORE INTO centers (id, name, email, phone, address, latitude, longitude, password, operating_hours, status, approved_at) VALUES 
  (1, 'Green Hub Төв', 'hub@greenswap.mn', '70001234', 'СБД, Барилгачдын талбай', 47.9184, 106.9177, 
   '$2a$10$abcdefghijklmnopqrstuvwxyz123456', '09:00-18:00', 'approved', datetime('now'));

-- Insert sample admin user
INSERT OR IGNORE INTO users (id, username, email, password, role, green_points) VALUES 
  (1, 'admin', 'admin@greenswap.mn', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'admin', 0);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_centers_email ON centers(email);
CREATE INDEX IF NOT EXISTS idx_items_user ON items(user_id);
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);
CREATE INDEX IF NOT EXISTS idx_pickup_status ON pickup_requests(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);