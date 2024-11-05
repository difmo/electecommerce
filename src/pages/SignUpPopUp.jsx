import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa'; 

const SignUpPopUp = () => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phone number submitted:", phone);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg sm:w-96">
        <div className="flex justify-center mb-4">
          <img
            // src="https://cdn.grofers.com/layout-engine/2023-11/app_logo.svg"
            alt="Blinkit Image"
            className="w-16 h-16"
          />
        </div>
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-700">Welcome to on our webpage</h1>
          <p className="text-lg font-medium text-gray-500"> Sign up</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="tel"
              maxLength="10"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Continue</span>
            <FaArrowRight className="ml-2" />
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-600">
          <span>By continuing, you agree to our&nbsp;</span>
          <a href="/terms" target="_blank" className="text-blue-500 hover:underline">
            Terms of service
          </a>
          <span>&nbsp;&amp;&nbsp;</span>
          <a href="/privacy" target="_blank" className="text-blue-500 hover:underline">
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopUp;
