import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase"; // Import your Firestore config
import { collection, getDocs } from "firebase/firestore";
import MainSlider from "./MainSlider";

const Product = ({ cart, setCart }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
      }
    };

    fetchItems();
  }, []);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);

    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <MainSlider />
      <div className="container py-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <div
              key={product.id}
              className="transition-all transform shadow-lg card hover:shadow-xl "
            >
              <Link
                to={`/product/${product.id}`}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover w-full h-40 card-img-top img-fluid"
                />
              </Link>
              <div className="p-2 card-body">
                <button className="w-full text-sm bg-gray-200 btn text-maincolor">₹ {product.price}</button>
                <button
                  onClick={() =>
                    addToCart(
                      product.id,
                      product.price,
                      product.title,
                      product.description,
                      product.images[0]
                    )
                  }
                  className="w-full mt-2 text-sm text-white bg-green-500 hover:bg-black btn"
                >
                  Add To Cart
                </button>
                <h5 className="mt-2 text-sm font-semibold">{product.title}</h5>
                <p className="mt-1 text-xs text-gray-600">{product.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
