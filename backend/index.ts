import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { decideHandler, rewardHandler, stateHandler, healthHandler, resetHandler } from './routes';
import { createStore } from './store';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DEMO_SECRET = process.env.DEMO_SECRET || 'demo_secret';

app.use(bodyParser.json());

// Create in-memory store (can be swapped to Redis if needed)
const store = createStore();

// Routes
app.post('/api/decide', (req, res) => decideHandler(req, res, store));
app.post('/api/reward', (req, res) => rewardHandler(req, res, store));
app.get('/api/state', (req, res) => stateHandler(req, res, store));
app.get('/health', (req, res) => healthHandler(req, res, store));

app.post('/reset', (req, res) => {
  // Simple guard for the reset endpoint
  const { secret } = req.body;
  if (secret === DEMO_SECRET) {
    resetHandler(req, res, store);
  } else {
    res.status(403).json({ ok: false, error: 'Forbidden' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});