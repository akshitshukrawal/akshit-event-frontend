import React, { useState } from 'react';
import dayjs from 'dayjs'; // Optional: to format the date
import axios from 'axios';

const Booking = ({ event }) => {
  const [ticketCount, setTicketCount] = useState(1); // State for the number of tickets
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get userInfo from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Handle booking process
  const handleBooking = async (event) => {
    try {

      // Post booking data to API
      const response = await axios.post('https://akshit-event-manager.vercel.app/api/bookings', { 
        eventId: event._id, 
        noOfTickets: ticketCount, 
        userId: userInfo._id 
      }, {
        withCredentials: true
      });

      // Set success message if the booking is successful
      setSuccess('Booking created successfully');
      
      // Reset states or perform any additional actions
      setTicketCount(1);  // Reset ticket count to 1 after booking
    } catch (error) {
      console.error('Booking Error:', error.response ? error.response.data : error.message);
      setError('Error creating booking');
    }
  };

  // Function to increment ticket count
  const incrementTicket = () => {
    if (ticketCount < event.ticketsLeft) {
      setTicketCount(ticketCount + 1);
    }
  };

  // Function to decrement ticket count
  const decrementTicket = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  return (
    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      <h2 className="text-lg font-bold mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-2">
        Date: {dayjs(event.date).format('MMM DD, YYYY')} {/* Format date */}
      </p>
      <p className="text-gray-800 font-medium">Tickets Left: {event.ticketsLeft}</p>
      <p className="text-gray-700">Sold Tickets: {event.soldTickets}</p>

      {/* Display success or error messages */}
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 flex items-center space-x-4">
        <button
          className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400"
          onClick={decrementTicket}
        >
          -
        </button>
        <span className="text-lg">{ticketCount}</span>
        <button
          className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400"
          onClick={incrementTicket}
        >
          +
        </button>
      </div>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => handleBooking(event)} // Pass function as reference
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Booking;
