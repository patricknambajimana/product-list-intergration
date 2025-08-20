import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  MessageSquareDot,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Products", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Add Product", path: "/add-product" },
  ];

  const gotoCart = () => navigate("/cart");

  return (
    <nav className="bg-green-900 text-white fixed top-0 left-0 right-0 z-20 shadow-md p-4">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <NavLink to="/" className="text-xl font-bold">
            Product Management
          </NavLink>
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 w-full md:w-auto
            absolute md:static left-0 right-0 top-14 bg-green-100 md:bg-transparent shadow-md md:shadow-none
            transition-all duration-300 ease-in-out ${
              isOpen ? "flex" : "hidden"
            }`}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block py-2 md:py-0 hover:underline hover:decoration-green-700 ${
                  isActive ? "underline font-bold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}>
              {link.name}
            </NavLink>
          ))}

          {/* Icons */}
          <div className="flex gap-4 mt-3 md:mt-0 items-center">
            <button onClick={gotoCart} className="relative">
              <ShoppingCart className="size-7 hover:text-green-400" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white text-xs px-1">
                10
              </span>
            </button>
            <MessageSquareDot className="size-7 hover:text-green-400" />
            <CircleUserRound className="size-7 hover:text-green-400" />
          </div>
        </div>
      </div>

      {/* Centered Search Bar */}
      <div className="w-full flex justify-center mt-4">
        <div className="w-full md:w-1/2">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
