// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // make sure this path is correct
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // ✅ use login from context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            const userData = res.data.user; // Adjust based on your backend response
            const role = userData?.role;

            login(userData); // ✅ use context's login function

            toast.success('Login successful!');

            // ✅ Redirect based on role
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'seller') {
                navigate('/seller/dashboard');
            } else if (role === 'buyer') {
                navigate('/buyer/products');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            toast.error(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-2xl mb-4">Login</h2>

            <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded p-2 mb-4"
            />

            <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded p-2 mb-4"
            />

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
