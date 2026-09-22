const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { submitContactForm } = require('../controllers/contactController');

// Rate limiting: 10 inquiries per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many messages submitted from this IP. Please try again in a few minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, submitContactForm);

module.exports = router;
