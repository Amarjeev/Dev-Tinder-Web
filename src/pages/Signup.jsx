import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Alert from '../components/alert/Alert';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';



function Login() {
  const [email, setEmail] = useState('sajith@gmail.com');
  const [password, setPassword] = useState('amar123$');
  const [alertbar, setalertbar] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logined(e) {
    e.preventDefault(); // Prevent default form submission
    try {
      if (!email || !password) {
        alert('Please fill in the form');
        return;
      }

      const res = await axios.post(
        BaseUrl+'login',
        { email, password },
        { withCredentials: true }
      );
 
      dispatch(addUser(res.data))
      if (!res) {
        navigate('/signup'); 
      }

      if (res) {
        setalertbar(false);
        setErrorMessage('');
        setTimeout(() => {
          navigate('/usercard'); 
        },2000)
        
       
      }
    } catch (error) {
      console.error(error);
      const e = error.response?.data?.emailerror;
      setErrorMessage(e);
    }
  }

  return (
    <>
      {alertbar ? <Navbar /> : <Alert />}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br -mt-9">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300 rounded-2xl">
          <div className="card-body p-6 flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-primary">Login</h2>

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

              {/* Optional error message */}
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
              )}

              {/* Forgot Password */}
              <div className="flex justify-between text-sm text-gray-500 w-full">
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn bg-black text-white border-black w-full">
                Login
              </button>

              {/* Redirect to Signup */}
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
    </>
  );
}

export default Login;
