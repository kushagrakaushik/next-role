import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Roles from './pages/Roles'
import Navbar from './components/Navbar'
import { getAuth } from 'firebase/auth'
import Skills from './pages/Skills'

function App() {
  const [user, setUser] = useState(null)
  const auth = getAuth()
  const location = useLocation()

  const sidebarRoutes = ['/dashboard', '/roles', '/my-path', '/visualizer', '/skills', '/profile', '/settings']
  const showSidebarLayout = Boolean(user) && sidebarRoutes.some((path) => location.pathname.startsWith(path))

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [auth])

  return (
    <div className={showSidebarLayout ? 'flex min-h-screen' : ''}>
      <Navbar user={user} />
      <main className={showSidebarLayout ? 'flex-1 min-w-0' : ''}>
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/signup" element={<Signup user={user} />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </main>
    </div>
  )
}

export default App