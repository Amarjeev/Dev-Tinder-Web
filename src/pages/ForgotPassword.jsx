import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import Loading from '../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('amarjeevm@gmail.com');
  const [loading, setLoading] = useState(false); // start with false
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const response = await axios.post(BaseUrl + 'forgot-password', { email });
      if (response) {
        navigate('/otpVerification')
      
      }
    } catch (error) {
      console.error(error);
      alert('Email address not valid');
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div>
      {loading && <Loading />}
   
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br -mt-9">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300 rounded-2xl">
          <div className="card-body p-6 flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-primary">Forgot Password</h2>

            <form
              className="form-control space-y-4 w-full items-center"
              onSubmit={handleSubmit}
            >
              {/* Email Field */}
              <label className="input validator w-full flex items-center space-x-2" htmlFor="email">
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
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
