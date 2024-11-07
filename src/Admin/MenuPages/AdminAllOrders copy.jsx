import React, { useEffect, useState } from "react";
import { db, collection, getDocs,doc,updateDoc } from "../../firebase"; 

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("live"); 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        let querySnapshot;

        if (filter) {
          querySnapshot = await getDocs(ordersRef);
        }

        console.log(querySnapshot);
        
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedOrders);  
        setOrders(fetchedOrders); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [filter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Admin Orders</h2>

      <div className="mb-5">
        <button onClick={() => setFilter("live")} className="mr-4">
          Live Orders
        </button>
        <button onClick={() => setFilter("ongoing")} className="mr-4">
          Ongoing Orders
        </button>
        <button onClick={() => setFilter("done")}>Completed Orders</button>
      </div>

      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 mb-4 bg-gray-100 rounded-md shadow-md"
            >
              <h3 className="font-semibold">Order ID: {order.id}</h3>
              <p>Status: {order.status}</p>
              <div>
                <h4 className="font-semibold">Shipping Address</h4>
                <p>{order.selectedAddress.name}</p>
                <p>{order.selectedAddress.street}</p>
                <p>
                  {order.selectedAddress.city}, {order.selectedAddress.state}
                  {order.selectedAddress.postalCode}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Order Items</h4>
                <ul>
                  {order.cart.map((item, index) => (
                    <li key={index}>{item.title} - ₹{item.price}</li>
                  ))}
                </ul>
              </div>

              {/* Change Order Status */}
              <div className="mt-4">
                <button onClick={() => handleStatusChange(order.id, "Ongoing")} className="mr-2">
                  Mark as Ongoing
                </button>
                <button onClick={() => handleStatusChange(order.id, "Completed")}>
                  Mark as Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default AdminAllOrders;
