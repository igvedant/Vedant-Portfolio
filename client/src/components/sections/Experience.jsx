import React from 'react';

export const Experience = ({ experience }) => {
  const defaultExp = [
    {
      role: 'Infosys Springboard · Software Engineering Intern',
      period: 'June 2026 – September 2026',
      program: 'Remote · Mentor-Led Virtual Internship 7.0 (Batch 1)',
      highlights: [
        "Selected for Infosys Springboard's competitive mentor-led Virtual Internship 7.0 (Batch 1), ensuring rigorous milestone-based sprint delivery.",
        'Served as Team Lead on TaxPal — Personal Finance & Tax Estimator for Freelancers, coordinating a 5-member cross-functional engineering team.',
        "Presented the live capstone demonstration at the internship's final cohort presentation to mentor review panels.",
        'Strengthened code maintainability by enforcing clean coding standards, comprehensive reusable component patterns, and scalable software architectures.',
      ],
    },
    {
      role: '3Skill Platform · Full Stack Developer Intern',
      period: 'June 2026 – August 2026',
      program: 'Remote · Intensive Full-Stack Engineering Program',
      highlights: [
        "Completed 3Skill's Web Development training program, progressing through 5 distinct project builds from frontend fundamentals to complex full-stack MERN platforms.",
        'Achieved a top 96% score (139/150 overall) on the program\'s comprehensive final technical examination.',
        'Built HavenKey, a full-stack luxury real estate portal, as the assigned capstone project — implementing city-based property search, Recharts price histories, and JWT-authenticated accounts.',
        'Engineered lead-generation and tour-scheduling workflows backed by a seeded MongoDB Atlas cluster and an administrative management dashboard.',
        'Delivered two additional full-stack MERN applications: an interactive quiz platform with automated evaluation and an event-management system with RSVP tracking and Nodemailer notifications.',
      ],
    },
  ];

  const items = experience?.length ? experience : defaultExp;

  return (
    <section id="experience" className="content-section">
      <div className="section-header">
        <h2 className="section-title">Work Experience</h2>
        <h3 className="section-subtitle">Real-world milestone execution, leadership, and scalable software delivery!</h3>
      </div>

      <div className="timeline">
        {items.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h4 className="timeline-title">{item.role}</h4>
              <span className="timeline-time">{item.period}</span>
            </div>
            <div className="timeline-subtitle">{item.program || item.location}</div>
            <ul className="timeline-list">
              {item.highlights?.map((highlight, hIdx) => (
                <li key={hIdx}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
