import React from 'react'
import Navbar from '../components/Navbar'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Search, Bell } from "lucide-react"

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
      <div className='ml-64 p-6 text-white'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center bg-white/5 rounded-lg px-3 py-2 w-72'>
            <Search className="h-4 w-4 text-zinc-400 mr-2" />
            <input
              type="text"
              placeholder='Search for roles or skills'
              className="bg-transparent outline-none text-sm text-white placeholder:text-zinc-400 w-full"
            />
          </div>
          <div className='flex items-center gap-4'>
            <div className='p-2 rounded-lg hover:bg-white/5 cursor-pointer transition'>
              <Bell className='h-5 w-5 text-zinc-300' />
            </div>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center text-sm font-semibold text-white'>
                {user?.email?.[0]?.toUpperCase()}
              </div>
              <span className='text-sm text-white'>
                {user?.email}
              </span>
            </div>
          </div>
        </div>
        <div>
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