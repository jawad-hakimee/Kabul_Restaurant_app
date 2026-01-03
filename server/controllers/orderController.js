const Order = require('../models/Order.js');
const sendEmail = require('../utils/sendEmail.js');

const addOrderItems = async (req, res) => {
    try {

        const {
            orderItems,
            shippingAddress = {},
            paymentMethod = 'Not Provided',
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const safeShippingAddress = {
            address: shippingAddress.address || '',
            city: shippingAddress.city || '',
            postalCode: shippingAddress.postalCode || '',
            country: shippingAddress.country || '',
        };

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress: safeShippingAddress,
            paymentMethod,
            itemsPrice: itemsPrice || 0,
            taxPrice: taxPrice || 0,
            shippingPrice: shippingPrice || 0,
            totalPrice: totalPrice || 0,
            isPaid: false,
            isDelivered: false,
            status: 'Pending'
        });

        const createdOrder = await order.save();

        try {
            const adminMessage = `
                <h1>New Order Received</h1>
                <p>Order ID: <strong>#${createdOrder._id}</strong></p>
                <p>Customer: ${req.user.name} (${req.user.email})</p>
                <p><strong>Total Amount:</strong> $${totalPrice}</p>
                <p>Status: <span style="color: #f1c40f; font-weight: bold;">${createdOrder.status}</span></p>
            `;
            await sendEmail({
                email: 'admin@kabulrestaurant.com',
                subject: `New Order Received - #${createdOrder._id}`,
                message: `New order #${createdOrder._id} is now ${createdOrder.status}.`,
                html: adminMessage,
            });
        } catch (emailError) {
            console.error('SERVER_ERROR: Admin notification email failed:', emailError.message);
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Order Creation Error:', error);
        res.status(500).json({ message: 'Order creation failed: ' + (error.message || 'Server Error') });
    }
};

const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
};

const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name email').sort('-createdAt');
    res.json(orders);
};

const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        order.status = status;
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        } else {
            order.isDelivered = false;
            order.deliveredAt = null;
        }

        const updatedOrder = await order.save();
        await updatedOrder.populate('user', 'name email');

        if (order.user && order.user.email) {
            let emailSubject = '';
            let emailHtml = '';

            switch (status) {
                case 'Delivered':
                    emailSubject = 'Order Delivered - Kabul Restaurant';
                    emailHtml = `
                        <h1>Your Order is Delivered!</h1>
                        <p>Hi ${order.user.name},</p>
                        <p>Your order #${order._id} has been delivered successfully.</p>
                        <p>Enjoy your meal!</p>
                    `;
                    break;
                case 'In Progress':
                    emailSubject = 'Order In Progress - Kabul Restaurant';
                    emailHtml = `
                        <h1>Order is being Prepared!</h1>
                        <p>Hi ${order.user.name},</p>
                        <p>Your order #${order._id} is now being prepared and will be with you shortly.</p>
                    `;
                    break;
                case 'Cancelled':
                    emailSubject = 'Order Cancelled';
                    emailHtml = `
                        <h1>Order Cancelled</h1>
                        <p>Hi ${order.user.name},</p>
                        <p>Your order #${order._id} has been cancelled.</p>
                    `;
                    break;
                default:
                    emailSubject = 'Order Status Updated';
                    emailHtml = `<h1>Order Update</h1><p>Your order status is now: ${status}</p>`;
            }

            try {
                await sendEmail({
                    email: order.user.email,
                    subject: emailSubject,
                    message: `Your order status has been updated to: ${status}`,
                    html: emailHtml
                });
            } catch (error) {
                console.error('Status update email failed:', error);
            }
        }

        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
}

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        if (req.user.isAdmin || order.user._id.toString() === req.user._id.toString()) {
            res.json(order);
        } else {
            res.status(401).json({ message: 'Not authorized to view this order' });
        }
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        await order.deleteOne();
        res.json({ message: 'Order removed' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

module.exports = { addOrderItems, getMyOrders, getOrders, getOrderById, updateOrderStatus, deleteOrder };
