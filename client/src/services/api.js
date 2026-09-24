import axios from 'axios';

// Default initial data for instant zero-jitter rendering
export const fallbackPortfolioData = {
  hero: {
    statusBadge: 'Open to Software Engineering & Full-Stack Roles',
    name: 'Vedant Singh',
    title: 'Full-Stack Web Developer & MERN Architect',
    bioParagraphs: [
      'I am a dedicated Software Engineer and Computer Science student specializing in full-stack web application development. I specialize in building responsive, high-performance web solutions using React.js, Node.js, Express.js, and MongoDB, while designing resilient RESTful architectures, secure JWT authentication lifecycles, and cutting-edge AI Agent integrations.',
      'With hands-on experience serving as Team Lead at Infosys Springboard and completing rigorous production builds at 3Skill Platform, I focus on clean coding standards, scalable component patterns, and low-latency database queries.',
    ],
  },
  metrics: [
    { value: '5+', label: 'Production Builds Deployed' },
    { value: '96%', label: 'Capstone Final Exam Score' },
    { value: '8.02', label: 'B.Tech CSE Academic GPA' },
    { value: '5th', label: 'Class Rank in Cohort' },
  ],
  projects: [
    {
      _id: 'p1',
      title: 'TaxPal — Personal Finance & Tax Estimator',
      role: 'Team Lead · 5 Devs',
      category: 'MERN',
      description:
        'An 8-week Agile capstone platform deployed live across Vercel, Render, and MongoDB Atlas. Powers automated quarterly tax-bracket calculations across 9 countries. Built with secure JWT authentication, Bcrypt password hashing, and clean RESTful API middleware.',
      tags: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Angular', 'JWT Auth'],
      liveUrl: 'https://taxpal-blue.vercel.app',
      githubUrl: 'https://github.com/springboardmentor09881n-rgb/TaxPal-Batch-4',
      featured: true,
      order: 1,
    },
    {
      _id: 'p2',
      title: 'Resumate — AI Interview Prep & Resume Tailoring',
      role: 'Full-Stack AI Build',
      category: 'AI',
      description:
        'An AI-powered career platform integrating Google Gemini API to analyze candidate resumes against job descriptions, producing instant match scores, skill-gap breakdowns, and tailored interview questions. Features JWT token rotation, server token blacklisting, and Puppeteer PDF rendering.',
      tags: ['React (Vite)', 'Google Gemini API', 'Node.js', 'Express.js', 'Puppeteer', 'MongoDB'],
      liveUrl: 'https://resumate-hazel-delta.vercel.app',
      githubUrl: 'https://github.com/igvedant/Resumate',
      featured: true,
      order: 2,
    },
    {
      _id: 'p3',
      title: 'HavenKey — Luxury Real Estate Portal',
      role: 'Capstone Project',
      category: 'Full-Stack',
      description:
        'Full-stack luxury property portal implementing city-based dynamic filtering, image-gallery lightboxes, interactive historical price charts with Recharts, and an administrative dashboard for real-time lead generation and tour management.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Recharts', 'Bcryptjs'],
      githubUrl: 'https://github.com/igvedant/3skillProjects/tree/main/project6',
      featured: true,
      order: 3,
    },
    {
      _id: 'p4',
      title: 'EventSphere — Event RSVP Platform',
      role: 'MERN Stack',
      category: 'MERN',
      description:
        'Full-featured event management system with secure JWT user sessions, real-time RSVP seat capacity handling, MongoDB transactional persistence, and automated confirmation dispatch via Nodemailer integration.',
      tags: ['MERN Stack', 'Nodemailer', 'JWT', 'REST API'],
      githubUrl: 'https://github.com/igvedant/3skillProjects/tree/main/project5',
      featured: true,
      order: 4,
    },
    {
      _id: 'p5',
      title: 'QuizMaster — Automated Scoring Engine',
      role: 'Full-Stack Application',
      category: 'Full-Stack',
      description:
        'Online interactive assessment portal featuring real-time automated scoring calculation, schema-backed dynamic question banks, leaderboard persistence in MongoDB, and an intuitive responsive user interface.',
      tags: ['React', 'Express.js', 'MongoDB', 'Node.js'],
      githubUrl: 'https://github.com/igvedant/3skillProjects/tree/main/project4',
      featured: true,
      order: 5,
    },
  ],
  experience: [
    {
      role: 'Infosys Springboard · Software Engineering Intern',
      company: 'Infosys',
      period: 'June 2026 – September 2026',
      location: 'Remote',
      program: 'Mentor-Led Virtual Internship 7.0 (Batch 1)',
      highlights: [
        "Selected for Infosys Springboard's competitive mentor-led Virtual Internship 7.0 (Batch 1), ensuring rigorous milestone-based sprint delivery.",
        'Served as Team Lead on TaxPal — Personal Finance & Tax Estimator for Freelancers, coordinating a 5-member cross-functional engineering team.',
        "Presented the live capstone demonstration at the internship's final cohort presentation to mentor review panels.",
        'Strengthened code maintainability by enforcing clean coding standards, comprehensive reusable component patterns, and scalable software architectures.',
      ],
    },
    {
      role: '3Skill Platform · Full Stack Developer Intern',
      company: '3Skill Platform',
      period: 'June 2026 – August 2026',
      location: 'Remote',
      program: 'Intensive Full-Stack Engineering Program',
      highlights: [
        "Completed 3Skill's Web Development training program, progressing through 5 distinct project builds from frontend fundamentals to complex full-stack MERN platforms.",
        'Achieved a top 96% score (139/150 overall) on the program\'s comprehensive final technical examination.',
        'Built HavenKey, a full-stack luxury real estate portal, as the assigned capstone project — implementing city-based property search, Recharts price histories, and JWT-authenticated accounts.',
        'Engineered lead-generation and tour-scheduling workflows backed by a seeded MongoDB Atlas cluster and an administrative management dashboard.',
        'Delivered two additional full-stack MERN applications: an interactive quiz platform with automated evaluation and an event-management system with RSVP tracking and Nodemailer notifications.',
      ],
    },
  ],
  education: [
    {
      institution: 'Bundelkhand University · Jhansi, India',
      location: 'Jhansi, India',
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      period: 'Expected June 2027',
      gpa: '8.02 / 10.0',
      rank: '5th in cohort',
      details: [
        'Core studies in Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems, Computer Networks, and Software Engineering.',
      ],
    },
  ],
  certifications: [
    {
      title: '5-Day AI Agents: Intensive Vibe Coding',
      issuer: 'Google',
      date: 'June 2026',
      description: 'Practical multi-agent workflows, Gemini API tooling, autonomous problem-solving.',
    },
    {
      title: 'Agile Scrum in Practice',
      issuer: 'Infosys',
      date: 'March 2026',
      description: 'Sprint planning, backlog grooming, sprint retrospectives, team milestone ownership.',
    },
  ],
};

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api';

export const fetchPortfolioData = async () => {
  try {
    const response = await axios.get(`${API_BASE}/portfolio`, { timeout: 3500 });
    if (response.data && response.data.success && response.data.data) {
      const { projects, profile } = response.data.data;
      return {
        hero: profile?.hero || fallbackPortfolioData.hero,
        metrics: profile?.metrics?.length ? profile.metrics : fallbackPortfolioData.metrics,
        projects: projects?.length ? projects : fallbackPortfolioData.projects,
        experience: profile?.experience?.length ? profile.experience : fallbackPortfolioData.experience,
        education: profile?.education?.length ? profile.education : fallbackPortfolioData.education,
        certifications: profile?.certifications?.length ? profile.certifications : fallbackPortfolioData.certifications,
        isLive: true,
      };
    }
    return { ...fallbackPortfolioData, isLive: false };
  } catch (err) {
    return { ...fallbackPortfolioData, isLive: false };
  }
};

export const submitContactMessage = async (payload) => {
  const response = await axios.post(`${API_BASE}/contact`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const adminLogin = async (email, password) => {
  const response = await axios.post(`${API_BASE}/admin/login`, { email, password });
  return response.data;
};

export const fetchAdminMessages = async (token) => {
  const response = await axios.get(`${API_BASE}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteAdminMessage = async (id, token) => {
  const response = await axios.delete(`${API_BASE}/admin/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
