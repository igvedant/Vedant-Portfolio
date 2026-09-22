const Message = require('../models/Message');
const { sendContactNotification } = require('../services/emailService');

/**
 * POST /api/contact
 * Validates inquiry, saves to MongoDB Atlas, and dispatches Resend notification
 * No sensitive data or message body is logged to the server console.
 */
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Strict validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your name.' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a message.' });
    }

    if (message.trim().length > 2000) {
      return res.status(400).json({ success: false, message: 'Message cannot exceed 2000 characters.' });
    }

    // 1. Save strictly to MongoDB Atlas
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    // 2. Fire-and-forget email dispatch via Resend API (non-blocking for instant client response)
    sendContactNotification({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }).catch(() => {
      // Handled silently to avoid logging message details to console
    });

    // Return instant success response
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and Vedant will reply shortly.',
      id: newMessage._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error processing your request. Please try again.',
    });
  }
};

module.exports = {
  submitContactForm,
};
