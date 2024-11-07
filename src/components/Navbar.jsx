import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import LoginModal from "../pages/LoginPopUp";
import SignUpPopUp from "../pages/SignUpPopUp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ setData, cart }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Track the current user

  // Track auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser); // User is authenticated and email verified
      } else {
        setUser(null); // User is not authenticated or not verified
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
  };

  const toggleSignUpModal = () => {
    setSignUpModalOpen(!isSignUpModalOpen); // Toggle the sign-up modal
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
            {!user ? (
              <>
                <button
                  onClick={toggleLoginModal}
                  className="px-4 py-2 transition duration-300 bg-white rounded-md text-maincolor hover:bg-blue-600"
                >
                  Login
                </button>

                <button
                  onClick={toggleSignUpModal}
                  className="px-4 py-2 transition duration-300 bg-white rounded-md text-maincolor hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Display User's Email and Logout Button */}
                <span className="font-bold text-white">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 transition duration-300 bg-white rounded-md text-maincolor hover:bg-blue-600"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/myorderspage")}
                  className="px-4 py-2 transition duration-300 bg-white rounded-md text-maincolor hover:bg-blue-600"
                >
                  My Orders
                </button>
                <button
                  onClick={() => navigate("/admin")}
                  className="px-4 py-2 transition duration-300 bg-white rounded-md text-maincolor hover:bg-blue-600"
                >
                 Admin
                </button>
              </>
            )}

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
      {isLoginModalOpen && (
        <LoginModal
          closeModal={toggleLoginModal}
          switchToSignUp={toggleSignUpModal}
        />
      )}

      {/* Sign-Up Modal */}
      {isSignUpModalOpen && (
        <SignUpPopUp
          closeModal={toggleSignUpModal}
          switchToLogin={toggleLoginModal}
        />
      )}
    </>
  );
};

export default Navbar;
