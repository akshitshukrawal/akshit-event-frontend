import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [users, setUsers] = useState([]); // State to hold user data
  const [events, setEvents] = useState([]); // State to hold event data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(''); // State to manage error messages

  // Fetch bookings from API on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingResponse = await axios.get('https://akshit-event-manager.vercel.app/api/bookings', {
          withCredentials: true
        });
        const userResponse = await axios.get('Routes/api/users', {
          withCredentials: true
        }); // Fetch all users
        const eventResponse = await axios.get('https://akshit-event-manager.vercel.app/api/events', {
          withCredentials: true
        }); // Fetch all events

        setBookings(bookingResponse.data); // Assuming response.data contains an array of bookings
        setUsers(userResponse.data); // Assuming response.data contains an array of users
        setEvents(eventResponse.data); // Assuming response.data contains an array of events

        // Sort bookings by date in descending order (most recent first)
        const sortedBookings = bookingResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookings(sortedBookings); // Set the sorted bookings
      } catch (err) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBookings(); // Call the fetch function
  }, []);

  // Function to get user name by ID
  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? user.username : 'Unknown User'; // Return 'Unknown User' if user not found
  };

  // Function to get event name by ID
  const getEventName = (eventId) => {
    const event = events.find(e => e._id === eventId);
    return event ? event.name : 'Unknown Event'; // Return 'Unknown Event' if event not found
  };

  // Render loading, error, or table based on state
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Bookings</h2>
      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Event</th>
              <th className="py-2 px-4 border-b text-left">Tickets</th>
              <th className="py-2 px-4 border-b text-left">User</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{getEventName(booking.event)}</td>
                <td className="py-2 px-4 border-b">{booking.noOfTickets}</td>
                <td className="py-2 px-4 border-b">{getUserName(booking.user)}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.date).toLocaleString()} {/* Show date and time */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
