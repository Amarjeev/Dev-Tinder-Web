import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileCard from './components/ProfileCard/ProfileCard';


import Signup from './pages/Signup';
import UserCard from './pages/UserCard';
import Feed from './pages/feed';




function App() {
  return (
    <>
      
  <Router>
  <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/profilecard' element={<ProfileCard />} />
          <Route path='/usercard' element={<UserCard />} />
           <Route path='/feed' element={<Feed />} />
            
          
          
    </Routes>
    </Router>
    </>
  
  );
}

export default App;
