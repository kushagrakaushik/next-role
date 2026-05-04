import React from 'react'
import Navbar from '../components/Navbar'

export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className='w-full h-screen flex items-center justify-center'>
        <h1 className='text-4xl font-bold'>Next Role</h1>
      </div>
    </div>
  )
}