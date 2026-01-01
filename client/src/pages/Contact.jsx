import React, { useState } from 'react';
import { sendMessage } from '../api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendMessage(formData);
            setStatus('Thank you! Your message has been sent successfully.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.log(error);
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-6">
                            Have a question or feedback? We'd love to hear from you. Fill out the form or contact us directly.
                        </p>
                        <div className="space-y-4">
                            <p className="flex items-center space-x-3">
                                <span className="font-bold text-primary">📍 Address:</span>
                                <span>123 Kabul Street, Food City</span>
                            </p>
                            <p className="flex items-center space-x-3">
                                <span className="font-bold text-primary">📞 Phone:</span>
                                <span>+123 456 7890</span>
                            </p>
                            <p className="flex items-center space-x-3">
                                <span className="font-bold text-primary">📧 Email:</span>
                                <span>info@kabulrestaurant.com</span>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {status && <p className={`text-center font-bold ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full btn-primary py-3 rounded-lg font-bold shadow-md transform hover:scale-105 transition-transform">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
