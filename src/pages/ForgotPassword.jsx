// Import necessary modules and components
import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl'; // Base URL for backend API
import Loading from '../components/Loading/Loading'; // Loading spinner component
import { useNavigate } from 'react-router-dom'; // Navigation hook
import { motion } from 'framer-motion';

function ForgotPassword() {
  // State to hold email input
  const [email, setEmail] = useState('amarjeevm@gmail.com');

  // State to control loading spinner visibility
  const [loading, setLoading] = useState(false);

  // State to conditionally show a test message
  const [show, setShow] = useState(false);

  // React Router navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Show loading spinner

    try {
      // Send POST request to backend with email
      const response = await axios.post(BaseUrl + 'forgot-password', { email });
      
      // Extract OTP from response
      const Otp = response.data;

      // If response is successful, navigate to OTP verification page
      if (response) {
        navigate('/otpVerification', { state: { Otp, email } });
        setShow(true); // Show test message (optional)
      }
    } catch (error) {
      // Handle errors (like invalid email)
      console.error(error);
      alert('Email address not valid');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div>
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
  >
      {/* Show loading spinner while waiting for backend response */}
      {loading && <Loading />}

      {/* Page container */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br -mt-9">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300 rounded-2xl">
          <div className="card-body p-6 flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-primary">Forgot Password</h2>

            {/* Forgot password form */}
            <form className="form-control space-y-4 w-full items-center" onSubmit={handleSubmit}>
              
              {/* Email Input Field */}
              <label className="input validator w-full flex items-center space-x-2" htmlFor="email">
                {/* Email Icon */}
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>

                {/* Email Input */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  placeholder="Enter Email address"
                  required
                  aria-label="Email address"
                />
              </label>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'} {/* Show loading state on button */}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Optional test message after successful form submit */}
        {show && <h1>fged</h1>}
        </motion.div>
    </div>
  );
}

export default ForgotPassword;
