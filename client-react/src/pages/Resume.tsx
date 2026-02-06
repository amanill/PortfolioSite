import React from 'react'

const Resume: React.FC = () => {
  return (
    <section className="container resume" style={{ padding: 20 }}>
      <h2>Resume</h2>
      <p>
        Download: <a href="/images/a-manill-resume.pdf" target="_blank" rel="noreferrer">PDF</a>
      </p>
      <img src="/images/resume.jpg" alt="resume" style={{ maxWidth: '600px', width: '100%' }} />
    </section>
  )
}

export default Resume
