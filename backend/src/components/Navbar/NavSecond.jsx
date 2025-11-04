import React from "react";

export default function NavSecond() {
  return (
<div className="bg-[#364153] p-4 sticky top-0 z-10 shadow-md">
  <div className="flex items-center justify-end gap-4 w-full max-w-7xl mx-auto">
    <span className="font-semibold text-white">Admin</span>
    <div className="relative">
      <i className="fa-solid fa-circle-user text-2xl text-white hover:text-indigo-600 cursor-pointer transition-colors"></i>
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
    </div>
  </div>
</div>

  );
}
