
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5174',
  'http://localhost:5174',
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'DevSphere backend is running!',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    service: 'DevSphere API',
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`DevSphere backend running at http://127.0.0.1:${PORT}`);
});
