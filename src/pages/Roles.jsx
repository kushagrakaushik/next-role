import React from 'react'
import { useState } from 'react'
import {Search,Bell} from 'lucide-react'
import { roleCategories } from '../data/mockData'

export default function Roles() {
  const name="hee"

  const [acitvecategories,setActivecategories]=useState(0)

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-white/5 rounded-lg px-3 py-2 w-72">
          <Search className="h-4 w-4 text-zinc-400 mr-2" />
          <input
            type="text"
            placeholder="Search for roles or skills"
            className="bg-transparent outline-none text-sm text-white placeholder:text-zinc-400 w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition">
            <Bell className="h-5 w-5 text-zinc-300" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center text-sm font-semibold text-white">
              {name[0].toUpperCase()}
            </div>
            <span className="text-sm text-white">{name}</span>
          </div>
        </div>
      </div>
      {/* Roles Content */}
      <div>
        <div>
          <h1>Explore Roles</h1>
          <p className='text-white/5'>Discover roles and find the best path for your career.</p>
        </div>
        <div className='flex items-center gap-4'>
        {roleCategories.map((type,index)=>{
          return(<button 
            key={index}
            className={`rounded-lg px-4 py-1 cursor-pointer ${acitvecategories===index? "bg-violet-600" : "bg-white/5" }`}
            onClick={()=>setActivecategories(index)}
            >
              {type.type}
            </button>
          )
        })}
        </div>
        <div className='grid grid-cols-4 gap-4 mt-6'>
          {roleCategories[acitvecategories].roles.map((role,index)=>{
            return(<div className='flex flex-col bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-violet-500/30 transition' key={index}>
              <h1>{role.title}</h1>
              <p>{role.match}% Match</p>
              <p>{role.description}</p>
              <div className="flex flex-wrap gap-2 mt-4"
              >
                {role.skills.map((skill)=>{
                  return(
                    <div className="bg-violet-500/10 text-violet-300 px-3 py-1 rounded-full text-x" key={skill.id}>
                      <p>{skill}</p></div>
                  )
                })}
              </div>
              </div>
            )
          })}
        </div>
      </div>


    </div>
  );
}