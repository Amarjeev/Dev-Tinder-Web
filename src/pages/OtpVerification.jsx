// Importing required modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function OtpVerification() {
  // State to store each digit of OTP
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // State to track OTP verification status (null, true, false)
  const [isValid, setIsValid] = useState(null);

  // State for countdown timer (seconds remaining)
  const [timeLeft, setTimeLeft] = useState(60);

  // State to control visibility of buttons
  const [hide, setHide] = useState(true);

  // State for loading spinner
  const [loading, setLoading] = useState(false);

  // Getting email and actual OTP from route state
  const location = useLocation();
  const { Otp: actualOtp, email } = location.state;

  // Store actual OTP in local state
  const [actualOtpState, setActualOtp] = useState(actualOtp);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // useEffect for countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setHide(false); // Show resend button after time ends
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1); // Decrease timeLeft every second
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [timeLeft]);

  // Handle changes in OTP input fields
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input field if current one is filled
    if (value && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  // Handle OTP submission for verification
  const handleSubmit = async () => {
    setLoading(true); // Show loading spinner
    try {
      const enteredOtp = otp.join(""); // Join digits to form full OTP

      // Send OTP verification request to backend
      const response = await axios.post(BaseUrl + 'OtpVerification', {
        enteredOtp: enteredOtp,
        Otp: actualOtpState 
      });

      const OtpStatus = response.data;

      // If OTP is correct, reset fields and navigate to password change page
      if (OtpStatus === "Otp Correct") {
        setOtp(new Array(6).fill(""));
        setIsValid(true);
        navigate('/PasswordChange', { state: { email } });
      } 
      // If OTP is incorrect, show error
      else if (OtpStatus === "Otp InCorrect") {
        setIsValid(false);
      }
    } catch (error) {
      console.log(error); // Log error if request fails
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };
  
  // Handle OTP resend
  const ResendOTP = async () => {
    setLoading(true); // Show loading spinner
    try {
      // Request backend to send new OTP
      const response = await axios.post(BaseUrl + 'forgot-password', { email });

      if (response) {
        const newOtp = response.data;
        setActualOtp(newOtp); // Update OTP in state
        setTimeLeft(60); // Reset timer
        setHide(true); // Show verification UI again
        setOtp(new Array(6).fill("")); // Clear input fields
        setIsValid(null); // Reset validity state
      }
    } catch (error) {
      console.log(error); // Log error if resend fails
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
  >
      {loading ? (
        <Loading /> // Show loading animation while waiting for backend
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-semibold">Please enter OTP</h1>

          {/* Timer and Expiry Notification */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {hide && (
              <>
                <span className="font-medium">OTP expires in:</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md font-semibold">
                  {timeLeft}
                </span>
              </>
            )}
            {timeLeft === 0 && (
              <p className="text-red-500 text-sm font-medium">
                OTP expired. Please request a new one.
              </p>
            )}
          </div>

          {/* OTP Input Fields */}
          <div className="flex space-x-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                className="input input-bordered w-12 h-12 text-center text-lg font-mono"
                onChange={(e) => handleChange(e, i)}
              />
            ))}
          </div>

          {/* Submit Button - Enabled only if all digits are filled */}
          {hide && (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={otp.includes("")}
            >
              Verify OTP
            </button>
          )}

          {/* Resend Button - Appears after timeout */}
          {timeLeft === 0 && (
            <button className="btn btn-primary" onClick={ResendOTP}>
              Resend OTP
            </button>
          )}

          {/* Conditional messages for OTP validity */}
          {isValid === false && (
            <h3 className="text-red-500 text-sm font-medium">OTP not valid</h3>
          )}
          {isValid === true && (
            <h3 className="text-green-500 text-sm font-medium">
              OTP verified successfully!
            </h3>
          )}
        </div>
        )}
        </motion.div>
    </div>
  );
}

export default OtpVerification;
