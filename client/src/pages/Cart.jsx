import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cartItems, addToCart, decreaseQty, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discountAmount = itemsPrice * discount;
    const total = itemsPrice - discountAmount;

    const applyCoupon = () => {
        if (promoCode === 'Hakimi50%') {
            setDiscount(0.5);
            setCouponMessage({ text: '50% Discount Applied!', type: 'success' });
        } else if (promoCode === 'Hakimi100%') {
            setDiscount(1);
            setCouponMessage({ text: '100% Discount Applied!', type: 'success' });
        } else if (promoCode === 'Hakimi25%') {
            setDiscount(0.25);
            setCouponMessage({ text: '25% Discount Applied!', type: 'success' });
        } else {
            setDiscount(0);
            setCouponMessage({ text: 'Invalid Coupon Code', type: 'error' });
        }
        // Clear message after 3 seconds
        setTimeout(() => setCouponMessage({ text: '', type: '' }), 3000);
    };

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const placeOrder = async () => {
        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item._id
                })),
                shippingAddress: {
                    address: '123 Test St',
                    city: 'Kabul',
                    postalCode: '1001',
                    country: 'Afghanistan'
                },
                paymentMethod: total === 0 ? 'Waived (100% Discount)' : paymentMethod,
                itemsPrice: itemsPrice,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: total
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/orders', orderData, config);

            clearCart();
            // alert('Order Placed Successfully!'); // Silent success
            navigate('/orders');
        } catch (error) {
            console.error(error);
            alert('Failed to place order. Please try again.');
        }
    };

    const checkoutHandler = async () => {
        if (!user) {
            navigate('/login');
        } else {
            if (total > 0 && (paymentMethod === 'PayPal' || paymentMethod === 'Payoneer')) {
                setShowPaymentModal(true);
            } else {
                placeOrder();
            }
        }
    };

    const handlePayment = (e) => {
        e.preventDefault(); // Prevent form submission
        setIsProcessingPayment(true);
        // Simulate payment delay
        setTimeout(() => {
            setIsProcessingPayment(false);
            setShowPaymentModal(false);
            placeOrder();
        }, 2000);
    };

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto relative">
            {/* Simulated Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
                        <p className="text-gray-600 mb-6">You are paying with <strong>{paymentMethod}</strong>.</p>

                        <div className="bg-gray-100 p-4 rounded-lg mb-6 flex justify-between items-center">
                            <span className="font-semibold">Total Amount:</span>
                            <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>

                        {isProcessingPayment ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                                <p className="text-gray-500">Processing transaction...</p>
                            </div>
                        ) : (
                            <form onSubmit={handlePayment} className="space-y-4 text-left">
                                {paymentMethod === 'PayPal' ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">PayPal Email</label>
                                            <input type="email" required placeholder="user@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Password</label>
                                            <input type="password" required placeholder="••••••••" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                            <input type="text" required placeholder="0000 0000 0000 0000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                        </div>
                                        <div className="flex space-x-4">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                                <input type="text" required placeholder="MM/YY" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700">CVC</label>
                                                <input type="text" required placeholder="123" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                                            <input type="text" required placeholder="John Doe" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-3 pt-4">
                                    <button
                                        type="submit"
                                        className="w-full btn-primary py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition"
                                    >
                                        Pay Now
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowPaymentModal(false)}
                                        className="w-full py-3 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
                    <Link to="/menu" className="btn-primary py-3 px-8 text-lg rounded-full">Go to Menu</Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-gray-500">${item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border rounded-lg">
                                        <button onClick={() => decreaseQty(item._id)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-lg">-</button>
                                        <span className="px-3 font-semibold">{item.qty}</span>
                                        <button onClick={() => addToCart(item)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-lg">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Order Summary</h2>

                            {/* Coupon Input */}
                            <div className="mb-4">
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Promo Code"
                                        className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:border-primary"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <button onClick={applyCoupon} className="bg-secondary text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition">Apply</button>
                                </div>
                                {couponMessage.text && (
                                    <p className={`mt-2 text-sm font-bold ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                        {couponMessage.text}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 mb-6 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${itemsPrice.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Discount ({(discount * 100).toFixed(0)}%):</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method Selection */}
                            {total > 0 ? (
                                <div className="mb-6">
                                    <h3 className="font-bold mb-2">Payment Method</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="Cash"
                                                checked={paymentMethod === 'Cash'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="form-radio text-primary"
                                            />
                                            <span>Cash on Delivery</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="PayPal"
                                                checked={paymentMethod === 'PayPal'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="form-radio text-primary"
                                            />
                                            <span>PayPal</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="Payoneer"
                                                checked={paymentMethod === 'Payoneer'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="form-radio text-primary"
                                            />
                                            <span>Payoneer</span>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 bg-green-50 p-3 rounded-lg border border-green-200 text-green-700 text-sm">
                                    <strong>No Payment Required:</strong> 100% Discount Applied.
                                </div>
                            )}

                            <div className="flex justify-between mb-6 font-bold text-2xl border-t pt-4">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button onClick={checkoutHandler} className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                                Proceed to Checkout
                            </button>
                            <button onClick={clearCart} className="w-full mt-4 text-gray-400 hover:text-red-500 text-sm">
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
