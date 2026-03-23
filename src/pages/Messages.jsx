import { useContext } from "react";
import { DataContext } from "../context/DataContext";
const Messages = () => {
  const { messages } = useContext(DataContext);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Contact Messages</h2>

      {messages.length === 0 && <p>No messages yet.</p>}
      {messages.map((msg) => (
        <div key={msg.id} className="border-b py-3">
          <p className="font-semibold">{msg.name}</p>
          <p className="text-sm text-gray-500">{msg.email}</p>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;