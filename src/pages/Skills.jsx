import React from "react";
import { useState, useEffect } from "react";

export default function Skills() {
  const [Skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem("Skills");

    return savedSkills ? JSON.parse(savedSkills) : [];
  });

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    localStorage.setItem("Skills", JSON.stringify(Skills));
  }, [Skills]);

  const addSkill = () => {
    if (newSkill.trim() === "") return;
    const updatedSkill = [...Skills];
    updatedSkill.push(newSkill);
    setSkills(updatedSkill);
    setNewSkill("");
  };

  const deleteSkill = (indextodelete) => {
    const updatedSkills = Skills.filter((_, index) => index !== indextodelete);
    setSkills(updatedSkills);
  };

  return (
    <div className="p-8 text-white">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-bold">Your Skills</h1>
        <p className="text-zinc-400 text-lg">
          Add and manage your skills to get better recommendations.
        </p>
      </div>
      <div className="flex items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Add a Skill and press Enter..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none text-white placeholder:text-zinc-500 focus:border-violet-500/40 transition"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button
          className="bg-[#6D4AFF] hover:bg-violet-600 transition px-6 py-4 rounded-xl font-medium"
          onClick={addSkill}
        >
          Add Skill
        </button>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">
              Your Skills ({Skills.length})
            </h1>
          </div>
          <div className="flex flex-wrap gap-4">
            {Skills.map((skill, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#1B1330] border border-violet-500/10 px-5 py-3 rounded-xl flex items-center gap-3 hover:border-violet-500/30 transition"
                >
                  <span className="text-sm text-zinc-200">{skill}</span>
                  <button
                    className="text-zinc-500 hover:text-white transition text-lg"
                    onClick={() => deleteSkill(index)}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* here is suggested skill */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6"></div>
      </div>
    </div>
  );
}
