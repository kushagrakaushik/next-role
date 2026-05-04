import React from 'react'
import Navbar from '../components/Navbar'
import SignupForm from '../components/SignupForm'

export default function Signup() {
  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center w-full h-screen'>
        <SignupForm defaultMode="signup" />
      </div>
    </>
  )
}