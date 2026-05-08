import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Landing({ user }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  return (
    <div>
      <div className='w-full h-screen flex flex-col gap-10 items-center justify-center p-4 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold'>Next Role</h1>
        <h2 className='text-5xl md:text-7xl text-zinc-400'>blahh..</h2>
        <Link to="/signup">
        <button className='text-xl md:text-2xl bg-purple-600 p-3 md:p-4 rounded-xl hover:bg-purple-700 transition'>Get Started</button>
        </Link>
      </div>
    </div>
  )
}