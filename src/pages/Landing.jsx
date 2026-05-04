import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className='w-full h-screen flex flex-col gap-10 items-center justify-center'>
        <h1 className='text-4xl'>Next Role</h1>
        <h2 className='text-7xl'>blahh..</h2>
        <Link to="/signup">
        <button className='text-2xl bg-purple-600 p-3 rounded-xl'>Get Started</button>
        </Link>
      </div>
    </div>
  )
}