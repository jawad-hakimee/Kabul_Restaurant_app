import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
    const [status, setStatus] = useState('Verifying...');

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const verify = async () => {
            try {
                await axios.get(`http://localhost:5000/api/users/verify/${token}`);
                setStatus('Verified');
            } catch (error) {
                console.error(error);
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
        <div className="pt-32 pb-12 px-6 max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                {status === 'Verifying...' ? (
                    <div className="animate-pulse">
                        <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold text-gray-400">Verifying Account...</h2>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Verified!</h2>
                        <p className="text-gray-600 mb-8">
                            Your email has been successfully verified. You can now log in to your account.
                        </p>
                        <Link to="/login" className="block w-full btn-primary py-3 rounded-lg font-bold shadow-md hover:shadow-xl transition">
                            Login Now
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyAccount;
