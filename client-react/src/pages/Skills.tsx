import React from 'react'
import { Link } from 'react-router-dom'

const Skills: React.FC = () => {
  return (
    <section className="container skills" style={{ padding: 20 }}>
        <h2>My Tech Toolbox</h2>
            <p>Here is a list of tools I have experience with, and some simple demonstations of them linked:</p>
            <ul>
                <li><Link to="/socketdemo">WebSockets</Link></li>
                <li><Link to="/pdfdemo">PDF Generation</Link></li>
            </ul>
    </section>
  )
}

export default Skills
