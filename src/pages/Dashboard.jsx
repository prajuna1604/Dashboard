import { useState } from "react";
import { Users, Mail, DollarSign, PlusCircle, BarChart3, Settings, Send, FolderKanban, Clock, AlertTriangle, Calendar, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
const Dashboard = ({ users, setUsers }) => {
  const stats = [
    {
      title: "Total employee",
      value: 20,
      color: "bg-blue-500",
      icon: <Users size={24} className="text-white " />,
    },
    {
      title: "Messages",
      value: 170,
      color: "bg-green-500",
      icon: <Mail size={24} className="text-white " />,
    },
    {
      title: "Total Projects",
      value: "1000",
      color: "bg-orange-500",
      icon: <FolderKanban size={24} className="text-white " />,
    },
    {
      title: "Revenue",
      value: "$1200",
      color: "bg-yellow-500",
      icon: <DollarSign size={24} className="text-white " />,
    },
  ];
  const actions = [
    {
      title: "Add User",
      icon: <PlusCircle size={20} />,
      color: "bg-blue-400",
      action: () => setShowModal(true),
    },
    {
      title: "View Messages",
      icon: <Mail size={20} />,
      color: "bg-green-400",
      action: () => (window.location.href = "/messages"),
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      color: "bg-orange-400",
      action: () => {
        document.getElementById("analytics-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      color: "bg-gray-500",
      action: () => (window.location.href = "/settings")
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const data = [
    { name: "Mon", users: 30, messages: 10 },
    { name: "Tue", users: 45, messages: 20 },
    { name: "Wed", users: 60, messages: 25 },
    { name: "Thu", users: 40, messages: 35 },
    { name: "Fri", users: 80, messages: 30 },
    { name: "Sat", users: 65, messages: 40 },
    { name: "Sun", users: 90, messages: 45 },
  ];
  const deleteUser = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const editUser = (index) => {
    const user = users[index];
    setFormData(user);
    setShowModal(true);
  };
  const SOURCE_DATA = [
    { source: "Organic", users: 40, color: "#3B82F6" },
    { source: "Direct", users: 30, color: "#10B981" },
    { source: "Social", users: 20, color: "#F97316" },
    { source: "Ads", users: 15, color: "#EAB308" },
  ];
  function DonutChart({ data }) {
    const [hovered, setHovered] = useState(null);
    const total = data.reduce((sum, d) => sum + d.users, 0);
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const outerR = 80;
    const innerR = 50;
    let cumulative = 0;
    const slices = data.map((d) => {
      const fraction = d.users / total;
      const startAngle = cumulative * 2 * Math.PI;
      cumulative += fraction;
      const endAngle = cumulative * 2 * Math.PI;
      return { ...d, startAngle, endAngle, fraction };
    });

    function polarToCartesian(r, angle) {
      return {
        x: cx + r * Math.cos(angle - Math.PI / 2),
        y: cy + r * Math.sin(angle - Math.PI / 2),
      };
    }

    function createPath(start, end) {
      const startOuter = polarToCartesian(outerR, start);
      const endOuter = polarToCartesian(outerR, end);
      const startInner = polarToCartesian(innerR, end);
      const endInner = polarToCartesian(innerR, start);
      const largeArc = end - start > Math.PI ? 1 : 0;
      return `
      M ${startOuter.x} ${startOuter.y}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}
      L ${startInner.x} ${startInner.y}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}
      
    `;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg">
          <div className="relative">
            <svg width={size} height={size}>
              {slices.map((slice, i) => (
                <path
                  key={i}
                  d={createPath(slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    cursor: "pointer",
                    opacity: hovered === null || hovered === i ? 1 : 0.4,
                  }}
                />
              ))}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {hovered !== null ? (
                <>
                  <p className="text-sm font-semibold text-gray-700">
                    {data[hovered].source}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {data[hovered].users}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-xl font-bold text-gray-900">{total}</p>
                </>
              )}
            </div>
          </div>
          <div className="w-full md:w-48 space-y-3">
            {data.map((item, i) => {
              const percent = ((item.users / total) * 100).toFixed(1);
              return (
                <div key={i} className="flex items-center justify-between cursor-pointer" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} >
                  {/* Left */}
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: item.color }}
                    ></span>
                    <span className="text-sm text-gray-700">
                      {item.source}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="text-xs text-gray-500 text-right">
                    <p className="font-semibold">{item.users}</p>
                    <p>{percent}%</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        {/* Chart 2  */}
        <div className="flex justify-center bg-white p-6 rounde-lg">
          {/* Users Table */}
          <div className=" overflow-x-auto">
            <h2 className="text-sm font-semibold mb-4 text-gray-800">User Signup Source</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border">
                  <th className="p-3 text-sm font-semibold text-gray-600">Source</th>
                  <th className="p-3 text-sm font-semibold text-gray-600">No of Users</th>
                  <th className="p-3 text-sm font-semibold text-gray-600">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { source: "Facebook Ads", users: "234", conversion: "10.2%" },
                  { source: "Google Ads", users: "234", conversion: "11.7%" },
                  { source: "Instagram Ads", users: "343", conversion: "12.4%" },
                  //   { source: "Affiliates", users: "12,359", conversion: "20.9%" },
                  //   { source: "Organic", users: "10,345", conversion: "10.3%" },
                ].map((item, index) => (
                  <tr key={index} className="border hover:bg-gray-50">
                    <td className="p-3">{item.source}</td>
                    <td className="p-3">{item.users}</td>
                    <td className="p-3">{item.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    );
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {stats.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 flex items-center justify-between" >
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
            <div className={`w-12 h-12 flex justify-center items-center rounded-full ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
      {/*Quick links*/}
      <div id="analytics-section" className="mt-10 transition duration-500">
        <h2 className="text-xl font-bold mb-4 text-gray-800 ">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`flex flex-col items-center justify-center p-6 rounded-xl text-white ${item.color} hover:scale-105 transition-transform shadow`} >
              <div className="mb-2">{item.icon}</div>
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Modal Box */}
          <div className="bg-white  rounded-xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 ">
              Add New User
            </h2>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();

                setUsers((prev) => [...prev, formData]);

                setShowModal(false);
                setFormData({ name: "", email: "", role: "User" });
              }} className="space-y-4" >
              <input type="text" name="name" placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg" required />

              <input type="email" name="email" placeholder="Email" value={formData.email}
                onChange={handleChange} className="w-full p-2 border rounded-lg" required />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg" >
                <option>User</option>
                <option>Admin</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300">
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* bars */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 ">User Analytics</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white  p-6 rounded-lg shadow">
            <h2 className="flex gap-4 text-sm font-semibold mb-4 items-center "> <BarChart3 size={18} />User Growth</h2>
            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="flex gap-4 text-sm font-semibold mb-4 items-center "> <Send size={18} />
              Messages Overview
            </h2>

            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="messages" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Users by Source */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Users by Source
        </h2>

        <div className=" p-2 ">
          <DonutChart data={SOURCE_DATA} />
        </div>
      </div>
      <div className="p-5 min-h-screen font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-[15px] font-semibold text-gray-700 mb-4 tracking-tight">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "Reena Thapa",
                  action: "Website deployment completed",
                  time: "Just now",
                  highlight: true,
                },
                {
                  name: "John Gurung",
                  action: "Updated project documentation",
                  time: "Today, 10:00 AM",
                },
                {
                  name: "Sara Basnet",
                  action: "Merged pull request to production",
                  time: "2 hours ago",
                },
                {
                  name: "Ram Thapa",
                  action: "Resolved critical bug report",
                  time: "Today, 3:00 PM",
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition px-4 py-3 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-[2px]">
                      {item.action}
                    </p>
                  </div>

                  <span className={`text-[11px] ${item.highlight
                    ? "text-green-500 font-medium"
                    : "text-gray-400"
                    }`} >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 hover:underline cursor-pointer font-medium">
              <Clock size={18} />
              View Full Activity Log
            </div>
          </div>
          {/* NOTIFICATIONS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-[15px] font-semibold text-gray-700 mb-4 tracking-tight">
              Notifications
            </h2>

            <div className="space-y-4">

              <div className="flex items-start gap-3 border-l-[3px] border-orange-400 bg-gray-50 px-4 py-3 rounded-xl">
                <AlertTriangle className="text-orange-400 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    Server Performance Alert
                  </p>
                  <p className="text-xs text-gray-500 mt-[2px]">
                    CPU usage exceeded 85% - immediate attention required
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-l-[3px] border-blue-500 bg-gray-50 px-4 py-3 rounded-xl">
                <Calendar className="text-blue-500 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    Team Meeting Scheduled
                  </p>
                  <p className="text-xs text-gray-500 mt-[2px]">
                    Project kickoff meeting on February 15, 2026 at 10:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-l-[3px] border-green-500 bg-gray-50 px-4 py-3 rounded-xl">
                <CheckCircle className="text-green-500 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    Deployment Successful
                  </p>
                  <p className="text-xs text-gray-500 mt-[2px]">
                    Version 2.1 deployed to production successfully
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-4 text-xs text-blue-600 hover:underline cursor-pointer font-medium">
              View All Notifications
            </div>
          </div>
        </div>
      </div>
      {/*Footer */}
      <div className="text-center text-[14px] text-gray-400 mt-10 border-t border-gray-300">
        ITwebss TECH COMPANY • Last updated
      </div>
    </>
  );
};
export default Dashboard;
