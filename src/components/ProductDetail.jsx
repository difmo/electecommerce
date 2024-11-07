import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.filter((prodcut) => prodcut.id == id);
    //  console.log(filterProduct)
    setProduct(filterProduct[0]);

    const relatedProducts = items.filter(
      (suman) => suman.category === product.category
    );

    // console.log("RelatedProduct = ",relatedProducts)
    setRelatedProducts(relatedProducts);
  }, [id, product.category]);
  const images = [
    "https://m.media-amazon.com/images/I/31sdaVAbARL._SX38_SY50_CR,0,0,38,50_.jpg",
    "https://m.media-amazon.com/images/I/51BdUX6bRPL._SX38_SY50_CR,0,0,38,50_.jpg",
    "https://m.media-amazon.com/images/I/41H7LhOcPyL._SX38_SY50_CR,0,0,38,50_.jpg",
    "https://m.media-amazon.com/images/I/41b-Id78YqL._SX38_SY50_CR,0,0,38,50_.jpg",
    "https://m.media-amazon.com/images/I/41qQ4MnS2TL._SX38_SY50_CR,0,0,38,50_.jpg",
  ];
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

      <div className="flex">
        <div className="flex">
          <div>
            {images.map((src, index) => (
              <div key={index} className="w-16 h-20 m-3">
                <button className="focus:outline-none focus:ring-2 ring-blue-500">
                  <img
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover  rounded"
                  />
                </button>
              </div>
            ))}
          </div>

          <img src={product.imgSrc} className="mt-0 w-full bg-cover" alt="" />
        </div>
        <div className="text-center w-full  self-center ">
          <h1 className="card-title font-bold text-xl py-2">{product.title}</h1>
          <span className="mx-3 btn ">{product.price} ₹</span>
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
            className="btn bg-greenbutten"
          >
            Add To Cart
          </button>
          <p className="card-text">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
