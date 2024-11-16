import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: String,
  deadline: Date,
  visited: { type: Boolean, default: false },
});

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  links: [linkSchema],
});

export default mongoose.model('Board', boardSchema);