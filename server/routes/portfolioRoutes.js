const express = require('express');
const router = express.Router();
const { getPortfolioData, getProjects } = require('../controllers/portfolioController');

// High-speed lean aggregated query
router.get('/', getPortfolioData);

// Category filtered projects
router.get('/projects', getProjects);

module.exports = router;
