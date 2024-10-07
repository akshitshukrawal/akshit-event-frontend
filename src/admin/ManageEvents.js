import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageEvents = () => {
  const [allEvents, setAllEvents] = useState([]);

  // Fetch all events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://akshit-event-manager.vercel.app/api/events', {
          withCredentials: true
        }); // Adjust the endpoint as necessary
        setAllEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the fetch function
  }, []);

  // Delete an event by ID
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`https://akshit-event-manager.vercel.app/api/events/${eventId}`, {
        withCredentials: true
      }); // Adjust the endpoint as necessary
      setAllEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId)); // Update state
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Manage Events</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Event Name</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Total Tickets</th>
              <th className="py-2 px-4 border-b text-left">Sold Tickets</th>
              <th className="py-2 px-4 border-b text-left">Tickets Left</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
              <tr key={event._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{event.name}</td>
                <td className="py-2 px-4 border-b">{new Date(event.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{event.totalTickets}</td>
                <td className="py-2 px-4 border-b">{event.soldTickets}</td>
                <td className="py-2 px-4 border-b">{event.ticketsLeft}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => deleteEvent(event._id)} 
                    className="font-medium text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
