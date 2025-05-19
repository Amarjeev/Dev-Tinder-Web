import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl/BaseUrl';
import { removeUser } from '../../utils/userSlice';

function Navbar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _id = user?._id;

  const handleLogout = async () => {
    try {
      await axios.post(BaseUrl + 'logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      dispatch(removeUser());
      navigate('/login');
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Brand */}
      <div className="flex-1">
        <Link to="#" className="btn btn-ghost text-xl mx-9">
          🤝 Dev Tinder
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Dropdown Menu for Badge Bar */}
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline btn-sm m-1">
              📂 Menu
            </div>

            <div
              tabIndex={0}
              className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-max"
            >
              <div className="overflow-x-auto whitespace-nowrap flex gap-3 px-4 py-2 rounded-lg bg-base-200">
                <div className="badge badge-primary h-7 px-4 hover:scale-105 transition-transform cursor-pointer">
                  🤝 Friend Requests
                </div>

                <Link to={`/PeopleList/${_id}`}>
                  <div className="badge badge-secondary h-7 px-4 hover:scale-105 transition-transform cursor-pointer">
                    💡 Suggestions
                  </div>
                </Link>

                <div className="badge badge-accent h-7 px-4 hover:scale-105 transition-transform cursor-pointer">
                  👥 Your Friends
                </div>

                <div className="badge badge-neutral h-7 px-4 hover:scale-105 transition-transform cursor-pointer">
                  ⏳ Pending Requests
                </div>
                 <Link to={'/usercard'}>
                <div className="badge badge-info h-7 px-4 hover:scale-105 transition-transform cursor-pointer">
                  🙋‍♂️ My Profile
                  </div>
                  </Link>
              </div>
            </div>
          </div>
        )}

        {/* Avatar Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user.photoUrl || '/default-avatar.png'} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-50"
            >
              <li>
                <Link to="/usercard" className="justify-between">Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
