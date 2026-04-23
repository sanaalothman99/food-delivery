const Order = require('../orders/order.model');

const getStripe = () => {
  return require('stripe')(process.env.STRIPE_SECRET_KEY);
};

const createPaymentIntent = async (req, res) => {
  try {
    const stripe = getStripe();
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'usd',
      metadata: { orderId: order._id.toString() }
    });

    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'pending' });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid' });
    res.status(200).json({ success: true, message: 'Payment confirmed' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createPaymentIntent, confirmPayment };