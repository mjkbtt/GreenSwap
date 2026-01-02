import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './database/db.js';

// 🔹 ENV эхэлж уншина
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('frontend'));

// ======================
// AUTH
// ======================

// Register
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'User already exists' });
      }
      res.json({
        id: this.lastID,
        username,
        email,
        green_points: 0
      });
    }
  );
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    'SELECT id, username, email, green_points FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json(user);
    }
  );
});

// ======================
// USERS
// ======================

app.get('/api/user/:id', (req, res) => {
  db.get(
    'SELECT id, username, email, green_points FROM users WHERE id = ?',
    [req.params.id],
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    }
  );
});

// ======================
// DATA
// ======================

app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM waste_categories', [], (err, categories) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(categories);
  });
});

app.get('/api/tseguud', (req, res) => {
  res.json({ message: 'Tseguud API works' });
});

// ======================
// RECYCLE
// ======================

app.post('/api/recycle', (req, res) => {
  const {
    user_id,
    waste_category_id,
    weight_kg,
    method,
    collection_center_id,
    pickup_address,
    pickup_date
  } = req.body;

  db.get(
    'SELECT points_per_kg FROM waste_categories WHERE id = ?',
    [waste_category_id],
    (err, category) => {
      if (err || !category) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      const points_earned = Math.floor(weight_kg * category.points_per_kg);

      db.run(
        `INSERT INTO recycling_submissions
         (user_id, waste_category_id, weight_kg, method, collection_center_id,
          pickup_address, pickup_date, points_earned, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'completed')`,
        [
          user_id,
          waste_category_id,
          weight_kg,
          method,
          collection_center_id,
          pickup_address,
          pickup_date,
          points_earned
        ],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          db.run(
            'UPDATE users SET green_points = green_points + ? WHERE id = ?',
            [points_earned, user_id]
          );

          res.json({
            id: this.lastID,
            points_earned,
            status: 'completed'
          });
        }
      );
    }
  );
});

// ======================
// HISTORY
// ======================

app.get('/api/user/:id/history', (req, res) => {
  db.all(
    `SELECT rs.*, wc.name AS category_name, wc.icon,
            cc.name AS center_name
     FROM recycling_submissions rs
     LEFT JOIN waste_categories wc ON rs.waste_category_id = wc.id
     LEFT JOIN collection_centers cc ON rs.collection_center_id = cc.id
     WHERE rs.user_id = ?
     ORDER BY rs.created_at DESC`,
    [req.params.id],
    (err, history) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(history);
    }
  );
});

// ======================
// PRODUCTS
// ======================

app.get('/api/products', (req, res) => {
  db.all(
    'SELECT * FROM products WHERE stock > 0',
    [],
    (err, products) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(products);
    }
  );
});

app.post('/api/purchase', (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  db.get(
    'SELECT * FROM products WHERE id = ?',
    [product_id],
    (err, product) => {
      if (err || !product)
        return res.status(404).json({ error: 'Product not found' });

      if (product.stock < quantity)
        return res.status(400).json({ error: 'Insufficient stock' });

      const total_points = product.price_points * quantity;

      db.get(
        'SELECT green_points FROM users WHERE id = ?',
        [user_id],
        (err, user) => {
          if (err || !user)
            return res.status(404).json({ error: 'User not found' });

          if (user.green_points < total_points)
            return res.status(400).json({ error: 'Insufficient points' });

          db.run(
            `INSERT INTO orders
             (user_id, product_id, quantity, total_points, status)
             VALUES (?, ?, ?, ?, 'completed')`,
            [user_id, product_id, quantity, total_points],
            function (err) {
              if (err)
                return res.status(500).json({ error: err.message });

              db.run(
                'UPDATE users SET green_points = green_points - ? WHERE id = ?',
                [total_points, user_id]
              );
              db.run(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [quantity, product_id]
              );

              res.json({
                order_id: this.lastID,
                total_points,
                status: 'completed'
              });
            }
          );
        }
      );
    }
  );
});

// ======================
// LEADERBOARD
// ======================

app.get('/api/leaderboard', (req, res) => {
  db.all(
    'SELECT username, green_points FROM users ORDER BY green_points DESC LIMIT 10',
    [],
    (err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(users);
    }
  );
});

// ======================
// CONFIG (Google Maps)
// ======================

app.get('/config', (req, res) => {
  res.json({
    googleMapsKey: process.env.GOOGLE_MAPS_API_KEY
  });
});

// ======================
// SERVER
// ======================

app.listen(PORT, () => {
  console.log(`🌱 GreenSwap server running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed.');
    process.exit(0);
  });
});
