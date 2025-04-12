import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Education from "./pages/Education"
import Internship from "./pages/Internship"
import Projects from "./pages/Projects"
import Skill from "./pages/Skill"
import { Navbar } from "./components/Navbar"
import { resumeData } from "./data/resumeData"
import { Canvas } from "@react-three/fiber"
import StarBackground from "./components/StarBackground"

function App() {

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1, // 确保在内容层下方
          width: '100vw',
          height: '100vh'
        }}
      >
        <StarBackground />
      </Canvas>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home name={resumeData.name} contact={resumeData.contact} />} />
          <Route path="/education" element={<Education education={resumeData.education} />} />
          <Route path="/internship" element={<Internship internship={resumeData.internship} />} />
          <Route path="/projects" element={<Projects projects={resumeData.projects} />} />
          <Route path="/skills" element={<Skill skills={resumeData.skills} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
