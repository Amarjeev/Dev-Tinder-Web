// Importing necessary modules and components
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import Alert from '../components/alert/Alert';

function PasswordChange() {
  // State variables for managing form inputs and error handling
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState('');
  const [alertbar, setAlertbar] = useState(false); // State to control alert display
  const [hide, setHide] = useState(true); // State to hide or show password form

  const navigate = useNavigate(); // For navigation after successful password change
  const location = useLocation(); // To retrieve passed state (email)
  const email = location.state?.email; // Extracting email from navigation state

  // If no email is found in state, show an alert and prevent further access
  if (!email) {
    return alert('Error: No email found. Please start from OTP verification.');
  }

  // Function to handle password submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Password validation
    if (password !== repassword) {
      return setError('Passwords do not match!');
    }

    if (!/[a-z]/.test(password)) {
      return setError('Password must include at least one lowercase letter.');
    }

    if (!/[0-9]/.test(password)) {
      return setError('Password must include at least one number.');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return setError('Password must include at least one special character.');
    }

    if (password.length !== 8) {
      return setError('Password must be exactly 8 characters long.');
    }

    // Sending request to backend to update password
    try {
      const response = await axios.post(BaseUrl + 'PasswordChange', { email, password });

      if (response) {
        setHide(false); // Hide form after success
        navigate('/alert', { state: { message: 'Password changed successfully' } });
        setAlertbar(true); // Show success alert

        // Redirect to login page after delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('An error occurred while changing the password.'); // Handle error
    }
  };

  return (
    <>
      {/* Alert component shown after successful password change */}
      {alertbar && <Alert />}

      {/* Password change form */}
      {hide && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br -mt-9">
          <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300 rounded-2xl">
            <div className="card-body p-6 flex flex-col items-center justify-center space-y-6">
              <h2 className="text-3xl font-extrabold text-center text-primary">
                Create a New Password
              </h2>

              {/* Password input form */}
              <form className="form-control space-y-4 w-full items-center" onSubmit={handleSignup}>
                {/* Password input field */}
                <label className="input validator w-full">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>

                {/* Re-enter password input field */}
                <label className="input validator w-full">
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="w-full"
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                    required
                  />
                </label>

                {/* Display error messages */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Submit button */}
                <button type="submit" className="btn bg-black text-white border-black w-full">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PasswordChange;
