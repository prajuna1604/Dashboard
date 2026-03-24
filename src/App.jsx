import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import { DataProvider } from "./context/DataContext";
import Users from "./pages/users";
import Projects from "./pages/projects";
import Team from "./pages/Team";
import Task from "./pages/Task";
import Setting from "./pages/Setting";
import Sidebar from "./components/sidebar";

function App() {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar");
    return saved ? JSON.parse(saved) : true;
  });

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      localStorage.setItem("sidebar", JSON.stringify(!prev));
      return !prev;
    });
  };
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="flex bg-gray-100 h-screen">
          {/* Sidebar */}
          <Sidebar isOpen={isOpen} />
          {/* Main Area */}
          <div className="flex-1 flex flex-col">
            <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
            <main className="p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard setUsers={setUsers} />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/users" element={<Users users={users} deleteUser={deleteUser} setUsers={setUsers} />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/team" element={<Team />} />
                <Route path="/tasks" element={<Task />} />
                <Route path="/settings" element={<Setting />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}
export default App;