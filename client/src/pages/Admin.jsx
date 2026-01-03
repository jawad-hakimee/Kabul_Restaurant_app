import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [statusToUpdate, setStatusToUpdate] = useState('');

    useEffect(() => {

        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }
        fetchOrders();
    }, [user, navigate]);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get(`/orders?t=${Date.now()}`);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleEditClick = (order) => {
        setEditingOrder(order);
        setStatusToUpdate(order.status);
    };

    const handleUpdateStatus = async () => {
        if (!editingOrder) return;

        try {
            await API.put(`/orders/${editingOrder._id}/status`, { status: statusToUpdate });


            setOrders(prevOrders =>
                prevOrders.map(o => o._id === editingOrder._id ? { ...o, status: statusToUpdate } : o)
            );

            setEditingOrder(null);
            fetchOrders();
            alert("Order status updated successfully!");
        } catch (error) {
            console.error("Error updating order:", error);
            alert(`Failed to update order status.`);
        }
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
            try {
                await API.delete(`/orders/${id}`);
                fetchOrders();
                alert("Order deleted successfully");
            } catch (error) {
                console.error("Error deleting order:", error);
                alert("Failed to delete order");
            }
        }
    };

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium">Total Orders: <span className="font-bold">{orders.length}</span></p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5 whitespace-nowrap text-xs font-mono text-gray-400">#{order._id.slice(-8)}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                        <span className="block text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-sm font-semibold text-gray-900">{order.user?.name || 'Guest'}</div>
                                        <div className="text-xs text-gray-500">{order.user?.email || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">${order.totalPrice.toFixed(2)}</td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                    order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center text-sm font-medium space-x-3">
                                        <button
                                            onClick={() => handleEditClick(order)}
                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteOrder(order._id)}
                                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {editingOrder && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Update Order Status</h2>
                            <button onClick={() => setEditingOrder(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>

                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-6">Order ID: <span className="font-mono text-gray-900">{editingOrder._id}</span></p>

                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-2">New Status</label>
                                <select
                                    value={statusToUpdate}
                                    onChange={(e) => setStatusToUpdate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 transition-all"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditingOrder(null)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateStatus}
                                    className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
