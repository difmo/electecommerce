import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import icons for Google and Facebook

const LoginModal = ({ closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const modalRef = useRef(null); // Reference to the modal container

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal(); // Close modal if clicked outside
      }
    };

    // Add event listener for outside click
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with phone number:", phoneNumber);
    closeModal(); 
  };

  const handleGoogleLogin = () => {
    console.log("Logging in with Google...");
    closeModal();
  };

  const handleFacebookLogin = () => {
    console.log("Logging in with Facebook...");
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <motion.div
        ref={modalRef}
        className="relative p-6 bg-white rounded-lg shadow-md w-96"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }} 
      >
        {/* Close Button (Cross icon) */}
        <button
          onClick={closeModal}
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="mb-4 text-xl font-bold">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter your Phone Number"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-md bg-maincolor"
          >
            Continue
          </button>
        </form>

        {/* Social login options */}
        <div className="mt-4 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white bg-red-600 rounded-md"
          >
            <FaGoogle className="w-5 h-5 text-white" />
            <span>Login with Google</span>
          </button>
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white bg-blue-600 rounded-md"
          >
            <FaFacebook className="w-5 h-5 text-white" />
            <span>Login with Facebook</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
