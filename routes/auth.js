// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, location, password, role = 'user' } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Хэрэглэгчийн нэр, имэйл, нууц үг шаардлагатай' 
      });
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Энэ имэйл аль хэдийн бүртгэлтэй байна' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const stmt = db.prepare(`
      INSERT INTO users (username, email, phone, location, password, role, green_points)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `);

    const result = stmt.run(username, email, phone || null, location || null, hashedPassword, role);

    // Generate token
    const token = jwt.sign(
      { id: result.lastInsertRowid, email, role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Get user without password
    const user = db.prepare(`
      SELECT id, username, email, phone, location, role, green_points, created_at 
      FROM users WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Амжилттай бүртгэгдлээ',
      token,
      user
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Серверийн алдаа' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Имэйл болон нууц үг шаардлагатай' });
    }

    // Find user
    const user = db.prepare('SELECT * FROM users WHERE email = ? AND role = "user"').get(email);
    if (!user) {
      return res.status(401).json({ message: 'Имэйл эсвэл нууц үг буруу байна' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Имэйл эсвэл нууц үг буруу байна' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    delete user.password;

    res.json({
      message: 'Амжилттай нэвтэрлээ',
      token,
      user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Серверийн алдаа' });
  }
});

// Center Registration
router.post('/center-register', async (req, res) => {
  try {
    const { centerName, email, phone, address, description, password, operatingHours } = req.body;

    if (!centerName || !email || !password || !address) {
      return res.status(400).json({ 
        message: 'Цэгийн нэр, имэйл, хаяг, нууц үг шаардлагатай' 
      });
    }

    // Check if center exists
    const existing = db.prepare('SELECT * FROM centers WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ message: 'Энэ имэйл аль хэдийн бүртгэлтэй байна' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert center
    const stmt = db.prepare(`
      INSERT INTO centers (name, email, phone, address, description, password, operating_hours, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    const result = stmt.run(
      centerName, 
      email, 
      phone || null, 
      address, 
      description || null, 
      hashedPassword,
      operatingHours || null
    );

    // Generate token
    const token = jwt.sign(
      { id: result.lastInsertRowid, email, role: 'center' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const center = db.prepare(`
      SELECT id, name, email, phone, address, description, operating_hours, status, created_at 
      FROM centers WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Цэг амжилттай бүртгэгдлээ. Баталгаажуулалт хүлээгдэж байна.',
      token,
      center
    });

  } catch (error) {
    console.error('Center register error:', error);
    res.status(500).json({ message: 'Серверийн алдаа' });
  }
});

// Center Login
router.post('/center-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Имэйл болон нууц үг шаардлагатай' });
    }

    // Find center
    const center = db.prepare('SELECT * FROM centers WHERE email = ?').get(email);
    if (!center) {
      return res.status(401).json({ message: 'Имэйл эсвэл нууц үг буруу байна' });
    }

    // Check if center is approved
    if (center.status !== 'approved') {
      return res.status(403).json({ 
        message: 'Таны цэг баталгаажаагүй байна. Админд хандана уу.' 
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, center.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Имэйл эсвэл нууц үг буруу байна' });
    }

    // Generate token
    const token = jwt.sign(
      { id: center.id, email: center.email, role: 'center' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    delete center.password;

    res.json({
      message: 'Амжилттай нэвтэрлээ',
      token,
      center
    });

  } catch (error) {
    console.error('Center login error:', error);
    res.status(500).json({ message: 'Серверийн алдаа' });
  }
});

// Verify Token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token байхгүй байна' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    let user;
    if (decoded.role === 'center') {
      user = db.prepare('SELECT id, name, email, phone, address, status FROM centers WHERE id = ?')
        .get(decoded.id);
    } else {
      user = db.prepare('SELECT id, username, email, phone, location, role, green_points FROM users WHERE id = ?')
        .get(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.json({ user, role: decoded.role });

  } catch (error) {
    console.error('Verify error:', error);
    res.status(401).json({ message: 'Token буруу байна' });
  }
});

export default router;