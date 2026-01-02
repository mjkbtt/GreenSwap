import express  from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import db from './database/db.js'

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('frontend'));

// API Routes

// User registration
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'User already exists' });
      }
      res.json({ id: this.lastID, username, email, green_points: 0 });
    }
  );
});

// User login
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

// Get user profile
app.get('/api/user/:id', (req, res) => {
  db.get('SELECT id, username, email, green_points FROM users WHERE id = ?', [req.params.id], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// Get waste categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM waste_categories', [], (err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(categories);
  });
});

// Get collection centers
app.get('/api/tseguud', (req, res) => {
  res.json({ message: 'Tseguud API works' });
});


// Submit recycling
app.post('/api/recycle', (req, res) => {
  const { user_id, waste_category_id, weight_kg, method, collection_center_id, pickup_address, pickup_date } = req.body;
  
  // Get category to calculate points
  db.get('SELECT points_per_kg FROM waste_categories WHERE id = ?', [waste_category_id], (err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const points_earned = Math.floor(weight_kg * category.points_per_kg);
    
    db.run(
      /*sql*/`INSERT INTO recycling_submissions 
       (user_id, waste_category_id, weight_kg, method, collection_center_id, pickup_address, pickup_date, points_earned, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'completed')`,
      [user_id, waste_category_id, weight_kg, method, collection_center_id, pickup_address, pickup_date, points_earned],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
        // Update user points
        db.run('UPDATE users SET green_points = green_points + ? WHERE id = ?', [points_earned, user_id]);
        
        res.json({ id: this.lastID, points_earned, status: 'completed' });
      }
    );
  });
});

// Get user recycling history
app.get('/api/user/:id/history', (req, res) => {
  db.all(
    /*sql*/`SELECT rs.*, wc.name as category_name, wc.icon, cc.name as center_name 
     FROM recycling_submissions rs 
     LEFT JOIN waste_categories wc ON rs.waste_category_id = wc.id 
     LEFT JOIN collection_centers cc ON rs.collection_center_id = cc.id 
     WHERE rs.user_id = ? 
     ORDER BY rs.created_at DESC`,
    [req.params.id],
    (err, history) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(history);
    }
  );
});

// Get products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products WHERE stock > 0', [], (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
});

// Purchase product
app.post('/api/purchase', (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  
  db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    
    const total_points = product.price_points * quantity;
    
    db.get('SELECT green_points FROM users WHERE id = ?', [user_id], (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      if (user.green_points < total_points) {
        return res.status(400).json({ error: 'Insufficient points' });
      }
      
      // Create order
      db.run(
        /*sql*/`INSERT INTO orders (user_id, product_id, quantity, total_points, status) VALUES (?, ?, ?, ?, ?)`,
        [user_id, product_id, quantity, total_points, 'completed'],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          
          // Deduct points and update stock
          db.run(/*sql*/`UPDATE users SET green_points = green_points - ? WHERE id = ?`, [total_points, user_id]);
          db.run(/*sql*/`UPDATE products SET stock = stock - ? WHERE id = ?`, [quantity, product_id]);
          
          res.json({ order_id: this.lastID, total_points, status: 'completed' });
        }
      );
    });
  });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  db.all(
    /*sql*/`SELECT username, green_points FROM users ORDER BY green_points DESC LIMIT 10`,
    [],
    (err, users) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(users);
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 GreenSwap server running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});