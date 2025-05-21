// Import necessary dependencies from React and other libraries
import React, { useEffect, useState } from 'react'; // React hooks
import axios from 'axios'; // For making HTTP requests
import { BaseUrl } from '../components/BaseUrl/BaseUrl'; // Base URL for API requests
import { addAlluser } from '../utils/allusersSlice'; // Redux action to store user data
import { useDispatch, useSelector } from 'react-redux'; // React-Redux hooks
import Navbar from '../components/Navbar/Navbar'; // Navigation bar component
import { useParams } from 'react-router-dom'; // Hook to get route parameters
import { toast } from 'react-toastify'; // For toast notifications
import { motion } from 'framer-motion'; // For animations

function PeopleList() {
  // Get the user ID from URL parameters
  const { id } = useParams();
  const fromUserId = id;

  // State to store IDs of users who received friend requests
  const [requestedFriendIds, setRequestedFriendIds] = useState([]);

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Select the user data from Redux store
  const allUsersData = useSelector((store) => store.allUser);

  // Fetch data when component mounts or 'id' changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get list of friend requests sent by current user
        const currentStatus = await axios.get(`${BaseUrl}currentStatus/${fromUserId}`);
        const userData = currentStatus.data;
        const ids = userData.map((item) => item.toUserId);
        setRequestedFriendIds((prev) => [...prev, ...ids]);

        // Fetch all user data from server
        const response = await axios.get(`${BaseUrl}alluser/${id}`);
        const data = response.data.alluserData;

        // Dispatch user data to Redux store
        dispatch(addAlluser(data));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id, dispatch]);

  // Handle sending a friend request
  const addFriendBtn = async (id) => {
    // Update UI state immediately
    setRequestedFriendIds((prev) => [...prev, id]);

    try {
      // Send friend request to backend
      await axios.post(BaseUrl + 'addfriend', {
        fromUserId: fromUserId,
        status: 'interested',
        toUserId: id,
      });
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  // Cancel a sent friend request
  const cancelRequest = async (id) => {
    // Update UI state immediately
    setRequestedFriendIds((prev) => prev.filter((item) => item !== id));

    try {
      // Send request to cancel the friend request
      const res = await axios.delete(BaseUrl + 'cancelRequest', {
        data: {
          toUserId: id,
          loginUserId: fromUserId
        }
      });
      // Optional: Show success toast
      // toast.success('Friend request cancelled');
    } catch (error) {
      console.error('Error cancelling friend request:', error);
    }
  };

  // Placeholder function for removing a user (not implemented)
  const removeBtn = (id) => {
    // alert(id)
  };

  return (
    <>
      {/* Animate the entire section using framer-motion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        {/* Navigation Bar */}
        <div className="sticky top-0 z-50 bg-white">
          <Navbar />
        </div>

        {/* Container for the list */}
        <div className="flex justify-center">
          <ul className="list bg-base-100 rounded-box shadow-md">
            {/* Header item */}
            <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">
              People you may Know
            </li>

            {/* List of users */}
            {allUsersData &&
              allUsersData.map((user) => (
                <li key={user._id} className="list-row w-180">
                  {/* User image */}
                  <div>
                    <img
                      className="size-10 rounded-box"
                      src={user.photoUrl}
                      alt={user.name}
                    />
                  </div>

                  {/* User name */}
                  <div>
                    <div>{user.name}</div>
                  </div>

                  {/* Action buttons based on friend request status */}
                  {requestedFriendIds.includes(user._id) ? (
                    <button
                      onClick={() => cancelRequest(user._id)}
                      className="btn btn-outline btn-info h-8 w-64"
                    >
                      Cancel Request
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => addFriendBtn(user._id)}
                        className="btn btn-square btn-ghost bg-blue-500 w-30 h-8"
                      >
                        Add friend
                      </button>
                      <button
                        onClick={() => removeBtn(user._id)}
                        className="btn btn-square btn-ghost bg-gray-400 w-30 h-8"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
}

export default PeopleList;

