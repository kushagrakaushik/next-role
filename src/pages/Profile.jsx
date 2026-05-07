import React from "react";
import { PencilLine } from 'lucide-react';

export default function Profile(){
    return(
        // main page container
        <div className="p-8 text-white min-h-screen">
            {/* top heading section */}
            <div className="flex justify-between items-center">
                {/* page title */}
                <div className="text-3xl font-bold">
                    Profile Overview
                </div>
                {/* edit profile button */}
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 cursor-pointer">
                    <PencilLine className="h-5 w-5"/>
                    <button>
                        Edit Profile
                    </button>
                </div>
            </div>
            {/* profile + stats section */}
            <div className="grid grid-cols-3 gap-6 mt-8">
                {/* left profile card */}
                <div className="col-span-1 bg-white/5 rounded-2xl p-6 border border-white/10">
                    {/* profile info */}
                    <div className="flex items-center gap-4">
                        {/* profile image */}
                        <div className="h-14 w-14 rounded-full bg-purple-600 flex items-center justify-center text-2xl">
                            A
                        </div>
                        {/* name and email */}
                        <div>
                            <h2 className="text-xl font-semibold">
                                Adi Sharma
                            </h2>
                            <p className="text-gray-400 text-sm">
                                adi.sharma@example.com
                            </p>
                        </div>
                    </div>
                    {/* profile strength */}
                    <div className="mt-8">
                        <div className="flex justify-between text-sm mb-2">
                            <p>Profile Strength</p>
                            <p>78%</p>
                        </div>
                        {/* progress bar */}
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-[78%] h-full bg-purple-500 rounded-full"></div>
                        </div>
                    </div>
                    {/* recent activity */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">
                            Recent Activity
                        </h3>
                        <div className="flex flex-col gap-3 text-sm text-gray-300">
                            <p>• Added new skill TypeScript</p>
                            <p>• Explored role Backend Developer</p>
                            <p>• Saved path Frontend Developer</p>
                        </div>
                    </div>
                </div>
                {/* stats cards section */}
                <div className="col-span-2 flex flex-col gap-6">
                    {/* top stats cards */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* skills card */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h2 className="text-4xl font-bold text-purple-400">
                                12
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Skills Added
                            </p>
                        </div>
                        {/* roles card */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h2 className="text-4xl font-bold text-orange-400">
                                8
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Roles Matched
                            </p>
                        </div>
                        {/* paths card */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h2 className="text-4xl font-bold text-blue-400">
                                5
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Paths Saved
                            </p>
                        </div>
                    </div>
                    {/* saved paths section */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        {/* saved paths heading */}
                        <h2 className="text-xl font-semibold mb-6">
                            Saved Paths
                        </h2>
                        {/* saved paths cards */}
                        <div className="flex flex-col gap-4">
                            {/* single path card */}
                            <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl">
                                <div>
                                    <h3 className="font-medium">
                                        Frontend Developer
                                    </h3>
                                </div>
                                <p className="text-green-400 text-sm">
                                    92% Match
                                </p>
                            </div>
                            {/* single path card */}
                            <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl">
                                <div>
                                    <h3 className="font-medium">
                                        Full Stack Developer
                                    </h3>
                                </div>
                                <p className="text-green-400 text-sm">
                                    89% Match
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}