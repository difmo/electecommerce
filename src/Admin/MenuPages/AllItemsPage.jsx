import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, deleteDoc } from "../../firebase";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AdditemForm from "./AdditemForm";
import Slider from "react-slick";

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

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

  const handleDelete = async (itemId) => {
    try {
      const itemRef = doc(db, "items", itemId);
      await deleteDoc(itemRef);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setItemToEdit(null); 
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
          <div key={item.id} className="relative p-5 bg-white rounded-lg shadow-lg">
            <div className="w-full h-48 mb-4">
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
              >
                {(item.images ?? []).map((imgSrc, index) => (
                  <div key={index}>
                    <img
                      src={imgSrc || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="object-cover w-full h-48 rounded-md"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="mb-2 text-sm text-gray-500">{item.shortDescription}</p> {/* Short Description display */}
            <p className="mb-4 text-gray-700">{item.description}</p>
            <p className="font-bold text-gray-800">{`₹${item.price}`}</p>

            {/* Edit and Delete Buttons */}
            <div className="absolute flex space-x-2 top-2 right-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 text-blue-500 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <AiOutlineEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-500 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[600px] w-[800px] p-8 bg-white rounded-lg shadow-lg overflow-y-scroll">
            <AdditemForm
              closeForm={handleCloseForm}
              itemToEdit={itemToEdit}
              fetchItems={fetchItems}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllItemsPage;
