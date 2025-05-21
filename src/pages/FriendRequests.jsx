// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function FriendRequests() {
  // Get user ID from route parameters
  const { id } = useParams();
  const loginUserId = id;

  // State to store friend request data
  const [userData, setUserData] = useState([]);
  // State to toggle friend request message and buttons
  const [hide, setHide] = useState(true);
  const [confirmedRequests, setConfirmedRequests] = useState([]);


  // Fetch friend requests on component mount
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  // Function to fetch friend requests from server
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`${BaseUrl}FriendRequests/${loginUserId}`);
      setUserData(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  // Confirm friend request handler
    const handleConfirm = async (fromUserId) => {
   try {    
        const response = await axios.post(BaseUrl + 'friendRequests/Accept', { fromUserId })
        if (response) {
               setConfirmedRequests((prev) => [...prev, fromUserId]);
        }
}catch (error) {
      console.error("Error fetching friend requests:", error);
    }
     
  };

  // Delete friend request handler
  const handleDelete = async (fromUserId) => {
    console.log("Deleted request from:", fromUserId);
  };

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />
      <div className="flex justify-center px-4">
        <div className="dark:bg-gray-900 shadow-md rounded-lg p-6 w-full max-w-2xl">
          {/* Header with count of friend requests */}
          <h2 className="text-2xl font-bold text-white mb-4 border-b pb-2 flex justify-between items-center">
            Friend Requests
            <span className="text-xl font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {userData.length}
            </span>
          </h2>

          {/* If no requests, show message; otherwise, render list */}
          {userData.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No friend requests yet.</div>
          ) : (
            <ul className="space-y-5">
              {/* Iterate through each friend request */}
              {userData.map((data) => (
                <li
                  key={data._id}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {/* Profile picture */}
                    <img
                      className="w-14 h-14 rounded-full object-cover border border-gray-300"
                      src={data.fromUserId?.photoUrl || "https://img.daisyui.com/images/profile/demo/1@94.webp"}
                      alt={data.fromUserId?.name || "No Name"}
                    />
                    <div>
                      {/* User name */}
                      <p className="text-md font-medium text-gray-800 dark:text-white">
                        {data.fromUserId?.name || "No Name"}
                      </p>
                      {/* Conditional message based on 'hide' */}
                      {confirmedRequests.includes(data.fromUserId._id) ? (
                        <p className="text-sm text-gray-500">You are now friends</p>
                      ) : (
                          <p className="text-sm text-gray-500">Sent you a friend request</p>
                          
                      )}
                    </div>
                  </div>

                  {/* Confirm and Delete buttons only shown if 'hide' is true */}
                  {!confirmedRequests.includes(data.fromUserId._id) && (
  <div className="flex gap-2">
    <button
      onClick={() => handleConfirm(data.fromUserId._id)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
    >
      Confirm
    </button>
    <button
      onClick={() => handleDelete(data.fromUserId._id)}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded-md text-sm font-semibold"
    >
      Delete
    </button>
  </div>
)}

                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default FriendRequests;
