import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login({ email, password });
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

            <div className="w-full max-w-md p-8 bg-[#1E1E1E]/90 backdrop-blur-lg rounded-2xl shadow-[0_0_50px_-12px_rgba(255,215,0,0.15)] border border-white/5 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-400">Sign in to continue to <span className="text-primary font-serif italic">Kabul Restaurant</span></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-11 pr-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                <FaLock />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-11 pr-12 py-3 bg-[#2A2A2A] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-400 cursor-pointer hover:text-white transition-colors">
                            <input type="checkbox" className="mr-2 rounded border-gray-700 bg-[#2A2A2A] text-primary focus:ring-primary" />
                            Remember me
                        </label>
                        <a href="#" className="text-primary hover:text-yellow-300 transition-colors">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-secondary font-bold py-3.5 rounded-xl hover:bg-yellow-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary font-bold hover:text-yellow-300 transition-colors inline-flex items-center group">
                            Create Account
                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
