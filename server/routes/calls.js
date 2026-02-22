import express from 'express';
import CallLog from '../models/CallLog.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await CallLog.find().sort({ createdAt: -1 }).limit(20).lean();
    res.json(logs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch call logs' });
  }
});

export default router;
