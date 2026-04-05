import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const MenuButton = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1 rounded transition-colors font-medium text-sm
      ${active
        ? "bg-blue-600 text-white"
        : "bg-gray-700 text-white hover:bg-blue-600"
      }`}
  >
    {label}
  </button>
);

const Navbar = () => {
  const { user, logout }    = useAuth();
  const navigate            = useNavigate();
  const location            = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isHistory = location.pathname === "/history";

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-gray-700">

      <div className="flex justify-between items-center h-[65px] px-4">

        {/* Logo */}
        <p
          onClick={() => navigate("/editor")}
          className="text-2xl font-semibold cursor-pointer hover:text-blue-500 transition-colors"
        >
          CodeReview-AI
        </p>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-4 items-center">

          <MenuButton
            label="History"
            onClick={() => { navigate("/history"); setIsOpen(false); }}
            active={isHistory}
          />

          <li className="bg-gray-700 cursor-default text-white px-4 py-1 rounded-full text-sm">
            {user?.name || "User"}
          </li>

          {user && (
            <button
              onClick={handleLogout}
              className="bg-gray-700 px-3 py-1 rounded text-white text-sm hover:bg-blue-600 transition-colors"
            >
              Logout
            </button>
          )}

        </ul>

        {/* Hamburger */}
        <div
          className="md:hidden cursor-pointer text-2xl select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-gray-700">

          <MenuButton
            label="History"
            onClick={() => { navigate("/history"); setIsOpen(false); }}
            active={isHistory}
          />

          <li className="list-none bg-gray-700 text-white px-4 py-1 rounded-full cursor-default text-sm">
            {user?.name || "User"}
          </li>

          {user && (
            <button
              onClick={handleLogout}
              className="bg-gray-700 px-4 py-1 rounded text-white text-sm hover:bg-blue-600 transition-colors w-40 text-center"
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