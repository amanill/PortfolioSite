import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import NavBar from './components/NavBar'
import SocketDemo from './pages/SocketDemo'

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/socketDemo" element={<SocketDemo />} />
      </Routes>
    </div>
  )
}

export default App
