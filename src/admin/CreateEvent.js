import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
    const [name, setName] = useState('');
    const [ticketsLeft, setTicketsLeft] = useState('');
    const [eventDate, setEventDate] = useState(''); // New state for event date
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            // Send event name, tickets left, and date to the API
            await axios.post('https://akshit-event-manager.vercel.app/api/events', { 
                name, 
                ticketsLeft: parseInt(ticketsLeft), // Ensure ticketsLeft is a number
                date: eventDate // Include the event date
            }, {
                withCredentials: true
              });
            setSuccess('Event created successfully');
            setName('');
            setTicketsLeft('');
            setEventDate(''); // Reset the event date
        } catch (error) {
            setError('Error creating event');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Create Event</h2>
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleCreateEvent}>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="number"
                    placeholder="Number of Tickets Left"
                    value={ticketsLeft}
                    onChange={(e) => setTicketsLeft(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="date" // Input for event date
                    placeholder="Event Date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
