import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }

        // Mock fetching orders
        setOrders([
            { _id: '101', user: { name: 'John Doe' }, totalPrice: 45, isPaid: true, isDelivered: false, status: 'In Progress' },
            { _id: '102', user: { name: 'Jane Smith' }, totalPrice: 22, isPaid: true, isDelivered: true, status: 'Delivered' },
        ]);

    }, [user, navigate]);

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {order._id}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {order.user.name}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    ${order.totalPrice}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}>
                                        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${order.status === 'Delivered' ? 'bg-green-200' : 'bg-yellow-200'}`}></span>
                                        <span className="relative">{order.status}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
