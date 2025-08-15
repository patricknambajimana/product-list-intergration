import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Products", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Add Product", path: "/add-product" },
  ];

  return (
    <nav className="bg-green-100 text-green-900 p-4 fixed top-0 left-0 right-0 z-20 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold">
          Product Management
        </NavLink>

        <button
          className="md:hidden text-green-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation">
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:space-x-6 text-lg absolute md:static top-16 left-0 right-0 bg-green-100 md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }: { isActive: boolean }) =>
                `hover:underline ${isActive ? "underline font-bold" : ""}`
              }
              onClick={() => setIsOpen(false)}>
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
