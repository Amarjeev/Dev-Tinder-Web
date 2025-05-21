import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';

function FriendsList() {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const loginUserId = id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}friendslist/${loginUserId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching friends list:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-4">
        <ul className="list bg-base-100 rounded-box shadow-md w-130">
          {/* Friends Count */}
          <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
            <span className="text-2xl text-red-600">{userData.length}</span> friends
          </li>

          {/* Friend Items */}
          {userData.map((friend, index) => (
            <li
              key={friend._id || index}
              className="list-row flex items-center gap-4 p-4"
            >
              <img
                className="size-10 rounded-box"
                src={friend.photoUrl || "https://img.daisyui.com/images/profile/demo/1@94.webp"}
                alt="Profile"
              />
              <div className="flex-grow">
                <h1 className="text-2xl">{friend.name}</h1>
              </div>
              <button className="btn btn-outline btn-accent w-30">Message</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FriendsList;
