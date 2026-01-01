import React from 'react';
import { Link } from 'react-router-dom';

const VerificationSent = () => {
    return (
        <div className="pt-32 pb-12 px-6 max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
                <p className="text-gray-600 mb-8">
                    We've sent a verification email to your inbox. Please confirm your email address to activate your account.
                </p>



                <Link to="/login" className="text-sm text-gray-500 hover:text-primary">
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default VerificationSent;
