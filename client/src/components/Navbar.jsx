import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md py-4 px-6 fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold text-primary tracking-tighter">Kabul<span className="text-secondary">Restaurant</span></Link>

                {/* Mobile menu button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
                    <Link to="/" className="hover:text-primary transition">Home</Link>
                    <Link to="/menu" className="hover:text-primary transition">Menu</Link>
                    <Link to="/contact" className="hover:text-primary transition">Contact</Link>
                    {user && user.isAdmin && <Link to="/admin" className="hover:text-primary transition">Admin</Link>}
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/cart" className="relative hover:text-primary transition group">
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-yellow-100 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-bold leading-none">{user.name}</p>
                                <Link to="/orders" className="text-xs text-gray-500 hover:text-primary transition">My Orders</Link>
                            </div>
                            <button onClick={logout} className="text-sm font-semibold text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition">Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="px-5 py-2 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition">Login</Link>
                    )}
                    <Link to="/menu" className="btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">Order Now</Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 bg-white border-t p-4 space-y-4 shadow-lg rounded-b-xl">
                    <Link to="/" className="block text-gray-700 font-medium">Home</Link>
                    <Link to="/menu" className="block text-gray-700 font-medium">Menu</Link>
                    <Link to="/contact" className="block text-gray-700 font-medium">Contact</Link>
                    <Link to="/cart" className="block text-gray-700 font-medium">Cart ({cartItems.length})</Link>
                    {user ? (
                        <>
                            <Link to="/orders" className="block text-gray-700 font-medium">My Orders</Link>
                            <button onClick={logout} className="block w-full text-left text-red-500 font-bold">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="block text-primary font-bold">Login</Link>
                    )}       </div>
            )}
        </nav>
    );
};

export default Navbar;
