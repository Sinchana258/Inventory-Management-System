import React from 'react';
import PublicLayout from "../../components/PublicLayout";

const Contact = () => {

    return (
        <PublicLayout>
            <div className="flex flex-col min-h-[80vh] bg-gray-50 px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-10">
                        Contact Us
                    </h1>

                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                            Let’s talk about your project
                        </h2>
                        <p className="text-center text-gray-600 mb-8">
                            Drop us a message using the form below. We’re happy to hear from you!
                        </p>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="First name"
                                className="px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Email address*"
                                className="px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="Phone number"
                                className="px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <textarea
                                placeholder="Your message"
                                rows="4"
                                className="px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2"
                            ></textarea>

                            <label className="text-sm md:col-span-2 text-left">
                                <input type="checkbox" className="mr-2" />
                                I agree to receive other marketing communications.
                            </label>

                            <button
                                type="submit"
                                className="bg-blue-900 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg md:col-span-2 transition-all duration-200"
                            >
                                Send Message
                            </button>
                        </form>

                        <p className="text-xs text-gray-500 text-center mt-6">
                            We’ll only use your information to respond to your inquiry.
                        </p>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );

};

export default Contact;
