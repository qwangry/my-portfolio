import { Routes, Route } from "react-router-dom"
import { lazy } from "react"
import { Navbar } from "./components/Navbar"
import { resumeData } from "./data/resumeData"
import { Canvas } from "@react-three/fiber"
import StarBackground from "./components/StarBackground"

const Home = lazy(() => import("./pages/Home"));
const Education = lazy(() => import("./pages/Education"));
const Internship = lazy(() => import("./pages/Internship"));
const Projects = lazy(() => import("./pages/Projects"));
const Skill = lazy(() => import("./pages/Skill"));

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
