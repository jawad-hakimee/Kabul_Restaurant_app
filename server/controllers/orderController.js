const Order = require('../models/Order.js');
const sendEmail = require('../utils/sendEmail.js');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        // Send Receipt Email
        try {
            const receiptMessage = `
                <h1>Order Confirmation</h1>
                <p>Hi ${req.user.name},</p>
                <p>Use this order ID to track your order: <strong>${createdOrder._id}</strong></p>
                <p>Your order for $${totalPrice} has been placed successfully.</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <h3>Items:</h3>
                <ul>
                    ${orderItems.map(item => `<li>${item.qty}x ${item.name} - $${item.price}</li>`).join('')}
                </ul>
                <p>Thank you for choosing Kabul Restaurant!</p>
            `;

            await sendEmail({
                email: req.user.email,
                subject: `Order Receipt - #${createdOrder._id}`,
                message: `Your order #${createdOrder._id} has been placed. Total: $${totalPrice}`, // Fallback text
                html: receiptMessage
            });
        } catch (error) {
            console.error('Receipt email failed:', error);
        }

        res.status(201).json(createdOrder);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status;
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
}

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus };
