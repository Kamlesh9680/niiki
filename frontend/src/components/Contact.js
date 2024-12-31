import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form Submitted!');
        // Clear the form (optional)
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto pb-8 bg-yellow-100">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-center mb-4 customPurple">
                        Contact Us
                    </h2>
                    <div className="mb-6">
                        <p className="text-sm text-gray-700">
                            <strong>Phone:</strong> +91 809-482-3589
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Email:</strong> support@niiki.com
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Address:</strong> Rangawali, Barmer, Sata, Rajasthan, 344706
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-customPurple focus:border-customPurple"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-customPurple focus:border-customPurple"
                                placeholder="Your Email"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-customPurple focus:border-customPurple"
                                placeholder="Your Message"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default ContactPage;
