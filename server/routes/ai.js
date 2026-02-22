import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import CallLog from '../models/CallLog.js';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

router.post('/chat', async (req, res) => {
  const { persona, prompt } = req.body;
  const systemPrompt = persona === 'bank'
    ? 'You are a helpful banking assistant. Answer concisely.'
    : 'You are a helpful ERP solutions assistant. Answer concisely.';
  try {
    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response.text();
    await CallLog.create({ persona, prompt, response });
    res.json({ response });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'LLM request failed' });
  }
});

export default router;
