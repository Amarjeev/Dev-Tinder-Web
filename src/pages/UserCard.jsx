import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

function UserCard() {
  // State to toggle edit mode
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user data from server
  const fetchUser = async () => {
    try {
      const response = await axios.get(BaseUrl + 'profile', {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(addUser(response.data)); // Store user data in Redux
    } catch (error) {
      if (error.status === 500) {
      
        navigate('/signup'); // Navigate if internal server error
        console.log('internal server error');
      }
      console.log(error);
    }
  };

  // Run fetchUser once when component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  const user = useSelector((store) => store.user); // Get user from Redux store

  //updating and Edit Profile for current user

  return (
    <div>
      <Navbar />

      {/* Main Container */}
      <div className="min-h-screen flex justify-center items-center bg-neutral p-4 ">
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-xl">
          {/* User Image */}
          <figure className="w-1/3 h-auto overflow-hidden">
            <img
              src={user && user.photoUrl}
              alt="User"
              className="w-full h-full object-cover rounded-l-xl"
            />
          </figure>

          {/* User Info Card */}
          <div className="card-body bg-base-100 text-white space-y-2 w-50">
            <h2 className="card-title text-lg font-bold">User Information</h2>

            {/* Name Field */}
            <div className="flex items-center justify-between">
              <span>Name:</span>
              <input
                type="text"
                defaultValue={user && user.name}
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>

            {/* Age Field */}
            <div className="flex items-center justify-between">
              <span>Age:</span>
              <input
                type="text"
                defaultValue={user && user.age}
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center justify-between">
              <span>Email:</span>
              <input
                type="text"
                defaultValue={user && user.email}
                className="input input-sm input-bordered w-2/3"
                readOnly
              />
            </div>

            {/* Gender Field */}
            <div className="flex items-center justify-between">
              <span>Gender:</span>
              <input
                type="text"
                defaultValue={user && user.gender}
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>

            {/* Photo URL Field */}
            <div className="flex items-center justify-between">
              <span>Photo URL:</span>
              <input
                type="text"
                defaultValue={user && user.photoUrl}
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>

            {/* Buttons */}
            <div className="card-actions justify-end pt-4">
              {isEditable && (
                <button
                  onClick={() => setIsEditable(!isEditable)}
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
    </div>
  );
}

export default UserCard;
