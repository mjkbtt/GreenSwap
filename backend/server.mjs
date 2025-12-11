import express from 'express';
const app = express();
const port = 3000;

app.use(express.json()); // <-- this allows JSON in POST requests

app.post('/create', (req, res) => {
  console.log(req.body); // data sent from frontend
  res.json({ message: 'Received!', data: req.body });
});

app.post('/create', (req, res) => {
  console.log(req.body); // data sent from frontend
  res.json({ message: 'Received!', data: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
