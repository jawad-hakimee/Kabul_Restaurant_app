import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Tracking = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Checking Status...');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        // Simulate tracking updates
        const stages = ['Order Received', 'Preparing', 'Out for Delivery', 'Arriving Soon'];
        let currentStage = 0;

        const interval = setInterval(() => {
            if (currentStage < stages.length) {
                setStatus(stages[currentStage]);
                setProgress((currentStage + 1) * 25);
                currentStage++;
            } else {
                clearInterval(interval);
            }
        }, 3000); // Update every 3 seconds for demo

        return () => clearInterval(interval);
    }, [user, navigate]);

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="grid md:grid-cols-3 gap-8 h-full">
                {/* Status Column */}
                <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h1 className="text-3xl font-bold mb-6">Order Status</h1>
                    <div className="space-y-8 relative pl-4 border-l-2 border-gray-200 ml-4">
                        <div className={`relative ${progress >= 25 ? 'opacity-100' : 'opacity-50'}`}>
                            <span className={`absolute -left-[21px] top-1 h-4 w-4 rounded-full border-2 border-white ${progress >= 25 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            <h3 className="font-bold">Order Received</h3>
                            <p className="text-sm text-gray-500">Your order has been validated.</p>
                        </div>
                        <div className={`relative ${progress >= 50 ? 'opacity-100' : 'opacity-50'}`}>
                            <span className={`absolute -left-[21px] top-1 h-4 w-4 rounded-full border-2 border-white ${progress >= 50 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            <h3 className="font-bold">Preparing</h3>
                            <p className="text-sm text-gray-500">The kitchen is preparing your food.</p>
                        </div>
                        <div className={`relative ${progress >= 75 ? 'opacity-100' : 'opacity-50'}`}>
                            <span className={`absolute -left-[21px] top-1 h-4 w-4 rounded-full border-2 border-white ${progress >= 75 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            <h3 className="font-bold">Out for Delivery</h3>
                            <p className="text-sm text-gray-500">Rider has picked up your order.</p>
                        </div>
                        <div className={`relative ${progress >= 100 ? 'opacity-100' : 'opacity-50'}`}>
                            <span className={`absolute -left-[21px] top-1 h-4 w-4 rounded-full border-2 border-white ${progress >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            <h3 className="font-bold">Arriving Soon</h3>
                            <p className="text-sm text-gray-500">Get ready to eat!</p>
                        </div>
                    </div>
                </div>

                {/* Map Column (Simulated) */}
                <div className="md:col-span-2 bg-gray-100 rounded-xl overflow-hidden shadow-lg relative h-[500px]">
                    {/* Placeholder for Map API (Google Maps / Mapbox) */}
                    <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                        <div className="text-center p-8">
                            <div className="mb-4 inline-block p-4 bg-white rounded-full shadow-lg animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Live Tracking Map</h2>
                            <p className="text-gray-500 max-w-md mx-auto mt-2">
                                In a production environment, this would display a Google Map with the rider's real-time GPS coordinates.
                            </p>
                            <div className="mt-8 bg-white p-4 rounded-lg shadow-md inline-flex items-center space-x-4">
                                <img src="https://via.placeholder.com/50" alt="Rider" className="w-12 h-12 rounded-full bg-gray-200" />
                                <div className="text-left">
                                    <h4 className="font-bold">Ahmad Wali</h4>
                                    <p className="text-xs text-gray-500">Your Delivery Partner</p>
                                </div>
                                <button className="btn-primary text-xs px-3 py-1 rounded-full">Call</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracking;
