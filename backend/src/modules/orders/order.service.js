const Order = require('./order.model');

const createOrder = async (data, customerId) => {
  const order = await Order.create({ ...data, customerId });
  return order;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate('customerId', 'name email phone')
    .populate('restaurantId', 'name address')
    .populate('driverId', 'name phone');
  if (!order) throw new Error('Order not found');
  return order;
};

const getMyOrders = async (userId) => {
  const orders = await Order.find({ customerId: userId })
    .populate('restaurantId', 'name logo')
    .sort({ createdAt: -1 });
  return orders;
};

const getRestaurantOrders = async (restaurantId) => {
  const orders = await Order.find({ restaurantId })
    .populate('customerId', 'name phone')
    .sort({ createdAt: -1 });
  return orders;
};

const getDriverOrders = async (driverId) => {
  const orders = await Order.find({ driverId })
    .populate('customerId', 'name phone')
    .populate('restaurantId', 'name address')
    .sort({ createdAt: -1 });
  return orders;
};

const updateOrderStatus = async (id, status, userId, io) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!order) throw new Error('Order not found');

  // Real-time notification
  if (io) {
    io.to(order._id.toString()).emit('order_status_update', {
      orderId: order._id,
      status: order.status
    });
  }

  return order;
};

const assignDriver = async (orderId, driverId) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { driverId, status: 'on_the_way' },
    { new: true }
  );
  if (!order) throw new Error('Order not found');
  return order;
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getRestaurantOrders,
  getDriverOrders,
  updateOrderStatus,
  assignDriver
};