import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl/BaseUrl';
import { removeUser } from '../../utils/userSlice';
// import Loading from '../Loading/Loading';

function Navbar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BaseUrl + 'logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      // <Loading />;
      navigate('/signup');
      dispatch(removeUser());
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl mx-9">
            🤝 Dev Tinder
          </Link>
        </div>

        <div className="flex items-center">
          {/* Scrollable badge bar */}
          {user && (
            <div className="overflow-x-auto whitespace-nowrap flex gap-2 px-4 mr-4">
              <div className="badge badge-primary h-6 inline-block">Friend Requests</div>
              <div className="badge badge-secondary h-6 inline-block">Suggestions</div>
              <div className="badge badge-accent h-6 inline-block">Your Friends</div>
              <div className="badge badge-neutral h-6 inline-block">Pending Requests</div>
              <div className="badge badge-info h-6 inline-block">My Profile</div>
            </div>
          )}

          <div className="mr-60"></div>

          {/* Avatar and dropdown menu */}
          <div className="dropdown dropdown-end mx-4">
            {user && (
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={user.photoUrl || '/default-avatar.png'}
                  />
                </div>
              </div>
            )}

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-50"
            >
              <li>
                <Link to="/profilecard" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
