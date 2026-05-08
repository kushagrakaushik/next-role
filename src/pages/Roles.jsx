import React, { useState, useMemo } from 'react'
import { Search, MapPin, Building2, ExternalLink, Wifi, Loader2, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../components/JobCard'
import JobSkeleton from '../components/JobSkeleton'

const TABS = ['All', 'Frontend', 'Backend', 'Fullstack', 'UI/UX', 'Other Tech']

export default function Roles({ groupedJobs, jobsLoading, user }) {
  const navigate = useNavigate()
    if (!user) {
        navigate('/login')
    }

  const [activeTab, setActiveTab] = useState('All')
  const [query, setQuery] = useState('')

  const jobs = groupedJobs?.[activeTab] ?? []

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return jobs
    return jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q))
    )
  }, [jobs, query])

  return (
    <div className="p-4 md:p-6 text-white min-h-screen">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Explore Roles</h1>
          <p className="text-zinc-400 text-sm">
            {jobsLoading
              ? 'Fetching live jobs…'
              : `${groupedJobs?.All?.length ?? 0} live jobs across all categories`}
          </p>
        </div>
        <div className="flex items-center bg-white/5 rounded-xl px-3 py-2 w-full md:w-72 border border-white/10 focus-within:border-violet-500/40 transition">
          <Search className="h-4 w-4 text-zinc-400 mr-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles, companies, skills…"
            className="bg-transparent outline-none text-sm text-white placeholder:text-zinc-500 w-full"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {TABS.map((tab) => {
          const count = groupedJobs?.[tab]?.length ?? 0
          return (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setQuery('') }}
              className={`rounded-xl px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab}
              {!jobsLoading && count > 0 && (
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                  activeTab === tab ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Job Grid */}
      {jobsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => <JobSkeleton key={i} job={[]}/>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-500">
          <Loader2 className="h-10 w-10 opacity-30 animate-spin" />
          <p className="text-lg">
            {query ? `No results for "${query}"` : 'No jobs in this category yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}