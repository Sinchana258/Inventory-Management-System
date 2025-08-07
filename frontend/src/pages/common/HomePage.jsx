import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/PublicLayout";

const HomePage = () => {
    return (
        <PublicLayout>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[70vh] animate-fade-in">
                {/* Left Content */}
                <div className="space-y-5">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
                        Effortless Inventory & <br className="hidden md:block" /> Sales Tracking
                    </h2>
                    <p className="text-lg text-gray-700">
                        InventorySys is your all-in-one solution to manage stock, track sales, and gain insights. Whether you're running a physical store or selling online, stay ahead with real-time data and powerful tools.
                    </p>

                    <ul className="space-y-2 text-gray-700 pl-6 list-disc">
                        <li>Auto stock updates after every sale</li>
                        <li>Visual dashboards & sales analytics</li>
                        <li>Email alerts for low-stock items</li>
                        <li>Role-based access control</li>
                    </ul>

                    <Link
                        to="/register"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105 font-semibold"
                    >
                        Get Started Free
                    </Link>
                </div>

                {/* Right Image */}
                <div className="flex justify-center">
                    <img
                        src="/images/devices-background.jpg"
                        alt="Business dashboard illustration"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </section>
        </PublicLayout>
    );
};

export default HomePage;
