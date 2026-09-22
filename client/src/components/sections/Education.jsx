import React from 'react';

export const Education = ({ education, certifications }) => {
  const defaultEdu = [
    {
      institution: 'Bundelkhand University · Jhansi, India',
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      period: 'Expected June 2027',
      gpa: '8.02 / 10.0',
      rank: '5th in cohort',
      details: [
        'Core studies in Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems, Computer Networks, and Software Engineering.',
      ],
    },
  ];

  const defaultCerts = [
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
  ];

  const eduItems = education?.length ? education : defaultEdu;
  const certItems = certifications?.length ? certifications : defaultCerts;

  return (
    <section id="education" className="content-section">
      <div className="section-header">
        <h2 className="section-title">Education & Certifications</h2>
        <h3 className="section-subtitle">Academic rigor combined with cutting-edge industry credentials!</h3>
      </div>

      <div className="timeline">
        {eduItems.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h4 className="timeline-title">{item.institution}</h4>
              <span className="timeline-time">{item.period}</span>
            </div>
            <div className="timeline-subtitle">{item.degree}</div>
            <ul className="timeline-list">
              <li>
                <strong>Academic Standing:</strong> GPA: <strong>{item.gpa}</strong> · Academic Rank:{' '}
                <strong>{item.rank}</strong>.
              </li>
              {item.details?.map((d, dIdx) => (
                <li key={dIdx}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h4
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: 'var(--foreground)',
        }}
      >
        Professional Certifications
      </h4>

      <div className="certifications-grid">
        {certItems.map((cert, idx) => (
          <div key={idx} className="cert-card">
            <div className="cert-icon">
              {idx === 0 ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              )}
            </div>
            <div className="cert-info">
              <h4>{cert.title}</h4>
              <p>
                Issued by <strong>{cert.issuer}</strong> · {cert.date}
              </p>
              <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{cert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
