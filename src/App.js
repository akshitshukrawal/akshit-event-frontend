import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import CreateBooking from './components/CreateBooking';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ShowBookings from './components/ShowBookings';
import Admin from './admin/Admin';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Get user info from local storage

  useEffect(() => {
    const checkAdmin = async () => {
      if (userInfo) { // Ensure userInfo exists before checking admin status
        try {
          const response = await axios.post('https://akshit-event-manager.vercel.app/api/users/admin', {
            username: userInfo.username,
            password: userInfo.password
          }, {
            withCredentials: true
          });
          
          // Check if the user is admin
          setIsAdmin(response.data.isAdmin);
          console.log("this is the response -> ", response.data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    };

    checkAdmin(); // Call the admin check function
  }, []); // Dependency array to ensure effect runs when userInfo changes

  return (
    <div>
      <Router>
        <Navbar isAdmin={isAdmin} />
        <div>
          <Routes>
            <Route path="/admin/*" element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/show-booking" element={<ShowBookings />} />
            <Route path="/create-booking" element={<CreateBooking />} />
            {/* Add other routes as necessary */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
