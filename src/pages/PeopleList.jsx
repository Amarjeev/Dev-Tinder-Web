import React, { useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import { addAlluser } from '../utils/allusersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

function PeopleList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allUsersData = useSelector((store) => store.allUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}alluser/${id}`);
        const data = response.data.alluserData;
        dispatch(addAlluser(data));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id, dispatch]);  // add dependencies here

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">People you may Know</li>
          {allUsersData && allUsersData.map((user) => (
            <li key={user._id} className="list-row w-180">
              <div><img className="size-10 rounded-box" src={user.photoUrl} alt={user.name} /></div>
              <div>
                <div>{user.name}</div>
              </div>
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
