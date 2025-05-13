import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileCard from './components/ProfileCard/ProfileCard';


import Signup from './pages/Signup';
import UserCard from './pages/UserCard';




function App() {
  return (
    <>
      
  <Router>
  <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/profilecard' element={<ProfileCard />} />
          <Route path='/usercard' element={<UserCard />} />
          
          
    </Routes>
    </Router>
    </>
  
  );
}

export default App;
