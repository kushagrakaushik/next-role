import React from "react";

export default function Skills(){
    return (
        <div className="flex flex-col p-6">
            <div className="flex flex-col gap-3 p-4 mb-6">
                <h1 className="text-white font-bold text-4xl">Your Skills</h1>
                <p>Add and manage your skills to get better recommendations.</p>
            </div>
            <div className="flex p-4">
                <input type="text" placeholder="Add a Skill and press Enter..." className="w-96 bg-white/5 p-3 rounded-lg"/>
            </div>
            <div></div>

        </div>
    )
}