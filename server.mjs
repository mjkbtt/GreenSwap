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
// ======================
// CENTER REGISTER
// ======================
app.post('/api/center-register', (req, res) => {
  const { name, email, password, district, address, phone } = req.body;

  // ✅ Validation
  if (!name || !email || !password || !district || !address) {
    return res.status(400).json({ 
      error: 'Цэгийн нэр, имэйл, нууц үг, дүүрэг, хаяг шаардлагатай' 
    });
  }

  console.log('📝 Center registration attempt:', { name, email, district, address });

  // Check if center already exists
  db.get('SELECT id FROM collection_centers WHERE email = ?', [email], (err, existing) => {
    if (err) {
      console.error('❌ Check center error:', err);
      return res.status(500).json({ error: 'Серверийн алдаа' });
    }
    
    if (existing) {
      return res.status(400).json({ error: 'Энэ имэйл аль хэдийн бүртгэлтэй байна' });
    }

    // ✅ Insert new center with all required fields
    db.run(
      `INSERT INTO collection_centers 
       (name, email, password, district, address, phone, latitude, longitude, 
        working_hours, type, location, total_collected_kg, active_users, rating) 
       VALUES (?, ?, ?, ?, ?, ?, 47.9186, 106.9178, '09:00-18:00', 'Plastic,Paper,Metal', ?, 0, 0, 5.0)`,
      [name, email, password, district, address, phone || '', `${district} - ${address}`],
      function (err) {
        if (err) {
          console.error('❌ Center register error:', err);
          return res.status(500).json({ error: 'Бүртгэл амжилтгүй: ' + err.message });
        }

        console.log('✅ Center registered successfully, ID:', this.lastID);

        // ✅ Profile-д шаардлагатай бүх мэдээлэл буцаах
        res.json({
          id: this.lastID,
          name,
          email,
          district,
          address,
          phone: phone || '',
          total_collected_kg: 0,
          active_users: 0,
          rating: 5.0,
          created_at: new Date().toISOString(),
          message: 'Амжилттай бүртгэгдлээ'
        });
      }
    );
  });
});
// ======================
// CENTER LOGIN
// ======================
app.post('/api/center-login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Имэйл болон нууц үг шаардлагатай' });
  }

  db.get(
    `SELECT id, name, email, district,
            total_collected_kg, active_users, rating
     FROM collection_centers
     WHERE email = ? AND password = ?`,
    [email, password],
    (err, center) => {
      if (err) {
        console.error('Center login error:', err);
        return res.status(500).json({ error: 'Серверийн алдаа' });
      }
      if (!center) {
        return res.status(401).json({ error: 'Имэйл эсвэл нууц үг буруу' });
      }

      res.json(center);
    }
  );
});

// ======================
// CENTER PROFILE
// ======================
app.get('/api/center/:id', (req, res) => {
  db.get(
    `SELECT id, name, email, district,
            total_collected_kg, active_users, rating,
            created_at
     FROM collection_centers
     WHERE id = ?`,
    [req.params.id],
    (err, center) => {
      if (err) {
        console.error('Get center error:', err);
        return res.status(500).json({ error: 'Серверийн алдаа' });
      }
      if (!center) {
        return res.status(404).json({ error: 'Цэг олдсонгүй' });
      }

      res.json(center);
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
    
    const formattedCenters = centers.map(center => ({
      ...center,
      type: center.type ? center.type.split(',').map(t => t.trim()) : []
    }));
    
    res.json(formattedCenters);
  });
});





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



// ======================
// LEADERBOARD API
// ======================
app.get('/api/leaderboard', (req, res) => {
  db.all(
    `
    SELECT
      username,
      green_points AS points
    FROM users
    ORDER BY green_points DESC
    LIMIT 5
    `,
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
      res.json(rows);
    }
  );
});


// ======================
// CONFIG (Google Maps)
// ======================

app.get('/config', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.error('GOOGLE_MAPS_API_KEY .env файлд байхгүй байна!');
    return res.status(500).json({ error: 'Google Maps API key тохируулагдаагүй байна' });
  }
  
  res.json({
    googleMapsKey: apiKey
  });
});

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
  console.log(`GreenSwap server ажиллаж байна: http://localhost:${PORT}`);

});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nServer-ийг зогсоож байна...');
  db.close(() => {
    console.log('Database холболт хаагдлаа');
    process.exit(0);
  });
});