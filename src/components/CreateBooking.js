import React, { useState } from 'react';
import axios from 'axios';

const CreateBooking = () => {
    const [eventId, setEventId] = useState('');
    const [noOfTickets, setNoOfTickets] = useState('');
    const [userId, setUserId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://akshit-event-manager.vercel.app/api/bookings', { eventId, noOfTickets, userId }, {
                withCredentials: true
              });
            setSuccess('Booking created successfully');
            setEventId('');
            setNoOfTickets('');
            setUserId('');
        } catch (error) {
            setError('Error creating booking');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Create Booking</h2>
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleCreateBooking}>
                <input
                    type="text"
                    placeholder="Event ID"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="number"
                    placeholder="Number of Tickets"
                    value={noOfTickets}
                    onChange={(e) => setNoOfTickets(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Booking</button>
            </form>
        </div>
    );
};

export default CreateBooking;
