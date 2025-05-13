import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileCard() {
  const [showPassword, setShowPassword] = useState(false);
  const user=useSelector(store=>store.user)


  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleBack = () => {
    window.history.back(); 
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center text-base-content">
          {/* Back Button inside the card */}
          <button 
            onClick={handleBack} 
            className="btn btn-xs btn-outline mb-4 ml-70"
          >
            Back
          </button>

          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={ user.userObj.photoUrl}
                alt="Profile"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mt-4">{ user.userObj.name}</h2>
           

          <div className="mt-4 w-full">
            <div className="text-left space-y-2">
              <p><span className="font-semibold">Email:</span> { user.userObj.email}</p>
              <p><span className="font-semibold">Age:</span> { user.userObj.age}</p>
              <p><span className="font-semibold">Gender:</span> { user.userObj.gender}</p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Password:</span>
                <span>{showPassword ?  user.userObj.password : '••••••••'} </span>
                <button
                  onClick={handleTogglePassword}
                  className="btn btn-xs btn-none"
                >
                  {showPassword ? '🙈' : '👀'}
                </button>
              </p>
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary btn-sm">Edit</button>
            <button className="btn btn-outline btn-sm">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
