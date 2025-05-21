// Import required dependencies and components
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function UserCard() {
  // State for toggling edit mode
  const [isEditable, setIsEditable] = useState(false);
  
  // User ID to use in API call for update
  const [userId, setUserId] = useState(null);
  
  // State for input validation errors
  const [errors, setErrors] = useState({});

  // Placeholder image if photo URL is not available
  const imageUrl = "https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

  // Editable user data object
  const [editData, setEditData] = useState({
    name: '',
    age: '',
    gender: '',
    photoUrl: '',
    email: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user data from server and populate form fields
  const fetchUser = async () => {
    try {
      const response = await axios.get(BaseUrl + 'profile', {
        withCredentials: true,
      });

      // Store user in Redux
      dispatch(addUser(response.data));

      // Store userId separately for use in PUT request
      setUserId(response.data._id);

      // Populate form fields
      setEditData({
        name: response.data.name || '',
        age: response.data.age || '',
        gender: response.data.gender || '',
        photoUrl: response.data.photoUrl || '',
        email: response.data.email || '',
      });
    } catch (error) {
      if (error.status === 500) {
        navigate('/signup'); // Redirect to signup on error
        console.log('internal server error');
      }
      console.log(error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Perform input validation
    if (name === "name") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, name: "Name must contain only letters and spaces." }));
      } else if (value.length > 15) {
        setErrors((prev) => ({ ...prev, name: "Only 15 characters allowed." }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }

    if (name === "age") {
      const age = parseInt(value);
      if (isNaN(age) || age < 0 || age > 120) {
        setErrors((prev) => ({ ...prev, age: "Please enter a valid age between 0 and 120." }));
      } else {
        setErrors((prev) => ({ ...prev, age: "" }));
      }
    }

    if (name === "gender") {
      const gender = value.toLowerCase();
      if (!["male", "female", "other"].includes(gender)) {
        setErrors((prev) => ({ ...prev, gender: "Gender must be 'male', 'female', or 'other'." }));
      } else {
        setErrors((prev) => ({ ...prev, gender: "" }));
      }
    }
  };

  // Save the updated user data
  const handleSave = async () => {
    // Prevent save if any validation errors exist
    if (errors.name || errors.age || errors.gender) {
      alert("Please fix the validation errors before saving.");
      return;
    }

    try {
      // API call to update user data
      const response = await axios.put(`${BaseUrl}edit/${userId}`, editData, { withCredentials: true });

      // Refresh user data after update
      fetchUser();
      
      // Exit edit mode
      setIsEditable(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Get user from Redux store (not used directly in rendering but useful if needed)
  const user = useSelector((store) => store.user);

  return (
    <div>
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
  >
      {/* Top Navbar */}
          <div className="sticky top-0 z-50 bg-white">
  <Navbar />
</div>

      {/* Main content */}
      <div className="min-h-screen flex justify-center items-center bg-neutral p-4">
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-xl">
          
          {/* Left side: profile image */}
          <figure className="w-1/3 h-auto overflow-hidden">
            <img
              src={editData.photoUrl || imageUrl}
              alt="User"
              className="w-full h-full object-cover rounded-l-xl"
            />
          </figure>

          {/* Right side: user details form */}
          <div className="card-body bg-base-100 text-white space-y-2 w-50">
            <h2 className="card-title text-lg font-bold">User Information</h2>

            {/* Name Field */}
            <div className="flex items-center justify-between">
              <span>Name:</span>
              <input
                name="name"
                value={editData.name}
                onChange={handleChange}
                type="text"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            {/* Age Field */}
            <div className="flex items-center justify-between">
              <span>Age:</span>
              <input
                name="age"
                value={editData.age}
                onChange={handleChange}
                type="text"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

            {/* Email Field (read-only) */}
            <div className="flex items-center justify-between">
              <span>Email:</span>
              <input
                name="email"
                value={editData.email}
                onChange={handleChange}
                type="text"
                className="input input-sm input-bordered w-2/3"
                readOnly
              />
            </div>

            {/* Gender Field */}
            <div className="flex items-center justify-between">
              <span>Gender:</span>
              <input
                name="gender"
                value={editData.gender}
                onChange={handleChange}
                type="text"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

            {/* Photo URL Field */}
            <div className="flex items-center justify-between">
              <span>Photo URL:</span>
              <input
                name="photoUrl"
                value={editData.photoUrl}
                onChange={handleChange}
                type="text"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>

            {/* Buttons: Save and Edit/Cancel */}
            <div className="card-actions justify-end pt-4">
              {isEditable && (
                <button
                  onClick={handleSave}
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white btn-sm"
                >
                  Save
                </button>
              )}
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setIsEditable(!isEditable)}
              >
                {isEditable ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>
        </div>
        </div>
        </motion.div>
    </div>
  );
}

export default UserCard;
