// Import React and hooks
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Import custom components and helper
import Alert from '../components/alert/Alert';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import SignupNavbar from '../components/Navbar/SignupNavbar';

function Signup() {
  // State to hold user input data
  const [userData, setUserdata] = useState({
    name: 'arjun',
    email: 'arjun@gmail.com',
    age: '25',
    password: 'amar123$',
    gender: 'male',
    photoUrl: '',
  });

  // State for confirm/re-enter password field
  const [repassword, setRepassword] = useState('amar123$');

  // Alert visibility toggle
  const [alertbar, setAlertbar] = useState(true);

  // Error message for form validation or API errors
  const [errorMessage, setErrorMessage] = useState('');

  // Navigation hook to redirect user
  const navigate = useNavigate();

  // Handle changes in form input fields
  const handleChange = (e) => {
    setUserdata({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle the signup form submission
  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      const { email, gender, age, photoUrl, password, name } = userData;

      // Check if password and re-entered password match
      if (password !== repassword) {
        setErrorMessage("Passwords don't match.");
        return;
      }

      // Check if required fields are filled
      if (!email || !password || !repassword || !gender || !age) {
        setErrorMessage('All fields are required.');
        return;
      }

      // Validate password content
      if (!/[a-z]/.test(password)) {
        setErrorMessage("Password must include at least one lowercase letter.");
        return;
      }

      if (!/[0-9]/.test(password)) {
        setErrorMessage("Password must include at least one number.");
        return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setErrorMessage("Password must include at least one special character.");
        return;
      }

      if (password.length !== 8) {
        setErrorMessage("Password must be exactly 8 characters long.");
        return;
      }

      // Name validation: only letters and spaces allowed
      if (!/^[A-Za-z\s]+$/.test(name)) {
        setErrorMessage("Name must contain only letters and spaces.");
        return;
      }

      // Make API call to signup endpoint
      const response = await axios.post(BaseUrl + 'signup', userData);

      // On success: show success alert and redirect after 2 seconds
      navigate("/alert", { state: { message: "signup" } });
      setAlertbar(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Handle API error responses
      setErrorMessage(err.response?.data?.message || 'Signup failed.');
      console.log(err);
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <>
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
  >
      {/* Conditional rendering: show SignupNavbar or Alert */}
      {alertbar ? <SignupNavbar /> : <Alert />}

      {/* Signup form section */}
      {alertbar && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br -mt-9">
          <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300 rounded-2xl">
            <div className="card-body p-6 flex flex-col items-center justify-center space-y-6">
              <h2 className="text-3xl font-extrabold text-center text-primary">Sign Up</h2>

              {/* Form starts here */}
              <form className="form-control space-y-4 w-full items-center" onSubmit={handleSignup}>

                {/* Name field */}
                <label className="input validator w-full">
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    className="w-full"
                    value={userData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                {/* Email field */}
                <label className="input validator w-full">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                {/* Password field */}
                <label className="input validator w-full">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                </label>

                {/* Re-enter password field */}
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

                {/* Gender select field */}
                <label className="input validator w-full">
                  <select
                    className="w-full bg-black text-white"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                {/* Age field */}
                <label className="input validator w-full">
                  <input
                    type="number"
                    placeholder="Age"
                    className="w-full"
                    name="age"
                    value={userData.age}
                    onChange={handleChange}
                    required
                    min={1}
                    max={120}
                  />
                </label>

                {/* Photo URL field */}
                <label className="input validator w-full">
                  <input
                    type="url"
                    placeholder="Photo URL"
                    className="w-full"
                    name="photoUrl"
                    value={userData.photoUrl}
                    onChange={handleChange}
                    pattern="https?://.*\.(jpg|jpeg|png|gif|bmp|webp)$"
                    title="Please enter a valid image URL (ending in .jpg, .png, etc.)"
                  />
                </label>

                {/* Display validation or server error message */}
                {errorMessage && (
                  <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                )}

                {/* Submit button */}
                <button type="submit" className="btn bg-black text-white border-black w-full">
                  Sign Up
                </button>

                {/* Link to login page */}
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
        )}
        </motion.div>
    </>
  );
}

export default Signup;
