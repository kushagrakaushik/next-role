import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  let user = false; // to be replaced with actual user authentication logic
  return (
    <nav className = 'w-full fixed items-center flex justify-between px-10 py-4 top-0 lef-0'>
      <Link to="/" className = "text-xl font-bold">
        Next Role
      </Link>
      <div className = "flex gap-6">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}
      </div>
    </nav>
  )
}