import React from "react";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainSlider from "./MainSlider";

const Product = ({ items, cart, setCart }) => {
  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = {
      id,
      price,
      title,
      description,
      imgSrc,
    };
    setCart([...cart, obj]);
    console.log("Cart element = ", cart);
    toast.success("Item added on cart", {
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
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <MainSlider />
      <div className="container justify-center py-4">
        <div className="row">
          {items.map((product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6 col-12 py-3 text-center"
            >
              <div className="shadow-xl hover:shadow-2xl ">
                <Link
                  to={`/product/${product.id}`}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top  img-fluid"
                    alt={product.title}
                    style={{ objectFit: "cover", height: "" }}
                  />
                </Link>
                <div className="card-body py-3">
                  <button className="btn  mx-3">{product.price} ₹</button>
                  <button
                    onClick={() =>
                      addToCart(
                        product.id,
                        product.price,
                        product.title,
                        product.description,
                        product.imgSrc
                      )
                    }
                    className=" btn bg-greenbutten "
                  >
                    Add To Cart
                  </button>
                  <h5 className="card-title p-2 font-bold text-xl ">
                    {product.title}
                  </h5>
                  <p className="card-text font-sans p-2">
                    {product.description}
                  </p>
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
