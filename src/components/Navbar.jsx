import { useState, useEffect } from "react";
import { Menu, X, Bell, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = ({ toggleSidebar, isOpen }) => {
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const toggleTheme = () => setDark(!dark);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/messages":
        return "Messages";
      case "/users":
        return "Users";
      case "/projects":
        return "Projects";
      case "/team":
        return "Team";
      case "/tasks":
        return "Tasks";
      case "/settings":
        return "Settings";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Mobile Menu */}
      <button className="md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dynamic Title */}
      <h1 className="font-semibold text-lg text-gray-800">
        {getTitle()}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-200/20">
          <Bell size={20} className="text-gray-700" />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-200/20" onClick={toggleTheme} >
          <Moon size={20} className="text-gray-700" />
        </button>

        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500" className="w-10 h-10 rounded-full" alt="User Avatar" />
      </div>
    </header>
  );
};

export default Navbar;