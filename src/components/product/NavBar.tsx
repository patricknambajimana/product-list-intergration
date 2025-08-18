import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  MessageSquareDot,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Products", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Add Product", path: "/add-product" },
  ];

  const gotoCart = () => {
    navigate("cart");
  };

  return (
    <nav className="bg-green-100 text-green-900 fixed top-0 left-0 right-0 z-20 shadow-md p-4">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold">
          Product Management
        </NavLink>

        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 text-lg
            absolute md:static left-0 right-0 top-14 bg-green-100 md:bg-transparent shadow-md md:shadow-none
            transition-all duration-300 ease-in-out
            ${isOpen ? "flex" : "hidden"}`}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }: { isActive: boolean }) =>
                `block py-2 md:py-0 hover:underline hover:decoration-green-700 ${
                  isActive ? "underline font-bold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}>
              {link.name}
            </NavLink>
          ))}

          <div className="flex gap-4 mt-3 md:mt-0">
            <button type="button" onClick={gotoCart}>
              <ShoppingCart className="size-7 hover:text-green-400" />
            </button>
            <button>
              <MessageSquareDot className="size-7 hover:text-green-400" />
            </button>
            <button>
              <CircleUserRound className="size-7 hover:text-green-400" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
