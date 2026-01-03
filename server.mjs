import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './database/db.js';

// 🔹 ENV унших
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

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Бүх талбарыг бөглөнө үү' });
  }

  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function (err) {
      if (err) {
        console.error('Register error:', err);
        return res.status(400).json({ error: 'Хэрэглэгч аль хэдийн бүртгэлтэй байна' });
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

  if (!email || !password) {
    return res.status(400).json({ error: 'И-мэйл болон нууц үг шаардлагатай' });
  }

  db.get(
    'SELECT id, username, email, green_points FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Серверийн алдаа' });
      }
      if (!user) {
        return res.status(401).json({ error: 'И-мэйл эсвэл нууц үг буруу байна' });
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
      if (err) {
        console.error('Get user error:', err);
        return res.status(500).json({ error: 'Серверийн алдаа' });
      }
      if (!user) {
        return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
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
    if (err) {
      console.error('Get categories error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(categories);
  });
});

// ✅ ЗАСВАРЛАСАН: Database-аас бодит өгөгдөл татах
app.get('/api/tseguud', (req, res) => {
  db.all(/*sql*/`SELECT 
        id,
        address,
        location,
        phone,
        working_hours,
        rating,
        active_users,
        total_collected_kg,
        created_at,
        name,
        district,
        type,
        price_per_kg,
        latitude  AS lat,
        longitude AS lng
     FROM collection_centers`,
    [], (err, centers) => {
    if (err) {
      console.error('Get centers error:', err);
      return res.status(500).json({ error: err.message });
    }
    
    // Type-г array болгож өгөх (frontend-д хялбар байхын тулд)
    const formattedCenters = centers.map(center => ({
      ...center,
      type: center.type ? center.type.split(',').map(t => t.trim()) : []
    }));
    
    console.log('✅ Цэгүүд амжилттай илгээгдлээ:', formattedCenters.length);
    res.json(formattedCenters);
  });
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

  // Validation
  if (!user_id || !waste_category_id || !weight_kg || !method) {
    return res.status(400).json({ error: 'Шаардлагатай талбаруудыг бөглөнө үү' });
  }

  if (weight_kg <= 0) {
    return res.status(400).json({ error: 'Жин 0-оос их байх ёстой' });
  }

  db.get(
    'SELECT points_per_kg FROM waste_categories WHERE id = ?',
    [waste_category_id],
    (err, category) => {
      if (err) {
        console.error('Get category error:', err);
        return res.status(500).json({ error: 'Серверийн алдаа' });
      }
      if (!category) {
        return res.status(400).json({ error: 'Хог хаягдлын төрөл олдсонгүй' });
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
            console.error('Submit recycle error:', err);
            return res.status(500).json({ error: err.message });
          }

          // Update user points
          db.run(
            'UPDATE users SET green_points = green_points + ? WHERE id = ?',
            [points_earned, user_id],
            (updateErr) => {
              if (updateErr) {
                console.error('Update points error:', updateErr);
              }
            }
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
      if (err) {
        console.error('Get history error:', err);
        return res.status(500).json({ error: err.message });
      }
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
      if (err) {
        console.error('Get products error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json(products);
    }
  );
});

app.post('/api/purchase', (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  // Validation
  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: 'Шаардлагатай талбаруудыг бөглөнө үү' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'Тоо ширхэг 0-оос их байх ёстой' });
  }

  db.get(
    'SELECT * FROM products WHERE id = ?',
    [product_id],
    (err, product) => {
      if (err) {
        console.error('Get product error:', err);
        return res.status(500).json({ error: 'Серверийн алдаа' });
      }
      if (!product) {
        return res.status(404).json({ error: 'Бүтээгдэхүүн олдсонгүй' });
      }
      if (product.stock < quantity) {
        return res.status(400).json({ error: 'Үлдэгдэл хүрэлцэхгүй байна' });
      }

      const total_points = product.price_points * quantity;

      db.get(
        'SELECT green_points FROM users WHERE id = ?',
        [user_id],
        (err, user) => {
          if (err) {
            console.error('Get user error:', err);
            return res.status(500).json({ error: 'Серверийн алдаа' });
          }
          if (!user) {
            return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
          }
          if (user.green_points < total_points) {
            return res.status(400).json({ error: 'Таны оноо хүрэлцэхгүй байна' });
          }

          // Create order
          db.run(
            `INSERT INTO orders
             (user_id, product_id, quantity, total_points, status)
             VALUES (?, ?, ?, ?, 'completed')`,
            [user_id, product_id, quantity, total_points],
            function (err) {
              if (err) {
                console.error('Create order error:', err);
                return res.status(500).json({ error: err.message });
              }

              // Deduct points
              db.run(
                'UPDATE users SET green_points = green_points - ? WHERE id = ?',
                [total_points, user_id]
              );

              // Update stock
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
      if (err) {
        console.error('Get leaderboard error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json(users);
    }
  );
});

// ======================
// CONFIG (Google Maps)
// ======================

app.get('/config', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GOOGLE_MAPS_API_KEY .env файлд байхгүй байна!');
    return res.status(500).json({ error: 'Google Maps API key тохируулагдаагүй байна' });
  }
  
  res.json({
    googleMapsKey: apiKey
  });
});

// ======================
// ERROR HANDLING
// ======================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint олдсонгүй' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Серверийн алдаа:', err);
  res.status(500).json({ error: 'Серверийн дотоод алдаа' });
});

// ======================
// SERVER
// ======================

app.listen(PORT, () => {
  console.log(`🌱 GreenSwap server ажиллаж байна: http://localhost:${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/...`);
  console.log(`🗺️  Google Maps config: http://localhost:${PORT}/config`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server-ийг зогсоож байна...');
  db.close(() => {
    console.log('✅ Database холболт хаагдлаа');
    process.exit(0);
  });
});