import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import * as api from '../api';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const VerifyAccount = () => {
    const [status, setStatus] = useState('Verifying...');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const hasCalledAPI = React.useRef(false);

    useEffect(() => {
        const verify = async () => {
            if (hasCalledAPI.current) return;
            hasCalledAPI.current = true;

            try {
                await api.verifyUser(token);
                setStatus('Verified');
            } catch (error) {
                console.error(error);
                // If the error suggests already verified (or token gone but user verified), we could handle it.
                // But for now, just show failed. Users can try logging in if they think it worked.
                setStatus('Failed');
            }
        };

        if (token) {
            verify();
        } else {
            setStatus('Failed');
        }
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pt-24 pb-10">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="w-full max-w-md p-8 bg-[#1E1E1E]/90 backdrop-blur-lg rounded-2xl shadow-[0_0_50px_-12px_rgba(255,215,0,0.15)] border border-white/5 relative z-10 text-center">

                {status === 'Verifying...' && (
                    <div className="py-8">
                        <div className="w-20 h-20 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-6 shrink-0 animate-pulse">
                            <FaSpinner className="text-primary text-3xl animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Verifying Account...</h2>
                        <p className="text-gray-400">Please wait while we confirm your email.</p>
                    </div>
                )}

                {status === 'Verified' && (
                    <div className="py-4">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shrink-0 relative group">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                            <FaCheckCircle className="text-green-500 text-4xl relative z-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Account Verified!</h2>
                        <p className="text-gray-400 mb-8">
                            Your email has been successfully verified. You now have full access to <span className="text-primary">Kabul Restaurant</span>.
                        </p>
                        <Link to="/login" className="block w-full bg-primary text-secondary font-bold py-3.5 rounded-xl hover:bg-yellow-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/20">
                            Login Now
                        </Link>
                    </div>
                )}

                {status === 'Failed' && (
                    <div className="py-4">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shrink-0 relative group">
                            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                            <FaTimesCircle className="text-red-500 text-4xl relative z-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Verification Failed</h2>
                        <p className="text-gray-400 mb-8">
                            The verification link is invalid or has expired. Please request a new one or contact support.
                        </p>
                        <Link to="/register" className="block w-full py-3.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 bg-[#2A2A2A]/50 hover:bg-[#2A2A2A]">
                            Return to Sign Up
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VerifyAccount;
