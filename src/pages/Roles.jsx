import React, { useState, useMemo } from 'react'
import { Search, MapPin, Building2, ExternalLink, Wifi, Loader2, Briefcase } from 'lucide-react'

const TABS = ['All', 'Frontend', 'Backend', 'Fullstack', 'UI/UX', 'Other Tech']

function JobSkeleton() {
  return (
    <div className="flex flex-col bg-white/5 rounded-2xl p-5 border border-white/10 animate-pulse gap-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/10" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-white/10 rounded w-2/3" />
          <div className="h-3 bg-white/10 rounded w-1/3" />
        </div>
      </div>
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
      <div className="flex gap-2 mt-1">
        <div className="h-6 w-16 bg-white/10 rounded-full" />
        <div className="h-6 w-16 bg-white/10 rounded-full" />
        <div className="h-6 w-16 bg-white/10 rounded-full" />
      </div>
    </div>
  )
}

function JobCard({ job }) {
  const timeAgo = (dateStr) => {
    if (!dateStr) return 'Recently'
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 30) return `${days}d ago`
    return `${Math.floor(days / 30)}mo ago`
  }

  return (
    <div className="group flex flex-col bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.07] transition-all duration-300 gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {job.logo ? (
            <img
              src={job.logo}
              alt={job.company}
              className="h-10 w-10 rounded-xl object-contain bg-white/10 p-1 shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          ) : (
            <div className="h-10 w-10 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
              <Briefcase className="h-5 w-5 text-violet-400" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm leading-tight truncate">{job.title}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 className="h-3 w-3 text-zinc-500 shrink-0" />
              <p className="text-xs text-zinc-400 truncate">{job.company}</p>
            </div>
          </div>
        </div>
        <span className="text-[10px] text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-2 py-0.5 shrink-0 whitespace-nowrap">
          {job.match}% match
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {job.location}
        </span>
        {job.remote && (
          <span className="flex items-center gap-1 text-emerald-400">
            <Wifi className="h-3 w-3" />
            Remote
          </span>
        )}
        <span className="text-zinc-600">·</span>
        <span>{job.type}</span>
        <span className="text-zinc-600">·</span>
        <span>{timeAgo(job.posted)}</span>
      </div>

      {/* Salary */}
      {job.salary && job.salary !== 'Not disclosed' && (
        <p className="text-sm font-medium text-emerald-400/90">{job.salary}</p>
      )}

      {/* Skills */}
      {job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="bg-violet-500/10 text-violet-300 px-3 py-1 rounded-full text-xs border border-violet-500/10"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-xs text-zinc-500 py-1">+{job.skills.length - 4} more</span>
          )}
        </div>
      )}

      {/* Apply */}
      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 w-full rounded-xl bg-violet-500/10 hover:bg-violet-500/25 border border-violet-500/20 hover:border-violet-500/50 text-violet-300 hover:text-white text-sm font-medium py-2.5 transition-all duration-200"
      >
        Apply Now
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

export default function Roles({ groupedJobs, jobsLoading }) {
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
    <div className="p-6 text-white min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Explore Roles</h1>
          <p className="text-zinc-400 text-sm">
            {jobsLoading
              ? 'Fetching live jobs…'
              : `${groupedJobs?.All?.length ?? 0} live jobs across all categories`}
          </p>
        </div>
        <div className="flex items-center bg-white/5 rounded-xl px-3 py-2 w-72 border border-white/10 focus-within:border-violet-500/40 transition">
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

      {/* Grid */}
      {jobsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => <JobSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-500">
          <Loader2 className="h-10 w-10 opacity-30" />
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