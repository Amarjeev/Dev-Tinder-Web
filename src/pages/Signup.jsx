import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../components/alert/Alert';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import SignupNavbar from '../components/Navbar/SignupNavbar';

function  Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [alertbar, setAlertbar] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !repassword || !gender || !age || !photoUrl) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== repassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      

    //   if (response.data.success) {
    //     setAlertbar(false);
    //     setTimeout(() => navigate('/login'), 2000);
    //   }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <>
      {alertbar ? <SignupNavbar /> : <Alert />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br -mt-9">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300 rounded-2xl">
          <div className="card-body p-6 flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-primary">Sign Up</h2>

            <form className="form-control space-y-4 w-full items-center" onSubmit={handleSignup}>
              {/* Email */}
              <label className="input validator w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              {/* Password */}
              <label className="input validator w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                  required
                />
              </label>

              {/* Re-password */}
              <label className="input validator w-full">
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  className="w-full"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  minLength={4}
                  required
                />
              </label>

              {/* Gender */}
          <label className="input validator w-full">
  <select
    className="w-full bg-black text-white"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    required
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</label>


              {/* Age */}
              <label className="input validator w-full">
                <input
                  type="number"
                  placeholder="Age"
                  className="w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min={1}
                />
              </label>

              {/* Photo URL */}
              <label className="input validator w-full">
                <input
                  type="url"
                  placeholder="Photo URL"
                  className="w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                />
              </label>

              {/* Error Message */}
              {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

              {/* Signup Button */}
              <button type="submit" className="btn bg-black text-white border-black w-full">
                Sign Up
              </button>

              {/* Redirect to Login */}
              <p className="text-sm text-center text-gray-500 w-full">
                Already have an account?{' '}
                <a href="/login" className="text-primary hover:underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default  Signup;

















