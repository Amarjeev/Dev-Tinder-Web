// Import necessary modules and components
import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../components/alert/Alert';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import SignupNavbar from '../components/Navbar/SignupNavbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


function Login() {
  // States for form fields and UI handling
  const [email, setEmail] = useState(''); // Email input value
  const [password, setPassword] = useState('amar@123');       // Password input value
  const [alertbar, setalertbar] = useState(true);             // Controls whether to show SignupNavbar or Alert
  const [errorMessage, setErrorMessage] = useState('');       // To show backend errors (like invalid credentials)

  // Redux dispatcher
  const dispatch = useDispatch();

  // Navigation hook from React Router
  const navigate = useNavigate();

  // Function to handle login form submission
  async function logined(e) {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      // Check if fields are empty
      if (!email || !password) {
        alert('Please fill in the form');
        return;
      }

      // Send POST request to login API
      const res = await axios.post(
        BaseUrl + 'login',
        { email, password },
        { withCredentials: true } // Include credentials (cookies)
      );

      // Add user to Redux store
      dispatch(addUser(res.data));

      // If no response, stay on login
      if (!res) {
        navigate('/login');
      }

      // On successful login
      if (res) {
        // Show alert and hide signup navbar
        navigate("/alert", { state: { message: "Login" } });
        setalertbar(false);
        setErrorMessage('');

        // Redirect to user card page after 2 seconds
        setTimeout(() => {
          navigate('/usercard');
        }, 2000);
      }

    } catch (error) {
      // Handle backend error and show appropriate message
      console.error(error);
      const e = error.response?.data?.emailerror;
      setErrorMessage(e);
    }
  }

  return (
    <>
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
  >
      {/* Show SignupNavbar initially, then Alert after login */}
      {alertbar ? <SignupNavbar /> : <Alert />}

      {/* Login UI container */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br -mt-9">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300 rounded-2xl">
          <div className="card-body p-6 flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-primary">Login</h2>

            {/* Login form */}
            <form className="form-control space-y-4 w-full items-center" onSubmit={logined}>
              {/* Email Field */}
              <label className="input validator w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </g>
                </svg>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  type="email"
                  placeholder="mail@site.com"
                  required
                />
              </label>

              {/* Password Field */}
              <label className="input validator w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                  </g>
                </svg>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  type="password"
                  placeholder="Password"
                  required
                  minLength="4"
                />
              </label>

              {/* Show error message if login fails */}
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-between text-sm text-gray-500 w-full">
                <Link to={"/forgotPassword"} className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Login Submit Button */}
              <button type="submit" className="btn bg-black text-white border-black w-full">
                Login
              </button>

              {/* Redirect to Signup Link */}
              <p className="text-sm text-center text-gray-500 w-full">
                Don't have an account?{' '}
                <a href="/signup" className="text-primary hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
        </div>
        </motion.div>
    </>
  );
}

export default Login;
