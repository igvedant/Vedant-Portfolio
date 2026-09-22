const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const Project = require('../models/Project');

/**
 * POST /api/admin/login
 * Strictly verifies against owner credentials in .env (locked to igvedant01@gmail.com).
 * No public user registration route exists.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || 'igvedant01@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'vedant_admin_2026!';

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    if (email.trim().toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Access restricted to portfolio owner.' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'owner' },
      process.env.JWT_SECRET || 'vedant_super_secure_jwt_secret_token_key_2026',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      admin: {
        email: adminEmail,
        role: 'owner',
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Authentication error.' });
  }
};

/**
 * GET /api/admin/messages
 * Fetches inquiries stored in MongoDB Atlas
 */
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 }).lean().exec();
    return res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
};

/**
 * DELETE /api/admin/messages/:id
 */
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Message removed.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
};

/**
 * POST /api/admin/projects
 */
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
};

/**
 * PUT /api/admin/projects/:id
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
};

/**
 * DELETE /api/admin/projects/:id
 */
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Project removed.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
};

module.exports = {
  login,
  getMessages,
  deleteMessage,
  createProject,
  updateProject,
  deleteProject,
};
