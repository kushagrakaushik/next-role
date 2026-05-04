import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import Navbar from '../components/Navbar'
import SignupForm from '../components/SignupForm'

export default function Login() {
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/dashboard')
    }
  }, [auth.currentUser, navigate])

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center w-full h-screen'>
        <SignupForm defaultMode="login" />
      </div>
    </>
  )
}