import { House, LayoutDashboard, ListCheck, Mail, Settings, Users, Users2, X, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const base = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all";
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={toggleSidebar}></div>
      )}
      <aside className={`flex flex-col justify-between bg-gray-900 text-white w-64 p-4 h-screen fixed z-50 md:static md:left-0
          transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-auto md:w-84 `}>
        {/* Close button (mobile) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">ITWebbs</h2>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800 z-50">
            <X size={18} />
          </button>
        </div>
        <div>
          <nav className="space-y-2">
            <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <House size={18} />
              Dashboard
            </NavLink>
            <NavLink to="/messages" className={({ isActive }) => `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`} >
              <Mail size={18} />
              Messages
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <Users size={18} />
              Users
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <LayoutDashboard size={18} />
              Projects
            </NavLink>
            <NavLink to="/team" className={({ isActive }) => `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <Users2 size={18} />
              Team
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
              <ListCheck size={18} />
              Tasks
            </NavLink>
          </nav>
        </div>
        <div className="space-y-4">
          <NavLink to="/settings" className={({ isActive }) => `${base} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`}>
            <Settings size={18} />
            Settings
          </NavLink>
          <button onClick={() => {
            alert("Logged out");
          }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition" >
            <LogOut size={18} />
            Logout
          </button>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800">
            <img src="https://plus.unsplash.com/premium_vector-1682269284255-8209b981c625?w=352&dpr=1&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
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