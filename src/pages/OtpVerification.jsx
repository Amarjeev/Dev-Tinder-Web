import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';

function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isValid, setIsValid] = useState(null); // null, true, or false
  const correctOtp = "123456";

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  const handleSubmit = async() => {
      try {
            const enteredOtp = otp.join("");
        const response= await axios.post(BaseUrl +'OtpVerification', { otp: enteredOtp });
           console.log(response.data);
    
      if (enteredOtp === correctOtp) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      console.log(enteredOtp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-semibold">Please enter OTP</h1>

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

        <button className="btn btn-primary" onClick={handleSubmit}>
          Verify OTP
        </button>

        {isValid === false && (
          <h3 className="text-red-500 text-sm font-medium">OTP not valid</h3>
        )}
        {isValid === true && (
          <h3 className="text-green-500 text-sm font-medium">OTP verified successfully!</h3>
        )}
      </div>
    </div>
  );
}

export default OtpVerification;
