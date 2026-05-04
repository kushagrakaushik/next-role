import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Navbar() {
  const auth = getAuth()
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return unsubscribe
  }, [auth])

  return (
    <>
      {!user ? (
        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#070b14]/90 px-6 py-4 backdrop-blur-xl">
          <Link to="/" className="text-xl font-semibold tracking-tight text-violet-400">
            NextRole
          </Link>

          <div className="flex items-center gap-3 text-sm font-medium">
            <Link to="/login" className="rounded-full px-4 py-2 text-zinc-300 transition hover:bg-white/5 hover:text-white">
              Login
            </Link>
            <Link to="/signup" className="rounded-full bg-violet-500 px-4 py-2 text-white transition hover:bg-violet-600">
              Sign up
            </Link>
          </div>
        </nav>
      ) : (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#070b14]/95 px-4 py-5 backdrop-blur-xl">
          <Link to="/dashboard" className="mb-8 text-2xl font-semibold tracking-tight text-violet-400">
            NextRole
          </Link>

          <div className="flex flex-1 flex-col gap-2 text-sm font-medium text-zinc-300">
            <Link to="/dashboard" className="flex items-center gap-3 rounded-xl bg-violet-500/20 px-4 py-3 text-white">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-violet-500 text-xs font-semibold text-white">D</span>
              Dashboard
            </Link>
            <Link to="/roles" className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/5 text-xs">R</span>
              Roles
            </Link>
            <Link to="/my-path" className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/5 text-xs">P</span>
              My Path
            </Link>
            <Link to="/visualizer" className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/5 text-xs">V</span>
              Visualizer
            </Link>
            <Link to="/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/5 text-xs">P</span>
              Profile
            </Link>
            <Link to="/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/5 text-xs">S</span>
              Settings
            </Link>
          </div>
        </aside>
      )}
    </>
  )
}