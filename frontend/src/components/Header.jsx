import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: install lucide-react for icons

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-2xl font-bold">Explore Ease</h1>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-blue-600 md:static md:block md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 md:items-center p-4 md:p-0">
            <Link
              to="/home"
              className="hover:text-blue-300 transition-colors py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/prefernce"
              className="hover:text-blue-300 transition-colors py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Preferences
            </Link>
            <Link
              to="/chat"
              className="hover:text-blue-300 transition-colors py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              to="/translator"
              className="hover:text-blue-300 transition-colors py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Translation
            </Link>
            <Link
              to="/"
              className="hover:text-blue-300 transition-colors py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              LogOut
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
