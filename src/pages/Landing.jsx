import React, { useEffect } from 'react'
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
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">Next Role</h1>
            <p className="mt-4 text-lg md:text-xl text-zinc-400 max-w-xl">
              Find your next role faster — curated matches, skill visualizer, and tailored pathways to land the job you want.
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
              <Link to="/signup">
                <button className="bg-violet-500 hover:bg-violet-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition">
                  Get Started
                </button>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" /> Verified companies
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-violet-500" /> Skill matches
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md p-6 bg-zinc-900/80 backdrop-blur rounded-2xl border border-white/5 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold">Senior Frontend Engineer</h3>
                  <p className="text-zinc-400 mt-1">Acme Labs • Remote</p>
                </div>
                <div className="text-sm text-zinc-400">Match <span className="text-white font-semibold">88%</span></div>
              </div>

              <div className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
                <div className="px-2 py-1 bg-white/5 rounded">React</div>
                <div className="px-2 py-1 bg-white/5 rounded">TypeScript</div>
                <div className="px-2 py-1 bg-white/5 rounded">Design Systems</div>
              </div>

              <div className="mt-5 flex gap-3">
                <button className="flex-1 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg">View</button>
                <button className="flex-1 bg-transparent border border-white/10 text-zinc-100 px-4 py-2 rounded-lg">Save</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-zinc-500 text-sm">© {new Date().getFullYear()} NextRole — Built with ❤️</footer>
    </div>
  )
}