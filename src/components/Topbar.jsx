import React from "react"
import { Search , Bell } from "lucide-react"

export default function Topbar(){
    const name = "hee"
    return(
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center bg-white/5 rounded-lg px-3 py-2 w-full sm:w-72">
                <Search className="h-4 w-4 text-zinc-400 mr-2 shrink-0" />
                <input
                    type="text"
                    placeholder="Search for roles or skills"
                    className="bg-transparent outline-none text-sm text-white placeholder:text-zinc-400 w-full min-w-0"
                />
            </div>
            <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="p-2 rounded-lg hover:bg-white/5 cursor-pointer transition">
                    <Bell className="h-5 w-5 text-zinc-300" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center text-sm font-semibold text-white">
                        {name[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-white">
                        {name}
                    </span>
                </div>
            </div>
        </div>
    )
}

