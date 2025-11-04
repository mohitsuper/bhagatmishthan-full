import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  return (
    <aside className="w-100 bg-indigo-500 text-white flex flex-col h-full">
      <div className="flex-shrink-0 pl-10 pt-10">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <img src="asstes/logo/logo.png" alt="Logo" className="h-15 w-auto" />
        </Link>
      </div>
      <nav className="flex-1 p-10 space-y-2">
        <Link
          to="/"
          className="block py-2 px-3 rounded hover:bg-indigo-400 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/topbar"
          className="block py-2 px-3 rounded hover:bg-indigo-400 transition"
        >
          Topbar
        </Link>
        <Link
          to="/banner"
          className="block py-2 px-3 rounded hover:bg-indigo-400 transition"
        >
          Banner
        </Link>
        <Link
          to="/users"
          className="block py-2 px-3 rounded hover:bg-indigo-400 transition"
        >
          Users
        </Link>
        <div
          onClick={() => setIsopen(!isOpen)}
          className="block py-2 px-3 rounded hover:bg-indigo-400 transition font-bold"
        >
          Products
          {isOpen && (
            <ul className="space-y-3 pt-3 px-3 font-normal">
              <li>
                <Link to="/best-seller-product">Product List</Link>
              </li>
              <li>
                <Link to="/product-type">Product Type</Link>
              </li>
               <li>
                <Link to="/category">Category</Link>
              </li>
              <li>
                <Link to="/management-products">Management Products</Link>
              </li>
            </ul>
          )}
        </div>
        <Link
          to="/orders"
          className="block py-2 px-3 rounded hover:bg-indigo-400 transition"
        >
          Orders
        </Link>
        <Link
          to="/settings"
          className="block py-2 px-3 rounded hover:bg-indigo-400 transition"
        >
          Settings
          <ul>
            <li className="text-sm text-gray-300">Profile</li>
            <li className="text-sm text-gray-300">Billing</li>
            <li className="text-sm text-gray-300">Customize</li>
            <li className="text-sm text-gray-300">Notifications</li>
            <li className="text-sm text-gray-300">Integrations</li>
            <li className="text-sm text-gray-300">API</li>
          </ul>
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 rounded">
          Logout
        </button>
      </div>
    </aside>
    // <nav className="w-full h-full bg-indigo-500 text-white shadow-md">
    //   <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-10">
    //     <div className="flex-col gap-10 items-center flex">

    //       {/* Logo */}
    //       <div className="flex-shrink-0">
    //         <a href="/" className="text-2xl font-bold tracking-wide">
    //           <img src="asstes/logo/logo.png" alt="Logo" className="h-20 w-auto mx-auto"/>
    //         </a>
    //       </div>

    //       {/* Menu Items */}
    //       <div className="flex-col flex gap-6">
    //         <a href="#" className="hover:text-gray-300 transition">Desktop</a>
    //         <a href="#" className="hover:text-gray-300 transition">Topbar</a>
    //         <a href="#" className="hover:text-gray-300 transition">Product</a>
    //         <a href="#" className="hover:text-gray-300 transition">User</a>
    //         <a href="#" className="hover:text-gray-300 transition">Show Products</a>
    //       </div>

    //       {/* Optional: Mobile Menu Icon */}
    //       <div className="md:hidden">
    //         <button type="button" className="text-white focus:outline-none">
    //           <svg
    //             className="h-6 w-6"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M4 6h16M4 12h16M4 18h16"
    //             />
    //           </svg>
    //         </button>
    //       </div>

    //     </div>
    //   </div>
    // </nav>
  );
}
