import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserCard() {
  const [isEditable, setIsEditable] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [editData, setEditData] = useState({
    name: '',
    age: '',
    gender: '',
    photoUrl: '',
    email: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(BaseUrl + 'profile', {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
      setUserId(response.data._id);
      setEditData({
        name: response.data.name || '',
        age: response.data.age || '',
        gender: response.data.gender || '',
        photoUrl: response.data.photoUrl || '',
        email: response.data.email || '',
      });
    } catch (error) {
      if (error.status === 500) {
        navigate('/signup');
        console.log('internal server error');
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validation
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

  const handleSave = async () => {
    if (errors.name || errors.age || errors.gender) {
      alert("Please fix the validation errors before saving.");
      return;
    }

    try {
      const response = await axios.put(`${BaseUrl}edit/${userId}`, editData, { withCredentials: true });
      fetchUser();
      setIsEditable(false);
    } catch (error) {
      console.log(error);
    }
  };

  const user = useSelector((store) => store.user);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-neutral p-4">
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-xl">
          <figure className="w-1/3 h-auto overflow-hidden">
            <img
              src={user && user.photoUrl}
              alt="User"
              className="w-full h-full object-cover rounded-l-xl"
            />
          </figure>

          <div className="card-body bg-base-100 text-white space-y-2 w-50">
            <h2 className="card-title text-lg font-bold">User Information</h2>

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
    </div>
  );
}

export default UserCard;
