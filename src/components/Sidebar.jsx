import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const sideItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Roles", path: "/roles" },
  ];

  return (
    <div className="w-64 h-full bg-[#0B0F1A] text-white p-4 border-r border-gray-800">
      
      <div className="text-2xl font-semibold mb-8">
        Next Role
      </div>

      <div className="flex flex-col gap-3 text-sm">
        {sideItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition 
                ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}