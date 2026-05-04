import React from 'react'
import Navbar from '../components/Navbar'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className='flex items-center justify-center w-full h-screen'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-white mb-4'>Not logged in</h1>
            <button 
              onClick={() => navigate('/login')}
              className='px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600'
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to Dashboard</h1>
          <p className='text-lg mb-6'>Email: {user.email}</p>
          <button 
            onClick={handleLogout}
            className='px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}