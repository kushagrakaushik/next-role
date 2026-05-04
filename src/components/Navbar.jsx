import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { LayoutDashboard, Briefcase, Map, BarChart3, User, Settings } from "lucide-react";

export default function Navbar() {
  const auth = getAuth()
  const [user, setUser] = useState(auth.currentUser)
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [auth])

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Roles", path: "/roles", icon: Briefcase },
    { name: "My Path", path: "/my-path", icon: Map },
    { name: "Visualizer", path: "/visualizer", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

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
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                    ${isActive 
                      ? "bg-violet-500/20 text-white" 
                      : "hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className={`grid h-6 w-6 place-items-center rounded-lg transition ${isActive ? "hover:bg-violet-500":"bg-white/5"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>

        </aside>
      )}
    </>
  )
}