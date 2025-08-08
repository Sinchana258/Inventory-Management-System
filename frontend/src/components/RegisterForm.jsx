import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaUserTag } from 'react-icons/fa';


const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
                role,
            });
            toast.success('Registration successful!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <FaUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="w-full focus:outline-none"
                                placeholder="Enter your username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
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

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                className="w-full focus:outline-none"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                        </div>
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Role</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                            <FaUserTag className="text-gray-500 mr-2" />
                            <select
                                className="w-full focus:outline-none"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="seller">Seller</option>
                                <option value="buyer">Buyer</option>
                            </select>

                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-full font-bold text-lg hover:bg-blue-800 transition"
                    >
                        REGISTER
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-700 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
