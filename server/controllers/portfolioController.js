const Project = require('../models/Project');
const PortfolioData = require('../models/PortfolioData');

/**
 * GET /api/portfolio
 * Delivers all portfolio assets (projects, skills, experience, education, bio)
 * in a single ultra-lean database query (<30ms).
 */
const getPortfolioData = async (req, res) => {
  try {
    const [projects, profile] = await Promise.all([
      Project.find({}).sort({ order: 1 }).lean().exec(),
      PortfolioData.findOne({}).lean().exec(),
    ]);

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        projects: projects || [],
        profile: profile || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio data',
    });
  }
};

/**
 * GET /api/projects
 * Returns projects list with optional category filter
 */
const getProjects = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ order: 1 }).lean().exec();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
    });
  }
};

module.exports = {
  getPortfolioData,
  getProjects,
};
