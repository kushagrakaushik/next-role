import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import Navbar from '../components/Navbar'

export default function Landing() {
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/dashboard')
    }
  }, [auth.currentUser, navigate])

  return (
    <div>
      <Navbar />
      <div className='w-full h-screen flex items-center justify-center'>
        <h1 className='text-4xl font-bold'>Next Role</h1>
      </div>
    </div>
  )
}