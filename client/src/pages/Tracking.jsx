import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderById } from '../api';

const Tracking = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const getOrderDetails = async () => {
            try {
                const { data } = await fetchOrderById(id);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Could not find order tracking details.');
                setLoading(false);
            }
        };

        getOrderDetails();

        const pollInterval = setInterval(getOrderDetails, 30000);
        return () => clearInterval(pollInterval);
    }, [user, navigate, id]);

    if (loading) return <div className="pt-32 text-center text-gray-500">Loading tracking information...</div>;
    if (error) return <div className="pt-32 text-center text-red-500">{error}</div>;

    const getProgress = (status) => {
        switch (status) {
            case 'Pending': return 33;
            case 'In Progress': return 66;
            case 'Delivered': return 100;
            default: return 33;
        }
    };

    const statusProgress = getProgress(order?.status);

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="grid md:grid-cols-3 gap-8 h-full">
                <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-lg h-fit max-w-2xl mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-2 text-center">Order Tracking</h1>
                    <p className="text-center text-gray-500 mb-8 border-b pb-4 font-mono text-sm">Order ID: #{id}</p>

                    <div className="space-y-10 relative pl-4 border-l-2 border-gray-200 ml-8 max-w-md mx-auto">
                        <div className={`relative ${statusProgress >= 33 ? 'opacity-100' : 'opacity-50'}`}>
                            <span className={`absolute -left-[25px] top-1 h-5 w-5 rounded-full border-2 border-white ${statusProgress >= 33 ? 'bg-yellow-500' : 'bg-gray-300'}`}></span>
                            <h3 className="text-lg font-bold">Order Received (Pending)</h3>
                            <p className="text-gray-500">Your order has been placed and is waiting for restaurant confirmation.</p>
                        </div>

                        <div className={`relative ${statusProgress >= 66 ? 'opacity-100' : 'opacity-50'}`}>
                            <span className={`absolute -left-[25px] top-1 h-5 w-5 rounded-full border-2 border-white ${statusProgress >= 66 ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                            <h3 className="text-lg font-bold">In Preparation</h3>
                            <p className="text-gray-500">Our chefs are preparing your authentic Afghan meal.</p>
                        </div>

                        <div className={`relative ${statusProgress >= 100 ? 'opacity-100' : 'opacity-50'}`}>
                            <span className={`absolute -left-[25px] top-1 h-5 w-5 rounded-full border-2 border-white ${statusProgress >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            <h3 className="text-lg font-bold">Delivered</h3>
                            <p className="text-gray-500">Your meal has been delivered. Enjoy!</p>
                        </div>

                        {order?.status === 'Cancelled' && (
                            <div className="relative pt-4 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100">
                                <h3 className="text-lg font-bold">Order Cancelled</h3>
                                <p className="text-sm">This order has been cancelled by the restaurant.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate('/orders')}
                            className="text-primary hover:underline font-bold"
                        >
                            &larr; Back to My Orders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracking;
