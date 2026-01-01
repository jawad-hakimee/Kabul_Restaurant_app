import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const success = await register({ name, email, password });
            if (success) {
                navigate('/verification-sent');
            } else {
                // If register returned false without throwing, assume default error
                // In a perfect world, register should throw, but per current AuthContext, it catches and returns false.
                // We'll rely on AuthContext's alert or better yet, error state handling.
                // Actually, let's just leave it, since AuthContext already alerts.
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pt-24 pb-10">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="w-full max-w-md p-8 bg-[#1E1E1E]/90 backdrop-blur-lg rounded-2xl shadow-[0_0_50px_-12px_rgba(255,215,0,0.15)] border border-white/5 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
                    <p className="text-gray-400">Join <span className="text-primary font-serif italic">Kabul Restaurant</span> today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                <FaUser />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-11 pr-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
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
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                <FaLock />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-11 pr-12 py-3 bg-[#2A2A2A] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                placeholder="Create a password"
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

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirm Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                <FaLock />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`w-full pl-11 pr-12 py-3 bg-[#2A2A2A] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-300 ${confirmPassword && password === confirmPassword
                                        ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500'
                                        : confirmPassword && password !== confirmPassword
                                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-700 focus:border-primary focus:ring-primary'
                                    }`}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                            <p className="text-red-500 text-xs mt-1 ml-1 animate-pulse">Passwords do not match</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-secondary font-bold py-3.5 rounded-xl hover:bg-yellow-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/20 mt-4 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:text-yellow-300 transition-colors inline-block">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
