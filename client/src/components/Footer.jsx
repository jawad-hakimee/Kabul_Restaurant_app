import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">Kabul Restaurant</h2>
                    <p className="text-gray-400 mb-4">
                        Authentic Afghan cuisine served with love and tradition.
                        Experience the taste of Kabul in every bite.
                    </p>
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Kabul Restaurant. All rights reserved.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
                        <li><Link to="/menu" className="hover:text-primary transition">Menu</Link></li>
                        <li><Link to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
                        <li><Link to="/cart" className="hover:text-primary transition">My Cart</Link></li>
                        <li><Link to="/login" className="hover:text-primary transition">Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                    <p className="text-gray-400 mb-4 text-sm">
                        Restaurant platform developed by <strong className="text-primary">Jawad Hakimi</strong>.
                    </p>
                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/jawad-hakimee"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white hover:scale-110 transition-transform text-2xl"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jawad-hakimi-061a512a4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-transform text-2xl"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://wa.me/93770127606"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-green-500 hover:scale-110 transition-transform text-2xl"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>
                        <a
                            href="mailto:Jawadhakimee1401@gmail.com"
                            className="text-gray-400 hover:text-red-500 hover:scale-110 transition-transform text-2xl"
                            aria-label="Email"
                        >
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
