import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-800 text-white px-8 py-4 shadow-md z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link className="text-2xl font-bold" >
          📊 Excel Analytics
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-2xl text-black focus:outline-none bg-sky-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Links - Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          {!token && (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/upload" className="hover:text-gray-300">Upload</Link>
              <Link to="/charts" className="hover:text-gray-300">Charts</Link>
              <Link to="/help" className="hover:text-gray-300">Help</Link>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/admin/users" className="hover:text-gray-300">Manage Users</Link>
              <Link to="/admin/uploads" className="hover:text-gray-300">All Uploads</Link>
              <Link to="/admin/help" className="hover:text-gray-300">Support</Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-gray-700">
          {!token && (
            <>
              <Link to="/login" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link to="/dashboard" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/upload" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Upload</Link>
              <Link to="/charts" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Charts</Link>
              <Link to="/help" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Help</Link>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/admin/users" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Manage Users</Link>
              <Link to="/admin/uploads" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>All Uploads</Link>
              <Link to="/admin/help" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Support</Link>
            </>
          )}

          {token && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
