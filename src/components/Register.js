import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://akshit-event-manager.vercel.app/api/users/register', { username, password }, {
                withCredentials: true
              });

            // Assuming the response contains user info or token
            const userInfo = response.data;

            // Save user info to localStorage
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            setSuccess('User registered successfully');
            setUsername('');
            setPassword('');
            setError('');
            navigate('/');
        } catch (error) {
            setError('User already exists or registration failed');
            setSuccess('');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Register</h2>
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegister}>
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
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
