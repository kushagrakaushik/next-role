import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, UserRoundSearch, Route, ShieldCheck, ExternalLink, MapPin, Wifi, Briefcase } from "lucide-react"
import { useEffect } from 'react'
import { stats } from '../data/mockData'
import StatCard from '../components/StatCard'
import heroImage from '../assets/HeroImage.png'
import Topbar from "../components/Topbar"

const icons = {
  "Skills Added":     { icon: BadgeCheck,     iconColor: "bg-violet-500/10",  textColor: "text-violet-400" },
  "Matching Roles":   { icon: UserRoundSearch, iconColor: "bg-emerald-500/10", textColor: "text-emerald-400" },
  "Learning Paths":   { icon: Route,           iconColor: "bg-blue-500/10",    textColor: "text-blue-400" },
  "Profile Strength": { icon: ShieldCheck,     iconColor: "bg-yellow-500/10",  textColor: "text-yellow-400" },
}

function LiveRoleCard({ job }) {
  return (
    <div className="group p-4 bg-violet-500/10 rounded-xl flex flex-col gap-4 border border-zinc-800 cursor-pointer transition-all ease-in-out hover:bg-violet-500/20 hover:border-violet-500/40">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {job.logo ? (
            <img
              src={job.logo}
              alt={job.company}
              className="h-8 w-8 rounded-lg object-contain bg-white/10 p-0.5 shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
              <Briefcase className="h-4 w-4 text-violet-400" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm leading-tight truncate">{job.title}</h3>
            <p className="text-xs text-zinc-400 truncate">{job.company}</p>
          </div>
        </div>
        <span className="text-[10px] text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-2 py-0.5 shrink-0">
          {job.match}%
        </span>
      </div>

      {/* Match bar */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-zinc-400">{job.match}% Match</p>
        <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-violet-500 to-indigo-500 transition-all duration-700"
            style={{ width: `${job.match}%` }}
          />
        </div>
      </div>

      {/* Location / Remote */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 flex-wrap">
        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
        {job.remote && (
          <span className="flex items-center gap-1 text-emerald-400"><Wifi className="h-3 w-3" />Remote</span>
        )}
      </div>

      {/* Skills */}
      {job.skills.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="bg-violet-500/10 rounded-full px-3 text-violet-300 text-xs border border-violet-500/20">
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 text-xs text-violet-400 hover:text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        View & Apply <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="p-4 bg-violet-500/10 rounded-xl border border-zinc-800 animate-pulse flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-white/10" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-3 bg-white/10 rounded w-2/3" />
          <div className="h-2.5 bg-white/10 rounded w-1/3" />
        </div>
      </div>
      <div className="h-1 rounded-full bg-white/10 w-full" />
      <div className="flex gap-2">
        <div className="h-5 w-14 bg-white/10 rounded-full" />
        <div className="h-5 w-14 bg-white/10 rounded-full" />
      </div>
    </div>
  )
}

export default function Dashboard({ user, groupedJobs, jobsLoading }) {
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (!user) return null

  // Top 4 live jobs sorted by match score, fall back to empty while loading
  const topJobs = groupedJobs?.All
    ? [...groupedJobs.All].sort((a, b) => b.match - a.match).slice(0, 4)
    : []

  return (
    <div className='flex mx-4 md:mx-10 lg:mx-20 mt-6 lg:mt-10 flex-col gap-8'>
        <Topbar/>
      {/* Hero banner */}
      <div className='border border-zinc-800 w-full flex flex-col md:flex-row items-center justify-between rounded-3xl bg-linear-to-r from-violet-500/10 via-[#111117] to-[#111117] p-6 md:pl-10 md:p-0 backdrop-blur overflow-hidden'>
        <div className='flex flex-col gap-3 w-full md:w-1/2'>
          <h1 className='text-3xl md:text-4xl font-bold text-shadow-[0_0_0.5px_white] text-white'>What's your</h1>
          <h1 className='text-3xl md:text-4xl font-bold text-violet-500 text-shadow-[0_0_0.5px_white]'>Next Role?</h1>
          <p className='text-base md:text-lg mt-2'>Add your skills and let NextRole find the best career paths for you.</p>
        </div>
        <img src={heroImage} alt="Hero" className='w-full max-w-50 md:max-w-none md:w-1/2 h-auto opacity-50 mix-blend-lighten mt-6 md:mt-0 self-end md:self-auto' />
      </div>

      {/* Stat cards */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} tag={icons[stat.title]} />
        ))}
      </div>

      {/* Top Role Matches — live data */}
      <div className='w-full flex flex-col gap-5'>
        <div className='flex w-full items-center justify-between'>
          <h2 className='text-2xl text-white'>Top Role Matches</h2>
          <button
            onClick={() => navigate('/roles')}
            className='text-sm text-violet-400 hover:text-white transition-all ease-in-out hover:text-shadow-[0_0_1px_white] cursor-pointer'
          >
            View All
          </button>
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {jobsLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : topJobs.length > 0
              ? topJobs.map((job) => <LiveRoleCard key={job.id} job={job} />)
              : <p className="text-zinc-500 text-sm col-span-4">No live jobs loaded yet.</p>
          }
        </div>
      </div>
    </div>
  )
}