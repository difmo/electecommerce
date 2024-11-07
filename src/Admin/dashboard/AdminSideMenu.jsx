import React, { useState } from "react";
import Adminpackage from "../MenuPages/Adminpackage";
import AdminDashboard from "../MenuPages/AdminDashboard";
import AllItemsPage from "../MenuPages/AllItemsPage";
import AdminAllOrders from "../MenuPages/AdminAllOrders";

const AdminSideMenu = () => {
  const [currentView, setCurrentView] = useState("AdminDashboard");

  const renderContent = () => {
    switch (currentView) {
      case "Dashboard":
        return <AdminDashboard />;
      case "Orders":
        return <AdminAllOrders />;
      case "Items":
        return <AllItemsPage />;

      default:
        return <h2>Something error happened</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="sticky top-0 w-64 h-full p-5 overflow-y-auto bg-white shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Admin Menu</h2>
        <ul className="p-0 list-none">
          {["Dashboard", "Items","Orders"].map((item) => (
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

      {/* Main content */}
      <div className="flex-1 p-10 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminSideMenu;
