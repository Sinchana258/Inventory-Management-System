// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Our Platform</h1>
            <p>Your one-stop solution for inventory and sales management!</p>

            <div style={{ margin: '20px 0' }}>
                <Link to="/login" style={{ marginRight: '20px' }}>Login</Link>
                <Link to="/register">Register</Link>
            </div>

            <hr style={{ margin: '40px auto', width: '60%' }} />

            <div>
                <h2>About Us</h2>
                <p>We help small businesses manage inventory and sales seamlessly.</p>

                <h2>Contact</h2>
                <p>Email: support@yourapp.com</p>
            </div>
        </div>
    );
};

export default HomePage;
