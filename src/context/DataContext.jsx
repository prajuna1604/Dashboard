import { createContext, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { id: 1, name: "Ram", email: "ram@gmail.com", message: "Dashboard is loading " },
    { id: 2, name: "Sita", email: "sita@gmail.com", message: " UI/UX design" },
    { id: 3, name: "Hari", email: "hari@gmail.com", message: "Data syncing is smooth" },
    { id: 4, name: "Priya", email: "priya@gmail.com", message: "Performance metrics look good" },
    { id: 5, name: "Arjun", email: "arjun@gmail.com", message: "API integration " },
    { id: 6, name: "Maya", email: "maya@gmail.com", message: "Reports generated " },
    { id: 7, name: "Rajesh", email: "rajesh@gmail.com", message: "Analytics updated" },
    { id: 8, name: "Deepa", email: "deepa@gmail.com", message: "User access granted" },
    { id: 9, name: "Vikram", email: "vikram@gmail.com", message: "Database connection " },
    { id: 10, name: "Ananya", email: "ananya@gmail.com", message: "Backup completed successfully" },
    { id: 11, name: "Neha", email: "neha@gmail.com", message: "New features deployed" },
    { id: 12, name: "Rohan", email: "rohan@gmail.com", message: "System maintenance completed" },
    { id: 13, name: "Kavya", email: "kavya@gmail.com", message: "Security audit passed" },
    { id: 14, name: "Aditya", email: "aditya@gmail.com", message: "Documentation updated" },
    { id: 15, name: "Pooja", email: "pooja@gmail.com", message: "Support ticket resolved" },
    { id: 16, name: "Karan", email: "karan@gmail.com", message: "Performance optimized" },
    { id: 17, name: "Divya", email: "divya@gmail.com", message: "User feedback incorporated" },
    { id: 18, name: "Sanjay", email: "sanjay@gmail.com", message: "Version 2.0 released" },
    { id: 19, name: "Riya", email: "riya@gmail.com", message: "Testing phase completed" },
    { id: 20, name: "Nikhil", email: "nikhil@gmail.com", message: "Ready for production" },
  ]);
  const addMessage = (msg) => {
    setMessages((prev) => [...prev, { id: Date.now(), ...msg }]);
  };
  return (
    <DataContext.Provider value={{ messages, addMessage }}>
      {children}
    </DataContext.Provider>
  );
};