const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  skills: [
    {
      name: { type: String, required: true },
      icon: { type: String },
      color: { type: String },
    },
  ],
});

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  location: { type: String },
  program: { type: String },
  highlights: [{ type: String }],
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  location: { type: String },
  degree: { type: String, required: true },
  period: { type: String, required: true },
  gpa: { type: String },
  rank: { type: String },
  details: [{ type: String }],
});

const certSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String },
});

const metricSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const portfolioDataSchema = new mongoose.Schema(
  {
    hero: {
      statusBadge: { type: String, default: 'Open to Software Engineering & Full-Stack Roles' },
      name: { type: String, default: 'Vedant Singh' },
      title: { type: String, default: 'Full-Stack Web Developer & MERN Architect' },
      bioParagraphs: [{ type: String }],
    },
    metrics: [metricSchema],
    skillsGroups: [skillCategorySchema],
    experience: [experienceSchema],
    education: [educationSchema],
    certifications: [certSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PortfolioData', portfolioDataSchema);
