// src/layouts/PublicLayout.jsx
import React from "react";
import { Link } from "react-router-dom";

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-blue-900 text-white py-4 shadow-md">
                <div className="container mx-auto px-6 flex flex-wrap justify-between items-center">
                    <h1 className="text-4xl font-bold mb-2 md:mb-0">Inventory And Sales Management System</h1>
                    <nav className="space-x-5 md:space-x-12">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/about", label: "About" },
                            { to: "/contact", label: "Contact" },
                            { to: "/login", label: "Login" },
                            { to: "/register", label: "Register" },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="inline-block bg-white text-blue-900 px-5 py-3 rounded hover:bg-blue-300 font-medium transition duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow container mx-auto px-6 py-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-blue-900 text-white text-center py-6 text-sm">
                &copy; {new Date().getFullYear()} InventorySys. All rights reserved.
            </footer>
        </div>
    );
};

export default PublicLayout;
