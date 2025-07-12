import Question from '../models/Question';
import Tag from '../models/Tag';
import { publish } from '../utils/socket'; // Socket.IO helper

export const createQuestion = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    
    const question = await Question.create({
      title,
      body,
      user: req.user.id,
      tags
    });
    
    // Update tag counts
    await Tag.updateMany(
      { _id: { $in: tags } },
      { $inc: { questionCount: 1 } }
    );
    
    // Real-time update
    publish('new-question', {
      _id: question._id,
      title,
      user: req.user.username,
      createdAt: new Date()
    });
    
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = '-createdAt', tag } = req.query;
    const skip = (page - 1) * limit;
    
    const query = {};
    if (tag) query.tags = tag;
    
    const questions = await Question.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('tags', 'name')
      .populate('user', 'username');
    
    const total = await Question.countDocuments(query);
    
    res.json({
      questions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};