import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Map, BarChart3, User, Settings,LayersPlus } from "lucide-react";

export default function Navbar({user}) {
  const location = useLocation()
  const [side, setSide] = useState(Boolean(user))

  useEffect(() => {
    setSide(user)
  }, [user]);


  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Roles", path: "/roles", icon: Briefcase },
    { name: "My Path", path: "/my-path", icon: Map },
    { name: "Skills", path: "/skills",icon: LayersPlus },
    { name: "Visualizer", path: "/visualizer", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {!side ? (
        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-10 py-8 backdrop-blur-xl">
          <Link to="/" className="text-3xl font-semibold tracking-tight text-violet-400">
            NextRole
          </Link>

          <div className="flex items-center gap-3 text-sm font-medium">
            <Link to="/login" className="rounded-full text-[18px] mr-2 px-4 py-2 text-zinc-300 transition hover:bg-white/5 hover:text-white">
              Login
            </Link>
            <Link to="/signup" className="rounded-full bg-violet-500 px-4 py-2 text-[18px] transition hover:bg-violet-600 hover:text-white">
              Sign up
            </Link>
          </div>
        </nav>
      ) : (
        <aside className="h-screen w-64 shrink-0 border-r border-white/10 bg-[#070b14]/95 px-4 py-5 backdrop-blur-xl">
          <div className='flex align-items-center justify-between mb-10 mt-5 mx-2'>
          <Link to="/dashboard" className="text-4xl font-semibold tracking-tight text-violet-400">
            NextRole
          </Link>
          </div>

          <div className="flex flex-1 flex-col gap-2 text-sm font-medium text-zinc-300">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                    ${isActive 
                      ? "bg-violet-500/20" 
                      : "hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className={`grid h-6 w-6 place-items-center rounded-lg transition ${isActive ? "bg-violet-500":"bg-white/5"}`}>
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