import React, { useState } from "react";
import Contacts from "./Admincontacts"; // Adjust the path as necessary
import Adminpackage from "./Adminpackage";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("Welcome");

  const renderContent = () => {
    switch (currentView) {
      case "Dashboard":
        return <Contacts />;
      case "Blog":
        return <h2>This is the about page.</h2>;
      case "Adminpackage":
        return <Adminpackage />;
      default:
        return <h2>Welcome to the Admin Page</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 p-5 bg-white shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Admin Menu</h2>
        <ul className="p-0 list-none">
          {["Dashboard", "Blog", "Adminpackage"].map((item) => (
            <li
              key={item}
              className="px-4 py-3 mb-2 text-gray-700 transition duration-200 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => setCurrentView(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
