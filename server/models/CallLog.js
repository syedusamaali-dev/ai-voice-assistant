import mongoose from 'mongoose';

const CallLogSchema = new mongoose.Schema({
  persona: { type: String, required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CallLog', CallLogSchema);
