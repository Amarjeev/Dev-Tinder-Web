import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';


function UserCard() {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div>
          <Navbar />
       
      <div className="min-h-screen flex justify-center items-center bg-neutral p-4">
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-2xl w-full">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="User"
              className="h-full object-cover"
            />
          </figure>
          <div className="card-body bg-base-100 text-white space-y-2">
            <h2 className="card-title text-lg font-bold">User Information</h2>

            <div className="flex items-center justify-between">
              <span>Name:</span>
              <input
                type="text"
                defaultValue="amarjeev"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Age:</span>
              <input
                type="text"
                defaultValue="20"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Email:</span>
              <input
                type="text"
                defaultValue="amarjeev@example.com"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Gender:</span>
              <input
                type="text"
                defaultValue="Male"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Photo URL:</span>
              <input
                type="text"
                defaultValue="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                className="input input-sm input-bordered w-2/3"
                readOnly={!isEditable}
              />
            </div>

            <div className="card-actions justify-end pt-4">
             {isEditable && (<button onClick={() => setIsEditable(!isEditable)} className="btn bg-indigo-600 hover:bg-indigo-700 text-white btn-sm">
                Save
              </button>)}
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
