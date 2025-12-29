import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';

const app = express();
const port = 3000;

app.use('/api/auth', authRouter);
app.use(cors());           
app.use(express.json());   
app.get('/', (req, res) => {
  res.send('GreenSwap backend is running');
});

app.get('/api/tseguud', (req, res) => {
  res.json([
    {
      name: "Green Point 1",
      lat: 47.9184,
      lng: 106.9177,
      district: "СБД",
      location: "Peace Ave",
      phone: "99112233",
      working_hours: "09:00 - 18:00",
      type: ["Plastic", "Paper"],
      total_collected_kg: 1200,
      active_users: 87,
      rating: 4.6
    },
    {
      name: "Green Point 2",
      lat: 47.905,
      lng: 106.93,
      district: "БГД",
      location: "Narnii Road",
      phone: "99887766",
      working_hours: "10:00 - 19:00",
      type: ["Glass", "Metal"],
      total_collected_kg: 950,
      active_users: 64,
      rating: 4.3
    }
  ]);
});

app.get('/api/items/stats/summary', (req, res) => {
  res.json({
    collected: 250,
    total: 120
  });
});

app.post('/create', (req, res) => {
  console.log('Received:', req.body);
  res.json({ message: 'Received!', data: req.body });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
