import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
const Users = ({ users, deleteUser, setUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
  });
  const editUser = (index) => {
    setEditIndex(index);
    setFormData(users[index]); // preload data
    setShowModal(true);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUsers = [...users];
    updatedUsers[editIndex] = formData;

    setUsers(updatedUsers);
    setShowModal(false);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white  rounded-xl shadow border">
          <thead>
            <tr className="bg-black text-white text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users yet
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => deleteUser(index)} className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                      <Trash2 size={16} />
                      Delete
                    </button>
                    <button onClick={() => editUser(index)} className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                      <Pencil size={16} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded" />

                <input type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded" />

                <select name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded">
                  <option>User</option>
                  <option>Admin</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-3 py-1 rounded">
                    Cancel
                  </button>

                  <button type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Users;