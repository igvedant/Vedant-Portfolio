import React from 'react';

export const About = ({ metrics }) => {
  const defaultMetrics = [
    { value: '5+', label: 'Production Builds Deployed' },
    { value: '96%', label: 'Capstone Final Exam Score' },
    { value: '8.02', label: 'B.Tech CSE Academic GPA' },
    { value: '5th', label: 'Class Rank in Cohort' },
  ];

  const displayMetrics = metrics?.length ? metrics : defaultMetrics;

  return (
    <section id="about" className="content-section">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <h3 className="section-subtitle">A synthesis of theoretical engineering rigor and production-tested full-stack execution!</h3>
      </div>

      <p className="section-body-text">
        I am currently pursuing a Bachelor of Technology in Computer Science and Engineering at Bundelkhand University,
        Jhansi (graduating 2027), ranking 5th in my cohort with an 8.02 GPA. My technical focus lies at the intersection
        of performant frontend architectures and resilient, scalable backend microservices.
      </p>

      <p className="section-body-text">
        During my tenure at <strong>Infosys Springboard</strong> and <strong>3Skill Platform</strong>, I led agile engineering teams,
        authored comprehensive architectural specifications, designed normalized MongoDB schemas, and integrated generative AI APIs.
        I value code simplicity, type safety, low latency, and intuitive developer experiences.
      </p>

      <div className="metrics-grid">
        {displayMetrics.map((m, idx) => (
          <div key={idx} className="metric-card">
            <div className="metric-value">{m.value}</div>
            <div className="metric-label">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
