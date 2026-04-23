const {
  createOrder,
  getOrderById,
  getMyOrders,
  getRestaurantOrders,
  getDriverOrders,
  updateOrderStatus,
  assignDriver
} = require('./order.service');

const create = async (req, res) => {
  try {
    const order = await createOrder(req.body, req.user._id);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await getMyOrders(req.user._id);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const restaurantOrders = async (req, res) => {
  try {
    const orders = await getRestaurantOrders(req.params.restaurantId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const driverOrders = async (req, res) => {
  try {
    const orders = await getDriverOrders(req.user._id);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const updateStatus = async (req, res) => {
  try {
    const io = req.app.get('io');
    const order = await updateOrderStatus(req.params.id, req.body.status, req.user._id, io);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const assign = async (req, res) => {
  try {
    const order = await assignDriver(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { create, getOne, myOrders, restaurantOrders, driverOrders, updateStatus, assign };