import React from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}


      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Example cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl font-bold mt-2">1,245</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl font-bold mt-2">320</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-2xl font-bold mt-2">$12,540</p>
          </div>
        </div>
      </main>
    </div>
  );
}
