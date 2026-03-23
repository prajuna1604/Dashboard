import React, { useState } from "react";
import { Pencil, Trash2, BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const initialProjects = [
  {
    title: "Enterprise Web Development",
    img: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=500&auto=format&fit=crop&q=60",
    status: "Ongoing",
  },
  {
    title: "Mobile App Development",
    img: "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=500&auto=format&fit=crop&q=60",
    status: "Completed",
  },
  {
    title: "AI Solutions",
    img: "https://media.istockphoto.com/id/2192707526/photo/e-learning-platforms-hands-of-robot-hold-e-learning-management-system-tools-digital-education.webp?a=1&b=1&s=612x612&w=0&k=20&c=cjlhubvE7hRSX14k2K-goPY2dPCh5V1EghZSoa9rOqk=",
    status: "Pending",
  },
  {
    title: "Product Design & Development",
    img: "https://images.unsplash.com/photo-1764737740462-2a310c7b2c39?w=500&auto=format&fit=crop&q=60",
    status: "Ongoing",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ title: "", status: "" });

  const startEdit = (index) => {
    setEditIndex(index);
    setEditData(projects[index]);
  };

  const saveEdit = (index) => {
    const updated = [...projects];
    updated[index] = editData;
    setProjects(updated);
    setEditIndex(null);
  };

  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Analytics data
  const analyticsData = [
    { name: "Ongoing", value: projects.filter(p => p.status === "Ongoing").length },
    { name: "Completed", value: projects.filter(p => p.status === "Completed").length },
    { name: "Pending", value: projects.filter(p => p.status === "Pending").length },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Projects</h1>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col" >
            <img src={project.img} alt={project.title} className="w-full h-40 object-cover"/>

            <div className="p-4 flex flex-col flex-1">
              {editIndex === index ? (
                <>
                  <input type="text" value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="border p-1 rounded mb-2" />
                  <select value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="border p-1 rounded mb-2">
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => saveEdit(index)}
                      className="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition">
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">Status: {project.status}</p>
                  <div className="mt-auto flex gap-2">
                    <button onClick={() => startEdit(index)}
                      className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center gap-1">
                      <Pencil size={16} /> Edit
                    </button>
                    <button onClick={() => deleteProject(index)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-1">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <BarChart3 size={18} /> Project Analytics
        </h2>
        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Projects;