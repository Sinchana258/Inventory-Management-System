import React from 'react';
import PublicLayout from "../../components/PublicLayout";

const About = () => {
    return (
        <PublicLayout>
            <div className="flex flex-col min-h-[80vh] bg-gray-50 px-6 py-12">
                {/* Page Header */}
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-blue-900 mb-6">About Our Platform</h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Our Inventory and Sales Management System is built to empower small businesses, vendors, and buyers by offering a seamless and efficient platform for managing product inventories, tracking sales, and analyzing business performance.
                    </p>
                </div>

                {/* Features Section */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">For Admins</h2>
                        <p className="text-gray-600 text-sm">
                            Admins have complete control over the platform. They can manage users, settings, and oversee all products and sales operations. They also access global analytics and configure alerts.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                        <h2 className="text-xl font-semibold text-green-600 mb-2">For Sellers</h2>
                        <p className="text-gray-600 text-sm">
                            Sellers can list and manage their products, track inventory in real time, record and analyze sales, and receive alerts for low-stock items. Sales summaries help them grow strategically.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                        <h2 className="text-xl font-semibold text-purple-600 mb-2">For Buyers</h2>
                        <p className="text-gray-600 text-sm">
                            Buyers can browse available products and request details or purchases easily. The intuitive interface ensures a smooth buying experience tailored for small-scale B2B or B2C interactions.
                        </p>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="max-w-4xl mx-auto text-center mt-12 flex-1">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
                    <p className="text-gray-600 text-lg">
                        We aim to simplify inventory and sales tracking for businesses of all sizes by providing a cloud-enabled, secure, and user-friendly solution. Our system reduces manual workload, increases efficiency, and helps you make data-driven decisions.
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
};

export default About;
