import { useState, useEffect } from "react";
import { CheckCircle, Trash2, PlusCircle, Pencil } from "lucide-react";

const Task = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  // Start Editing
  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  // Save Edit
  const saveEdit = (index) => {
    const updated = [...tasks];
    updated[index].text = editText;
    setTasks(updated);
    setEditIndex(null);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      text: newTask,
      completed: false,
      priority,
      dueDate,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setDueDate("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  {/* Filtering search */ }
  const filteredTasks = tasks.filter((task) => {
    const matchFilter =
      filter === "All"
        ? true
        : filter === "Completed"
          ? task.completed
          : !task.completed;

    const matchSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  {/* prioritycolor */ }
  const priorityColor = (p) => {
    if (p === "High") return "bg-red-100 text-red-600";
    if (p === "Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
      {/* Add Task */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3">
        <input type="text" placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} className="flex-1 border px-3 py-2 rounded-lg" />

        <select value={priority}
          onChange={(e) => setPriority(e.target.value)} className="border px-2 py-2 rounded-lg" >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input type="date" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} className="border px-2 py-2 rounded-lg" />
        <button onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" >
          <PlusCircle size={18} /> Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex gap-2">
          {["All", "Completed", "Pending"].map((f) => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm ${filter === f
                ? "bg-black text-white"
                : "bg-gray-200"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <input type="text" placeholder="Search task..." value={search} onChange={(e) => setSearch(e.target.value)} className="border px-3 py-2 rounded-lg" />
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl shadow divide-y">
        {filteredTasks.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No tasks found
          </p>
        ) : (
          filteredTasks.map((task, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-3 hover:bg-gray-50">
              {/* Left */}
              <div className="flex items-center gap-3">
                <button onClick={() => toggleTask(index)}>
                  <CheckCircle size={20}
                    className={
                      task.completed
                        ? "text-green-500"
                        : "text-gray-400"} />
                </button>
                {editIndex === index ? (
                  <input value={editText} onChange={(e) => setEditText(e.target.value)} className="border px-2 py-1 rounded" />
                ) : (

                  <span className={
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }>
                    {task.text}
                  </span>
                )}
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                {/*priority badge */}
                <span className={`text-xs px-2 py-1 rounded-full ${priorityColor(task.priority)}`}>
                  {task.priority}
                </span>

                {/*Date badge */}
                {task.dueDate && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {task.dueDate}
                  </span>
                )}
                {editIndex === index ? (
                  <button onClick={() => saveEdit(index)} className="text-green-500 text-sm">
                    Save
                  </button>
                ) : (
                  <button onClick={() => startEdit(index)} className="text-blue-500 text-sm" >
                    <Pencil size={18} />
                  </button>
                )}

                <button onClick={() => deleteTask(index)} className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Task;