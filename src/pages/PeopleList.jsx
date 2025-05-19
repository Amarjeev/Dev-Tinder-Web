// Import necessary dependencies from React and other libraries
import React, { useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import { BaseUrl } from '../components/BaseUrl/BaseUrl'; // Base URL for API requests
import { addAlluser } from '../utils/allusersSlice'; // Redux action to store user data
import { useDispatch, useSelector } from 'react-redux'; // React-Redux hooks
import Navbar from '../components/Navbar/Navbar'; // Navigation bar component
import { useParams } from 'react-router-dom'; // Hook to get route parameters

function PeopleList() {
  // Get the user ID from URL parameters
  const { id } = useParams();

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Select the user data from Redux store
  const allUsersData = useSelector((store) => store.allUser);

  // useEffect to fetch user data when the component mounts or 'id' changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make GET request to the backend to fetch all users data
        const response = await axios.get(`${BaseUrl}alluser/${id}`);
        const data = response.data.alluserData;

        // Dispatch the fetched data to the Redux store
        dispatch(addAlluser(data));
      } catch (error) {
        // Handle and log any error
        console.error(error.message);
      }
    };

    // Call the function to fetch data
    fetchData();
  }, [id, dispatch]);  // Dependencies: effect will re-run if 'id' or 'dispatch' changes

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Container for the list */}
      <div className="flex justify-center">
        <ul className="list bg-base-100 rounded-box shadow-md">
          {/* Header item */}
          <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">People you may Know</li>

          {/* Map through all users and display each user's info */}
          {allUsersData && allUsersData.map((user) => (
            <li key={user._id} className="list-row w-180">
              {/* User image */}
              <div>
                <img className="size-10 rounded-box" src={user.photoUrl} alt={user.name} />
              </div>

              {/* User name */}
              <div>
                <div>{user.name}</div>
              </div>

              {/* Action buttons */}
              <button className="btn btn-square btn-ghost bg-emerald-500 w-30">Add friend</button>
              <button className="btn btn-square btn-ghost bg-orange-700 w-30">Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PeopleList;
