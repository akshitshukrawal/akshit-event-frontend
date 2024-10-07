import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Booking from './Booking';

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://akshit-event-manager.vercel.app/api/events', {
          withCredentials: true
        }); // Fetch events
        setAllEvents(response.data); // Set the events to state
      } catch (error) {
        setError('Error fetching events');
      }
    };

    fetchEvents();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">New Events</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allEvents.length > 0 ? (
          allEvents.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event) => (
            <Booking event={event}/>
          ))
        ) : (
          <p className="text-gray-700">No events available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
