import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileCard from './components/ProfileCard/ProfileCard';



import UserCard from './pages/UserCard';
import PeopleList from './pages/PeopleList';
import Login from './pages/login';
import Signup from './pages/Signup';
import Alert from './components/alert/Alert';
import ForgotPassword from './pages/forgotPassword';
import Loading from './components/Loading/Loading';
import OtpVerification from './pages/OtpVerification';





function App() {
  return (
    <>
      
  <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profilecard' element={<ProfileCard />} />
          <Route path='/usercard' element={<UserCard />} />
          <Route path="/PeopleList/:id" element={<PeopleList />} />
           <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/otpVerification" element={<OtpVerification />} />

          
          
            
          
          
    </Routes>
    </Router>
    </>
  
  );
}

export default App;
