import React from 'react'
import { BadgeCheck, UserRoundSearch, Route, ShieldCheck } from "lucide-react"

export default function Role({role}) {
  return (
    <div className={`p-3 px-8 bg-violet-500/10 rounded-xl flex items-center flex-col gap-5 border-zinc-800 border cursor-pointer transition-all ease-in-out hover:bg-violet-500/20`}>
        <div className='flex items-center justify-between w-full'>
            <BadgeCheck />
            <h3 className='text-white text-center w-full'>{role.title}</h3>
        </div>

        <div className='flex w-full flex-col gap-2 justify-center'>
            <p className='text-xs'>{role.match + '%' + ' Match'}</p>
            {/* Progress Bar */}
            <div className='h-1 rounded-full bg-zinc-800 overflow-hidden w-full'>
                <div className='h-full bg-linear-to-r from-violet-500 to-indigo-500' style={{ width: `${role.match}%` }}></div>
            </div>
        </div>

        <div className='w-full flex flex-row justify-center items-center gap-2 flex-wrap'>
            {role.skills.map((skill) => (<div className='bg-violet-500/10 rounded-full px-3 text-violet-300 text-xs border border-violet-500/20'>{skill}</div>))}
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-1'>
            <p className='text-green-500/70'>Growth: {role.growth}/hr</p>
            <p className=''>Salary: {role.salary}/hr</p>
        </div>

        <p className='text-xs text-violet-400 transition-all ease-in-out hover:text-shadow-[0_0_1px_white]'>View Path</p>
    </div>
  )
}