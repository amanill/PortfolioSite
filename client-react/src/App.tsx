import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import NavBar from './components/NavBar'
import SocketDemo from './pages/SocketDemo'
import Skills from './pages/Skills'
import PDFDemo from './pages/PDFDemo'
import DiscordDemo from './pages/DiscordDemo';

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/socketDemo" element={<SocketDemo />} />
        <Route path="/pdfdemo" element={<PDFDemo />} />
        <Route path="/discord-demo" element={<DiscordDemo />} />
      </Routes>
    </div>
  )
}

export default App
