import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow">
        <h1 className="text-xl font-bold">Inventory System</h1>
        <ul className="flex gap-6">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/forgot-password">Forgot Password</Link></li>
        </ul>
    </nav>
);

export default Navbar;
