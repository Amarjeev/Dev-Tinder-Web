import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../components/BaseUrl/BaseUrl';
import { addAlluser } from '../utils/allusersSlice';
import { useDispatch } from 'react-redux';

function Feed() {
    const [allUsersData, setAllUsersData] = useState([]);
    const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(BaseUrl + 'feed');
           const data = response.data.alluserData;
                setAllUsersData(data);
                dispatch(addAlluser(data));
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      
    </div>
  );
}

export default Feed;
