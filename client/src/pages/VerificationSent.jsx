import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

const VerificationSent = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pt-24 pb-10">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="w-full max-w-md p-8 bg-[#1E1E1E]/90 backdrop-blur-lg rounded-2xl shadow-[0_0_50px_-12px_rgba(255,215,0,0.15)] border border-white/5 relative z-10 text-center">

                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shrink-0 relative group">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <FaPaperPlane className="text-primary text-3xl relative z-10 transform -translate-x-1 translate-y-1 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-500" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Verify Your Email</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    We've sent a verification email to your inbox. <br />
                    Please click the link inside to activate your account and join <span className="text-primary italic">Kabul Restaurant</span>.
                </p>

                <div className="space-y-4">
                    <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-primary text-secondary font-bold py-3.5 rounded-xl hover:bg-yellow-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/20">
                        Open Gmail
                    </a>

                    <Link to="/login" className="block w-full py-3.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 bg-[#2A2A2A]/50 hover:bg-[#2A2A2A]">
                        Back to Login
                    </Link>
                </div>

                <p className="mt-6 text-xs text-gray-600">
                    Did not receive the email? Check your spam folder or try again later.
                </p>
            </div>
        </div>
    );
};

export default VerificationSent;
