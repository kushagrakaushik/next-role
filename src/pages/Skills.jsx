import React from "react";
import { useState,useEffect } from "react";


export default function Skills(){

    const [Skills, setSkills] = useState(() => {
      const savedSkills = localStorage.getItem("Skills");

      return savedSkills ? JSON.parse(savedSkills) : [];
    });
    const [newSkill,setNewSkill]=useState("")
    

    useEffect(()=>{
        localStorage.setItem(
            "Skills",
            JSON.stringify(Skills)
        )
    },[Skills])

    const addSkill=()=>{
        if (newSkill.trim()==="") return;
        const updatedSkill=[...Skills]
        updatedSkill.push(newSkill)
        setSkills(updatedSkill)
        setNewSkill("")
    }

    const deleteSkill=(indextodelete)=>{
        const updatedSkills=Skills.filter(
            (_,index)=> index!==indextodelete
        )
        setSkills(updatedSkills)
    }
    

    return (
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-3 p-4 mb-4">
          <h1 className="text-white font-bold text-4xl">Your Skills</h1>
          <p>Add and manage your skills to get better recommendations.</p>
        </div>
        <div className="flex px-4 py-2 gap-8 mb-10">
          <input
            type="text"
            placeholder="Add a Skill and press Enter..."
            className="w-200 bg-white/5 p-3 rounded-lg"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
            className="bg-violet-500 text-white rounded-lg p-3"
            onClick={addSkill}
          >
            Add Skill
          </button>
        </div>
        <div className="">
          <h1>Your Skills ({Skills.length})</h1>
          <div className="flex flex-wrap gap-4">
            {Skills.map((skill, index) => {
              return (
                <div
                  key={index}
                  className="bg-white/5 px-5 py-3 rounded-xl border border-white/10 flex items-center gap-2"
                >
                  <span>{skill}</span>

                  <button className="text-gray-400 hover:text-white" onClick={()=>deleteSkill(index)}>×</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}