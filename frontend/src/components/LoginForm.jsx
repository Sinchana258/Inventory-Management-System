import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            const userData = res.data.user;
            login(userData);
            toast.success('Login successful!');

            const role = userData?.role;
            if (role === 'admin') navigate('/admin/dashboard');
            else if (role === 'seller') navigate('/seller/dashboard');
            else if (role === 'buyer') navigate('/buyer/products');
            else navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <FaUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="w-full focus:outline-none"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                className="w-full focus:outline-none"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-3 rounded-full font-bold text-lg hover:bg-blue-800 transition"
                    >
                        LOGIN
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
