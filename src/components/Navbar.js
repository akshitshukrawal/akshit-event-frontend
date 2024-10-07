import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAdmin }) => {
    const navigate = useNavigate();

    // Get userInfo from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('userInfo'); // Clear userInfo from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <ul className="flex justify-between items-center">
                    {/* Left side links */}
                    <div className="flex space-x-4">
                        <li>
                            <Link to="/" className="text-white">Home</Link>
                        </li>
                        <li>
                            <Link to="/show-booking" className="text-white">Show Booking</Link>
                        </li>
                        {/* Show Admin button if isAdmin is true */}
                        {isAdmin && (
                            <li>
                                <Link to="/admin" className="text-white">Admin</Link>
                            </li>
                        )}
                    </div>

                    {/* Right side content */}
                    <div className="flex space-x-4 items-center">
                        {userInfo ? (
                            <>
                                {/* Show the username when userInfo exists */}
                                <li className="text-white">
                                    {`Welcome, ${userInfo.username}`}
                                </li>
                                {/* Logout Button */}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Show Login and Register if no userInfo */}
                                <li>
                                    <Link to="/login" className="text-white">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="text-white">Register</Link>
                                </li>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
