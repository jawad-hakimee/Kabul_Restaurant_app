import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyOrders = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                // Direct axios call to ensure token is passed correctly if interceptor has issues
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    if (loading) return <div className="pt-24 text-center">Loading...</div>;
    if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row justify-between items-center bg-gray-50 mb-4">
                            <div>
                                <h3 className="font-bold text-lg mb-1">Order #{order._id.substring(0, 10)}...</h3>
                                <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <div className="mt-2">
                                    {order.orderItems.map((item, index) => (
                                        <span key={index} className="text-sm text-gray-600 block">
                                            {item.qty}x {item.name}
                                        </span>
                                    ))}
                                </div>
                                <p className="font-bold mt-2">Total: ${order.totalPrice}</p>
                                <div className="mt-2 text-sm text-gray-500">
                                    <span className="font-semibold text-gray-700">Payment: </span>
                                    {order.paymentMethod === 'PayPal' || order.paymentMethod === 'Payoneer' ? (
                                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200">
                                            Paid Online ({order.paymentMethod})
                                        </span>
                                    ) : order.paymentMethod?.includes('Waived') ? (
                                        <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                                            {order.paymentMethod}
                                        </span>
                                    ) : (
                                        <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-200">
                                            {order.paymentMethod}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                    order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {order.status}
                                </span>
                                <button
                                    onClick={() => navigate('/tracking')}
                                    className="btn-primary text-sm px-4 py-2 shadow-sm"
                                >
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
