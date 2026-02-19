import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

const NavBar: React.FC = () => {
  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elems)
  }, [])

  return (
    <nav className="white" role="navigation">
      <div className="nav-wrapper" style={{ padding: '0 12px' }}>
        <Link to="/" className="brand-logo" id="logo-container" style={{ paddingTop: 0, paddingBottom: 10 }}>
          <img src="/images/amlogo.png" alt="logo" height={50} width={90} />
        </Link>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/resume">Resume</Link></li>
          <li>
            <a href="https://github.com/tizme" target="_blank" rel="noreferrer">
              <img src="/images/github.png" alt="GitHub" height="20" width="20" /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/aaronmanill/" target="_blank" rel="noreferrer">
              <img src="/images/linkedin.png" alt="LinkedIn" height="20" width="60" />
            </a>
          </li>
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/resume">Resume</Link></li>
          <li><Link to="/stripe-demo">Stripe Demo</Link></li>
          <li>
            <a href="https://github.com/tizme" target="_blank" rel="noreferrer">
              <img src="/images/github.png" alt="GitHub" height="20" width="20" /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/aaronmanill/" target="_blank" rel="noreferrer">
              <img src="/images/linkedin.png" alt="LinkedIn" height="20" width="60" />
            </a>
          </li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  )
}

export default NavBar
