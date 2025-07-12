import Notification from '../models/Notification.js';
import { notifyUser } from '../utils/socket.js';

export const createNotification = async (userId, type, content, relatedQuestion = null, relatedAnswer = null) => {
  try {
    const notification = await Notification.create({
      user: userId,
      type,
      content,
      relatedQuestion,
      relatedAnswer
    });
    
    notifyUser(userId, {
      _id: notification._id,
      type,
      content,
      read: false,
      createdAt: new Date()
    });
    
    return notification;
  } catch (err) {
    console.error('Notification creation error:', err);
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(20);
      
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { $set: { read: true } }
    );
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};