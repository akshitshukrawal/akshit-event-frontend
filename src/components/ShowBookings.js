import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // Optional: to format the date

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

  const getEventById = async (id) => {
    try {
      const response = await axios.get(`https://akshit-event-manager.vercel.app/api/events/${id}`, {
        withCredentials: true
      });
      console.log("this is user -> ",response.data);
      return response.data[0].name;
    } catch (error) {
      setError('Error fetching event details');
    } finally {
      setLoading(false); // Stop loading once the API call is done
    }
  };
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
              <div key={booking._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold">{getEventById(booking.event) || 'Event Name'}</h2>
                <p className="text-gray-700">Tickets Booked: {booking.noOfTickets}</p>
                <p className="text-gray-600">
                  Booking Date & Time: {new Date(booking.date).toLocaleString()} {/* Shows date and time */}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <p>No upcoming bookings found</p>
      )}
    </div>
  );
};

export default ShowBookings;
