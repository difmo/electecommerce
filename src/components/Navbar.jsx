import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import LoginModal from "../pages/LoginPopUp";
import SignUpPopUp from "../pages/SignUpPopUp";  // Import the SignUpPopUp component

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // State to manage modal visibility for login
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false); // State to manage modal visibility for sign-up

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen); // Toggle the login modal
  };

  const toggleSignUpModal = () => {
    setSignUpModalOpen(!isSignUpModalOpen); // Toggle the sign-up modal
  };

  return (
    <>
      <header className="sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between p-4 bg-maincolor">
          {/* Brand Logo / Home Link */}
          <Link to={"/"} className="text-2xl font-bold text-white">
            Name
          </Link>

          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <button
              onClick={toggleLoginModal}
              className="px-4 py-2 transition duration-300 bg-white rounded-md text-maincolor hover:bg-blue-600"
            >
              Login
            </button>

            {/* Sign Up Button */}
            <button
              onClick={toggleSignUpModal}
              className="px-4 py-2 transition duration-300 bg-white rounded-md text-maincolor hover:bg-blue-600"
            >
              Sign Up
            </button>

            {/* Cart Button */}
            <Link to={"/cart"} className="relative">
              <button
                type="button"
                className="relative p-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
              >
                <BsFillCartCheckFill style={{ fontSize: "1.5rem" }} />
                <span className="absolute top-0 right-0 px-2 py-1 text-xs text-white translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {cart.length}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {isLoginModalOpen && <LoginModal closeModal={toggleLoginModal} switchToSignUp={toggleSignUpModal} />}

      {/* Sign-Up Modal */}
      {isSignUpModalOpen && <SignUpPopUp closeModal={toggleSignUpModal} switchToLogin={toggleLoginModal} />}
    </>
  );
};

export default Navbar;
