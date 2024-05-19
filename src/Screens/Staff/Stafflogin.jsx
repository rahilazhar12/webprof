import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Stafflogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
       const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);  // New state to track the success status

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsSuccess(false);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/staff/staff-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setIsSuccess(true);  // Set success status to true
                setLoading(false);
                sessionStorage.setItem('user', JSON.stringify(data));
                navigate('/dashboard')
                toast.success(data.message)
            } else {
                setMessage(data.message);
                setIsSuccess(false);  // Set success status to false
            }
        } catch (error) {
            setLoading(false);
            setMessage('An error occurred. Please try again.');
            setIsSuccess(false);  // Set success status to false
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center">Staff Login</h2>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="relative">
                        <FaEnvelope className="absolute top-2.5 left-3 text-gray-400" />
                        <input
                            type="email"
                            className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-2.5 left-3 text-gray-400" />
                        <input
                            type="password"
                            className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    {message && (
                        <p className={`text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Stafflogin;
