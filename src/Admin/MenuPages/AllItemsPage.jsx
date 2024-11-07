import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../../firebase";
import { AiOutlinePlus } from "react-icons/ai";
import AdditemForm from "./AdditemForm";

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    try {
      const itemsCollection = collection(db, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <button
        onClick={() => setShowForm(true)}
        className="fixed p-4 text-white transition bg-blue-500 rounded-full shadow-lg bottom-5 right-5 hover:bg-blue-700"
      >
        <AiOutlinePlus size={24} />
      </button>

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="p-5 bg-white rounded-lg shadow-lg">
            <img
              src={item.imgSrc || "https://via.placeholder.com/150"}
              alt={item.title}
              className="object-cover w-full h-48 mb-4 rounded-md"
            />
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="mb-4 text-gray-700">{item.description}</p>
            <p className="font-bold text-gray-800">{`₹${item.price}`}</p>
            <a
              href={item.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on Amazon
            </a>
          </div>
        ))}
      </div>

      {/* Modal for AdditemForm */}
      {showForm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[700px] max-h-[80vh] h-full bg-white rounded-lg shadow-lg m-12 overflow-hidden">
            <div className="h-full p-8 overflow-y-auto">
              <AdditemForm closeForm={() => setShowForm(false)} />
            </div>
          </div>
        </div>  
      )}
    </div>
  );
};

export default AllItemsPage;
