import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ShowOneBooking = ({ booking }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`https://akshit-event-manager.vercel.app/api/events/${booking.event}`, {
          withCredentials: true
        });
        setEvent(response.data[0]);
      } catch (error) {
        setError('Error fetching event details');
      } finally {
        setLoading(false); // Stop loading once the API call is done
      }
    };

    if (booking.event) {
      getEventById();  // Fetch event details when booking.event is available
    }
  }, [booking.event]); // Add booking.event to the dependency array

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;  // Show error message
  }

  return (
    <div key={booking._id} className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold">{event?.name || 'Event Name'}</h2>
      <p className="text-gray-700">Tickets Booked: {booking.noOfTickets}</p>
      <p className="text-gray-600">
        Booking Date & Time: {new Date(booking.date).toLocaleString()} {/* Shows date and time */}
      </p>
    </div>
  );
};

export default ShowOneBooking;
