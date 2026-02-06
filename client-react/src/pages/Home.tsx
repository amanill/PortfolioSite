import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [apiMsg, setApiMsg] = useState<string>('Loading...');
  const [welcome, setWelcome] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    axios
      .get('/api/hello')
      .then((res) => setApiMsg(res.data.msg || JSON.stringify(res.data)))
      .catch(() => setApiMsg('API request failed'));

    const s = io();
    setSocket(s);

    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    s.on('welcome', (data: any) => setWelcome(data?.message || ''));

    return () => {
      s.disconnect();
    };
  }, []);

  const sendClick = () => {
    socket?.emit('button_clicked', { reason: 'demo button from React client' });
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-inner container">
            <h1 className="hero-title">Aaron Manill — Web Developer</h1>
            <p className="hero-sub">Full-stack & mobile developer. MEAN, Django, Swift — building ideas into products.</p>
            <div style={{ marginTop: 18 }}>
              <Link to="/projects" className="btn-large teal">View Projects</Link>
              <button onClick={sendClick} className="btn-flat white-text" style={{ marginLeft: 12 }}>Send Demo Event</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container about-section" style={{ padding: '28px 0' }}>
        <div className="row valign-wrapper">
          <div className="col s12 m4">
            <img src="/images/me.jpg" alt="Aaron Manill" style={{ width: '100%', borderRadius: 8 }} />
          </div>
          <div className="col s12 m8">
            <h3>About Me</h3>
            <p>
              I'm a full-stack and mobile developer who focuses on shipping useful products. I work with
              JavaScript, Node, Angular/React, Python/Django, and Swift for iOS. I enjoy building realtime
              features and clean user experiences.
            </p>
            <p>
              <a href="/images/a-manill-resume.pdf" target="_blank" rel="noreferrer" className="btn-small teal">Download Resume</a>
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '28px 0' }}>
        <h3>Quick Status</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="card-panel blue-grey lighten-5" style={{ padding: 12, minWidth: 220 }}>
            <strong>API:</strong> {apiMsg}
          </div>
          <div className="card-panel blue-grey lighten-5" style={{ padding: 12, minWidth: 160 }}>
            <strong>Socket:</strong> {connected ? 'connected' : 'disconnected'}
          </div>
          <div className="card-panel blue-grey lighten-5" style={{ padding: 12, minWidth: 220 }}>
            <strong>Welcome:</strong> {welcome || '—'}
          </div>
        </div>
      </section>

      <section className="container card-grid">
        <h3>Featured Projects</h3>
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card">
              <div className="card-image">
                <img src="/images/bentome.jpg" alt="Bentome" />
              </div>
              <div className="card-content">
                <span className="card-title">Bentome</span>
                <p>Interactive demo converted from legacy site. Click to learn more.</p>
              </div>
            </div>
          </div>

          <div className="col s12 m6 l4">
            <div className="card">
              <div className="card-image">
                <img src="/images/splash.jpg" alt="Demo" />
              </div>
              <div className="card-content">
                <span className="card-title">Demo App</span>
                <p>Small utilities and prototypes exploring web UX and real-time features.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;
