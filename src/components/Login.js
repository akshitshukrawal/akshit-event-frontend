import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setIsAdmin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://akshit-event-manager.vercel.app/api/users/login', { username, password }, {
                withCredentials: true
              });
            // Assuming the response contains user data including isAdmin
            const userInfo = response.data;

            // Save user info to localStorage
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // Check if user is admin after successful login
            setIsAdmin(userInfo.isAdmin); // Use isAdmin from response data

            // Clear the form inputs
            setUsername('');
            setPassword('');

            // Navigate to the home page after successful login
            navigate('/');
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
