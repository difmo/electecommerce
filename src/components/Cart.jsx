import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, product) => acc + (parseFloat(product.price) || 0), 0);
    const tax = subtotal * 0.10;
    const deliveryCharge = 5; 

    const total = subtotal + tax + deliveryCharge;

    return {
      subtotal: isNaN(subtotal) ? 0 : subtotal,
      tax: isNaN(tax) ? 0 : tax,
      deliveryCharge: isNaN(deliveryCharge) ? 0 : deliveryCharge,
      total: isNaN(total) ? 0 : total,
    };
  };

  const { subtotal, tax, deliveryCharge, total } = calculateTotal();

  return (
    <div className="container my-5" style={{ width: "80%" }}>
      {cart.length === 0 ? (
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold text-gray-800">Your Cart is Empty</h1>
          <Link to="/" className="text-white btn bg-greenbutten">
            Continue Shopping...
          </Link>
        </div>
      ) : (
        cart.map((product) => (
          <div key={product.id} className="my-5 mb-3 rounded-lg shadow-lg card" style={{ width: "100%" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.imgSrc}
                  className="img-fluid rounded-start"
                  alt={product.title}
                  style={{ objectFit: "cover", height: "150px" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="text-lg font-bold text-gray-900 card-title">{product.title}</h5>
                  <p className="text-gray-700 card-text">{product.description}</p>
                  <div className="mt-4 d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-secondary">
                      {product.price} ₹
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(product.id)} // Remove from cart
                    >
                      Remove Item
                    </button>
                  </div>
                  <Link to="/checkout" state={{ cart }} className="mt-3 text-white btn bg-greenbutten">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {cart.length !== 0 && (
        <div className="container my-5 text-center">
          <div className="mb-4 d-flex justify-content-between">
            <div className="flex flex-col text-left">
              <h5 className="text-lg font-semibold text-gray-700">Order Summary</h5>
              <div className="mt-2">
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>{subtotal} ₹</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax (10%):</span>
                  <span>{tax.toFixed(2)} ₹</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery Charge:</span>
                  <span>{deliveryCharge} ₹</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <h5 className="text-lg font-semibold text-gray-700">Total</h5>
              <div className="d-flex justify-content-between">
                <span>Total Amount:</span>
                <span className="text-xl font-bold text-green-500">{total.toFixed(2)} ₹</span>
              </div>
            </div>
          </div>

          <div className="mt-5 d-flex justify-content-center">
            <Link to="/checkout" state={{ cart }}>
              <button className="px-4 py-2 mx-5 rounded-lg shadow-lg btn btn-warning">
                Proceed to Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="px-4 py-2 rounded-lg shadow-lg btn btn-danger"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
