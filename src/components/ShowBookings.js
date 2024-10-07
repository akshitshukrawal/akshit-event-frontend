import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // Optional: to format the date
import ShowOneBooking from './ShowOneBooking';

const ShowBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch bookings for the logged-in user
        const response = await axios.get(`https://akshit-event-manager.vercel.app/api/bookings/user/${userInfo._id}`, {
          withCredentials: true
        });
        console.log(response.data);
        setBookings(response.data); // Set the bookings in state

      } catch (error) {
        setError('Error fetching bookings');
      }
    };

    if (userInfo && userInfo._id) {
      fetchBookings(); // Fetch bookings only if user is logged in
    } else {
      setError('User not logged in');
    }
  }, [userInfo]);

  // Get today's date using dayjs
  const today = dayjs();

  // Filter for upcoming bookings
  const upcomingBookings = bookings.filter((booking) => dayjs(booking.date).isAfter(today));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Upcoming Bookings</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Show upcoming bookings */}
      {upcomingBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingBookings
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort bookings by date (soonest first)
            .map((booking) => (
              <ShowOneBooking key={booking._id} booking={booking} />
            ))}
        </div>
      ) : (
        <p>No upcoming bookings found</p>
      )}
    </div>
  );
};

export default ShowBookings;
