import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import UserCard from './pages/UserCard';
import PeopleList from './pages/PeopleList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Alert from './components/alert/Alert';
import ForgotPassword from './pages/ForgotPassword';
import Loading from './components/Loading/Loading';
import OtpVerification from './pages/OtpVerification';
import PasswordChange from './pages/PasswordChange';
import FriendRequests from './pages/FriendRequests';
import FriendsList from './pages/FriendsList';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usercard" element={<UserCard />} />
        <Route path="/PeopleList/:id" element={<PeopleList />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/otpVerification" element={<OtpVerification />} />
        <Route path="/PasswordChange" element={<PasswordChange />} />
        <Route path="/friendrequests/:id" element={<FriendRequests />} />
         <Route path="/friendslist/:id" element={<FriendsList />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;
