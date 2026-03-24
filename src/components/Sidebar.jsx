import { useState } from "react";
import { House, LayoutDashboard, ListCheck, Mail, Settings, Users, Users2, X, LogOut, ChevronUp, ChevronDown, User, } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const base = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all";
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={toggleSidebar}></div>
      )}
      <aside className={`flex flex-col justify-between bg-gray-900 text-white w-64 p-4 h-screen fixed z-50 md:static transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">ITWebbs</h2>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
        <div>
          <nav className="space-y-2">
            <NavLink to="/" end className={({ isActive }) =>
              `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <House size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/messages" className={({ isActive }) =>
              `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <Mail size={18} />
              Messages
            </NavLink>

            <NavLink to="/users" className={({ isActive }) =>
              `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <Users size={18} />
              Users
            </NavLink>

            <NavLink to="/projects" className={({ isActive }) =>
              `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <LayoutDashboard size={18} />
              Projects
            </NavLink>

            <NavLink to="/team" className={({ isActive }) =>
              `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <Users2 size={18} />
              Team
            </NavLink>

            <NavLink to="/tasks" className={({ isActive }) =>
              `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <ListCheck size={18} />
              Tasks
            </NavLink>
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="space-y-2">
          {/* SETTINGS */}
          <button onClick={() => setOpenSettings(!openSettings)}
            className={`${base} w-full justify-between hover:bg-gray-800`}>
            <div className="flex items-center gap-3">
              <Settings size={18} />
              <span>Settings</span>
            </div>

            {openSettings ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {/* DROPDOWN */}
          {openSettings && (
            <div className="ml-6 space-y-2">
              <NavLink to="/settings" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                <User size={16} />
                Profile
              </NavLink>

              <button onClick={() => alert("logged out")}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          {/* USER */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 mt-4">
            <img src="https://plus.unsplash.com/premium_vector-1682269284255-8209b981c625?w=352"
              alt="user" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm font-semibold">user1</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;