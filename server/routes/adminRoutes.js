const express = require('express');
const router = express.Router();
const {
  login,
  getMessages,
  deleteMessage,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/adminController');
const { requireAdminAuth } = require('../middleware/auth');

// Owner login strictly matching .env credentials
router.post('/login', login);

// Protected routes (strictly owner access)
router.get('/messages', requireAdminAuth, getMessages);
router.delete('/messages/:id', requireAdminAuth, deleteMessage);
router.post('/projects', requireAdminAuth, createProject);
router.put('/projects/:id', requireAdminAuth, updateProject);
router.delete('/projects/:id', requireAdminAuth, deleteProject);

module.exports = router;
