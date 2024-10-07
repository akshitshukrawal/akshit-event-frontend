import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom'; // Import Link and Routes from react-router-dom
import CreateEvent from './CreateEvent'; // Import your CreateEvent component
import ManageEvents from './ManageEvents'; // Assuming you have a ManageEvent component
import Bookings from './Bookings'; // Assuming this component shows bookings

const Admin = ({isAdmin,setIsAdmin}) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Get user info from local storage

  useEffect(() => {
    const checkAdmin = async () => {
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
    };

    checkAdmin(); // Call the admin check function
  }, []); // Only run once on component mount

  if (!isAdmin) {
    return (
      <div>
        <h1>You do not have admin access.</h1>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="bg-gray-800 text-white w-64 min-h-screen">
        <h2 className="text-lg font-bold p-4">Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin/create-event" className="block p-4 hover:bg-gray-700">Create Event</Link>
          </li>
          <li>
            <Link to="/admin/manage-event" className="block p-4 hover:bg-gray-700">Manage Event</Link>
          </li>
          <li>
            <Link to="/admin/bookings" className="block p-4 hover:bg-gray-700">Bookings</Link>
          </li>
        </ul>
      </nav>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <h1>Welcome, Admin!</h1>
        <Routes>
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="manage-event" element={<ManageEvents />} /> {/* Add ManageEvent route */}
          <Route path="bookings" element={<Bookings />} /> {/* Assuming ShowBookings shows all bookings */}
          {/* You can add other admin-related routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
