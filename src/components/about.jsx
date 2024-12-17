import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
            <div className="text-lg font-bold">My Portfolio</div>
          

                <ul className="hidden sm:flex justify-end w-full pr-4 gap-2 pt-5 sm:pr-14 sm:gap-8">
                    <li><a href="x" className="hover:text-blue-500 hover:underline font-bold">Home</a></li>
                    <li><a href="x" className="hover:text-blue-500 hover:underline font-bold">About me</a></li>
                    <li><a href="x" className="hover:text-blue-500 hover:underline font-bold">Work</a></li>
                    <li><a href="x" className="hover:text-blue-500 hover:underline font-bold">Skills</a></li>
                    <li><a href="x" className="hover:text-blue-500 hover:underline font-bold">Contact me</a></li>
                </ul>

          {/* Hamburger Button */}
          <button
            className="sm:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Sliding Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-700 text-white w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <button
          className="absolute top-4 right-4 text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          ✖
        </button>
        <div className="flex flex-col mt-16 space-y-4 pl-4">
          <a href="#home" className="text-black hover:text-gray-400" onClick={toggleMenu}>
            Home
          </a>
          <a href="#about" className="hover:text-gray-400" onClick={toggleMenu}>
            About
          </a>
          <a href="#projects" className="hover:text-gray-400" onClick={toggleMenu}>
            Projects
          </a>
          <a href="#contact" className="hover:text-gray-400" onClick={toggleMenu}>
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;