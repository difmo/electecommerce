import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase"; // make sure to import your Firestore config
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
      <div className="container justify-center py-4">
        <div className="row">
          {items.map((product) => (
            <div key={product.id} className="py-3 text-center col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="shadow-xl hover:shadow-2xl">
                <Link to={`/product/${product.id}`} className="d-flex justify-content-center align-items-center">
                  <img
                    src={product.images[0]} // Use the first image for the product card
                    className="card-img-top img-fluid"
                    alt={product.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                </Link>
                <div className="py-3 card-body">
                  <button className="mx-3 btn">{product.price} ₹</button>
                  <button
                    onClick={() =>
                      addToCart(product.id, product.price, product.title, product.description, product.images[0])
                    }
                    className="btn bg-greenbutten"
                  >
                    Add To Cart
                  </button>
                  <h5 className="p-2 text-xl font-bold card-title">{product.title}</h5>
                  <p className="p-2 font-sans card-text">{product.shortDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
