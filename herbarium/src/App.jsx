import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './Components/navbar'
import Home from './Pages/home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import World from './Pages/World'
import Quiz from './Pages/Quiz'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthUI from './Components/authentication/Auth-ui'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={
            <AuthUI />
          } />
          <Route path='/About' element={<ProtectedRoute>
            <Navbar/>
            <About />
          </ProtectedRoute>} />
          <Route path='/Home' element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path='/Contact' element={<ProtectedRoute>
            <Navbar/>
            <Contact />
          </ProtectedRoute>} />
          <Route path='/world' element={<ProtectedRoute>
            <World />
          </ProtectedRoute>} />
          <Route path='/Quiz' element={<ProtectedRoute>
            <Quiz />
          </ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
