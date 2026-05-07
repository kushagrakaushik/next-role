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
import Profile from './pages/Profile'
import { getJobsData } from './services/jSearch'

function App() {
  const [user, setUser] = useState(null)
  const [groupedJobs, setGroupedJobs] = useState(null)
  const [jobsLoading, setJobsLoading] = useState(true)

  const auth = getAuth()

  const showSidebarLayout = Boolean(user)

  // Single fetch point — module-level cache prevents duplicate calls
  useEffect(() => {
    getJobsData().then((result) => {
      setGroupedJobs(result.groupedJobs) 
      setJobsLoading(false)
    })
  }, [])

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
          <Route path="/skills" element={<Skills />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard user={user} groupedJobs={groupedJobs} jobsLoading={jobsLoading} />} />
          <Route path="/roles" element={<Roles groupedJobs={groupedJobs} jobsLoading={jobsLoading} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App