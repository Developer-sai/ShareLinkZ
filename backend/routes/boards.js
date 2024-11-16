import express from 'express';
import Board from '../models/Board.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const board = new Board({ name, description, user: req.user.id });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });
    res.json(boards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, description },
      { new: true }
    );
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/links', async (req, res) => {
  try {
    const { url, description, deadline } = req.body;
    const board = await Board.findOne({ _id: req.params.id, user: req.user.id });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    board.links.push({ url, description, deadline });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:boardId/links/:linkId', async (req, res) => {
  try {
    const { url, description, deadline, visited } = req.body;
    const board = await Board.findOne({ _id: req.params.boardId, user: req.user.id });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    const link = board.links.id(req.params.linkId);
    if (!link) return res.status(404).json({ error: 'Link not found' });
    link.set({ url, description, deadline, visited });
    await board.save();
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:boardId/links/:linkId', async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId, user: req.user.id });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    board.links.id(req.params.linkId).remove();
    await board.save();
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;